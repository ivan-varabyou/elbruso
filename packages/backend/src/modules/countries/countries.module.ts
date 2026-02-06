import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { CountriesController } from './controllers/countries.controller';
import { CountriesService } from './services/countries.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
