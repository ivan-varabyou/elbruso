import { AuditAction } from '../services/audit.service';

export interface AuditEvent {
  userId?: string;
  action: AuditAction | string;
  entityType: string;
  entityId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export const AUDIT_EVENT = 'audit.event';
