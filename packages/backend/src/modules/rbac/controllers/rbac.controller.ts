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
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth,ApiOperation, ApiTags } from "@nestjs/swagger";

import { AdminJwtAuthGuard } from "../../admin/guards/admin-jwt-auth.guard";
import { Permissions } from "../decorators/permissions.decorator";
import { RbacResource } from "../decorators/resource.decorator";
import { RbacAppType, RbacPermission } from "../enums/permission.enum";
import { RbacGuard } from "../guards/rbac.guard";
import { RbacService } from "../services/rbac.service";

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
    const tree = await this.rbacService.getPermissionsTree(rbacAppType);
    return { data: tree };
  }

  @Get("admin/roles")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:read`)
  @ApiOperation({ summary: "Get all admin roles" })
  async getAdminRoles() {
    const roles = await this.rbacService.getAllRoles(RbacAppType.ADMIN);
    return { data: roles };
  }

  @Get("admin/roles/:id")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:read`)
  @ApiOperation({ summary: "Get admin role by ID" })
  async getAdminRole(@Param("id", ParseUUIDPipe) id: string) {
    const role = await this.rbacService.getRoleById(id);
    if (!role) {
      return { error: "Role not found", statusCode: 404 };
    }
    return { data: role };
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
    },
  ) {
    const role = await this.rbacService.createRole(
      RbacAppType.ADMIN,
      body.code,
      body.name,
      body.description || null,
      body.permissions,
    );
    return { data: role };
  }

  @Put("admin/roles/:id")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:write`)
  @ApiOperation({ summary: "Update admin role" })
  async updateAdminRole(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: { name?: string; description?: string },
  ) {
    const role = await this.rbacService.updateRole(id, body);
    return { data: role };
  }

  @Put("admin/roles/:id/permissions")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:write`)
  @ApiOperation({ summary: "Update admin role permissions" })
  async updateAdminRolePermissions(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() permissions: Record<string, string[]>,
  ) {
    const role = await this.rbacService.updateRolePermissions(id, permissions);
    return { data: role };
  }

  @Delete("admin/roles/:id")
  @Permissions(`${RbacPermission.ADMIN_ROLES}:write`)
  @ApiOperation({ summary: "Delete admin role" })
  async deleteAdminRole(@Param("id", ParseUUIDPipe) id: string) {
    await this.rbacService.deleteRole(id);
    return { success: true };
  }

  @Get("user/roles")
  @Permissions("user:roles:read")
  @ApiOperation({ summary: "Get all user roles" })
  async getUserRoles() {
    const roles = await this.rbacService.getAllRoles(RbacAppType.WEBAPP);
    return { data: roles };
  }

  @Get("user/roles/:id")
  @Permissions("user:roles:read")
  @ApiOperation({ summary: "Get user role by ID" })
  async getUserRole(@Param("id", ParseUUIDPipe) id: string) {
    const role = await this.rbacService.getRoleById(id);
    if (!role) {
      return { error: "Role not found", statusCode: 404 };
    }
    return { data: role };
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
    },
  ) {
    const role = await this.rbacService.createRole(
      RbacAppType.WEBAPP,
      body.code,
      body.name,
      body.description || null,
      body.permissions,
    );
    return { data: role };
  }

  @Put("user/roles/:id")
  @Permissions("user:roles:write")
  @ApiOperation({ summary: "Update user role" })
  async updateUserRole(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: { name?: string; description?: string },
  ) {
    const role = await this.rbacService.updateRole(id, body);
    return { data: role };
  }

  @Put("user/roles/:id/permissions")
  @Permissions("user:roles:write")
  @ApiOperation({ summary: "Update user role permissions" })
  async updateUserRolePermissions(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() permissions: Record<string, string[]>,
  ) {
    const role = await this.rbacService.updateRolePermissions(id, permissions);
    return { data: role };
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
    const role = await this.rbacService.getUserRole(
      userId,
      appType === "admin" ? RbacAppType.ADMIN : RbacAppType.WEBAPP,
    );
    return { data: role };
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
