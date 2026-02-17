import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PermissionsGuard } from "../../admin/guards/permissions.guard";
import { AnyJwtAuthGuard } from "../../auth/guards/any-jwt-auth.guard";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import { CreateEventDto, EventFiltersDto, UpdateEventDto } from "../dto";
import { EventResponseDto, EventsListResponseDto } from "../dto/responses";
import { EventsService } from "../services/events.service";

@ApiTags("Events")
@Controller(["admin/events", "events"])
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@RbacResource({
  code: RbacPermission.USER_EVENTS,
  name: "События",
  group: "reference",
  appType: "webapp",
})
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @Permissions(`${RbacPermission.USER_EVENTS}:read`)
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
  @Permissions(`${RbacPermission.USER_EVENTS}:read`)
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

  @Post()
  @Permissions(`${RbacPermission.USER_EVENTS}:write`)
  @ApiOperation({ summary: "Create a new event" })
  @ApiResponse({ status: 201, description: "Event created", type: EventResponseDto })
  async create(@Body() dto: CreateEventDto) {
    const event = await this.eventsService.create(dto);
    return this.mapToEventResponse(event);
  }

  @Patch(":id")
  @Permissions(`${RbacPermission.USER_EVENTS}:write`)
  @ApiOperation({ summary: "Update an existing event" })
  @ApiResponse({ status: 200, description: "Event updated", type: EventResponseDto })
  async update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateEventDto) {
    const event = await this.eventsService.update(id, dto);
    return this.mapToEventResponse(event);
  }

  @Delete(":id")
  @Permissions(`${RbacPermission.USER_EVENTS}:write`)
  @ApiOperation({ summary: "Delete an event" })
  @ApiResponse({ status: 204, description: "Event deleted" })
  async delete(@Param("id", ParseIntPipe) id: number) {
    await this.eventsService.delete(id);
  }

  private mapToEventResponse(event: any): EventResponseDto {
    return {
      id: event.id,
      parent_event_id: event.parent_event_id,
      code: event.code,
      name_ru: event.name_ru,
      short_name_ru: event.short_name_ru,
      event_type_id: event.event_type_id,
      level_id: event.level_id,
      stage_id: event.stage_id,
      sport_id: event.sport_id,
      discipline_id: event.discipline_id,
      gender_id: event.gender_id,
      age_group_id: event.age_group_id,
      organizer_id: event.organizer_id,
      description: event.description,
      metadata: event.metadata,
      is_active: event.is_active,
      createdAt: new Date(event.created_at),
      updatedAt: new Date(event.updated_at),
    };
  }
}
