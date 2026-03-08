import { DatabaseService } from "@database/database.service";
import { ForbiddenException,Injectable, NotFoundException } from "@nestjs/common";
import { sql } from "kysely";

import { assertDbAppType, assertDbRoleType,RbacAppType, rbacAppTypeToDb, RbacRoleCode } from "../enums/permission.enum";
import {
  PermissionCheckResult,
  PermissionContext,
  PermissionsTree,
  RbacPermissionDefinition,
  RbacRole,
} from "../types/rbac.types";

@Injectable()
export class RbacService {
  constructor(private readonly db: DatabaseService) {}

  // ============================================
  // Permission Checks
  // ============================================

  async canAccess(
    userId: string,
    requiredPermissions: string[],
    roleCode?: string,
    appType?: string,
    context?: PermissionContext,
  ): Promise<PermissionCheckResult> {
    // If roleCode is provided (e.g., from JWT), use it directly
    if (roleCode) {
      // 1. Check if admin role (SUPER_ADMIN bypass for admin app)
      if (this.isAdminRole(roleCode)) {
        return { allowed: true };
      }

      // 2. Check permissions
      const effectiveAppType = appType || "webapp";
      const rolePermissions = await this.getRolePermissionsByCode(roleCode, effectiveAppType);
      const hasPermission = requiredPermissions.every((p) =>
        this.hasPermission(rolePermissions, p),
      );

      if (!hasPermission) {
        return { allowed: false, reason: "Insufficient permissions" };
      }

      return { allowed: true };
    }

    // Fallback: get role from database (legacy behavior)
    const user = await this.getUserWithRole(userId);

    if (!user) {
      return { allowed: false, reason: "User not found" };
    }

    // 2. Check if admin role (SUPER_ADMIN bypass for admin app)
    if (this.isAdminRole(user.roleCode)) {
      return { allowed: true };
    }

    // 3. Check org.is_blocked for webapp users
    if (user.organizationId && user.appType === "webapp") {
      const org = await this.getOrganization(user.organizationId);
      if (org?.isBlocked) {
        return { allowed: false, reason: "Organization is blocked" };
      }
    }

    // 4. Check permissions
    const rolePermissions = await this.getRolePermissionsByCode(user.roleCode, user.appType);
    const hasPermission = requiredPermissions.every((p) => this.hasPermission(rolePermissions, p));

    if (!hasPermission) {
      return { allowed: false, reason: "Insufficient permissions" };
    }

    // 5. Check organizational hierarchy context
    if (
      user.organizationId &&
      context?.organizationId &&
      String(user.organizationId) !== String(context.organizationId)
    ) {
      const isDescendant = await this.isDescendantOrganization(
        Number(user.organizationId),
        Number(context.organizationId),
      );
      if (!isDescendant) {
        return { allowed: false, reason: "Access denied to this organization scope" };
      }
    }

    return { allowed: true };
  }

  async canAccessOne(
    userId: string,
    permission: string,
    roleCode?: string,
    appType?: string,
    context?: PermissionContext,
  ): Promise<PermissionCheckResult> {
    return this.canAccess(userId, [permission], roleCode, appType, context);
  }

  // ============================================
  // Role Management
  // ============================================

  async getRoleById(id: string): Promise<RbacRole | null> {
    const role = await this.db.client
      .selectFrom("rbac_roles")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    if (!role) {
      return null;
    }

    return this.formatRole(role);
  }

  async getRoleByTypeAndCode(type: RbacAppType, code: string): Promise<RbacRole | null> {
    const dbType = type === RbacAppType.ADMIN ? "admin" : "user";

    const role = await this.db.client
      .selectFrom("rbac_roles")
      .selectAll()
      .where("type", "=", dbType)
      .where("code", "=", code)
      .executeTakeFirst();

    if (!role) {
      return null;
    }

    return this.formatRole(role);
  }

  async getAllRoles(type?: RbacAppType): Promise<RbacRole[]> {
    let query = this.db.client.selectFrom("rbac_roles").selectAll();

    if (type) {
      const dbType = type === RbacAppType.ADMIN ? "admin" : "user";
      query = query.where("type", "=", dbType);
    }

    const roles = await query.orderBy("type", "asc").orderBy("name", "asc").execute();

    return roles.map((r) => this.formatRole(r));
  }

