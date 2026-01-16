import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

export enum AuditAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  REGISTER = 'REGISTER',
  TOKEN_REFRESH = 'TOKEN_REFRESH',
  WORKSPACE_CREATE = 'WORKSPACE_CREATE',
  WORKSPACE_UPDATE = 'WORKSPACE_UPDATE',
  WORKSPACE_DELETE = 'WORKSPACE_DELETE',
  MEMBER_ADD = 'MEMBER_ADD',
  MEMBER_REMOVE = 'MEMBER_REMOVE',
  MEMBER_ROLE_UPDATE = 'MEMBER_ROLE_UPDATE',
}

@Injectable()
export class AuditService {
  constructor(private readonly db: DatabaseService) {}

  async log(params: {
    userId?: string;
    action: AuditAction | string;
    entityType: string;
    entityId?: string;
    details?: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    try {
      await this.db.client
        .insertInto('audit_logs')
        .values({
          user_id: params.userId || null,
          action: params.action,
          entity_type: params.entityType,
          entity_id: params.entityId || null,
          details: params.details ? JSON.stringify(params.details) : null,
          ip_address: params.ipAddress || null,
          user_agent: params.userAgent || null,
        })
        .execute();
    } catch (error) {
      // We don't want audit logging failure to crash the main request
      console.error('Failed to save audit log:', error);
    }
  }
}
