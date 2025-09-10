// /types/contact.ts
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

export type SubmitStatus = 'idle' | 'success' | 'error' | 'rate_limited' | 'spam' | 'service_unavailable';

export interface ContactApiResponse {
  success?: boolean;
  error?: string;
  messageId?: string;
  resetTime?: number;
  reason?: string;
}

// /types/security.ts
export interface RateLimitResult {
  success: boolean;
  current?: number;
  limit?: number;
  remaining?: number;
  resetTime?: number;
}

export interface SpamCheckResult {
  isSpam: boolean;
  reason?: string;
  details?: string[];
  pattern?: string;
  domain?: string;
  length?: number;
}

export interface EmergencyLimitsResult {
  allowed: boolean;
  reason?: string;
  limit?: number;
  current?: number;
}

export interface SecurityStats {
  dailyCount: number;
  hourlyCount: number;
  dailyLimit: number;
  hourlyLimit: number;
  blockedRequests?: number;
  spamDetected?: number;
}

export interface SecurityLog {
  id: string;
  timestamp: string;
  type: 'success' | 'blocked' | 'spam' | 'rate_limited';
  ip: string;
  email?: string;
  message: string;
  reason?: string;
  userAgent?: string;
}

export interface GeolocationResult {
  blocked: boolean;
  reason?: string;
  country?: string;
  city?: string;
}

export interface SuspiciousActivityResult {
  suspicious: boolean;
  reason?: string;
  count?: number;
  pattern?: string;
}

// /types/monitoring.ts
export interface AlertData {
  ip: string;
  email?: string;
  reason?: string;
  attempts?: number;
  count?: number;
  limit?: number;
  pattern?: string;
  timestamp?: string;
}

export type AlertType = 
  | 'rate_limit_exceeded'
  | 'spam_detected'
  | 'daily_limit_reached'
  | 'suspicious_activity'
  | 'emergency_shutdown';

export interface AdminStats extends SecurityStats {
  totalEmailsToday: number;
  totalEmailsThisHour: number;
  successRate: number;
  topSourceIPs: Array<{
    ip: string;
    count: number;
  }>;
  recentAlerts: SecurityLog[];
}