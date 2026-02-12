import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { JwtAuthGuard } from "@backend/modules/auth/guards/jwt-auth.guard";
import { RequestWithUser } from "../../auth/interfaces/auth.interface";
import {
  CreateApiKeyDto,
  UpdateProfileDto,
  AdminUpdateUserDto,
  CreateUserDto,
  UpdateUserDto,
} from "../dto";
import { UsersService } from "../services/users.service";
import { AdminJwtAuthGuard } from "@backend/modules/admin/guards/admin-jwt-auth.guard";
import { PermissionsGuard, Permissions } from "@backend/modules/admin/guards/permissions.guard";
import {
  UserResponseDto,
  UsersListResponseDto,
  UserCreatedResponseDto,
  UserUpdatedResponseDto,
  UserApprovedResponseDto,
  UserBlockedResponseDto,
  UserDeletedResponseDto,
  ApiKeyResponseDto,
} from "../dto/responses";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Get current user profile" })
  @ApiResponse({
    status: 200,
    description: "Current user profile",
    type: UserResponseDto,
  })
  async getProfile(@Request() req: RequestWithUser) {
    const user = await this.usersService.findById(req.user.sub);
    return plainToInstance(UserResponseDto, user);
  }

  @Patch("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Update current user profile" })
  @ApiResponse({
    status: 200,
    description: "Profile updated successfully",
    type: UserResponseDto,
  })
  async updateProfile(@Request() req: RequestWithUser, @Body() dto: UpdateProfileDto) {
    const user = await this.usersService.updateProfile(req.user.sub, dto);
    return plainToInstance(UserResponseDto, user);
  }

  @Get()
  @UseGuards(AdminJwtAuthGuard, PermissionsGuard)
  @Permissions("users:read")
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "List all users" })
  @ApiQuery({ name: "search", required: false })
  @ApiQuery({ name: "organization_id", required: false })
  @ApiQuery({ name: "role", required: false })
  @ApiQuery({ name: "is_active", required: false })
  @ApiQuery({ name: "page", required: false })
  @ApiQuery({ name: "limit", required: false })
  @ApiResponse({
    status: 200,
    description: "List of users",
    type: UsersListResponseDto,
  })
  async findAll(
    @Request() req: RequestWithUser,
    @Query("search") search?: string,
    @Query("organization_id") organization_id?: string,
    @Query("role") role?: string,
    @Query("is_active") is_active?: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const filters: any = {
      search,
      organization_id: organization_id ? parseInt(organization_id, 10) : undefined,
      role,
      is_active: is_active === "true" ? true : is_active === "false" ? false : undefined,
    };
    const users = await this.usersService.findAll(filters);
    const total = users.length;
    const totalPages = Math.ceil(total / limitNum);
    return plainToInstance(UsersListResponseDto, {
      data: users.slice((pageNum - 1) * limitNum, pageNum * limitNum),
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
    });
  }

  @Get(":id")
  @UseGuards(AdminJwtAuthGuard, PermissionsGuard)
  @Permissions("users:read")
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Get user by ID" })
  @ApiResponse({
    status: 200,
    description: "User details",
    type: UserResponseDto,
  })
  async findOne(@Param("id") id: string) {
    const user = await this.usersService.findById(id);
    return plainToInstance(UserResponseDto, user);
  }

  @Post()
  @UseGuards(AdminJwtAuthGuard, PermissionsGuard)
  @Permissions("users:create")
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({
    status: 201,
    description: "User created successfully",
    type: UserCreatedResponseDto,
  })
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return plainToInstance(UserCreatedResponseDto, user);
  }

  @Patch(":id")
  @UseGuards(AdminJwtAuthGuard, PermissionsGuard)
  @Permissions("users:update")
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Update user" })
  @ApiResponse({
    status: 200,
    description: "User updated successfully",
    type: UserUpdatedResponseDto,
  })
  async update(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    const user = await this.usersService.update(id, dto);
    return plainToInstance(UserUpdatedResponseDto, user);
  }

  @Patch(":id/approve")
  @UseGuards(AdminJwtAuthGuard, PermissionsGuard)
  @Permissions("users:approve")
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Approve user" })
  @ApiResponse({
    status: 200,
    description: "User approved successfully",
    type: UserApprovedResponseDto,
  })
  async approve(@Param("id") id: string) {
    const user = await this.usersService.approve(id);
    return plainToInstance(UserApprovedResponseDto, user);
  }

  @Patch(":id/block")
  @UseGuards(AdminJwtAuthGuard, PermissionsGuard)
  @Permissions("users:block")
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Block/unblock user" })
  @ApiResponse({
    status: 200,
    description: "User blocked/unblocked successfully",
    type: UserBlockedResponseDto,
  })
  async block(@Param("id") id: string, @Body() body: { block: boolean }) {
    const user = await this.usersService.block(id, body.block);
    return plainToInstance(UserBlockedResponseDto, user);
  }

  @Delete(":id")
  @UseGuards(AdminJwtAuthGuard, PermissionsGuard)
  @Permissions("users:delete")
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Delete user" })
  @ApiResponse({
    status: 200,
    description: "User deleted successfully",
    type: UserDeletedResponseDto,
  })
  async remove(@Param("id") id: string) {
    const result = await this.usersService.remove(id);
    return plainToInstance(UserDeletedResponseDto, result);
  }

  @Post("api-keys")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Create API key for current user" })
  @ApiResponse({
    status: 201,
    description: "API key created",
    type: ApiKeyResponseDto,
  })
  async createApiKey(@Request() req: RequestWithUser, @Body() dto: CreateApiKeyDto) {
    const result = await this.usersService.createApiKey(req.user.sub, dto.name, dto.permissions);
    return plainToInstance(ApiKeyResponseDto, result);
  }
}
