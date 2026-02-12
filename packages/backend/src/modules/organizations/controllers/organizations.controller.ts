import { Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { OrganizationFiltersDto } from "../dto/organization-filters.dto";
import {
  OrganizationLevelResponseDto,
  OrganizationResponseDto,
  OrganizationsListResponseDto,
  OrganizationTypeResponseDto,
} from "../dto/responses";
import { toOrganizationDto, toOrganizationListDto } from "../mappers/organization.mapper";
import { OrganizationsService } from "../services/organizations.service";

@Controller("reference/organizations")
@ApiTags("Organizations")
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

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

  @Get()
  @ApiOperation({ summary: "Get all organizations" })
  @ApiResponse({
    status: 200,
    description: "Returns list of organizations",
    type: OrganizationsListResponseDto,
  })
  async findAll(@Query() filters: OrganizationFiltersDto): Promise<OrganizationsListResponseDto> {
    const organizations = await this.organizationsService.findAll(filters);
    return {
      data: toOrganizationListDto(organizations as any[]),
      total: organizations.length,
    };
  }

  @Get("federations")
  @ApiOperation({ summary: "Get federations" })
  @ApiResponse({
    status: 200,
    description: "Returns list of federations",
    type: OrganizationsListResponseDto,
  })
  async findFederations(
    @Query() filters: OrganizationFiltersDto,
  ): Promise<OrganizationsListResponseDto> {
    const federations = await this.organizationsService.findFederations(filters);
    return {
      data: toOrganizationListDto(federations as any[]),
      total: federations.length,
    };
  }

  @Get(":id/tree")
  @ApiOperation({ summary: "Get organization tree" })
  async getTree(@Param("id", ParseIntPipe) id: number) {
    const tree = await this.organizationsService.getTree(id);
    if (!tree) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return tree;
  }

  @Get(":id/hierarchy")
  @ApiOperation({ summary: "Get organization hierarchy (flat list)" })
  async getHierarchy(@Param("id", ParseIntPipe) id: number) {
    const hierarchy = await this.organizationsService.getHierarchy(id);
    if (hierarchy.length === 0) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return toOrganizationListDto(hierarchy as any[]);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get organization by ID" })
  @ApiResponse({ status: 200, description: "Returns organization", type: OrganizationResponseDto })
  @ApiResponse({ status: 404, description: "Organization not found" })
  async findById(@Param("id", ParseIntPipe) id: number): Promise<OrganizationResponseDto> {
    const organization = await this.organizationsService.findById(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return toOrganizationDto(organization as any);
  }
}
