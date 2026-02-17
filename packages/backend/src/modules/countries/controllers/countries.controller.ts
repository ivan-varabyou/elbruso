import { Controller, Get, Query } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PermissionsGuard } from "../../admin/guards/permissions.guard";
import { AnyJwtAuthGuard } from "../../auth/guards/any-jwt-auth.guard";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import { CountryResponseDto } from "../dto/responses";
import { CountriesService } from "../services/countries.service";

@ApiTags("Countries")
@Controller(["admin/countries", "countries"])
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@RbacResource({
  code: RbacPermission.USER_COUNTRIES,
  name: "Страны",
  group: "reference",
  appType: "webapp",
})
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get("active")
  @Permissions(`${RbacPermission.USER_COUNTRIES}:read`)
  @ApiOperation({ summary: "Get all active countries" })
  @ApiQuery({ name: "lang", required: false, type: String })
  @ApiResponse({ status: 200, type: [CountryResponseDto], description: "List of active countries" })
  async findActive(@Query("lang") lang?: string): Promise<CountryResponseDto[]> {
    const countries = await this.countriesService.findActive(lang || "ru");
    return countries.map((c) => ({
      id: c.id,
      code: c.code_alpha2,
      name: c.name_ru,
      flag: c.flag,
    }));
  }

  @Get()
  @Permissions(`${RbacPermission.USER_COUNTRIES}:read`)
  @ApiOperation({ summary: "Get all countries" })
  @ApiQuery({ name: "lang", required: false, type: String })
  @ApiResponse({ status: 200, type: [CountryResponseDto], description: "List of all countries" })
  async findAll(@Query("lang") lang?: string): Promise<CountryResponseDto[]> {
    const countries = await this.countriesService.findAll(lang || "ru");
    return countries.map((c) => ({
      id: c.id,
      code: c.code_alpha2,
      name: c.name_ru,
      flag: c.flag,
    }));
  }
}