  async createRole(
    type: RbacAppType,
    code: string,
    name: string,
    description: string | null,
    permissions: Record<string, string[]>,
    weight?: number,
    actingUserId?: string,
    accessLevelId?: number | null,
  ): Promise<RbacRole> {
    const dbType = type === RbacAppType.ADMIN ? "admin" : "user";

    const role = await this.db.client
      .insertInto("rbac_roles")
      .values({
        type: dbType,
        code,
        name,
        description,
        permissions: sql`${JSON.stringify(permissions)}::jsonb`,
        weight: weight ?? 0,
        access_level_id: accessLevelId || null,
        is_system: false,
        is_editable: true,
      })
      .returningAll()
      .executeTakeFirst();

    return this.formatRole(role!);
  }

  async updateRole(
    id: string,
    data: { name?: string; description?: string; weight?: number; accessLevelId?: number | null },
    actingUserId?: string,
  ): Promise<RbacRole> {
    const role = await this.getRoleById(id);

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    if (actingUserId) {
      await this.validatePriority(actingUserId, role);
    }

    if (!role.isEditable) {
      throw new ForbiddenException("Cannot modify system role");
    }

    const updateData: Record<string, unknown> = {
      updated_at: new Date(),
    };

    if (data.name !== undefined) {
      updateData.name = data.name;
    }
    if (data.description !== undefined) {
      updateData.description = data.description;
    }
    if (data.weight !== undefined) {
      updateData.weight = data.weight;
    }
    if (data.accessLevelId !== undefined) {
      updateData.access_level_id = data.accessLevelId;
    }

    const updated = await this.db.client
      .updateTable("rbac_roles")
      .set({
        ...updateData,
        updated_at: new Date(),
      })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();

    return this.formatRole(updated!);
  }

  async updateRolePermissions(
    id: string,
    permissions: Record<string, string[]>,
    actingUserId?: string,
  ): Promise<RbacRole> {
    const role = await this.getRoleById(id);

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    if (actingUserId) {
      await this.validatePriority(actingUserId, role);
    }

    // Note: isEditable check removed - RBAC guard ensures only authorized users can call this
    // Users with ADMIN_ROLES:write permission can modify any role including system roles

    const updated = await this.db.client
      .updateTable("rbac_roles")
      .set({
        permissions: sql`${JSON.stringify(permissions)}::jsonb`,
        updated_at: new Date(),
      })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();

    return this.formatRole(updated!);
  }

  async deleteRole(id: string, actingUserId?: string): Promise<void> {
    const role = await this.getRoleById(id);

    if (!role) {
      throw new NotFoundException("Role not found");
    }

    if (actingUserId) {
      await this.validatePriority(actingUserId, role);
    }

    if (role.isSystem) {
      throw new ForbiddenException("Cannot delete system role");
    }

    await this.db.client.deleteFrom("rbac_roles").where("id", "=", id).execute();
  }

  // ============================================
  // User Roles
  // ============================================

  async getUserRole(userId: string, appType: RbacAppType): Promise<RbacRole | null> {
    const dbAppType = appType === RbacAppType.ADMIN ? "admin" : "webapp";

    const userRole = await this.db.client
      .selectFrom("rbac_user_roles")
      .selectAll()
      .where("user_id", "=", userId)
      .where("app_type", "=", dbAppType)
      .executeTakeFirst();

    if (!userRole) {
      return null;
    }

    return this.getRoleById(userRole.role_id);
  }

  async assignUserRole(userId: string, appType: RbacAppType, roleId: string): Promise<void> {
    const dbAppType = appType === RbacAppType.ADMIN ? "admin" : "webapp";

    await this.db.client
      .insertInto("rbac_user_roles")
      .values({
        user_id: userId,
        app_type: dbAppType,
        role_id: roleId,
        granted_at: new Date(),
      })
      .onConflict((oc) =>
        oc
          .column("user_id")
          .column("app_type")
          .doUpdateSet({ role_id: roleId, granted_at: new Date() }),
      )
      .execute();
  }

  // ============================================
  // Permissions Tree
  // ============================================

