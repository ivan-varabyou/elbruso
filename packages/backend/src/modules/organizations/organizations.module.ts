import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';

import { CountriesModule } from "../countries/countries.module";
import { RegionsModule } from "../regions/regions.module";
import { SportsModule } from "../sports/sports.module";
import { AdminOrganizationsController } from "./controllers/admin-organizations.controller";
import { OrganizationsController } from './controllers/organizations.controller';
import { OrganizationsService } from './services/organizations.service';

@Module({
  imports: [DatabaseModule, CountriesModule, RegionsModule, SportsModule],
  controllers: [AdminOrganizationsController, OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
