import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { OrganizationFiltersDto } from './dto/organization-filters.dto';

@Controller('organizations')
@ApiTags('Organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'Returns list of organizations' })
  async findAll(@Query() filters: OrganizationFiltersDto) {
    return this.organizationsService.findAll(filters);
  }

  @Get('federations')
  @ApiOperation({ summary: 'Get federations' })
  @ApiResponse({ status: 200, description: 'Returns list of federations' })
  async findFederations(@Query() filters: OrganizationFiltersDto) {
    return this.organizationsService.findFederations(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({ status: 200, description: 'Returns organization' })
  @ApiResponse({ status: 404, description: 'Organization not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const organization = await this.organizationsService.findById(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }
}
