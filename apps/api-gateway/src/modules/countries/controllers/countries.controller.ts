import { Controller, Get, Query } from '@nestjs/common';
import { CountriesService } from '../services/countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('active')
  async findActive(@Query('lang') lang?: string) {
    return this.countriesService.findActive(lang || 'ru');
  }

  @Get()
  async findAll(@Query('lang') lang?: string) {
    return this.countriesService.findAll(lang || 'ru');
  }
}
