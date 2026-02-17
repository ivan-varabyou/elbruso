import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from "express";

import { PermissionsGuard } from '../../admin/guards/permissions.guard';
import { AdminJwtPayload } from "../../admin/strategies/admin-jwt.strategy";
import { AnyJwtAuthGuard } from '../../auth/guards/any-jwt-auth.guard';
import { Permissions } from '../../rbac/decorators/permissions.decorator';
import { RbacResource } from '../../rbac/decorators/resource.decorator';
import { RbacPermission } from '../../rbac/enums/permission.enum';
import { RbacService } from "../../rbac/services/rbac.service";
import { ReferenceDataService } from '../services/reference-data.service';

@Controller(["admin/reference/data", "reference/data"])
@ApiTags("Reference Data")
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@ApiBearerAuth("JWT-auth")
@RbacResource({
  code: RbacPermission.USER_EVENTS,
  name: "Справочные данные",
  group: "reference",
  appType: "webapp",
})
export class ReferenceDataController {
  constructor(
    private readonly service: ReferenceDataService,
    private readonly rbacService: RbacService,
  ) {}

  private async checkTablePermission(
    req: Request & { user: AdminJwtPayload },
    table: string,
    action: "read" | "write",
  ) {
    const config = await this.service.resolveTable(table);

    if (config.permissionCode) {
      const user = req.user;
      if (!user) throw new ForbiddenException("User not authenticated");

      const permission = `${config.permissionCode}:${action}`;
      const result = await this.rbacService.canAccessOne(user.sub, permission, user.role, "admin");

      if (!result.allowed) {
        throw new ForbiddenException(result.reason || "Table access denied");
      }
    }
  }

  @Get("tables")
  @Permissions(`${RbacPermission.USER_EVENTS}:read`)
  @ApiOperation({ summary: "Get all available reference tables" })
  async getAvailableTables() {
    return this.service.getAvailableTables();
  }

  @Get(":table")
  @Permissions(`${RbacPermission.USER_EVENTS}:read`)
  @ApiOperation({ summary: "List all records from a reference table" })
  @ApiParam({ name: "table", description: "Table key (e.g. genders, age_groups, event_types)" })
  @ApiQuery({ name: "search", required: false, description: "Search query" })
  async findAll(
    @Param("table") table: string,
    @Req() req: Request,
    @Query("search") search?: string,
  ) {
    await this.checkTablePermission(req, table, "read");
    return this.service.findAll(table, search);
  }

  @Get(":table/:id")
  @Permissions(`${RbacPermission.USER_EVENTS}:read`)
  @ApiOperation({ summary: "Get a single record by ID" })
  @ApiParam({ name: "table", description: "Table key" })
  async findById(
    @Param("table") table: string,
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    await this.checkTablePermission(req, table, "read");
    return this.service.findById(table, id);
  }

  @Post(":table")
  @Permissions(`${RbacPermission.USER_EVENTS}:write`)
  @ApiOperation({ summary: "Create a new record in a reference table" })
  @ApiParam({ name: "table", description: "Table key" })
  async create(
    @Param("table") table: string,
    @Body() data: Record<string, unknown>,
    @Req() req: Request,
  ) {
    await this.checkTablePermission(req, table, "write");
    return this.service.create(table, data);
  }

  @Patch(":table/:id")
  @Permissions(`${RbacPermission.USER_EVENTS}:write`)
  @ApiOperation({ summary: "Update a record by ID" })
  @ApiParam({ name: "table", description: "Table key" })
  async update(
    @Param("table") table: string,
    @Param("id", ParseIntPipe) id: number,
    @Body() data: Record<string, unknown>,
    @Req() req: Request,
  ) {
    await this.checkTablePermission(req, table, "write");
    return this.service.update(table, id, data);
  }

  @Delete(":table/:id")
  @Permissions(`${RbacPermission.USER_EVENTS}:write`)
  @ApiOperation({ summary: "Delete (or deactivate) a record by ID" })
  @ApiParam({ name: "table", description: "Table key" })
  @ApiResponse({ status: 200, description: "Record deleted/deactivated" })
  async delete(
    @Param("table") table: string,
    @Param("id", ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    await this.checkTablePermission(req, table, "write");
    await this.service.delete(table, id);
    return { success: true };
  }
}
