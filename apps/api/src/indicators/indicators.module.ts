import { Module } from '@nestjs/common';
import { IndicatorsController } from './indicators.controller';
import { IndicatorsService } from './indicators.service';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';

import { OrganizationsModule } from '../organizations/organizations.module';

@Module({
  imports: [DatabaseModule, UsersModule, OrganizationsModule],

  controllers: [IndicatorsController],
  providers: [IndicatorsService],
  exports: [IndicatorsService],
})
export class IndicatorsModule {}
