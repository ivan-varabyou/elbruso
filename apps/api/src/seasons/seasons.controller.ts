import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeasonsService } from './seasons.service';

@Controller('seasons')
@ApiTags('Seasons')
export class SeasonsController {
  constructor(private seasonsService: SeasonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all seasons' })
  @ApiResponse({ status: 200, description: 'Returns list of seasons' })
  async findAll() {
    return this.seasonsService.findAll();
  }

  @Get('current')
  @ApiOperation({ summary: 'Get current season' })
  @ApiResponse({ status: 200, description: 'Returns current season' })
  @ApiResponse({ status: 404, description: 'No current season found' })
  async findCurrent() {
    const season = await this.seasonsService.findCurrent();
    if (!season) {
      throw new NotFoundException('No current season found');
    }
    return season;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get season by ID' })
  @ApiResponse({ status: 200, description: 'Returns season' })
  @ApiResponse({ status: 404, description: 'Season not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const season = await this.seasonsService.findById(id);
    if (!season) {
      throw new NotFoundException(`Season with ID ${id} not found`);
    }
    return season;
  }
}
