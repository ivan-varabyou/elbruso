import { Module } from '@nestjs/common';
import { IndicatorsController } from './controllers/indicators.controller';
import { IndicatorGroupsController } from './controllers/indicator-groups.controller';
import { IndicatorsService } from './services/indicators.service';
import { IndicatorGroupsService } from './services/indicator-groups.service';
import { DatabaseModule } from '@database/database.module';
import { UsersModule } from '../users/users.module';
import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [DatabaseModule, UsersModule, OrganizationsModule],

  controllers: [IndicatorsController, IndicatorGroupsController],
  providers: [IndicatorsService, IndicatorGroupsService],
  exports: [IndicatorsService, IndicatorGroupsService],
})
export class IndicatorsModule {}
