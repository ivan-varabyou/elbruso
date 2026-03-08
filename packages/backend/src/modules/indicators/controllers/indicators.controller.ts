import { PermissionsGuard } from "@backend/modules/admin/guards/permissions.guard";
import { AnyJwtAuthGuard } from "@backend/modules/auth/guards/any-jwt-auth.guard";
import { JwtPayload } from "@backend/modules/auth/interfaces";
import { OrganizationsService } from "@backend/modules/organizations/services/organizations.service";
import { Permissions } from "@backend/modules/rbac/decorators/permissions.decorator";
import { RbacResource } from "@backend/modules/rbac/decorators/resource.decorator";
import { RbacPermission } from "@backend/modules/rbac/enums/permission.enum";
import { UsersService } from "@backend/modules/users/services/users.service";
import { DatabaseService } from "@database/database.service";
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
  Request,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { GenerateIndicatorsDto } from "../dto/generate-indicators.dto";
import { IndicatorFiltersDto } from "../dto/indicator-filters.dto";
import { CreateIndicatorGroupDto, GetIndicatorGroupsDto } from "../dto/indicator-group.dto";
import {
  CreateIndicatorTemplateDto,
  UpdateIndicatorTemplateDto,
} from "../dto/indicator-template.dto";
import {
  GroupsListResponseDto,
  IndicatorGroupResponseDto,
  IndicatorResponseDto,
  IndicatorsListResponseDto,
} from "../dto/responses";
import { toIndicatorDto, toIndicatorListDto } from "../mappers/indicator.mapper";
import { toIndicatorGroupDto, toIndicatorGroupListDto } from "../mappers/indicator-group.mapper";
import { IndicatorsService } from "../services/indicators.service";

interface AuthenticatedRequest extends Express.Request {
  user: JwtPayload;
}

@Controller("reference/indicators")
@ApiTags("Indicators")
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@ApiBearerAuth("JWT-auth")
@RbacResource({
  code: RbacPermission.USER_INDICATORS,
  name: "Показатели",
  group: "indicators",
  appType: "webapp",
})
export class IndicatorsController {
  constructor(
    private indicatorsService: IndicatorsService,
    private usersService: UsersService,
    private organizationsService: OrganizationsService,
    private db: DatabaseService,
  ) {}

  @Get()
  @Permissions(`${RbacPermission.USER_INDICATORS}:read`)
  @ApiOperation({ summary: "Get all indicators with filters" })
  @ApiResponse({
    status: 200,
    description: "Returns list of indicators",
    type: IndicatorsListResponseDto,
  })
  async findAll(
    @Request() req: AuthenticatedRequest,
    @Query() filters: IndicatorFiltersDto,
  ): Promise<IndicatorsListResponseDto> {
    console.log("!!! FIND ALL CALLED !!!");
    const jwtPayload = req.user;

    // Safely try to find user in web app users table.
    // Admins might not exist there, so we don't want to throw 404.
    let user = null;
    try {
      user = await this.usersService.findById(jwtPayload?.sub);
    } catch (e) {
      // Ignore not found for admins
    }

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
    } else if (jwtPayload) {
      // Fallback for Admins from AdminJwtStrategy
      filters.userId = jwtPayload.sub;
      filters.userRole = (jwtPayload as any).role;
    }

    const indicators = await this.indicatorsService.findAll(filters);
    return {
      data: toIndicatorListDto(indicators as any[]),
      total: indicators.length,
    };
  }

  @Post()
  @Permissions(`${RbacPermission.USER_INDICATORS}:write`)
  @ApiOperation({ summary: "Create a manual indicator" })
  @ApiResponse({ status: 201, description: "Indicator created", type: IndicatorResponseDto })
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() data: any,
  ): Promise<IndicatorResponseDto> {
    let user = null;
    try {
      user = await this.usersService.findById(req.user.sub);
    } catch (e) {
      // Ignore for admins
    }
    const result = await this.indicatorsService.create({
      ...data,
      created_by: req.user.sub,
      organization_id: (user as any)?.organization_id,
      is_system: false,
    });
    return toIndicatorDto(result as any);
  }

  @Post("groups")
  @ApiOperation({ summary: "Create indicator group" })
  @ApiResponse({ status: 201, description: "Group created", type: IndicatorGroupResponseDto })
  async createGroup(@Body() data: CreateIndicatorGroupDto): Promise<IndicatorGroupResponseDto> {
    const result = await this.indicatorsService.createGroup(data);
    return toIndicatorGroupDto(result as any);
  }

  @Get("groups")
  @Permissions(`${RbacPermission.USER_INDICATORS}:read`)
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

  @Get("generation/templates")
  @ApiOperation({ summary: "Get indicator generation templates" })
  async getTemplates() {
    return this.indicatorsService.getTemplates();
  }

  @Post("generation/templates")
  @Permissions(`${RbacPermission.USER_INDICATORS}:write`)
  @ApiOperation({ summary: "Create indicator generation template" })
  @ApiResponse({ status: 201, description: "Template created" })
  async createTemplate(@Body() data: CreateIndicatorTemplateDto) {
    return this.indicatorsService.createTemplate(data as any);
  }

  @Patch("generation/templates/:id")
  @Permissions(`${RbacPermission.USER_INDICATORS}:write`)
  @ApiOperation({ summary: "Update indicator generation template" })
  async updateTemplate(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateIndicatorTemplateDto,
  ) {
    return this.indicatorsService.updateTemplate(id, data as any);
  }

  @Delete("generation/templates/:id")
  @Permissions(`${RbacPermission.USER_INDICATORS}:delete`)
  @ApiOperation({ summary: "Delete indicator generation template" })
  async deleteTemplate(@Param("id", ParseIntPipe) id: number) {
    return this.indicatorsService.deleteTemplate(id);
  }

  @Get("generation/templates/:id/params")
  @ApiOperation({ summary: "Get parameters for a specific template" })
  async getTemplateParams(@Param("id", ParseIntPipe) id: number) {
    return this.indicatorsService.getTemplateParams(id);
  }

  @Post("generation/generate")
  @ApiOperation({ summary: "Generate indicators (flexible)" })
  async generate(@Body() dto: GenerateIndicatorsDto) {
    return this.indicatorsService.generate(dto);
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

  @Patch(":id")
  @Permissions(`${RbacPermission.USER_INDICATORS}:write`)
  @ApiOperation({ summary: "Update indicator" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: any,
  ): Promise<IndicatorResponseDto> {
    const result = await this.indicatorsService.update(id, data);
    return toIndicatorDto(result as any);
  }

  @Delete(":id")
  @Permissions(`${RbacPermission.USER_INDICATORS}:delete`)
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
}
