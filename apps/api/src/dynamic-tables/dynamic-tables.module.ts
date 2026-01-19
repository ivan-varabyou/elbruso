import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { AuditModule } from '../common/audit/audit.module';
import { FormulaModule } from '../formula/formula.module';
import { RegionsModule } from '../regions/regions.module';
import { SportsModule } from '../sports/sports.module';
import { IndicatorsModule } from '../indicators/indicators.module';
import { IndicatorGroupsModule } from '../indicator-groups/indicator-groups.module';
import { DynamicTablesService } from './dynamic-tables.service';
import { DynamicTablesController } from './dynamic-tables.controller';

@Module({
  imports: [
    DatabaseModule,
    WorkspacesModule,
    AuditModule,
    forwardRef(() => FormulaModule),
    RegionsModule,
    SportsModule,
    IndicatorsModule,
    IndicatorGroupsModule,
  ],
  controllers: [DynamicTablesController],
  providers: [DynamicTablesService],
  exports: [DynamicTablesService],
})
export class DynamicTablesModule {}
