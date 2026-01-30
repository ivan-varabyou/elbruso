import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateApiKeyDto } from '../dto';
import { UpdateProfileDto, AdminUpdateUserDto } from '../dto/user-settings.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.sub);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.sub, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'List all users (Admin only)' })
  async findAll(@Request() req) {
    const user = await this.usersService.findById(req.user.sub);
    if (user.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
    return this.usersService.findAll();
  }

  @Patch(':id/admin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update user by admin' })
  async updateUserAdmin(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: AdminUpdateUserDto,
  ) {
    const currentUser = await this.usersService.findById(req.user.sub);
    if (currentUser.role !== 'ADMIN') {
      throw new ForbiddenException('Admin access required');
    }
    return this.usersService.updateUserAdmin(id, dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user by ID' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Post('api-keys')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create API key for current user' })
  @ApiResponse({ status: 201, description: 'API key created' })
  async createApiKey(@Request() req, @Body() dto: CreateApiKeyDto) {
    return this.usersService.createApiKey(
      req.user.sub,
      dto.name,
      dto.permissions,
    );
  }
}
