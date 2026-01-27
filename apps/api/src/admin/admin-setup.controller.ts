import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminSetupService } from './admin-setup.service';
import { AdminSetupDto } from './dto/admin-setup.dto';

@ApiTags('Admin Setup')
@Controller('admin')
export class AdminSetupController {
  constructor(private readonly adminSetupService: AdminSetupService) {}

  @Post('setup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create the first SUPER_ADMIN user' })
  @ApiResponse({
    status: 201,
    description: 'SUPER_ADMIN successfully created',
  })
  @ApiResponse({
    status: 403,
    description: 'Admin users already exist. Setup is not allowed.',
  })
  async setup(@Body() dto: AdminSetupDto) {
    const count = await this.adminSetupService.countAdmins();
    if (count > 0) {
      throw new ForbiddenException(
        'Admin users already exist. Setup cannot be completed.',
      );
    }

    const admin = await this.adminSetupService.createFirstAdmin({
      email: dto.email,
      password: dto.password,
      name: dto.name,
    });

    return {
      message: 'SUPER_ADMIN successfully created',
      admin: {
        id: (admin as any).id,
        email: (admin as any).email,
        name: (admin as any).name,
        role: (admin as any).role,
      },
    };
  }
}
