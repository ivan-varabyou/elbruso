import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { PermissionsGuard } from "../../admin/guards/permissions.guard";
import { AnyJwtAuthGuard } from "../../auth/guards/any-jwt-auth.guard";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import {
  CreateReferenceTableDto,
  ReferenceManagementService,
} from "../services/reference-management.service";

@Controller("admin/reference/management")
@ApiTags("Reference Management")
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@ApiBearerAuth("JWT-auth")
@RbacResource({
  code: RbacPermission.USER_EVENTS,
  name: "Управление справочниками",
  group: "reference",
  appType: "webapp",
})
export class ReferenceManagementController {
  constructor(private readonly service: ReferenceManagementService) {}

  @Get()
  @Permissions(`${RbacPermission.USER_EVENTS}:read`)
  @ApiOperation({ summary: "Get all dynamic reference tables" })
  async getMetadata() {
    return this.service.getMetadata();
  }

  @Get(":key")
  @Permissions(`${RbacPermission.USER_EVENTS}:read`)
  @ApiOperation({ summary: "Get table metadata" })
  async getTableMetadata(@Param("key") key: string) {
    return this.service.getTableMetadata(key);
  }

  @Post()
  @Permissions(`${RbacPermission.USER_EVENTS}:write`)
  @ApiOperation({ summary: "Create a new dynamic reference table" })
  async createTable(@Body() dto: CreateReferenceTableDto) {
    return this.service.createTable(dto);
  }

  @Patch(":key")
  @Permissions(`${RbacPermission.USER_EVENTS}:write`)
  @ApiOperation({ summary: "Update table schema/metadata" })
  async updateTable(@Param("key") key: string, @Body() dto: Partial<CreateReferenceTableDto>) {
    return this.service.updateTable(key, dto);
  }

  @Delete(":key")
  @Permissions(`${RbacPermission.USER_EVENTS}:write`)
  @ApiOperation({ summary: "Delete a dynamic reference table" })
  async deleteTable(@Param("key") key: string) {
    return this.service.deleteTable(key);
  }
}
