import { Module, forwardRef } from '@nestjs/common';
import { FormulaService } from './formula.service';
import { FormulaController } from './formula.controller';
import { DynamicTablesModule } from '../dynamic-tables/dynamic-tables.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';

@Module({
  imports: [
    forwardRef(() => DynamicTablesModule),
    WorkspacesModule,
  ],
  controllers: [FormulaController],
  providers: [FormulaService],
  exports: [FormulaService],
})
export class FormulaModule {}
