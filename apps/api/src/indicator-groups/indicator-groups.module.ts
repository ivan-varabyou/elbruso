import { Module } from '@nestjs/common';
import { IndicatorGroupsService } from './indicator-groups.service';
import { IndicatorGroupsController } from './indicator-groups.controller';

@Module({
  controllers: [IndicatorGroupsController],
  providers: [IndicatorGroupsService],
  exports: [IndicatorGroupsService],
})
export class IndicatorGroupsModule {}
