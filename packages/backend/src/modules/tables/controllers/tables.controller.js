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
exports.TablesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const tables_dto_1 = require("../dto/tables.dto");
const tables_service_1 = require("../services/tables.service");
let TablesController = class TablesController {
    constructor(tablesService) {
        this.tablesService = tablesService;
    }
    async create(workspaceId, dto, req) {
        return this.tablesService.create(workspaceId, dto, req.user.sub);
    }
    async findAll(workspaceId, groupId, req) {
        return this.tablesService.findAll(workspaceId, req.user.sub, groupId);
    }
    async findOne(id, req) {
        return this.tablesService.findById(id, req.user.sub);
    }
    async update(id, dto, req) {
        return this.tablesService.update(id, dto, req.user.sub);
    }
    async delete(id, req) {
        return this.tablesService.delete(id, req.user.sub);
    }
    async createVersion(id, dto, req) {
        return this.tablesService.createVersion(id, dto, req.user.sub);
    }
    async getVersionHistory(id, req) {
        return this.tablesService.getVersionHistory(id, req.user.sub);
    }
    async activateVersion(id, req) {
        return this.tablesService.activateVersion(id, req.user.sub);
    }
    async getCells(id, query, req) {
        return this.tablesService.getCells(id, query, req.user.sub);
    }
    async updateCell(id, rowIndex, colIndex, cellData, req) {
        return this.tablesService.updateCell(id, {
            rowIndex: parseInt(rowIndex),
            colIndex: parseInt(colIndex),
            cellData,
        }, req.user.sub);
    }
    async batchUpdateCells(id, dto, req) {
        return this.tablesService.batchUpdateCells(id, dto, req.user.sub);
    }
    async deleteRow(id, index, req) {
        return this.tablesService.deleteRow(id, index, req.user.sub);
    }
    async deleteColumn(id, index, req) {
        return this.tablesService.deleteColumn(id, index, req.user.sub);
    }
    async insertRow(id, index, req) {
        return this.tablesService.insertRow(id, parseInt(index), req.user.sub);
    }
    async insertColumn(id, index, req) {
        return this.tablesService.insertColumn(id, parseInt(index), req.user.sub);
    }
    async createLink(id, dto, req) {
        return this.tablesService.createLink(id, dto, req.user.sub);
    }
    async updateMatrixFormulas(id, formulas, req) {
        return this.tablesService.updateMatrixFormulas(id, formulas, req.user.sub);
    }
    async getDonorStatus(id, req) {
        return this.tablesService.getDonorStatus(id, req.user.sub);
    }
};
exports.TablesController = TablesController;
__decorate([
    (0, common_1.Post)('workspaces/:workspaceId/tables'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new table in workspace' }),
    (0, swagger_1.ApiParam)({ name: 'workspaceId', type: 'string' }),
    __param(0, (0, common_1.Param)('workspaceId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tables_dto_1.CreateTableDto, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('workspaces/:workspaceId/tables'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tables in workspace' }),
    (0, swagger_1.ApiParam)({ name: 'workspaceId', type: 'string' }),
    (0, swagger_1.ApiQuery)({ name: 'groupId', required: false, type: 'string' }),
    __param(0, (0, common_1.Param)('workspaceId')),
    __param(1, (0, common_1.Query)('groupId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('tables/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get table by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('tables/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update table' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tables_dto_1.UpdateTableDto, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('tables/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete table' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('tables/:id/versions'),
    (0, swagger_1.ApiOperation)({ summary: 'Create new version' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tables_dto_1.CreateVersionDto, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "createVersion", null);
__decorate([
    (0, common_1.Get)('tables/:id/versions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get version history' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "getVersionHistory", null);
__decorate([
    (0, common_1.Post)('versions/:id/activate'),
    (0, swagger_1.ApiOperation)({ summary: 'Activate version' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "activateVersion", null);
__decorate([
    (0, common_1.Get)('versions/:id/cells'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cells with pagination' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tables_dto_1.GetCellsQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "getCells", null);
__decorate([
    (0, common_1.Patch)('versions/:id/cells/:rowIndex/:colIndex'),
    (0, swagger_1.ApiOperation)({ summary: 'Update single cell' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'rowIndex', type: 'number' }),
    (0, swagger_1.ApiParam)({ name: 'colIndex', type: 'number' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('rowIndex')),
    __param(2, (0, common_1.Param)('colIndex')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "updateCell", null);
__decorate([
    (0, common_1.Post)('versions/:id/cells/batch'),
    (0, swagger_1.ApiOperation)({ summary: 'Batch update cells' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tables_dto_1.BatchUpdateCellsDto, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "batchUpdateCells", null);
__decorate([
    (0, common_1.Delete)('versions/:id/rows/:index'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a row and shift following rows' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'index', type: 'number' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "deleteRow", null);
__decorate([
    (0, common_1.Delete)('versions/:id/columns/:index'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a column and shift following columns' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'index', type: 'number' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "deleteColumn", null);
__decorate([
    (0, common_1.Post)('versions/:id/rows/:index'),
    (0, swagger_1.ApiOperation)({ summary: 'Insert a new row and shift following rows' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'index', type: 'number' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "insertRow", null);
__decorate([
    (0, common_1.Post)('versions/:id/columns/:index'),
    (0, swagger_1.ApiOperation)({ summary: 'Insert a new column and shift following columns' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    (0, swagger_1.ApiParam)({ name: 'index', type: 'number' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('index')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "insertColumn", null);
__decorate([
    (0, common_1.Post)('tables/:id/links'),
    (0, swagger_1.ApiOperation)({
        summary: 'Connect table to donor (another table or catalog)',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, tables_dto_1.CreateLinkDto, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "createLink", null);
__decorate([
    (0, common_1.Patch)('versions/:id/matrix-formulas'),
    (0, swagger_1.ApiOperation)({ summary: 'Update range/matrix formulas for a version' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "updateMatrixFormulas", null);
__decorate([
    (0, common_1.Get)('tables/:id/donor-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Check if donor data has changed' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TablesController.prototype, "getDonorStatus", null);
exports.TablesController = TablesController = __decorate([
    (0, swagger_1.ApiTags)('Tables'),
    (0, common_1.Controller)('tables'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [tables_service_1.TablesService])
], TablesController);
//# sourceMappingURL=tables.controller.js.map