import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { Roles } from "../decorators/roles.decorator";
import { AdminJwtAuthGuard } from "../guards/admin-jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { AdminRolesService } from "./admin-roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { AdminRole } from "../enums/admin-role.enum";
import { RoleResponseDto, DeleteRoleResponseDto } from "../dto/responses/role.response.dto";
import { RolesListResponseDto } from "../dto/responses/roles-list.response.dto";

@ApiTags("Admin Roles")
@Controller("admin/roles")
@UseGuards(AdminJwtAuthGuard, RolesGuard)
@ApiBearerAuth("JWT-auth")
export class AdminRolesController {
  constructor(private readonly rolesService: AdminRolesService) {}

  @Get()
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiOperation({ summary: "List all roles" })
  @ApiResponse({ status: 200, type: RolesListResponseDto })
  async findAll() {
    const entities = await this.rolesService.findAll();
    return plainToInstance(RolesListResponseDto, { data: entities });
  }

  @Post()
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Create new role" })
  @ApiResponse({ status: 201, type: RoleResponseDto })
  async create(@Body() dto: CreateRoleDto) {
    const entity = await this.rolesService.create(dto);
    return plainToInstance(RoleResponseDto, entity);
  }

  @Get(":id")
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Get role by ID" })
  @ApiResponse({ status: 200, type: RoleResponseDto })
  async findOne(@Param("id") id: string) {
    const entity = await this.rolesService.findOne(id);
    return plainToInstance(RoleResponseDto, entity);
  }

  @Patch(":id")
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Update role" })
  @ApiResponse({ status: 200, type: RoleResponseDto })
  async update(@Param("id") id: string, @Body() dto: UpdateRoleDto) {
    const entity = await this.rolesService.update(id, dto);
    return plainToInstance(RoleResponseDto, entity);
  }

  @Delete(":id")
  @Roles(AdminRole.SUPER_ADMIN)
  @ApiOperation({ summary: "Delete role (system roles cannot be deleted)" })
  @ApiResponse({ status: 200, type: DeleteRoleResponseDto })
  async remove(@Param("id") id: string) {
    const result = await this.rolesService.remove(id);
    return plainToInstance(DeleteRoleResponseDto, { success: result.success, id: result.id });
  }
}
