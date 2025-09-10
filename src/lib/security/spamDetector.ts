import type { SpamCheckResult } from '@/types/security';

export class SpamDetector {
  private static readonly SPAM_KEYWORDS: readonly string[] = [
    'viagra', 'casino', 'win money', 'click here', 'earn money',
    'get rich', 'make money', 'free money', 'investment opportunity',
    'urgent', 'limited time', 'act now', 'guaranteed', 'bitcoin',
    'cryptocurrency', 'loan', 'credit', 'debt', 'mortgage'
  ] as const;

  private static readonly SUSPICIOUS_PATTERNS: readonly RegExp[] = [
    /(.)\1{4,}/g, // Same character repeated 5+ times
    /https?:\/\/\S+/gi, // URLs are suspicious in contact forms
    /\b\d{4,}\b/g, // Long number sequences
    /[A-Z]{5,}/g, // All caps words
    /\$\d+/g, // Money amounts
  ] as const;

  private static readonly BLACKLISTED_DOMAINS: readonly string[] = [
    '10minutemail.com', 'temp-mail.org', 'guerrillamail.com',
    'mailinator.com', 'throwaway.email', 'tempail.com',
    'yopmail.com', 'maildrop.cc', 'sharklasers.com'
  ] as const;

  private static readonly MIN_MESSAGE_LENGTH = 10;
  private static readonly MAX_MESSAGE_LENGTH = 2000;

  static checkSpam(message: string, email: string, name: string): SpamCheckResult {
    const content = `${message} ${email} ${name}`.toLowerCase().trim();
    
    // Check message length
    if (message.length < this.MIN_MESSAGE_LENGTH) {
      return {
        isSpam: true,
        reason: 'Message too short',
        length: message.length
      };
    }

    if (message.length > this.MAX_MESSAGE_LENGTH) {
      return {
        isSpam: true,
        reason: 'Message too long',
        length: message.length
      };
    }

    // Check for spam keywords
    const foundSpamWords = this.SPAM_KEYWORDS.filter(keyword =>
      content.includes(keyword.toLowerCase())
    );

    if (foundSpamWords.length > 0) {
      return {
        isSpam: true,
        reason: 'Spam keywords detected',
        details: foundSpamWords
      };
    }

    // Check suspicious patterns
    for (const pattern of this.SUSPICIOUS_PATTERNS) {
      if (pattern.test(content)) {
        return {
          isSpam: true,
          reason: 'Suspicious pattern detected',
          pattern: pattern.toString()
        };
      }
    }

    // Check disposable email domains
    const emailDomain = email.split('@')[1]?.toLowerCase();
    if (emailDomain && this.BLACKLISTED_DOMAINS.includes(emailDomain)) {
      return {
        isSpam: true,
        reason: 'Disposable email domain',
        domain: emailDomain
      };
    }

    // Check for gibberish text (basic heuristic)
    const words = message.split(/\s+/);
    const shortWords = words.filter(word => word.length < 3);
    if (shortWords.length > words.length * 0.7) {
      return {
        isSpam: true,
        reason: 'Low quality content detected'
      };
    }

    return { isSpam: false };
  }

  static addToBlacklist(domain: string): void {
    // In a real implementation, this would update a persistent store
    console.log(`Adding ${domain} to blacklist`);
  }
}