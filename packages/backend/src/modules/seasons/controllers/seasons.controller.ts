import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { GenerateSeasonsDto } from "../dto";
import { SeasonsService } from "../services/seasons.service";
import { SeasonResponseDto, SeasonsListResponseDto } from "../dto/responses";
import { UseGuards } from "@nestjs/common";
import { AnyJwtAuthGuard } from "../../auth/guards/any-jwt-auth.guard";
import { PermissionsGuard } from "../../admin/guards/permissions.guard";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";

@Controller("reference/seasons")
@ApiTags("Seasons")
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@RbacResource({
  code: RbacPermission.USER_SEASONS,
  name: "Сезоны",
  group: "reference",
  appType: "webapp",
})
export class SeasonsController {
  constructor(private seasonsService: SeasonsService) {}

  @Get()
  @Permissions(`${RbacPermission.USER_SEASONS}:read`)
  @ApiOperation({ summary: "Get all seasons" })
  @ApiResponse({
    status: 200,
    type: SeasonsListResponseDto,
    description: "Returns list of seasons",
  })
  async findAll(): Promise<SeasonsListResponseDto> {
    const seasons = await this.seasonsService.findAll();
    return {
      items: seasons.map((s) => ({
        id: Number(s.id),
        code: s.code,
        name: s.name_ru,
        seasonYear: s.season_year ?? null,
        seasonType: s.season_type ?? null,
        startDate: s.start_date,
        endDate: s.end_date,
        isActive: Boolean(s.is_active),
        sports: s.sports?.map((sp: any) => ({ id: sp.id, name: sp.name_ru })) ?? [],
      })),
      total: seasons.length,
    };
  }

  @Post()
  @Permissions(`${RbacPermission.USER_SEASONS}:create`)
  @ApiOperation({ summary: "Create a new season" })
  @ApiResponse({ status: 201, type: SeasonResponseDto, description: "Season created" })
  async create(@Body() data: any): Promise<SeasonResponseDto> {
    const season = await this.seasonsService.create(data);
    return {
      id: Number(season.id),
      code: season.code,
      name: season.name_ru,
      seasonYear: season.season_year ?? null,
      seasonType: season.season_type ?? null,
      startDate: season.start_date,
      endDate: season.end_date,
      isActive: Boolean(season.is_active),
      sports: season.sports?.map((sp: any) => ({ id: sp.id, name: sp.name_ru })) ?? [],
    };
  }

  @Patch(":id")
  @Permissions(`${RbacPermission.USER_SEASONS}:write`)
  @ApiOperation({ summary: "Update an existing season" })
  @ApiResponse({ status: 200, type: SeasonResponseDto, description: "Season updated" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: any,
  ): Promise<SeasonResponseDto> {
    const season = await this.seasonsService.update(id, data);
    return {
      id: Number(season.id),
      code: season.code,
      name: season.name_ru,
      seasonYear: season.season_year ?? null,
      seasonType: season.season_type ?? null,
      startDate: season.start_date,
      endDate: season.end_date,
      isActive: Boolean(season.is_active),
      sports: season.sports?.map((sp: any) => ({ id: sp.id, name: sp.name_ru })) ?? [],
    };
  }

  @Delete(":id")
  @Permissions(`${RbacPermission.USER_SEASONS}:delete`)
  @ApiOperation({ summary: "Delete a season" })
  @ApiResponse({ status: 200, description: "Season deleted" })
  async delete(@Param("id", ParseIntPipe) id: number) {
    await this.seasonsService.delete(id);
  }

  @Post("generate")
  @ApiOperation({ summary: "Autogenerate seasons based on logic" })
  @ApiResponse({ status: 200, type: [SeasonResponseDto], description: "Seasons generated" })
  async generate(@Body() data: GenerateSeasonsDto): Promise<SeasonResponseDto[]> {
    await this.seasonsService.generate(data.startYear, data.endYear, data.sportId);
    const seasons = await this.seasonsService.findAll();
    return seasons.map((s) => ({
      id: Number(s.id),
      code: s.code,
      name: s.name_ru,
      seasonYear: s.season_year ?? null,
      seasonType: s.season_type ?? null,
      startDate: s.start_date,
      endDate: s.end_date,
      isActive: Boolean(s.is_active),
      sports: s.sports?.map((sp: any) => ({ id: sp.id, name: sp.name_ru })) ?? [],
    }));
  }

  @Get("current")
  @ApiOperation({ summary: "Get current season" })
  @ApiResponse({ status: 200, type: SeasonResponseDto, description: "Returns current season" })
  @ApiResponse({ status: 404, description: "No current season found" })
  async findCurrent(): Promise<SeasonResponseDto> {
    const season = await this.seasonsService.findCurrent();
    if (!season) {
      throw new NotFoundException("No current season found");
    }
    return {
      id: Number(season.id),
      code: season.code,
      name: season.name_ru,
      seasonYear: season.season_year ?? null,
      seasonType: season.season_type ?? null,
      startDate: season.start_date,
      endDate: season.end_date,
      isActive: Boolean(season.is_active),
      sports: season.sports?.map((sp: any) => ({ id: sp.id, name: sp.name_ru })) ?? [],
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get season by ID" })
  @ApiResponse({ status: 200, type: SeasonResponseDto, description: "Returns season" })
  @ApiResponse({ status: 404, description: "Season not found" })
  async findById(@Param("id", ParseIntPipe) id: number): Promise<SeasonResponseDto> {
    const season = await this.seasonsService.findById(id);
    if (!season) {
      throw new NotFoundException(`Season with ID ${id} not found`);
    }
    return {
      id: Number(season.id),
      code: season.code,
      name: season.name_ru,
      seasonYear: season.season_year ?? null,
      seasonType: season.season_type ?? null,
      startDate: season.start_date,
      endDate: season.end_date,
      isActive: Boolean(season.is_active),
      sports: season.sports?.map((sp: any) => ({ id: sp.id, name: sp.name_ru })) ?? [],
    };
  }
}
