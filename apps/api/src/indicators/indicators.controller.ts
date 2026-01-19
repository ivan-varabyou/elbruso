import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IndicatorsService } from './indicators.service';
import { IndicatorFiltersDto } from './dto/indicator-filters.dto';

@Controller('indicators')
@ApiTags('Indicators')
export class IndicatorsController {
  constructor(private indicatorsService: IndicatorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all indicators with filters' })
  @ApiResponse({ status: 200, description: 'Returns list of indicators' })
  async findAll(@Query() filters: IndicatorFiltersDto) {
    return this.indicatorsService.findAll(filters);
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
}
