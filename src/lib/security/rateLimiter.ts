import { LRUCache } from 'lru-cache';
import type { RateLimitResult } from '@/types/security';

interface RequestLog {
  timestamp: number;
  ip: string;
}

export class RateLimiter {
  private static cache = new LRUCache<string, RequestLog[]>({
    max: 1000,
    ttl: 1000 * 60 * 60, // 1 hour
  });

  static check(
    identifier: string,
    limit: number = 5,
    windowMs: number = 60000
  ): RateLimitResult {
    const key = `rate_limit_${identifier}`;
    const now = Date.now();
    const windowStart = now - windowMs;

    let requests = this.cache.get(key) || [];

    // Remove old requests outside the window
    requests = requests.filter(req => req.timestamp > windowStart);

    if (requests.length >= limit) {
      const oldestRequest = requests[0];
      const resetTime = oldestRequest.timestamp + windowMs;

      return {
        success: false,
        current: requests.length,
        limit,
        remaining: 0,
        resetTime
      };
    }

    // Add current request
    requests.push({
      timestamp: now,
      ip: identifier
    });

    this.cache.set(key, requests);

    return {
      success: true,
      current: requests.length,
      limit,
      remaining: limit - requests.length
    };
  }

  static getRemainingRequests(identifier: string, limit: number = 5): number {
    const key = `rate_limit_${identifier}`;
    const requests = this.cache.get(key) || [];
    return Math.max(0, limit - requests.length);
  }

  static clearLimits(identifier?: string): void {
    if (identifier) {
      this.cache.delete(`rate_limit_${identifier}`);
    } else {
      this.cache.clear();
    }
  }
}