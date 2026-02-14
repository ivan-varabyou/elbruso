import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth,ApiOperation, ApiTags } from "@nestjs/swagger";

import { AdminJwtAuthGuard } from "../../admin/guards/admin-jwt-auth.guard";
import { Permissions } from "../decorators/permissions.decorator";
import { RbacResource } from "../decorators/resource.decorator";
import { RbacAppType, RbacPermission } from "../enums/permission.enum";
import { RbacGuard } from "../guards/rbac.guard";
import { RbacService } from "../services/rbac.service";

interface RequestWithUser {
  user?: {
    id?: string;
    sub?: string;
    role?: string;
    appType?: string;
  };
}

@ApiTags("RBAC")
@Controller("rbac")
@UseGuards(AdminJwtAuthGuard, RbacGuard)
@ApiBearerAuth("JWT-auth")
@RbacResource({
  code: RbacPermission.ADMIN_ROLES,
  name: "Роли и права",
  group: "roles",
  appType: "admin",
})
export class RbacController {
  constructor(private readonly rbacService: RbacService) {}

  @Get("permissions/tree")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:read`)
  @ApiOperation({ summary: "Get permissions tree for admin or user" })
  async getPermissionsTree(@Query("appType") appType?: string) {
    const rbacAppType = appType === "admin" ? RbacAppType.ADMIN : RbacAppType.WEBAPP;
    return this.rbacService.getPermissionsTree(rbacAppType);
  }

  @Get("admin/roles")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:read`)
  @ApiOperation({ summary: "Get all admin roles" })
  async getAdminRoles() {
    return this.rbacService.getAllRoles(RbacAppType.ADMIN);
  }

  @Get("admin/roles/:id")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:read`)
  @ApiOperation({ summary: "Get admin role by ID" })
  async getAdminRole(@Param("id", ParseUUIDPipe) id: string) {
    const role = await this.rbacService.getRoleById(id);
    if (!role) {
      return { error: "Role not found", statusCode: 404 };
    }
    return role;
  }

  @Post("admin/roles")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:write`)
  @ApiOperation({ summary: "Create new admin role" })
  async createAdminRole(
    @Body()
    body: {
      code: string;
      name: string;
      description?: string;
      permissions: Record<string, string[]>;
      weight?: number;
    },
    @Req() req: RequestWithUser,
  ) {
    const actingUserId = req.user?.id || req.user?.sub;
    return this.rbacService.createRole(
      RbacAppType.ADMIN,
      body.code,
      body.name,
      body.description || null,
      body.permissions,
      0, // weight
      actingUserId,
    );
  }

  @Put("admin/roles/:id")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:write`)
  @ApiOperation({ summary: "Update admin role" })
  async updateAdminRole(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: { name?: string; description?: string; weight?: number },
    @Req() req: RequestWithUser,
  ) {
    const actingUserId = req.user?.id || req.user?.sub;
    return this.rbacService.updateRole(id, body, actingUserId);
  }

  @Put("admin/roles/:id/permissions")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:write`)
  @ApiOperation({ summary: "Update admin role permissions" })
  async updateAdminRolePermissions(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() permissions: Record<string, string[]>,
    @Req() req: RequestWithUser,
  ) {
    const actingUserId = req.user?.id || req.user?.sub;
    return this.rbacService.updateRolePermissions(id, permissions, actingUserId);
  }

  @Delete("admin/roles/:id")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:write`)
  @ApiOperation({ summary: "Delete admin role" })
  async deleteAdminRole(@Param("id", ParseUUIDPipe) id: string, @Req() req: RequestWithUser) {
    const actingUserId = req.user?.id || req.user?.sub;
    await this.rbacService.deleteRole(id, actingUserId);
    return { success: true };
  }

  @Get("user/roles")
  @Permissions("user:roles:read")
  @ApiOperation({ summary: "Get all user roles" })
  async getUserRoles() {
    return this.rbacService.getAllRoles(RbacAppType.WEBAPP);
  }

  @Get("user/roles/:id")
  @Permissions("user:roles:read")
  @ApiOperation({ summary: "Get user role by ID" })
  async getUserRole(@Param("id", ParseUUIDPipe) id: string) {
    const role = await this.rbacService.getRoleById(id);
    if (!role) {
      return { error: "Role not found", statusCode: 404 };
    }
    return role;
  }

  @Post("user/roles")
  @Permissions("user:roles:write")
  @ApiOperation({ summary: "Create new user role" })
  async createUserRole(
    @Body()
    body: {
      code: string;
      name: string;
      description?: string;
      permissions: Record<string, string[]>;
      weight?: number;
      actingUserId?: string;
    },
  ) {
    const role = await this.rbacService.createRole(
      RbacAppType.WEBAPP,
      body.code,
      body.name,
      body.description || null,
      body.permissions,
      body.weight || 0,
      undefined, // actingUserId (optional for webapp roles here)
    );
    return role;
  }

  @Put("user/roles/:id")
  @Permissions("user:roles:write")
  @ApiOperation({ summary: "Update user role" })
  async updateUserRole(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: { name?: string; description?: string },
  ) {
    return this.rbacService.updateRole(id, body);
  }

  @Put("user/roles/:id/permissions")
  @Permissions("user:roles:write")
  @ApiOperation({ summary: "Update user role permissions" })
  async updateUserRolePermissions(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() permissions: Record<string, string[]>,
  ) {
    return this.rbacService.updateRolePermissions(id, permissions);
  }

  @Delete("user/roles/:id")
  @Permissions("user:roles:write")
  @ApiOperation({ summary: "Delete user role" })
  async deleteUserRole(@Param("id", ParseUUIDPipe) id: string) {
    await this.rbacService.deleteRole(id);
    return { success: true };
  }

  @Get("user/:userId/role")
  @Permissions(`${RbacPermission.ADMIN_USERS}:read`)
  @ApiOperation({ summary: "Get user role assignment" })
  async getUserRoleAssignment(
    @Param("userId", ParseUUIDPipe) userId: string,
    @Query("appType") appType: "admin" | "webapp" = "webapp",
  ) {
    return this.rbacService.getUserRole(
      userId,
      appType === "admin" ? RbacAppType.ADMIN : RbacAppType.WEBAPP,
    );
  }

  @Put("user/:userId/role")
  @Permissions(`${RbacPermission.ADMIN_USERS}:write`)
  @ApiOperation({ summary: "Assign role to user" })
  async assignUserRole(
    @Param("userId", ParseUUIDPipe) userId: string,
    @Body() body: { roleId: string; appType: "admin" | "webapp" },
  ) {
    await this.rbacService.assignUserRole(
      userId,
      body.appType === "admin" ? RbacAppType.ADMIN : RbacAppType.WEBAPP,
      body.roleId,
    );
    return { success: true };
  }
}
