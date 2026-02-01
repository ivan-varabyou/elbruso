import { Module } from '@nestjs/common';
import { AuditModule } from '@modules/audit';
import { WorkspaceModule } from '@modules/workspace';
import { DatabaseModule } from '@database/database.module';
import { IndicatorsModule } from '../indicators/indicators.module';
import { RegionsModule } from '../regions/regions.module';
import { SportsModule } from '../sports/sports.module';
import { FormulaController } from './controllers/formula.controller';
import { TablesController } from './controllers/tables.controller';
import { FormulaService } from './services/formula.service';
import { TablesService } from './services/tables.service';

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
