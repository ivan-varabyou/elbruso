import { Controller, Get, Param, Query, ParseIntPipe, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { IndicatorGroupFiltersDto } from "../dto/indicator-group-filters.dto";
import { IndicatorGroupsService } from "../services/indicator-groups.service";
import {
  IndicatorGroupResponseDto,
  GroupsListResponseDto,
  IndicatorsListResponseDto,
} from "../dto/responses";
import { toIndicatorGroupDto, toIndicatorGroupListDto } from "../mappers/indicator-group.mapper";
import { toIndicatorListDto } from "../mappers/indicator.mapper";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { AdminJwtAuthGuard } from "../../admin/guards/admin-jwt-auth.guard";
import { PermissionsGuard } from "../../admin/guards/permissions.guard";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("reference/indicator-groups")
@ApiTags("Indicator Groups")
@UseGuards(AdminJwtAuthGuard, PermissionsGuard)
@ApiBearerAuth("JWT-auth")
@RbacResource({
  code: RbacPermission.USER_INDICATORS,
  name: "Группы показателей",
  group: "indicators",
  appType: "webapp",
})
export class IndicatorGroupsController {
  constructor(private indicatorGroupsService: IndicatorGroupsService) {}

  @Get()
  @Permissions(`${RbacPermission.USER_INDICATORS}:read`)
  @ApiOperation({ summary: "Get all indicator groups" })
  @ApiResponse({ status: 200, description: "Returns list of groups", type: GroupsListResponseDto })
  async findAll(@Query() filters: IndicatorGroupFiltersDto): Promise<GroupsListResponseDto> {
    const groups = await this.indicatorGroupsService.findAll(filters);
    return {
      data: toIndicatorGroupListDto(groups as any[]),
      total: groups.length,
    };
  }

  @Get(":id")
  @Permissions(`${RbacPermission.USER_INDICATORS}:read`)
  @ApiOperation({ summary: "Get indicator group by ID" })
  @ApiResponse({ status: 200, description: "Returns group", type: IndicatorGroupResponseDto })
  @ApiResponse({ status: 404, description: "Group not found" })
  async findById(@Param("id", ParseIntPipe) id: number): Promise<IndicatorGroupResponseDto> {
    const group = await this.indicatorGroupsService.findById(id);
    if (!group) {
      throw new NotFoundException(`Indicator group with ID ${id} not found`);
    }
    return toIndicatorGroupDto(group as any);
  }

  @Get(":id/indicators")
  @Permissions(`${RbacPermission.USER_INDICATORS}:read`)
  @ApiOperation({ summary: "Get indicators for a specific group" })
  @ApiResponse({
    status: 200,
    description: "Returns list of indicators",
    type: IndicatorsListResponseDto,
  })
  async findIndicatorsByGroup(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<IndicatorsListResponseDto> {
    const indicators = await this.indicatorGroupsService.findIndicatorsByGroup(id);
    return {
      data: toIndicatorListDto(indicators as any[]),
      total: indicators.length,
    };
  }
}
