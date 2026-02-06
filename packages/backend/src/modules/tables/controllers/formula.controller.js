"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormulaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const workspace_dto_1 = require("../../workspace/dto/workspace.dto");
const workspace_service_1 = require("../../workspace/services/workspace.service");
const formula_analysis_dto_1 = require("../dto/formula-analysis.dto");
const formula_service_1 = require("../services/formula.service");
const tables_service_1 = require("../services/tables.service");
let FormulaController = class FormulaController {
    constructor(formulaService, tablesService, workspaceService) {
        this.formulaService = formulaService;
        this.tablesService = tablesService;
        this.workspaceService = workspaceService;
    }
    async analyze(dto, req) {
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
                }
                else {
                    continue;
                }
            }
            try {
                await this.workspaceService.checkPermission(targetWorkspaceId, userId, workspace_dto_1.WorkspaceRole.VIEWER);
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
            }
            catch (e) {
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
};
exports.FormulaController = FormulaController;
__decorate([
    (0, common_1.Post)('analyze'),
    (0, swagger_1.ApiOperation)({
        summary: 'Analyze formula and resolve external dependencies',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [formula_analysis_dto_1.AnalyzeFormulaDto, Object]),
    __metadata("design:returntype", Promise)
], FormulaController.prototype, "analyze", null);
exports.FormulaController = FormulaController = __decorate([
    (0, swagger_1.ApiTags)('Formulas'),
    (0, common_1.Controller)('formulas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [formula_service_1.FormulaService,
        tables_service_1.TablesService,
        workspace_service_1.WorkspaceService])
], FormulaController);
//# sourceMappingURL=formula.controller.js.map