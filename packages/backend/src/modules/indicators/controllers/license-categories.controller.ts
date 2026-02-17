import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AnyJwtAuthGuard } from '@backend/modules/auth/guards/any-jwt-auth.guard';
import { PermissionsGuard } from '@backend/modules/admin/guards/permissions.guard';
import { Permissions } from '@backend/modules/rbac/decorators/permissions.decorator';
import { RbacResource } from '@backend/modules/rbac/decorators/resource.decorator';
import { RbacPermission } from '@backend/modules/rbac/enums/permission.enum';
import { LicenseCategoriesService } from '../services/license-categories.service';
import { CreateLicenseCategoryDto, UpdateLicenseCategoryDto } from '../dto/license-category.dto';

@ApiTags('License Categories')
@Controller('reference/license-categories')
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@ApiBearerAuth('JWT-auth')
@RbacResource({
  code: RbacPermission.USER_INDICATORS,
  name: 'Категории лицензий',
  group: 'reference',
  appType: 'webapp',
})
export class LicenseCategoriesController {
  constructor(private readonly service: LicenseCategoriesService) {}

  @Get()
  @Permissions(`${RbacPermission.USER_INDICATORS}:read`)
  @ApiOperation({ summary: 'Get all license categories' })
  async findAll(@Query('sportId') sportId?: number, @Query('type') type?: string) {
    return this.service.findAll({ sportId: sportId ? Number(sportId) : undefined, type });
  }

  @Get(':id')
  @Permissions(`${RbacPermission.USER_INDICATORS}:read`)
  @ApiOperation({ summary: 'Get category by ID' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const item = await this.service.findById(id);
    if (!item) throw new NotFoundException('Category not found');
    return item;
  }

  @Post()
  @Permissions(`${RbacPermission.USER_INDICATORS}:write`)
  @ApiOperation({ summary: 'Create new category' })
  async create(@Body() dto: CreateLicenseCategoryDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @Permissions(`${RbacPermission.USER_INDICATORS}:write`)
  @ApiOperation({ summary: 'Update category' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLicenseCategoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Permissions(`${RbacPermission.USER_INDICATORS}:write`)
  @ApiOperation({ summary: 'Delete category' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