  async getPermissionsTree(appType: RbacAppType): Promise<PermissionsTree> {
    const dbAppType = rbacAppTypeToDb(appType);

    // Admin users should see ALL permissions (admin, webapp, and both)
    // so they can configure roles for all user types
    // Regular webapp users only see webapp and both permissions
    const permissions = await this.db.client
      .selectFrom("rbac_permissions")
      .selectAll()
      .where((eb) =>
        dbAppType === "admin"
          ? eb("app_type", "in", ["admin", "webapp", "both"])
          : eb.or([eb("app_type", "=", "webapp"), eb("app_type", "=", "both")]),
      )
      .orderBy("group_name", "asc")
      .orderBy("name", "asc")
      .execute();

    const groupsMap = new Map<string, RbacPermissionDefinition[]>();

    for (const perm of permissions) {
      const group = groupsMap.get(perm.group_name) || [];
      group.push({
        code: perm.code,
        name: perm.name,
        description: perm.description || "",
        group: perm.group_name,
        appType: assertDbAppType(perm.app_type),
        actions: perm.actions || [],
      });
      groupsMap.set(perm.group_name, group);
    }

    return {
      appType: dbAppType,
      groups: Array.from(groupsMap.entries()).map(([name, permissions]) => ({
        name,
        permissions,
      })),
    };
  }

  // ============================================
  // Priority Validation
  // ============================================

  /**
   * Validates that the acting user has enough priority to modify the target role.
   * Super Admins can modify everything.
   * Other users can only modify roles with lower weight than their own.
   */
  async validatePriority(actingUserId: string, targetRole: RbacRole): Promise<void> {
    // 1. Get acting user's role
    const actingUserWithRole = await this.getUserWithRole(actingUserId);
    if (!actingUserWithRole) {
      throw new ForbiddenException("Acting user role not found");
    }

    // 2. Super Admin bypass
    if (this.isAdminRole(actingUserWithRole.roleCode)) {
      return;
    }

    // 3. Get acting user's role weight
    const actingRole = await this.getRoleById(actingUserWithRole.roleId);
    if (!actingRole) {
      throw new ForbiddenException("Acting role details not found");
    }

    // 4. Compare weights
    // Acting user weight MUST be GREATER than target role weight
    if (actingRole.weight <= targetRole.weight) {
      throw new ForbiddenException(
        `Insufficient priority: your role weight (${actingRole.weight}) must be higher than target role weight (${targetRole.weight})`,
      );
    }
  }

  // ============================================
  // Private Helpers
  // ============================================

  private async getUserWithRole(userId: string): Promise<{
    id: string;
    roleCode: string;
    roleId: string;
    organizationId: number | null;
    accessLevelId: number | null;
    appType: string;
  } | null> {
    // 1. Try new rbac_user_roles table first
    const adminRbacRole = await this.db.client
      .selectFrom("rbac_user_roles")
      .selectAll()
      .where("user_id", "=", userId)
      .where("app_type", "=", "admin")
      .executeTakeFirst();

    if (adminRbacRole) {
      const role = await this.getRoleById(adminRbacRole.role_id);
      return {
        id: userId,
        roleCode: role?.code || "",
        roleId: adminRbacRole.role_id,
        organizationId: null,
        accessLevelId: role?.accessLevelId || null,
        appType: "admin",
      };
    }

    // 2. Fallback to existing admin_users table (legacy)
    const adminUser = await this.db.client
      .selectFrom("admin_users")
      .select(["id", "role", "role_id"])
      .where("id", "=", userId)
      .executeTakeFirst();

    if (adminUser) {
      // Map legacy role string to RBAC code
      const roleCode = String(adminUser.role).toLowerCase();
      // Try to find the corresponding role in the new system to get its ID
      const rbacRole = await this.getRoleByTypeAndCode(RbacAppType.ADMIN, roleCode);

      return {
        id: userId,
        roleCode: roleCode,
        roleId: rbacRole?.id || adminUser.role_id || "",
        organizationId: null,
        accessLevelId: rbacRole?.accessLevelId || null,
        appType: "admin",
      };
    }

    // 3. Try webapp user role
    const webappRole = await this.db.client
      .selectFrom("rbac_user_roles")
      .selectAll()
      .where("user_id", "=", userId)
      .where("app_type", "=", "webapp")
      .executeTakeFirst();

    if (webappRole) {
      const role = await this.getRoleById(webappRole.role_id);
      return {
        id: userId,
        roleCode: role?.code || "",
        roleId: webappRole.role_id,
        organizationId: webappRole.organization_id || null,
        accessLevelId: role?.accessLevelId || null,
        appType: "webapp",
      };
    }

    return null;
  }

