import { Controller, Get, NotFoundException, Param, ParseIntPipe, Query } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PermissionsGuard } from "../../admin/guards/permissions.guard";
import { AnyJwtAuthGuard } from "../../auth/guards/any-jwt-auth.guard";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import { RegionFiltersDto } from "../dto/region-filters.dto";
import { RegionResponseDto, RegionsListResponseDto } from "../dto/responses";
import { RegionsService } from "../services/regions.service";

@Controller(["admin/reference/regions", "reference/regions"])
@ApiTags("Regions")
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@RbacResource({
  code: RbacPermission.USER_REGIONS,
  name: "Регионы",
  group: "reference",
  appType: "webapp",
})
export class RegionsController {
  constructor(private regionsService: RegionsService) {}

  @Get()
  @Permissions(`${RbacPermission.USER_REGIONS}:read`)
  @ApiOperation({ summary: "Get all regions" })
  @ApiResponse({
    status: 200,
    type: RegionsListResponseDto,
    description: "Returns list of regions",
  })
  async findAll(@Query() filters: RegionFiltersDto): Promise<RegionsListResponseDto> {
    const regions = await this.regionsService.findAll(filters);
    return {
      items: regions.map((r) => ({
        id: Number(r.id),
        code: r.code,
        name: r.name_ru,
        countryId: r.country_id ?? null,
        districtId: r.federal_district_id ?? null,
        isActive: Boolean(r.is_active),
      })),
      total: regions.length,
    };
  }

  @Get(":id")
  @Permissions(`${RbacPermission.USER_REGIONS}:read`)
  @ApiOperation({ summary: "Get region by ID" })
  @ApiResponse({ status: 200, type: RegionResponseDto, description: "Returns region" })
  @ApiResponse({ status: 404, description: "Region not found" })
  async findById(@Param("id", ParseIntPipe) id: number): Promise<RegionResponseDto> {
    const region = await this.regionsService.findById(id);
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
    return {
      id: Number(region.id),
      code: region.code,
      name: region.name_ru,
      countryId: region.country_id ?? null,
      districtId: region.federal_district_id ?? null,
      isActive: Boolean(region.is_active),
    };
  }

  @Get("by-district/:districtId")
  @Permissions(`${RbacPermission.USER_REGIONS}:read`)
  @ApiOperation({ summary: "Get regions by federal district" })
  @ApiResponse({ status: 200, type: [RegionResponseDto], description: "Returns list of regions" })
  async findByDistrict(
    @Param("districtId", ParseIntPipe) districtId: number,
  ): Promise<RegionResponseDto[]> {
    const regions = await this.regionsService.findByDistrict(districtId);
    return regions.map((r) => ({
      id: Number(r.id),
      code: r.code,
      name: r.name_ru,
      countryId: r.country_id ?? null,
      districtId: r.federal_district_id ?? null,
      isActive: Boolean(r.is_active),
    }));
  }

  @Get("by-country/:countryId")
  @Permissions(`${RbacPermission.USER_REGIONS}:read`)
  @ApiOperation({ summary: "Get regions by country" })
  @ApiResponse({ status: 200, type: [RegionResponseDto], description: "Returns list of regions" })
  async findByCountry(
    @Param("countryId", ParseIntPipe) countryId: number,
  ): Promise<RegionResponseDto[]> {
    const regions = await this.regionsService.findByCountry(countryId);
    return regions.map((r) => ({
      id: Number(r.id),
      code: r.code,
      name: r.name_ru,
      countryId: r.country_id ?? null,
      districtId: r.federal_district_id ?? null,
      isActive: Boolean(r.is_active),
    }));
  }
}
