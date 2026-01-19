import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FormulaService } from './formula.service';
import { DynamicTablesService } from '../dynamic-tables/dynamic-tables.service';
import { WorkspacesService } from '../workspaces/workspaces.service';
import { WorkspaceRole } from '../workspaces/dto';
import { AnalyzeFormulaDto, FormulaAnalysisResponse, ExternalRefResponse } from './dto/formula-analysis.dto';

@ApiTags('Formulas')
@Controller('formulas')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FormulaController {
  constructor(
    private readonly formulaService: FormulaService,
    private readonly dynamicTablesService: DynamicTablesService,
    private readonly workspacesService: WorkspacesService,
  ) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze formula and resolve external dependencies' })
  async analyze(
    @Body() dto: AnalyzeFormulaDto,
    @Request() req: any,
  ): Promise<FormulaAnalysisResponse> {
    const userId = req.user.sub;
    const { formula, workspaceId } = dto;

    // 1. Basic syntax check
    const parseResult = this.formulaService.parseFormula(formula);
    
    // 2. Extract external deps
    const externals = this.formulaService.getExternalDependencies(formula);
    const resolvedDeps: ExternalRefResponse[] = [];

    for (const dep of externals) {
      let targetWorkspaceId = workspaceId;

      // If cross-workspace reference [WorkspaceB]![TableC]
      if (dep.workspace) {
         const ws = await this.workspacesService.findAll(userId);
         const foundWs = ws.find(w => w.name === dep.workspace);
         if (foundWs) {
           targetWorkspaceId = foundWs.id;
         } else {
           // Workspace not found by name
           continue; 
         }
      }

      try {
        await this.workspacesService.checkPermission(targetWorkspaceId, userId, WorkspaceRole.VIEWER);

        // Find table by name in target workspace
        const tables = await this.dynamicTablesService.findAll(targetWorkspaceId, userId);
        const foundTable = tables.find((t) => t.name === dep.table);

        if (foundTable) {
          resolvedDeps.push({
            fullReference: dep.fullReference,
            workspaceId: targetWorkspaceId,
            tableId: foundTable.id as any,
            tableName: foundTable.name as any,
            range: dep.range,
            hasAccess: true,
          });
        }
      } catch (e) {
        // No access to this workspace, reported as hasAccess: false
        resolvedDeps.push({
          fullReference: dep.fullReference,
          workspaceId: targetWorkspaceId,
          tableId: 'hidden',
          tableName: dep.table,
          range: dep.range,
          hasAccess: false,
        });
      }
    }

    return {
      valid: parseResult.valid,
      error: parseResult.error,
      externalDependencies: resolvedDeps,
    };
  }
}
