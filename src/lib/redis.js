// /lib/redis.js
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export class RedisRateLimiter {
  static async check(identifier, limit = 5, windowMs = 60000) {
    const key = `ratelimit:${identifier}`;
    const window = Math.floor(Date.now() / windowMs);
    const windowKey = `${key}:${window}`;
    
    try {
      // Current window count
      const current = await redis.incr(windowKey);
      
      if (current === 1) {
        // Set expiration for first request in window
        await redis.expire(windowKey, Math.ceil(windowMs / 1000));
      }
      
      if (current > limit) {
        const ttl = await redis.ttl(windowKey);
        const resetTime = Date.now() + (ttl * 1000);
        
        return {
          success: false,
          current,
          limit,
          resetTime
        };
      }
      
      return {
        success: true,
        current,
        limit,
        remaining: limit - current
      };
      
    } catch (error) {
      console.error('Redis rate limit error:', error);
      // Fallback: Allow request if Redis fails
      return { success: true };
    }
  }
  
  static async trackEmail(ip, email) {
    const today = new Date().toISOString().split('T')[0];
    const hour = new Date().getHours();
    
    try {
      // Daily counter
      const dailyKey = `emails:daily:${today}`;
      const dailyCount = await redis.incr(dailyKey);
      await redis.expire(dailyKey, 86400); // 24 hours
      
      // Hourly counter
      const hourlyKey = `emails:hourly:${today}:${hour}`;
      const hourlyCount = await redis.incr(hourlyKey);
      await redis.expire(hourlyKey, 3600); // 1 hour
      
      // IP tracking
      const ipKey = `emails:ip:${ip}:${today}`;
      await redis.incr(ipKey);
      await redis.expire(ipKey, 86400);
      
      // Email tracking
      const emailKey = `emails:email:${email}:${today}`;
      await redis.incr(emailKey);
      await redis.expire(emailKey, 86400);
      
      return {
        dailyCount,
        hourlyCount
      };
      
    } catch (error) {
      console.error('Email tracking error:', error);
    }
  }
  
  static async getStats() {
    const today = new Date().toISOString().split('T')[0];
    const hour = new Date().getHours();
    
    try {
      const [dailyCount, hourlyCount] = await Promise.all([
        redis.get(`emails:daily:${today}`) || 0,
        redis.get(`emails:hourly:${today}:${hour}`) || 0
      ]);
      
      return {
        dailyCount: parseInt(dailyCount),
        hourlyCount: parseInt(hourlyCount),
        dailyLimit: 50,
        hourlyLimit: 10
      };
      
    } catch (error) {
      console.error('Stats error:', error);
      return {
        dailyCount: 0,
        hourlyCount: 0,
        dailyLimit: 50,
        hourlyLimit: 10
      };
    }
  }
}

// /lib/monitoring/alerting.js
export class SecurityAlerting {
  static async sendAlert(type, data) {
    const alerts = {
      'rate_limit_exceeded': {
        subject: '🚨 Rate Limit Aşıldı',
        message: `IP: ${data.ip}\nLimit: ${data.limit}\nAttempts: ${data.attempts}`
      },
      'spam_detected': {
        subject: '⚠️ Spam Tespit Edildi',
        message: `IP: ${data.ip}\nEmail: ${data.email}\nReason: ${data.reason}`
      },
      'daily_limit_reached': {
        subject: '📊 Günlük Email Limiti Doldu',
        message: `Daily emails: ${data.count}\nLimit: ${data.limit}`
      },
      'suspicious_activity': {
        subject: '🔍 Şüpheli Aktivite',
        message: `IP: ${data.ip}\nPattern: ${data.pattern}\nCount: ${data.count}`
      }
    };
    
    const alert = alerts[type];
    if (!alert) return;
    
    try {
      // Webhook notification (Slack, Discord, etc.)
      if (process.env.WEBHOOK_URL) {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `${alert.subject}\n${alert.message}`
          })
        });
      }
      
      // Email notification
      if (process.env.ADMIN_EMAIL && process.env.RESEND_API_KEY) {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        await resend.emails.send({
          from: 'security@fatihinan.com',
          to: [process.env.ADMIN_EMAIL],
          subject: alert.subject,
          text: alert.message
        });
      }
      
    } catch (error) {
      console.error('Alert sending failed:', error);
    }
  }
}

// /lib/security/advanced-protection.js
export class AdvancedProtection {
  static suspiciousIPs = new Set();
  static emailPatterns = new Map();
  
  static analyzeIP(ip, userAgent) {
    // VPN/Proxy detection (basic)
    const suspiciousPatterns = [
      /tor-exit/i,
      /proxy/i,
      /vpn/i,
      /anonymous/i
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (userAgent && pattern.test(userAgent)) {
        this.suspiciousIPs.add(ip);
        return {
          suspicious: true,
          reason: 'Suspicious user agent pattern'
        };
      }
    }
    
    return { suspicious: false };
  }
  
  static async analyzeEmailPattern(email, message, name) {
    const key = email.toLowerCase();
    const now = Date.now();
    
    if (!this.emailPatterns.has(key)) {
      this.emailPatterns.set(key, []);
    }
    
    const history = this.emailPatterns.get(key);
    history.push({
      timestamp: now,
      messageLength: message.length,
      nameLength: name.length,
      message: message.substring(0, 100) // First 100 chars for pattern analysis
    });
    
    // Keep only last 10 messages
    if (history.length > 10) {
      history.shift();
    }
    
    // Detect patterns
    const recentMessages = history.filter(h => now - h.timestamp < 3600000); // Last hour
    
    if (recentMessages.length >= 5) {
      // Check for identical/similar messages
      const similarities = recentMessages.map(h => h.message);
      const uniqueMessages = new Set(similarities);
      
      if (uniqueMessages.size < recentMessages.length * 0.3) {
        return {
          suspicious: true,
          reason: 'Repetitive message pattern',
          count: recentMessages.length
        };
      }
    }
    
    return { suspicious: false };
  }
  
  static async checkGeolocation(ip) {
    // Basic geolocation check (you can use services like ipapi.co)
    try {
      if (process.env.IPAPI_KEY) {
        const response = await fetch(`https://ipapi.co/${ip}/json/?key=${process.env.IPAPI_KEY}`);
        const data = await response.json();
        
        // Block certain high-risk countries (customize as needed)
        const blockedCountries = ['CN', 'RU', 'KP']; // Example
        
        if (blockedCountries.includes(data.country_code)) {
          return {
            blocked: true,
            reason: 'High-risk geolocation',
            country: data.country
          };
        }
      }
      
      return { blocked: false };
    } catch (error) {
      console.error('Geolocation check failed:', error);
      return { blocked: false }; // Don't block on API failure
    }
  }
}