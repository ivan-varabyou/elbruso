import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegionsService } from './regions.service';
import { RegionFiltersDto } from './dto/region-filters.dto';

@Controller('reference/regions')
@ApiTags('Regions')
export class RegionsController {
  constructor(private regionsService: RegionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all regions' })
  @ApiResponse({ status: 200, description: 'Returns list of regions' })
  async findAll(@Query() filters: RegionFiltersDto) {
    return this.regionsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get region by ID' })
  @ApiResponse({ status: 200, description: 'Returns region' })
  @ApiResponse({ status: 404, description: 'Region not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const region = await this.regionsService.findById(id);
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
    return region;
  }

  @Get('by-district/:districtId')
  @ApiOperation({ summary: 'Get regions by federal district' })
  @ApiResponse({ status: 200, description: 'Returns list of regions' })
  async findByDistrict(@Param('districtId', ParseIntPipe) districtId: number) {
    return this.regionsService.findByDistrict(districtId);
  }

  @Get('by-country/:countryId')
  @ApiOperation({ summary: 'Get regions by country' })
  @ApiResponse({ status: 200, description: 'Returns list of regions' })
  async findByCountry(@Param('countryId', ParseIntPipe) countryId: number) {
    return this.regionsService.findByCountry(countryId);
  }
}
