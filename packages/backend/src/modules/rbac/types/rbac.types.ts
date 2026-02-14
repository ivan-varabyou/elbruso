// Permission codes (enum values as string literals)
export type RbacPermissionCode =
  | "admin:users:read"
  | "admin:users:write"
  | "admin:users:delete"
  | "admin:roles:read"
  | "admin:roles:write"
  | "admin:settings:read"
  | "admin:settings:write"
  | "admin:analytics:read"
  | "admin:audit:read"
  | "user:workspaces:read"
  | "user:workspaces:write"
  | "user:workspaces:delete"
  | "user:tables:read"
  | "user:tables:write"
  | "user:tables:delete"
  | "user:cells:read"
  | "user:cells:write"
  | "user:users:read"
  | "user:users:write"
  | "user:analytics:read"
  | "user:export:read";

import type { DbAppType, DbRoleType } from "../enums/permission.enum";

export interface RbacPermissionDefinition {
  code: string;
  name: string;
  description?: string;
  group: string;
  appType: DbAppType;
  actions: string[];
}

export interface RbacRole {
  id: string;
  type: DbRoleType;

  code: string;
  name: string;
  description: string | null;
  permissions: Record<string, string[]>;
  isSystem: boolean;
  isEditable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RbacUserRole {
  id: string;
  userId: string;
  appType: "admin" | "webapp";
  roleId: string;
  organizationId: number | null;
  grantedBy: string | null;
  grantedAt: Date;
  expiresAt: Date | null;
}

export interface PermissionContext {
  organizationId?: string;
  resourceId?: string;
}

export interface PermissionCheckResult {
  allowed: boolean;
  reason?: string;
}

export interface PermissionGroup {
  name: string;
  permissions: RbacPermissionDefinition[];
}

export interface PermissionsTree {
  appType: DbRoleType;
  groups: PermissionGroup[];
}
