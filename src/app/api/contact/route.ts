// /app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { headers } from 'next/headers';

import { RateLimiter } from '@/lib/security/rateLimiter';
import { SpamDetector } from '@/lib/security/spamDetector';
import { EmergencyShutdown } from '@/lib/security/emergencyShutdown';
import { Honeypot } from '@/lib/security/honeypot';
import { SecurityLogger } from '@/lib/monitoring/logger';
import { SecurityAlerting } from '@/lib/monitoring/alerting';

import type { 
  ContactFormData, 
  ContactApiResponse,
  SecurityLog 
} from '@/types/contact';

// Validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, 'Name contains invalid characters'),
  
  email: z.string()
    .email('Invalid email format')
    .max(200, 'Email too long')
    .toLowerCase(),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
  
  honeypot: z.string().optional()
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest): Promise<NextResponse<ContactApiResponse>> {
  const startTime = Date.now();
  let logData: Partial<SecurityLog> = {
    timestamp: new Date().toISOString(),
    type: 'blocked'
  };

  try {
    // Get client info
    const headersList = headers();
    const ip = getClientIP(headersList);
    const userAgent = headersList.get('user-agent') || 'unknown';
    
    logData.ip = ip;
    logData.userAgent = userAgent;

    // Parse request body with error handling
    let body: ContactFormData;
    try {
      body = await request.json();
    } catch (error) {
      logData.message = 'Invalid JSON in request body';
      logData.reason = 'malformed_request';
      await SecurityLogger.log(logData as SecurityLog);
      
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Validate input with Zod
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      
      logData.message = 'Validation failed';
      logData.reason = errorMessage;
      await SecurityLogger.log(logData as SecurityLog);
      
      return NextResponse.json(
        { error: 'Validation failed', reason: errorMessage },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = validationResult.data;
    logData.email = email;

    // 1. Honeypot validation
    if (!Honeypot.validate(honeypot)) {
      logData.message = 'Bot detected via honeypot';
      logData.reason = 'honeypot_triggered';
      logData.type = 'spam';
      await SecurityLogger.log(logData as SecurityLog);
      
      await SecurityAlerting.sendAlert('spam_detected', {
        ip,
        email,
        reason: 'Honeypot triggered'
      });

      return NextResponse.json(
        { error: 'Bot detection triggered' },
        { status: 429 }
      );
    }

    // 2. Rate limiting - IP based
    const ipRateLimit = RateLimiter.check(ip, 3, 60000); // 3 per minute
    if (!ipRateLimit.success) {
      logData.message = 'IP rate limit exceeded';
      logData.reason = `${ipRateLimit.current}/${ipRateLimit.limit} requests`;
      await SecurityLogger.log(logData as SecurityLog);
      
      await SecurityAlerting.sendAlert('rate_limit_exceeded', {
        ip,
        limit: ipRateLimit.limit || 3,
        attempts: ipRateLimit.current || 0
      });

      return NextResponse.json(
        { 
          error: 'Too many requests from this IP',
          resetTime: ipRateLimit.resetTime
        },
        { status: 429 }
      );
    }

    // 3. Rate limiting - Email based
    const emailRateLimit = RateLimiter.check(email, 5, 3600000); // 5 per hour
    if (!emailRateLimit.success) {
      logData.message = 'Email rate limit exceeded';
      logData.reason = `${emailRateLimit.current}/${emailRateLimit.limit} requests`;
      await SecurityLogger.log(logData as SecurityLog);

      return NextResponse.json(
        { 
          error: 'Too many messages from this email',
          resetTime: emailRateLimit.resetTime
        },
        { status: 429 }
      );
    }

    // 4. Spam detection
    const spamCheck = SpamDetector.checkSpam(message, email, name);
    if (spamCheck.isSpam) {
      logData.message = 'Spam detected';
      logData.reason = spamCheck.reason;
      logData.type = 'spam';
      await SecurityLogger.log(logData as SecurityLog);
      
      await SecurityAlerting.sendAlert('spam_detected', {
        ip,
        email,
        reason: spamCheck.reason || 'Unknown spam pattern'
      });

      return NextResponse.json(
        { error: 'Message flagged as spam', reason: spamCheck.reason },
        { status: 400 }
      );
    }

    // 5. Emergency shutdown check
    const emergencyCheck = EmergencyShutdown.checkLimits();
    if (!emergencyCheck.allowed) {
      logData.message = 'Service unavailable - emergency limits';
      logData.reason = emergencyCheck.reason;
      await SecurityLogger.log(logData as SecurityLog);
      
      return NextResponse.json(
        { 
          error: 'Service temporarily unavailable',
          reason: emergencyCheck.reason
        },
        { status: 503 }
      );
    }

    // 6. Send email
    const emailResult = await sendEmail({ name, email, message, ip, userAgent });
    
    if (!emailResult.success) {
      logData.message = 'Email sending failed';
      logData.reason = emailResult.error;
      await SecurityLogger.log(logData as SecurityLog);
      
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // 7. Update counters
    EmergencyShutdown.incrementCounters();

    // 8. Log success
    logData.type = 'success';
    logData.message = 'Email sent successfully';
    logData.reason = undefined;
    await SecurityLogger.log(logData as SecurityLog);

    const processingTime = Date.now() - startTime;
    console.log(`✅ Contact form processed successfully in ${processingTime}ms`, {
      ip,
      email: email.substring(0, 10) + '***',
      messageId: emailResult.messageId
    });

    return NextResponse.json({
      success: true,
      messageId: emailResult.messageId
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    logData.message = 'Internal server error';
    logData.reason = error instanceof Error ? error.message : 'Unknown error';
    await SecurityLogger.log(logData as SecurityLog);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper functions
function getClientIP(headersList: Headers): string {
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIP = headersList.get('x-real-ip');
  const cfIP = headersList.get('cf-connecting-ip'); // Cloudflare
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  return realIP || cfIP || 'unknown';
}

interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

async function sendEmail({
  name,
  email,
  message,
  ip,
  userAgent
}: {
  name: string;
  email: string;
  message: string;
  ip: string;
  userAgent: string;
}): Promise<EmailSendResult> {
  try {
    const result = await resend.emails.send({
      from: 'Contact Form <contact@fatihinan.com>', // Use your verified domain
      to: ['fatihinan3437@gmail.com'],
      replyTo: email,
      subject: `🌲 Yeni İletişim: ${name}`,
      html: generateEmailTemplate({ name, email, message, ip, userAgent }),
      text: generatePlainTextEmail({ name, email, message, ip, userAgent })
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      success: true,
      messageId: result.data?.id
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown email error'
    };
  }
}

function generateEmailTemplate({
  name,
  email,
  message,
  ip,
  userAgent
}: {
  name: string;
  email: string;
  message: string;
  ip: string;
  userAgent: string;
}): string {
  return `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Yeni İletişim Mesajı</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0; }
        .meta-info { background: #e9ecef; padding: 15px; border-radius: 8px; font-size: 0.9em; margin-top: 20px; }
        .meta-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .label { font-weight: bold; color: #495057; }
        .value { color: #6c757d; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌲 Yeni İletişim Mesajı</h1>
          <p>fatihinan.com contact formundan</p>
        </div>
        
        <div class="content">
          <h2>Gönderen Bilgileri</h2>
          <div class="meta-row">
            <span class="label">Ad Soyad:</span>
            <span class="value">${escapeHtml(name)}</span>
          </div>
          <div class="meta-row">
            <span class="label">E-posta:</span>
            <span class="value">${escapeHtml(email)}</span>
          </div>
          <div class="meta-row">
            <span class="label">Tarih:</span>
            <span class="value">${new Date().toLocaleString('tr-TR', { 
              timeZone: 'Europe/Istanbul' 
            })}</span>
          </div>
          
          <div class="message-box">
            <h3>Mesaj İçeriği:</h3>
            <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
          </div>
          
          <div class="meta-info">
            <h4>Teknik Bilgiler</h4>
            <div class="meta-row">
              <span class="label">IP Adresi:</span>
              <span class="value">${ip}</span>
            </div>
            <div class="meta-row">
              <span class="label">User Agent:</span>
              <span class="value">${escapeHtml(userAgent.substring(0, 100))}...</span>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generatePlainTextEmail({
  name,
  email,
  message,
  ip,
  userAgent
}: {
  name: string;
  email: string;
  message: string;
  ip: string;
  userAgent: string;
}): string {
  return `
Yeni İletişim Mesajı - fatihinan.com

GÖNDEREN BİLGİLERİ:
Ad Soyad: ${name}
E-posta: ${email}
Tarih: ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}

MESAJ:
${message}

TEKNİK BİLGİLER:
IP Adresi: ${ip}
User Agent: ${userAgent}
  `;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
}