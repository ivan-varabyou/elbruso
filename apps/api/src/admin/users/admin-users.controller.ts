import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Admin Users')
@Controller('admin/users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all admin users with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of admin users',
  })
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.adminUsersService.findAll({ page, limit });
  }

  @Post()
  @ApiOperation({ summary: 'Create new admin user' })
  @ApiResponse({ status: 201, description: 'Admin user created successfully' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async create(@Body() dto: CreateAdminUserDto) {
    return this.adminUsersService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get admin user by ID' })
  @ApiResponse({ status: 200, description: 'Returns admin user' })
  @ApiResponse({ status: 404, description: 'Admin user not found' })
  async findOne(@Param('id') id: string) {
    return this.adminUsersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update admin user' })
  @ApiResponse({ status: 200, description: 'Admin user updated successfully' })
  @ApiResponse({ status: 404, description: 'Admin user not found' })
  async update(@Param('id') id: string, @Body() dto: UpdateAdminUserDto) {
    return this.adminUsersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete admin user' })
  @ApiResponse({ status: 200, description: 'Admin user deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Cannot delete the last SUPER_ADMIN',
  })
  @ApiResponse({ status: 404, description: 'Admin user not found' })
  async remove(@Param('id') id: string) {
    return this.adminUsersService.remove(id);
  }
}
