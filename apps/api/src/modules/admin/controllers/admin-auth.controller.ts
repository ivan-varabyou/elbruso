import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminAuthService } from '../services/admin-auth.service';
import { AdminLoginDto } from '../dto/admin-login.dto';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';
import { AdminJwtPayload } from '../strategies/admin-jwt.strategy';

@ApiTags('Admin Authentication')
@Controller('admin/auth')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: AdminLoginDto) {
    return this.adminAuthService.login(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin logout' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out',
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async logout(@Body() body: { refreshToken: string }) {
    await this.adminAuthService.logout(body.refreshToken);
    return { message: 'Successfully logged out' };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh admin access token' })
  @ApiResponse({
    status: 200,
    description: 'Token successfully refreshed',
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(@Body() body: { refreshToken: string }) {
    return this.adminAuthService.refresh(body.refreshToken);
  }

  @UseGuards(AdminJwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Get current admin user profile' })
  @ApiResponse({
    status: 200,
    description: 'Current admin user profile',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@Req() req: { user: AdminJwtPayload }) {
    return this.adminAuthService.getMe(req.user.sub);
  }
}
