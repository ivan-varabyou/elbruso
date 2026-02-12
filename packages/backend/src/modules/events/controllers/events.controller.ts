import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { EventFiltersDto } from "../dto";
import { EventsService } from "../services/events.service";
import { EventResponseDto, EventsListResponseDto } from "../dto/responses";

@ApiTags("Events")
@Controller("events")
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: "Get all events with filters" })
  @ApiResponse({ status: 200, description: "List of events", type: EventsListResponseDto })
  async findAll(@Query() filters: EventFiltersDto) {
    const events = await this.eventsService.findAll(filters);
    return {
      events: events.map((e) => this.mapToEventResponse(e)),
      total: events.length,
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get event by ID" })
  @ApiResponse({ status: 200, description: "Event details", type: EventResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 404, description: "Event not found" })
  async findById(@Param("id", ParseIntPipe) id: number) {
    const event = await this.eventsService.findById(id);
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return this.mapToEventResponse(event);
  }

  private mapToEventResponse(event: any): EventResponseDto {
    return {
      id: event.id,
      title: event.title,
      description: event.description || undefined,
      startDate: new Date(event.start_date),
      endDate: new Date(event.end_date),
      location: event.location || undefined,
      isAllDay: event.is_all_day ?? false,
      color: event.color || undefined,
      status: event.status || "confirmed",
      userId: event.user_id || 0,
      createdAt: new Date(event.created_at),
      updatedAt: new Date(event.updated_at),
    };
  }
}
