import type { SecurityLog, AlertType, AlertData } from '@/types/security';

export class SecurityLogger {
  private static logs: SecurityLog[] = [];
  private static readonly MAX_LOGS = 1000;
  
  static async log(logData: SecurityLog): Promise<void> {
    // Add timestamp if not provided
    if (!logData.timestamp) {
      logData.timestamp = new Date().toISOString();
    }
    
    // Add unique ID if not provided
    if (!logData.id) {
      logData.id = this.generateLogId();
    }
    
    this.logs.unshift(logData);
    
    // Keep only recent logs
    if (this.logs.length > this.MAX_LOGS) {
      this.logs = this.logs.slice(0, this.MAX_LOGS);
    }
    
    // Log to console for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${logData.type.toUpperCase()}]`, logData);
    }
    
    // In production, you might want to send to external logging service
    if (process.env.NODE_ENV === 'production') {
      try {
        await this.sendToExternalLogger(logData);
      } catch (error) {
        console.error('Failed to send log to external service:', error);
      }
    }
  }
  
  static getRecentLogs(limit: number = 50): SecurityLog[] {
    return this.logs.slice(0, limit);
  }
  
  static getLogsByType(type: SecurityLog['type'], limit: number = 20): SecurityLog[] {
    return this.logs
      .filter(log => log.type === type)
      .slice(0, limit);
  }
  
  static getLogsByIP(ip: string, limit: number = 20): SecurityLog[] {
    return this.logs
      .filter(log => log.ip === ip)
      .slice(0, limit);
  }
  
  static getLogsByTimeRange(startTime: Date, endTime: Date): SecurityLog[] {
    return this.logs.filter(log => {
      const logTime = new Date(log.timestamp);
      return logTime >= startTime && logTime <= endTime;
    });
  }
  
  static getLogsByUser(userId: string, limit: number = 20): SecurityLog[] {
    return this.logs
      .filter(log => log.userId === userId)
      .slice(0, limit);
  }
  
  static getStats(): {
    total: number;
    byType: Record<SecurityLog['type'], number>;
    topIPs: Array<{ ip: string; count: number }>;
    recentActivity: number; // logs in last hour
  } {
    const byType: Record<SecurityLog['type'], number> = {
      success: 0,
      blocked: 0,
      spam: 0,
      rate_limited: 0
    };
    
    const ipCounts = new Map<string, number>();
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    let recentActivity = 0;
    
    this.logs.forEach(log => {
      byType[log.type]++;
      
      const currentCount = ipCounts.get(log.ip) || 0;
      ipCounts.set(log.ip, currentCount + 1);
      
      if (new Date(log.timestamp) >= oneHourAgo) {
        recentActivity++;
      }
    });
    
    const topIPs = Array.from(ipCounts.entries())
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    return {
      total: this.logs.length,
      byType,
      topIPs,
      recentActivity
    };
  }
  
  static clearLogs(): void {
    this.logs = [];
  }
  
  static exportLogs(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = ['id', 'timestamp', 'type', 'ip', 'userId', 'action', 'resource'];
      const csvRows = [
        headers.join(','),
        ...this.logs.map(log => [
          log.id,
          log.timestamp,
          log.type,
          log.ip,
          log.userId || '',
          log.action || '',
          log.resource || ''
        ].map(field => `"${field}"`).join(','))
      ];
      return csvRows.join('\n');
    }
    
    return JSON.stringify(this.logs, null, 2);
  }
  
  private static generateLogId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private static async sendToExternalLogger(logData: SecurityLog): Promise<void> {
    // Example implementations for different logging services
    
    // Option 1: Send to a custom logging API
    if (process.env.LOGGING_API_URL) {
      const response = await fetch(process.env.LOGGING_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LOGGING_API_KEY}`,
        },
        body: JSON.stringify(logData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
    
    // Option 2: Send to Sentry (if you're using it for error tracking)
    if (process.env.SENTRY_DSN && typeof window !== 'undefined' && window.Sentry) {
      window.Sentry.addBreadcrumb({
        message: `Security event: ${logData.type}`,
        category: 'security',
        level: logData.type === 'blocked' || logData.type === 'spam' ? 'warning' : 'info',
        data: logData,
      });
    }
    
    // Option 3: Send to CloudWatch Logs (AWS)
    if (process.env.AWS_REGION && process.env.AWS_LOG_GROUP_NAME) {
      // This would require AWS SDK implementation
      // await this.sendToCloudWatchLogs(logData);
    }
    
    // Option 4: Send to a webhook
    if (process.env.SECURITY_WEBHOOK_URL) {
      await fetch(process.env.SECURITY_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `Security Event: ${logData.type} from ${logData.ip}`,
          attachments: [{
            color: this.getLogColor(logData.type),
            fields: [
              { title: 'Type', value: logData.type, short: true },
              { title: 'IP', value: logData.ip, short: true },
              { title: 'Action', value: logData.action || 'N/A', short: true },
              { title: 'Resource', value: logData.resource || 'N/A', short: true },
            ]
          }]
        }),
      });
    }
  }
  
  private static getLogColor(type: SecurityLog['type']): string {
    switch (type) {
      case 'success':
        return 'good';
      case 'blocked':
        return 'danger';
      case 'spam':
        return 'warning';
      case 'rate_limited':
        return 'warning';
      default:
        return '#808080';
    }
  }
  
  // Alert system integration
  static async checkAndTriggerAlerts(logData: SecurityLog): Promise<void> {
    const recentLogs = this.getLogsByTimeRange(
      new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
      new Date()
    );
    
    // Check for multiple failed attempts from same IP
    const recentBlockedFromSameIP = recentLogs.filter(
      log => log.ip === logData.ip && (log.type === 'blocked' || log.type === 'spam')
    );
    
    if (recentBlockedFromSameIP.length >= 5) {
      await this.triggerAlert('HIGH_RISK_IP', {
        ip: logData.ip,
        attemptCount: recentBlockedFromSameIP.length,
        timeWindow: '5 minutes'
      });
    }
    
    // Check for rate limiting patterns
    const rateLimitedCount = recentLogs.filter(log => log.type === 'rate_limited').length;
    if (rateLimitedCount >= 10) {
      await this.triggerAlert('HIGH_RATE_LIMIT_ACTIVITY', {
        count: rateLimitedCount,
        timeWindow: '5 minutes'
      });
    }
  }
  
  private static async triggerAlert(alertType: AlertType, data: AlertData): Promise<void> {
    // Implement your alert system here
    console.warn(`SECURITY ALERT [${alertType}]:`, data);
    
    // Could integrate with:
    // - Email notifications
    // - Slack/Discord webhooks
    // - SMS alerts
    // - Dashboard notifications
  }
}