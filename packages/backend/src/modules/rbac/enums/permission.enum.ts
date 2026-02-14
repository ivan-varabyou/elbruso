export const PERMISSIONS_KEY = "permissions";

export enum RbacAppType {
  ADMIN = "admin",
  WEBAPP = "webapp",
}

// Database representation of app_type (includes "both" for shared permissions)
export type DbAppType = "admin" | "webapp" | "both";

// Database representation of role type (only admin or webapp, no "both")
export type DbRoleType = "admin" | "webapp";

// Helper functions for type-safe conversions
export function rbacAppTypeToDb(appType: RbacAppType): DbRoleType {
  return appType === RbacAppType.ADMIN ? "admin" : "webapp";
}

export function dbRoleTypeToRbacAppType(dbType: DbRoleType): RbacAppType {
  return dbType === "admin" ? RbacAppType.ADMIN : RbacAppType.WEBAPP;
}

// Type guards for database values
export function isDbAppType(value: string): value is DbAppType {
  return value === "admin" || value === "webapp" || value === "both";
}

export function isDbRoleType(value: string): value is DbRoleType {
  return value === "admin" || value === "webapp";
}

export function assertDbAppType(value: string): DbAppType {
  if (!isDbAppType(value)) {
    throw new Error(`Invalid DbAppType: ${value}`);
  }
  return value;
}

export function assertDbRoleType(value: string): DbRoleType {
  if (!isDbRoleType(value)) {
    throw new Error(`Invalid DbRoleType: ${value}`);
  }
  return value;
}

export enum RbacPermission {
  // Admin permissions (Resources/Entities)
  ADMIN_USERS = "admin:users",
  ADMIN_ROLES = "admin:roles",
  ADMIN_ORGANIZATIONS = "admin:organizations",
  ADMIN_TEMPLATES = "admin:workspace-templates",
  ADMIN_SETTINGS = "admin:settings",
  ADMIN_REFERENCE = "admin:reference",

  // User (WebApp) permissions (Resources/Entities)
  USER_WORKSPACES = "user:workspaces",
  USER_PAGES = "user:pages",
  USER_BLOCKS = "user:blocks",
  USER_TABLES = "user:tables",
  USER_CELLS = "user:cells",
  USER_USERS = "user:users",
  USER_ANALYTICS = "user:analytics",
  USER_EXPORT = "user:export",
  USER_ORGANIZATIONS = "user:organizations",
  USER_INDICATORS = "user:indicators",
  USER_SPORTS = "user:sports",
  USER_COUNTRIES = "user:countries",
  USER_REGIONS = "user:regions",
  USER_EVENTS = "user:events",
  USER_SEASONS = "user:seasons",
}

export enum RbacRoleCode {
  // Admin roles
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",

  // User roles
  OWNER = "OWNER",
  USER_ADMIN = "USER_ADMIN",
  MANAGER = "MANAGER",
  VIEWER = "VIEWER",
}
