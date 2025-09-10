import type { EmergencyLimitsResult, SecurityStats } from '@/types/security';

export class EmergencyShutdown {
  private static readonly DAILY_LIMIT = 50;
  private static readonly HOURLY_LIMIT = 10;
  private static readonly SUSPICIOUS_THRESHOLD = 20; // Suspicious requests per hour

  private static counters = new Map<string, number>();
  private static isShutdown = false;

  static checkLimits(): EmergencyLimitsResult {
    if (this.isShutdown) {
      return {
        allowed: false,
        reason: 'Emergency shutdown activated',
        limit: 0,
        current: 0
      };
    }

    const now = new Date();
    const today = now.toDateString();
    const currentHour = now.getHours();
    
    const dailyKey = `daily_${today}`;
    const hourlyKey = `hourly_${today}_${currentHour}`;
    
    const dailyCount = this.counters.get(dailyKey) || 0;
    const hourlyCount = this.counters.get(hourlyKey) || 0;
    
    if (dailyCount >= this.DAILY_LIMIT) {
      return {
        allowed: false,
        reason: 'Daily email limit exceeded',
        limit: this.DAILY_LIMIT,
        current: dailyCount
      };
    }
    
    if (hourlyCount >= this.HOURLY_LIMIT) {
      return {
        allowed: false,
        reason: 'Hourly email limit exceeded',
        limit: this.HOURLY_LIMIT,
        current: hourlyCount
      };
    }
    
    return { allowed: true };
  }
  
  static incrementCounters(): void {
    const now = new Date();
    const today = now.toDateString();
    const currentHour = now.getHours();
    
    const dailyKey = `daily_${today}`;
    const hourlyKey = `hourly_${today}_${currentHour}`;
    
    this.counters.set(dailyKey, (this.counters.get(dailyKey) || 0) + 1);
    this.counters.set(hourlyKey, (this.counters.get(hourlyKey) || 0) + 1);
    
    // Auto-cleanup old entries
    this.cleanupOldCounters();
  }

  static getStats(): SecurityStats {
    const now = new Date();
    const today = now.toDateString();
    const currentHour = now.getHours();
    
    const dailyKey = `daily_${today}`;
    const hourlyKey = `hourly_${today}_${currentHour}`;
    
    return {
      dailyCount: this.counters.get(dailyKey) || 0,
      hourlyCount: this.counters.get(hourlyKey) || 0,
      dailyLimit: this.DAILY_LIMIT,
      hourlyLimit: this.HOURLY_LIMIT,
    };
  }

  static activateEmergencyShutdown(reason: string): void {
    this.isShutdown = true;
    console.error(`🚨 Emergency shutdown activated: ${reason}`);
  }

  static deactivateEmergencyShutdown(): void {
    this.isShutdown = false;
    console.log('✅ Emergency shutdown deactivated');
  }

  static isInShutdown(): boolean {
    return this.isShutdown;
  }

  private static cleanupOldCounters(): void {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayStr = yesterday.toDateString();
    
    // Remove old daily counters
    for (const [key] of this.counters) {
      if (key.startsWith('daily_') && !key.includes(now.toDateString())) {
        this.counters.delete(key);
      }
      
      // Remove old hourly counters (older than 24 hours)
      if (key.startsWith('hourly_') && key.includes(yesterdayStr)) {
        this.counters.delete(key);
      }
    }
  }

  static clearCounters(): void {
    this.counters.clear();
  }
}