  private async getRolePermissionsByCode(
    code: string,
    appType: string,
  ): Promise<Record<string, string[]>> {
    const dbType = appType === "admin" ? "admin" : "user";
    const normalizedCode = code.toLowerCase();

    const role = await this.db.client
      .selectFrom("rbac_roles")
      .select(["permissions"])
      .where("type", "=", dbType)
      .where("code", "=", normalizedCode)
      .executeTakeFirst();

    if (!role) {
      return {};
    }

    try {
      const perms = role.permissions;
      if (typeof perms === "string") {
        return JSON.parse(perms);
      }
      if (typeof perms === "object" && perms !== null) {
        return perms as Record<string, string[]>;
      }
      return {};
    } catch {
      return {};
    }
  }

  private isAdminRole(roleCode: string): boolean {
    return roleCode.toUpperCase() === RbacRoleCode.SUPER_ADMIN;
  }

  private hasPermission(rolePermissions: Record<string, string[]>, required: string): boolean {
    // 1. Full wildcard check
    if (rolePermissions["*"]?.includes("*")) {
      return true;
    }

    // 2. Parse required permission (e.g., "admin:users:read" or "users:read")
    // Use last part as action, everything before as resource
    const parts = required.split(":");
    if (parts.length < 2) {
      return false;
    }

    const action = parts.pop()!;
    const resource = parts.join(":");

    // 3. Check for exact resource match
    const resourcePerms = rolePermissions[resource];
    if (resourcePerms) {
      if (resourcePerms.includes("*") || resourcePerms.includes(action)) {
        return true;
      }
    }

    // 4. Check for resource wildcard (e.g., "admin:users:*")
    if (rolePermissions[`${resource}:*`]?.includes("*")) {
      return true;
    }

    return false;
  }

  private async isDescendantOrganization(parentId: number, childId: number): Promise<boolean> {
    const result = await sql<{ id: number }>`
      WITH RECURSIVE org_hierarchy AS (
        SELECT id FROM organizations WHERE id = ${parentId}
        UNION ALL
        SELECT o.id FROM organizations o
        JOIN org_hierarchy oh ON o.parent_id = oh.id
      )
      SELECT id FROM org_hierarchy WHERE id = ${childId}
    `.execute(this.db.client);

    return result.rows.length > 0;
  }

  private async getOrganization(
    organizationId: number,
  ): Promise<{ isBlocked: boolean; parentId: number | null } | null> {
    const org = await this.db.client
      .selectFrom("organizations")
      .select(["parent_id", "is_active"])
      .where("id", "=", organizationId)
      .executeTakeFirst();

    if (!org) return null;

    return {
      isBlocked: !org.is_active,
      parentId: org.parent_id,
    };
  }

  private formatRole(role: {
    id: string;
    type: string;
    code: string;
    name: string;
    description: string | null;
    permissions: unknown;
    weight: number;
    access_level_id: number | null;
    is_system: boolean | number | null;
    is_editable: boolean | number | null;
    created_at: Date | null;
    updated_at: Date | null;
  }): RbacRole {
    let permissions: Record<string, string[]> = {};
    try {
      const perms = role.permissions;
      if (typeof perms === "string") {
        permissions = JSON.parse(perms);
      } else if (typeof perms === "object" && perms !== null) {
        permissions = perms as Record<string, string[]>;
      }
    } catch {
      permissions = {};
    }

    return {
      id: role.id,
      type: assertDbRoleType(role.type),
      code: role.code,
      name: role.name,
      description: role.description,
      permissions,
      weight: role.weight || 0,
      accessLevelId: role.access_level_id,
      isSystem: Boolean(role.is_system),
      isEditable: Boolean(role.is_editable),
      createdAt: role.created_at || new Date(),
      updatedAt: role.updated_at || new Date(),
    };
  }
}
