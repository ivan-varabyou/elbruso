import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { PermissionsGuard } from "../../admin/guards/permissions.guard";
import { AnyJwtAuthGuard } from "../../auth/guards/any-jwt-auth.guard";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import { SportResponseDto, SportsListResponseDto } from "../dto/responses";
import { SportsService } from "../services/sports.service";

@Controller(["admin/reference/sports", "reference/sports"])
@ApiTags("Sports")
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@RbacResource({
  code: RbacPermission.USER_SPORTS,
  name: "Виды спорта",
  group: "reference",
  appType: "webapp",
})
export class SportsController {
  constructor(private sportsService: SportsService) {}

  @Get()
  @Permissions(`${RbacPermission.USER_SPORTS}:read`)
  @ApiOperation({ summary: "Get all sports" })
  @ApiResponse({ status: 200, type: SportsListResponseDto, description: "Returns list of sports" })
  async findAll(): Promise<SportsListResponseDto> {
    const sports = await this.sportsService.findAll();
    return {
      items: sports.map((s) => ({
        id: Number(s.id),
        name: s.name_ru,
        olympicCategoryId: s.olympic_category_id ?? null,
        sportTypeId: s.sport_type_id ?? null,
        isActive: Boolean(s.is_active),
      })),
      total: sports.length,
    };
  }

  @Get(":id")
  @Permissions(`${RbacPermission.USER_SPORTS}:read`)
  @ApiOperation({ summary: "Get sport by ID" })
  @ApiResponse({ status: 200, type: SportResponseDto, description: "Returns sport" })
  @ApiResponse({ status: 404, description: "Sport not found" })
  async findById(@Param("id", ParseIntPipe) id: number): Promise<SportResponseDto> {
    const sport = await this.sportsService.findById(id);
    if (!sport) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }
    return {
      id: Number(sport.id),
      name: sport.name_ru,
      olympicCategoryId: sport.olympic_category_id ?? null,
      sportTypeId: sport.sport_type_id ?? null,
      isActive: Boolean(sport.is_active),
    };
  }

  @Get(":id/disciplines")
  @ApiOperation({ summary: "Get disciplines for a sport" })
  @ApiResponse({ status: 200, description: "Returns list of disciplines" })
  async findDisciplines(@Param("id", ParseIntPipe) id: number) {
    return this.sportsService.findDisciplines(id);
  }
}
