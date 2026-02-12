import { Controller, Post, Body, UseGuards, Request } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "@backend/modules/auth/guards/jwt-auth.guard";
import { WorkspaceRole } from "@backend/modules/workspace/dto/workspace.dto";
import { WorkspaceService } from "@backend/modules/workspace/services/workspace.service";
import {
  AnalyzeFormulaDto,
} from "../dto/formula-analysis.dto";
import { FormulaService } from "../services/formula.service";
import { TablesService } from "../services/tables.service";
import { FormulaAnalysisResponseDto } from "../formula/dto/responses";

@ApiTags("Formulas")
@Controller("formulas")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth("JWT-auth")
export class FormulaController {
  constructor(
    private readonly formulaService: FormulaService,
    private readonly tablesService: TablesService,
    private readonly workspaceService: WorkspaceService,
  ) {}

  @Post("analyze")
  @ApiOperation({
    summary: "Analyze formula and resolve external dependencies",
  })
  @ApiResponse({ status: 200, type: FormulaAnalysisResponseDto })
  async analyze(
    @Body() dto: AnalyzeFormulaDto,
    @Request() req: any,
  ): Promise<FormulaAnalysisResponseDto> {
    const userId = req.user.sub;
    const { formula, workspaceId } = dto;

    const parseResult = this.formulaService.parseFormula(formula);

    const externals = this.formulaService.getExternalDependencies(formula);
    const resolvedDeps = [];

    for (const dep of externals) {
      let targetWorkspaceId = workspaceId;

      if (dep.workspace) {
        const ws = await this.workspaceService.findAll(userId);
        const foundWs = ws.find((w) => w.name === dep.workspace);
        if (foundWs) {
          targetWorkspaceId = foundWs.id;
        } else {
          continue;
        }
      }

      try {
        await this.workspaceService.checkPermission(
          targetWorkspaceId,
          userId,
          WorkspaceRole.VIEWER,
        );

        const tables = await this.tablesService.findAll(targetWorkspaceId, userId);
        const foundTable = tables.find((t) => t.name === dep.table);

        if (foundTable) {
          resolvedDeps.push({
            fullReference: dep.fullReference,
            workspaceId: targetWorkspaceId,
            tableId: foundTable.id,
            tableName: foundTable.name,
            range: dep.range,
            hasAccess: true,
          });
        }
      } catch (e) {
        resolvedDeps.push({
          fullReference: dep.fullReference,
          workspaceId: targetWorkspaceId,
          tableId: "hidden",
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
