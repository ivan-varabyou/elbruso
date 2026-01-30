import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IndicatorGroupsService } from '../services/indicator-groups.service';
import { IndicatorGroupFiltersDto } from '../dto/indicator-group-filters.dto';

@Controller('reference/indicator-groups')
@ApiTags('Indicator Groups')
export class IndicatorGroupsController {
  constructor(private indicatorGroupsService: IndicatorGroupsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all indicator groups' })
  @ApiResponse({ status: 200, description: 'Returns list of groups' })
  async findAll(@Query() filters: IndicatorGroupFiltersDto) {
    return this.indicatorGroupsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get indicator group by ID' })
  @ApiResponse({ status: 200, description: 'Returns group' })
  @ApiResponse({ status: 404, description: 'Group not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const group = await this.indicatorGroupsService.findById(id);
    if (!group) {
      throw new NotFoundException(`Indicator group with ID ${id} not found`);
    }
    return group;
  }

  @Get(':id/indicators')
  @ApiOperation({ summary: 'Get indicators for a specific group' })
  @ApiResponse({ status: 200, description: 'Returns list of indicators' })
  async findIndicatorsByGroup(@Param('id', ParseIntPipe) id: number) {
    return this.indicatorGroupsService.findIndicatorsByGroup(id);
  }
}
