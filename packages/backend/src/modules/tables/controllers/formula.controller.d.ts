import { WorkspaceService } from '@backend/modules/workspace/services/workspace.service';
import { AnalyzeFormulaDto, FormulaAnalysisResponse } from '../dto/formula-analysis.dto';
import { FormulaService } from '../services/formula.service';
import { TablesService } from '../services/tables.service';
export declare class FormulaController {
    private readonly formulaService;
    private readonly tablesService;
    private readonly workspaceService;
    constructor(formulaService: FormulaService, tablesService: TablesService, workspaceService: WorkspaceService);
    analyze(dto: AnalyzeFormulaDto, req: any): Promise<FormulaAnalysisResponse>;
}
