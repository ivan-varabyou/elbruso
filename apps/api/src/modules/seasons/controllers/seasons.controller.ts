import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SeasonsService } from '../services/seasons.service';
import { GenerateSeasonsDto } from '../dto';

@Controller('reference/seasons')
@ApiTags('Seasons')
export class SeasonsController {
  constructor(private seasonsService: SeasonsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all seasons' })
  @ApiResponse({ status: 200, description: 'Returns list of seasons' })
  async findAll() {
    return this.seasonsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new season' })
  @ApiResponse({ status: 201, description: 'Season created' })
  async create(@Body() data: any) {
    return this.seasonsService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing season' })
  @ApiResponse({ status: 200, description: 'Season updated' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.seasonsService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a season' })
  @ApiResponse({ status: 200, description: 'Season deleted' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.seasonsService.delete(id);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Autogenerate seasons based on logic' })
  @ApiResponse({ status: 200, description: 'Seasons generated' })
  async generate(@Body() data: GenerateSeasonsDto) {
    return this.seasonsService.generate(
      data.startYear,
      data.endYear,
      data.sportId,
    );
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
