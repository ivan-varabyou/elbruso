/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';

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
  PAGE_CREATE = 'PAGE_CREATE',
  PAGE_UPDATE = 'PAGE_UPDATE',
  PAGE_DELETE = 'PAGE_DELETE',
  PAGE_MOVE = 'PAGE_MOVE',
  BLOCK_CREATE = 'BLOCK_CREATE',
  BLOCK_UPDATE = 'BLOCK_UPDATE',
  BLOCK_DELETE = 'BLOCK_DELETE',
  BLOCK_MOVE = 'BLOCK_MOVE',
  TABLE_CREATE = 'TABLE_CREATE',
  TABLE_UPDATE = 'TABLE_UPDATE',
  TABLE_DELETE = 'TABLE_DELETE',
  VERSION_CREATE = 'VERSION_CREATE',
  VERSION_ACTIVATE = 'VERSION_ACTIVATE',
  CELLS_UPDATE = 'CELLS_UPDATE',
  FORMULA_CALCULATE = 'FORMULA_CALCULATE',
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
      console.error('Failed to save audit log:', error);
    }
  }
}
