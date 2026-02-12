import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "@backend/modules/auth/guards/jwt-auth.guard";
import { AdminJwtAuthGuard } from "@backend/modules/auth/guards/admin-jwt-auth.guard";
import { OrganizationsService } from "@backend/modules/organizations/services/organizations.service";
import { UsersService } from "@backend/modules/users/services/users.service";
import { DatabaseService } from "@database/database.service";
import { GenerateIndicatorsDto } from "../dto/generate-indicators.dto";
import { IndicatorFiltersDto } from "../dto/indicator-filters.dto";
import {
  CreateIndicatorGroupDto,
  UpdateIndicatorGroupDto,
  GetIndicatorGroupsDto,
} from "../dto/indicator-group.dto";
import { IndicatorsService } from "../services/indicators.service";
import {
  IndicatorResponseDto,
  IndicatorsListResponseDto,
  IndicatorGroupResponseDto,
  GroupsListResponseDto,
} from "../dto/responses";
import { toIndicatorDto, toIndicatorListDto } from "../mappers/indicator.mapper";
import { toIndicatorGroupDto, toIndicatorGroupListDto } from "../mappers/indicator-group.mapper";

@Controller("reference/indicators")
@ApiTags("Indicators")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class IndicatorsController {
  constructor(
    private indicatorsService: IndicatorsService,
    private usersService: UsersService,
    private organizationsService: OrganizationsService,
    private db: DatabaseService,
  ) {}

  @Get()
  @ApiOperation({ summary: "Get all indicators with filters" })
  @ApiResponse({
    status: 200,
    description: "Returns list of indicators",
    type: IndicatorsListResponseDto,
  })
  async findAll(
    @Request() req,
    @Query() filters: IndicatorFiltersDto,
  ): Promise<IndicatorsListResponseDto> {
    const user = await this.usersService.findById(req.user.sub);
    if (user) {
      filters.userId = String(user.id);
      filters.userOrganizationId = user.organization_id ?? undefined;
      filters.userRole = String(user.role ?? "");

      if (filters.userOrganizationId) {
        const ancestors = await this.organizationsService.getAncestors(filters.userOrganizationId);
        filters.ancestorOrgIds = ancestors.map((a) => (a as any).id);

        const federation = await this.db.client
          .selectFrom("federations")
          .select("sport_id")
          .where("organization_id", "=", filters.userOrganizationId)
          .executeTakeFirst();

        if (federation) {
          filters.userSportId = federation.sport_id;
        }
      }
    }

    const indicators = await this.indicatorsService.findAll(filters);
    return {
      data: toIndicatorListDto(indicators as any[]),
      total: indicators.length,
    };
  }

  @Post()
  @ApiOperation({ summary: "Create a manual indicator" })
  @ApiResponse({ status: 201, description: "Indicator created", type: IndicatorResponseDto })
  async create(@Request() req, @Body() data: any): Promise<IndicatorResponseDto> {
    const user = await this.usersService.findById(req.user.sub);
    const result = await this.indicatorsService.create({
      ...data,
      created_by: req.user.sub,
      organization_id: (user as any)?.organization_id,
      is_system: false,
    });
    return toIndicatorDto(result as any);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update indicator" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: any,
  ): Promise<IndicatorResponseDto> {
    const result = await this.indicatorsService.update(id, data);
    return toIndicatorDto(result as any);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete indicator (mark as inactive)" })
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.indicatorsService.delete(id);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get indicator by ID" })
  @ApiResponse({ status: 200, description: "Returns indicator", type: IndicatorResponseDto })
  @ApiResponse({ status: 404, description: "Indicator not found" })
  async findById(@Param("id", ParseIntPipe) id: number): Promise<IndicatorResponseDto> {
    const indicator = await this.indicatorsService.findById(id);
    if (!indicator) {
      throw new NotFoundException(`Indicator with ID ${id} not found`);
    }
    return toIndicatorDto(indicator as any);
  }

  @Get("by-sport/:sportId")
  @ApiOperation({ summary: "Get indicators for a sport" })
  @ApiResponse({
    status: 200,
    description: "Returns list of indicators",
    type: IndicatorsListResponseDto,
  })
  async findBySport(
    @Param("sportId", ParseIntPipe) sportId: number,
  ): Promise<IndicatorsListResponseDto> {
    const indicators = await this.indicatorsService.findBySport(sportId);
    return {
      data: toIndicatorListDto(indicators as any[]),
      total: indicators.length,
    };
  }

  @Get("generation/templates")
  @ApiOperation({ summary: "Get indicator generation templates" })
  async getTemplates() {
    return this.indicatorsService.getTemplates();
  }

  @Post("generation/generate")
  @ApiOperation({ summary: "Generate indicators (flexible)" })
  async generate(@Body() dto: GenerateIndicatorsDto) {
    return this.indicatorsService.generate(dto);
  }

  @Get("groups")
  @ApiOperation({ summary: "Get all indicator groups" })
  @ApiResponse({ status: 200, description: "Returns list of groups", type: GroupsListResponseDto })
  async getGroups(@Query() dto: GetIndicatorGroupsDto): Promise<GroupsListResponseDto> {
    const sportId = dto.sportId ? Number(dto.sportId) : undefined;
    const groups = await this.indicatorsService.getGroups(sportId);
    return {
      data: toIndicatorGroupListDto(groups as any[]),
      total: groups.length,
    };
  }

  @Get("genders")
  @ApiOperation({ summary: "Get all genders" })
  async getGenders() {
    return this.indicatorsService.getGenders();
  }

  @Get("age-groups")
  @ApiOperation({ summary: "Get all age groups" })
  async getAgeGroups() {
    return this.indicatorsService.getAgeGroups();
  }

  @Post("groups")
  @ApiOperation({ summary: "Create indicator group" })
  @ApiResponse({ status: 201, description: "Group created", type: IndicatorGroupResponseDto })
  async createGroup(@Body() data: CreateIndicatorGroupDto): Promise<IndicatorGroupResponseDto> {
    const result = await this.indicatorsService.createGroup(data);
    return toIndicatorGroupDto(result as any);
  }

  @Patch("groups/:id")
  @ApiOperation({ summary: "Update indicator group" })
  async updateGroup(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateIndicatorGroupDto,
  ): Promise<IndicatorGroupResponseDto> {
    const result = await this.indicatorsService.updateGroup(id, data);
    return toIndicatorGroupDto(result as any);
  }

  @Delete("groups/:id")
  @ApiOperation({ summary: "Delete indicator group" })
  async deleteGroup(@Param("id", ParseIntPipe) id: number) {
    return this.indicatorsService.deleteGroup(id);
  }
}
