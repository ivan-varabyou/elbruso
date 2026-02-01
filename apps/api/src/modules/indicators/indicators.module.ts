import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { OrganizationsModule } from '../organizations/organizations.module';
import { UsersModule } from '../users/users.module';
import { IndicatorGroupsController } from './controllers/indicator-groups.controller';
import { IndicatorsController } from './controllers/indicators.controller';
import { IndicatorGroupsService } from './services/indicator-groups.service';
import { IndicatorsService } from './services/indicators.service';

@Module({
  imports: [DatabaseModule, UsersModule, OrganizationsModule],

  controllers: [IndicatorsController, IndicatorGroupsController],
  providers: [IndicatorsService, IndicatorGroupsService],
  exports: [IndicatorsService, IndicatorGroupsService],
})
export class IndicatorsModule {}
