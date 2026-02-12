import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { CountriesService } from "../services/countries.service";
import { CountryResponseDto } from "../dto/responses";

@ApiTags("Countries")
@Controller("countries")
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get("active")
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
