export type RbacAppType = "admin" | "webapp";

export type PermissionAction = "read" | "write" | "delete" | "create" | "*";

export interface PermissionDefinition {
  code: string;
  name: string;
  description?: string;
  group: string;
  appType: RbacAppType | "both";
  actions: PermissionAction[];
}

export interface PermissionGroup {
  name: string;
  permissions: PermissionDefinition[];
}

export interface PermissionsTree {
  appType: RbacAppType;
  groups: PermissionGroup[];
}

export interface RbacRole {
  id: string;
  type: "admin" | "user";
  code: string;
  name: string;
  description?: string;
  permissions: Record<string, PermissionAction[]>;
  weight: number;
  isSystem: boolean;
  isEditable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RolePermissionsUpdate {
  permissions: Record<string, PermissionAction[]>;
}

export interface CreateRoleDto {
  code: string;
  name: string;
  description?: string;
  permissions: Record<string, PermissionAction[]>;
  weight?: number;
}

export interface AssignUserRoleDto {
  roleId: string;
  appType: RbacAppType;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  statusCode?: number;
  success?: boolean;
}
