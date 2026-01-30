import { Module } from '@nestjs/common';
import { CountriesController } from './controllers/countries.controller';
import { CountriesService } from './services/countries.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
