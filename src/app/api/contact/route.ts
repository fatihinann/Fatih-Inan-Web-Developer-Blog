import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { Honeypot } from '@/lib/security/honeypot';
import { RateLimiter } from '@/lib/security/rateLimiter';
import { SpamDetector } from '@/lib/security/spamDetector';
import { EmergencyShutdown } from '@/lib/security/emergencyShutdown';

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic HTML Sanitization helper
function sanitizeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    
    // 1. Emergency Shutdown Check
    const emergencyCheck = EmergencyShutdown.checkLimits();
    if (!emergencyCheck.allowed) {
        return NextResponse.json(
            { error: emergencyCheck.reason || 'Service temporarily unavailable.' },
            { status: 503 }
        );
    }

    // 2. Rate Limiting Check
    const rateLimit = RateLimiter.check(ip);
    if (!rateLimit.success) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.', resetTime: rateLimit.resetTime },
            { status: 429 }
        );
    }

    try {
        const { name, email, message, honeypot } = await request.json();

        // 3. Honeypot Validation
        if (!Honeypot.validate(honeypot)) {
            console.warn(`Spam bot detected from IP: ${ip}`);
            return NextResponse.json({ success: true }); // Silent fail for bots
        }

        // 4. Basic Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Tüm alanlar zorunludur.' },
                { status: 400 }
            );
        }

        // 5. Email Format Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Geçersiz e-posta adresi.' },
                { status: 400 }
            );
        }

        // 6. Spam Detection
        const spamCheck = SpamDetector.checkSpam(message, email, name);
        if (spamCheck.isSpam) {
            console.warn(`Spam detected: ${spamCheck.reason}`, spamCheck);
            return NextResponse.json(
                { error: 'Mesajınız spam olarak algılandı.' },
                { status: 400 }
            );
        }

        // 7. Sanitization
        const safeName = sanitizeHtml(name);
        const safeEmail = sanitizeHtml(email);
        const safeMessage = sanitizeHtml(message);

        // 8. Send Email
        await resend.emails.send({
            from: 'İletişim Formu <onboarding@resend.dev>', // Verilen örnek onboarding adresi, kullanıcı domain'ini ekleyince güncellemeli
            to: 'fatihinan3437@gmail.com',
            subject: `Yeni mesaj: ${safeName}`,
            replyTo: safeEmail,
            html: `
        <h2>Yeni İletişim Mesajı</h2>
        <p><strong>Ad:</strong> ${safeName}</p>
        <p><strong>E-posta:</strong> ${safeEmail}</p>
        <p><strong>Mesaj:</strong></p>
        <div style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 5px;">
            ${safeMessage}
        </div>
      `,
        });

        // 9. Stats Update
        EmergencyShutdown.incrementCounters();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Mail sending error:', error);
        return NextResponse.json(
            { error: 'Mail gönderilemedi. Lütfen daha sonra tekrar deneyiniz.' },
            { status: 500 }
        );
    }
}