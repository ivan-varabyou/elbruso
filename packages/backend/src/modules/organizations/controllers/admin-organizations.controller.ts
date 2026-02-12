import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

import { Roles } from "../../admin/decorators/roles.decorator";
import { AdminRole } from "../../admin/enums/admin-role.enum";
import { AdminJwtAuthGuard } from "../../admin/guards/admin-jwt-auth.guard";
import { RolesGuard } from "../../admin/guards/roles.guard";
import { CountriesService } from "../../countries/services/countries.service";
import { RegionsService } from "../../regions/services/regions.service";
import { SportsService } from "../../sports/services/sports.service";
import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { MoveOrganizationDto } from "../dto/move-organization.dto";
import { OrganizationFiltersDto } from "../dto/organization-filters.dto";
import { OrganizationResponseDto, OrganizationsListResponseDto } from "../dto/responses";
import { OrganizationLevelResponseDto, OrganizationTypeResponseDto } from "../dto/responses";
import { CountryResponseDto } from "../../countries/dto/responses/country.response.dto";
import { RegionResponseDto } from "../../regions/dto/responses/region.response.dto";
import { SportResponseDto } from "../../sports/dto/responses/sport.response.dto";
import { UpdateOrganizationDto } from "../dto/update-organization.dto";
import { OrganizationsService } from "../services/organizations.service";

@ApiTags("Admin Organizations")
@Controller("admin/organizations")
@UseGuards(AdminJwtAuthGuard, RolesGuard)
@Roles(AdminRole.SUPER_ADMIN, AdminRole.ADMIN)
@ApiBearerAuth("JWT-auth")
// Trigger reload
export class AdminOrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private readonly countriesService: CountriesService,
    private readonly regionsService: RegionsService,
    private readonly sportsService: SportsService,
  ) {}

  @Get("types")
  @ApiOperation({ summary: "Get all organization types" })
  @ApiResponse({ status: 200, type: [OrganizationTypeResponseDto] })
  async findAllTypes(): Promise<OrganizationTypeResponseDto[]> {
    return this.organizationsService.findAllTypes();
  }

  @Get("levels")
  @ApiOperation({ summary: "Get all organization levels" })
  @ApiResponse({ status: 200, type: [OrganizationLevelResponseDto] })
  async findAllLevels(): Promise<OrganizationLevelResponseDto[]> {
    return this.organizationsService.findAllLevels();
  }

  @Get("reference/countries")
  @ApiOperation({ summary: "Get countries for reference" })
  @ApiResponse({ status: 200, type: [CountryResponseDto] })
  async findCountries(): Promise<CountryResponseDto[]> {
    const countries = await this.countriesService.findAll();
    return plainToInstance(CountryResponseDto, countries);
  }

  @Get("reference/regions")
  @ApiOperation({ summary: "Get regions for reference" })
  @ApiResponse({ status: 200, type: [RegionResponseDto] })
  async findRegions(): Promise<RegionResponseDto[]> {
    const regions = await this.regionsService.findAll({});
    return plainToInstance(RegionResponseDto, regions);
  }

  @Get("reference/sports")
  @ApiOperation({ summary: "Get sports for reference" })
  @ApiResponse({ status: 200, type: [SportResponseDto] })
  async findSports(): Promise<SportResponseDto[]> {
    const sports = await this.sportsService.findAll({});
    return plainToInstance(SportResponseDto, sports);
  }

  @Get()
  @ApiOperation({ summary: "List all organizations (including inactive for admin)" })
  @ApiResponse({ status: 200, type: OrganizationsListResponseDto })
  async findAll(@Query() filters: OrganizationFiltersDto): Promise<OrganizationsListResponseDto> {
    const organizations = await this.organizationsService.findAllIncludingInactive(filters);
    return plainToInstance(OrganizationsListResponseDto, {
      data: organizations,
      total: organizations.length,
    });
  }

  @Get(":id/tree")
  @ApiOperation({ summary: "Get organization tree" })
  @ApiResponse({ status: 200, description: "Returns organization tree" })
  @ApiResponse({ status: 404, description: "Organization not found" })
  async getTree(@Param("id", ParseIntPipe) id: number) {
    return this.organizationsService.getTree(id);
  }

  @Post()
  @ApiOperation({ summary: "Create new organization" })
  @ApiResponse({ status: 201, type: OrganizationResponseDto })
  @ApiResponse({ status: 400, description: "Invalid data" })
  async create(@Body() dto: CreateOrganizationDto): Promise<OrganizationResponseDto> {
    const organization = await this.organizationsService.create(dto);
    return plainToInstance(OrganizationResponseDto, organization);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update organization" })
  @ApiResponse({ status: 200, type: OrganizationResponseDto })
  @ApiResponse({ status: 404, description: "Organization not found" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateOrganizationDto,
  ): Promise<OrganizationResponseDto> {
    const organization = await this.organizationsService.update(id, dto);
    return plainToInstance(OrganizationResponseDto, organization);
  }

  @Put(":id/move")
  @ApiOperation({ summary: "Move organization to new parent" })
  @ApiResponse({ status: 200, type: OrganizationResponseDto })
  @ApiResponse({ status: 400, description: "Invalid move (circular dependency)" })
  @ApiResponse({ status: 404, description: "Organization not found" })
  async move(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: MoveOrganizationDto,
  ): Promise<OrganizationResponseDto> {
    const organization = await this.organizationsService.move(id, dto.parent_id);
    return plainToInstance(OrganizationResponseDto, organization);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete organization (soft delete)" })
  @ApiResponse({ status: 200, description: "Organization deleted successfully" })
  @ApiResponse({ status: 404, description: "Organization not found" })
  async remove(@Param("id", ParseIntPipe) id: number) {
    await this.organizationsService.delete(id);
    return { message: "Organization deleted successfully" };
  }
}
