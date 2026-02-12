import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

import { Roles } from "../decorators/roles.decorator";
import {
  AdminUserResponseDto,
  DeleteAdminUserResponseDto,
} from "../dto/responses/admin-user.response.dto";
import { AdminUsersListResponseDto } from "../dto/responses/admin-users-list.response.dto";
import { AdminRole } from "../enums/admin-role.enum";
import { AdminJwtAuthGuard } from "../guards/admin-jwt-auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { AdminUsersService } from "./admin-users.service";
import { CreateAdminUserDto } from "./dto/create-admin-user.dto";
import { UpdateAdminUserDto } from "./dto/update-admin-user.dto";

@ApiTags("Admin Users")
@Controller("admin/users")
@UseGuards(AdminJwtAuthGuard, RolesGuard)
@Roles(AdminRole.SUPER_ADMIN)
@ApiBearerAuth("JWT-auth")
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: "List all admin users with pagination" })
  @ApiResponse({ status: 200, type: AdminUsersListResponseDto })
  async findAll(@Query("page") page?: number, @Query("limit") limit?: number) {
    const result = await this.adminUsersService.findAll({ page, limit });
    return plainToInstance(AdminUsersListResponseDto, {
      data: result.data,
      meta: result.meta,
    });
  }

  @Post()
  @ApiOperation({ summary: "Create new admin user" })
  @ApiResponse({ status: 201, type: AdminUserResponseDto })
  @ApiResponse({
    status: 409,
    description: "User with this email already exists",
  })
  async create(@Body() dto: CreateAdminUserDto) {
    const entity = await this.adminUsersService.create(dto);
    return plainToInstance(AdminUserResponseDto, entity);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get admin user by ID" })
  @ApiResponse({ status: 200, type: AdminUserResponseDto })
  @ApiResponse({ status: 404, description: "Admin user not found" })
  async findOne(@Param("id") id: string) {
    const entity = await this.adminUsersService.findOne(id);
    return plainToInstance(AdminUserResponseDto, entity);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update admin user" })
  @ApiResponse({ status: 200, type: AdminUserResponseDto })
  @ApiResponse({ status: 404, description: "Admin user not found" })
  async update(@Param("id") id: string, @Body() dto: UpdateAdminUserDto) {
    const entity = await this.adminUsersService.update(id, dto);
    return plainToInstance(AdminUserResponseDto, entity);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete admin user" })
  @ApiResponse({ status: 200, type: DeleteAdminUserResponseDto })
  @ApiResponse({
    status: 400,
    description: "Cannot delete the last SUPER_ADMIN or yourself",
  })
  @ApiResponse({ status: 404, description: "Admin user not found" })
  async remove(@Param("id") id: string, @Request() req: any) {
    await this.adminUsersService.remove(id, req.user.sub);
    return plainToInstance(DeleteAdminUserResponseDto, {
      message: "Admin user deleted successfully",
    });
  }
}
