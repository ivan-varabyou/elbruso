import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IndicatorsService } from './indicators.service';
import { IndicatorFiltersDto } from './dto/indicator-filters.dto';
import { GenerateIndicatorsDto } from './dto/generate-indicators.dto';
import { CreateIndicatorGroupDto, UpdateIndicatorGroupDto, GetIndicatorGroupsDto } from './dto/indicator-group.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { DatabaseService } from '../database/database.service';
import { OrganizationsService } from '../organizations/organizations.service';


@Controller('reference/indicators')
@ApiTags('Indicators')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class IndicatorsController {
  constructor(
    private indicatorsService: IndicatorsService,
    private usersService: UsersService,
    private organizationsService: OrganizationsService,
    private db: DatabaseService,
  ) { }

  @Get()
  @ApiOperation({ summary: 'Get all indicators with filters' })
  @ApiResponse({ status: 200, description: 'Returns list of indicators' })
  async findAll(@Request() req, @Query() filters: IndicatorFiltersDto) {
    const user = await this.usersService.findById(req.user.sub);
    if (user) {
      filters.userId = user.id;
      filters.userOrganizationId = (user as any).organization_id;
      filters.userRole = (user as any).role;
      
      if (filters.userOrganizationId) {
        const ancestors = await this.organizationsService.getAncestors(filters.userOrganizationId);
        filters.ancestorOrgIds = ancestors.map(a => (a as any).id);

        const federation = await this.db.client
          .selectFrom('federations')
          .select('sport_id')
          .where('organization_id', '=', filters.userOrganizationId)
          .executeTakeFirst();
        
        if (federation) {
          filters.userSportId = federation.sport_id;
        }
      }
    }

    return this.indicatorsService.findAll(filters);
  }

  @Post()
  @ApiOperation({ summary: 'Create a manual indicator' })
  @ApiResponse({ status: 201, description: 'Indicator created' })
  async create(@Request() req, @Body() data: any) {
    const user = await this.usersService.findById(req.user.sub);
    return this.indicatorsService.create({
      ...data,
      created_by: req.user.sub,
      organization_id: (user as any)?.organization_id,
      is_system: false,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update indicator' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.indicatorsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete indicator (mark as inactive)' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.indicatorsService.delete(id);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get indicator by ID' })
  @ApiResponse({ status: 200, description: 'Returns indicator' })
  @ApiResponse({ status: 404, description: 'Indicator not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const indicator = await this.indicatorsService.findById(id);
    if (!indicator) {
      throw new NotFoundException(`Indicator with ID ${id} not found`);
    }
    return indicator;
  }

  @Get('by-sport/:sportId')
  @ApiOperation({ summary: 'Get indicators for a sport' })
  @ApiResponse({ status: 200, description: 'Returns list of indicators' })
  async findBySport(@Param('sportId', ParseIntPipe) sportId: number) {
    return this.indicatorsService.findBySport(sportId);
  }

  @Get('generation/templates')
  @ApiOperation({ summary: 'Get indicator generation templates' })
  async getTemplates() {
    return this.indicatorsService.getTemplates();
  }

  @Post('generation/generate')
  @ApiOperation({ summary: 'Generate indicators (flexible)' })
  async generate(@Body() dto: GenerateIndicatorsDto) {
    return this.indicatorsService.generate(dto);
  }

  @Get('groups')
  @ApiOperation({ summary: 'Get all indicator groups' })
  async getGroups(@Query() dto: GetIndicatorGroupsDto) {
    const sportId = dto.sportId ? Number(dto.sportId) : undefined;
    return this.indicatorsService.getGroups(sportId);
  }

  @Get('genders')
  @ApiOperation({ summary: 'Get all genders' })
  async getGenders() {
    return this.indicatorsService.getGenders();
  }

  @Get('age-groups')
  @ApiOperation({ summary: 'Get all age groups' })
  async getAgeGroups() {
    return this.indicatorsService.getAgeGroups();
  }

  @Post('groups')
  @ApiOperation({ summary: 'Create indicator group' })
  async createGroup(@Body() data: CreateIndicatorGroupDto) {
    return this.indicatorsService.createGroup(data);
  }

  @Patch('groups/:id')
  @ApiOperation({ summary: 'Update indicator group' })
  async updateGroup(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateIndicatorGroupDto) {
    return this.indicatorsService.updateGroup(id, data);
  }

  @Delete('groups/:id')
  @ApiOperation({ summary: 'Delete indicator group' })
  async deleteGroup(@Param('id', ParseIntPipe) id: number) {
    return this.indicatorsService.deleteGroup(id);
  }
}

