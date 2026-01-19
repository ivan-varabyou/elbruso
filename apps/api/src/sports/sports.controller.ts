import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SportsService } from './sports.service';

@Controller('sports')
@ApiTags('Sports')
export class SportsController {
  constructor(private sportsService: SportsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all sports' })
  @ApiResponse({ status: 200, description: 'Returns list of sports' })
  async findAll() {
    return this.sportsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get sport by ID' })
  @ApiResponse({ status: 200, description: 'Returns sport' })
  @ApiResponse({ status: 404, description: 'Sport not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const sport = await this.sportsService.findById(id);
    if (!sport) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }
    return sport;
  }

  @Get(':id/disciplines')
  @ApiOperation({ summary: 'Get disciplines for a sport' })
  @ApiResponse({ status: 200, description: 'Returns list of disciplines' })
  async findDisciplines(@Param('id', ParseIntPipe) id: number) {
    return this.sportsService.findDisciplines(id);
  }
}
