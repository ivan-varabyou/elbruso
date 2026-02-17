import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";

import { OrganizationsModule } from "../organizations/organizations.module";
import { UsersModule } from "../users/users.module";
import { IndicatorGroupsController } from "./controllers/indicator-groups.controller";
import { IndicatorsController } from "./controllers/indicators.controller";
import { LicenseCategoriesController } from "./controllers/license-categories.controller";
import { IndicatorGroupsService } from "./services/indicator-groups.service";
import { IndicatorsService } from "./services/indicators.service";
import { LicenseCategoriesService } from "./services/license-categories.service";

@Module({
  imports: [DatabaseModule, UsersModule, OrganizationsModule],

  controllers: [IndicatorsController, IndicatorGroupsController, LicenseCategoriesController],
  providers: [IndicatorsService, IndicatorGroupsService, LicenseCategoriesService],
  exports: [IndicatorsService, IndicatorGroupsService, LicenseCategoriesService],
})
export class IndicatorsModule {}
