import { Controller, Get, Param, ParseIntPipe, NotFoundException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { SportsService } from "../services/sports.service";
import { SportResponseDto, SportsListResponseDto } from "../dto/responses";

@Controller("reference/sports")
@ApiTags("Sports")
export class SportsController {
  constructor(private sportsService: SportsService) {}

  @Get()
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
