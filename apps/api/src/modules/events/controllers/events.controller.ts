import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EventsService } from '../services/events.service';
import { EventFiltersDto } from '../dto';

@Controller('events')
@ApiTags('Events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all events with filters' })
  @ApiResponse({ status: 200, description: 'Returns list of events' })
  async findAll(@Query() filters: EventFiltersDto) {
    return this.eventsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiResponse({ status: 200, description: 'Returns event' })
  @ApiResponse({ status: 404, description: 'Event not found' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    const event = await this.eventsService.findById(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return event;
  }
}
