import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { AuditModule } from '../audit/audit.module';
import { RegionsModule } from '../regions/regions.module';
import { SportsModule } from '../sports/sports.module';
import { IndicatorsModule } from '../indicators/indicators.module';
import { TablesService } from './services/tables.service';
import { TablesController } from './controllers/tables.controller';
import { FormulaService } from './services/formula.service';
import { FormulaController } from './controllers/formula.controller';

@Module({
  imports: [
    DatabaseModule,
    WorkspaceModule,
    AuditModule,
    RegionsModule,
    SportsModule,
    IndicatorsModule,
  ],
  controllers: [TablesController, FormulaController],
  providers: [TablesService, FormulaService],
  exports: [TablesService, FormulaService],
})
export class TablesModule {}
