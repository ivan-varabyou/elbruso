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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablesService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const kysely_1 = require("kysely");
const audit_service_1 = require("../../audit/services/audit.service");
const indicator_groups_service_1 = require("../../indicators/services/indicator-groups.service");
const indicators_service_1 = require("../../indicators/services/indicators.service");
const regions_service_1 = require("../../regions/services/regions.service");
const sports_service_1 = require("../../sports/services/sports.service");
const workspace_dto_1 = require("../../workspace/dto/workspace.dto");
const workspace_service_1 = require("../../workspace/services/workspace.service");
const database_service_1 = require("../../../../../database/src/database.service");
const formula_service_1 = require("./formula.service");
let TablesService = class TablesService {
    constructor(db, workspaceService, auditService, formulaService, regionsService, sportsService, indicatorsService, indicatorGroupsService, eventEmitter) {
        this.db = db;
        this.workspaceService = workspaceService;
        this.auditService = auditService;
        this.formulaService = formulaService;
        this.regionsService = regionsService;
        this.sportsService = sportsService;
        this.indicatorsService = indicatorsService;
        this.indicatorGroupsService = indicatorGroupsService;
        this.eventEmitter = eventEmitter;
    }
    async create(workspaceId, dto, userId) {
        await this.workspaceService.checkPermission(workspaceId, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        if (dto.groupId) {
            const group = await this.db.client
                .selectFrom('workspace_groups')
                .select('id')
                .where('id', '=', dto.groupId)
                .where('workspace_id', '=', workspaceId)
                .executeTakeFirst();
            if (!group) {
                throw new common_1.BadRequestException('Group not found');
            }
        }
        const initialRows = dto.initialRows || 10;
        const initialColumns = dto.initialColumns || 5;
        const table = (await this.db.client
            .insertInto('dynamic_tables')
            .values({
            workspace_id: workspaceId,
            group_id: dto.groupId || null,
            name: dto.name,
            description: dto.description || null,
            row_count: initialRows,
            column_count: initialColumns,
            created_by: userId,
        })
            .returningAll()
            .executeTakeFirst());
        if (!table) {
            throw new common_1.BadRequestException('Failed to create table');
        }
        const defaultColumns = Array.from({ length: initialColumns }, (_, i) => ({
            name: `Column ${String.fromCharCode(65 + i)}`,
            type: 'string',
            width: 150,
        }));
        const version = (await this.db.client
            .insertInto('table_versions')
            .values({
            table_id: table.id,
            version_number: 1,
            columns: JSON.stringify(defaultColumns),
            is_active: true,
            created_by: userId,
        })
            .returningAll()
            .executeTakeFirst());
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.TABLE_CREATE,
            entityType: 'DynamicTable',
            entityId: table.id,
            details: { name: table.name, workspaceId },
        });
        return { ...table, activeVersion: version };
    }
    async findAll(workspaceId, userId, groupId) {
        await this.workspaceService.checkPermission(workspaceId, userId, workspace_dto_1.WorkspaceRole.VIEWER);
        let query = this.db.client
            .selectFrom('dynamic_tables')
            .selectAll()
            .where('workspace_id', '=', workspaceId)
            .where('is_active', '=', true);
        if (groupId) {
            query = query.where('group_id', '=', groupId);
        }
        return query.execute();
    }
    async findById(id, userId) {
        const table = (await this.db.client
            .selectFrom('dynamic_tables')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst());
        if (!table) {
            throw new common_1.NotFoundException('Table not found');
        }
        await this.workspaceService.checkPermission(table.workspace_id, userId, workspace_dto_1.WorkspaceRole.VIEWER);
        const version = (await this.db.client
            .selectFrom('table_versions')
            .selectAll()
            .where('table_id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst());
        return { ...table, activeVersion: version };
    }
    async update(id, dto, userId) {
        const table = (await this.db.client
            .selectFrom('dynamic_tables')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst());
        if (!table) {
            throw new common_1.NotFoundException('Table not found');
        }
        await this.workspaceService.checkPermission(table.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const updated = (await this.db.client
            .updateTable('dynamic_tables')
            .set({
            name: dto.name || table.name,
            description: dto.description !== undefined ? dto.description : table.description,
            group_id: dto.groupId !== undefined ? dto.groupId : table.group_id,
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirst());
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.TABLE_UPDATE,
            entityType: 'DynamicTable',
            entityId: id,
            details: dto,
        });
        return updated;
    }
    async delete(id, userId) {
        const table = (await this.db.client
            .selectFrom('dynamic_tables')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst());
        if (!table) {
            throw new common_1.NotFoundException('Table not found');
        }
        await this.workspaceService.checkPermission(table.workspace_id, userId, workspace_dto_1.WorkspaceRole.OWNER);
        await this.db.client
            .updateTable('dynamic_tables')
            .set({ is_active: false })
            .where('id', '=', id)
            .execute();
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.TABLE_DELETE,
            entityType: 'DynamicTable',
            entityId: id,
        });
        return { message: 'Table deleted successfully' };
    }
    async createVersion(tableId, dto, userId) {
        const table = await this.db.client
            .selectFrom('dynamic_tables')
            .select(['workspace_id', 'row_count', 'column_count'])
            .where('id', '=', tableId)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!table) {
            throw new common_1.NotFoundException('Table not found');
        }
        await this.workspaceService.checkPermission(table.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const lastVersion = await this.db.client
            .selectFrom('table_versions')
            .select('version_number')
            .where('table_id', '=', tableId)
            .orderBy('version_number', 'desc')
            .executeTakeFirst();
        const nextVersion = lastVersion
            ? lastVersion.version_number + 1
            : 1;
        const version = (await this.db.client
            .insertInto('table_versions')
            .values({
            table_id: tableId,
            version_number: nextVersion,
            columns: JSON.stringify(dto.columnDefinitions),
            is_active: false,
            created_by: userId,
        })
            .returningAll()
            .executeTakeFirst());
        if (dto.copyDataFromVersion) {
        }
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.VERSION_CREATE,
            entityType: 'TableVersion',
            entityId: version.id,
            details: { tableId, versionNumber: nextVersion },
        });
        return version;
    }
    async getVersionHistory(tableId, userId) {
        const table = await this.db.client
            .selectFrom('dynamic_tables')
            .select('workspace_id')
            .where('id', '=', tableId)
            .executeTakeFirst();
        if (!table)
            throw new common_1.NotFoundException('Table not found');
        await this.workspaceService.checkPermission(table.workspace_id, userId, workspace_dto_1.WorkspaceRole.VIEWER);
        return this.db.client
            .selectFrom('table_versions')
            .selectAll()
            .where('table_id', '=', tableId)
            .orderBy('version_number', 'desc')
            .execute();
    }
    async activateVersion(versionId, userId) {
        const versionInfo = await this.db.client
            .selectFrom('table_versions as v')
            .innerJoin('dynamic_tables as t', 'v.table_id', 't.id')
            .select([
            'v.id',
            'v.table_id',
            'v.version_number',
            'v.columns',
            'v.is_active',
            'v.created_at',
            'v.created_by',
            't.workspace_id',
        ])
            .where('v.id', '=', versionId)
            .executeTakeFirst();
        if (!versionInfo)
            throw new common_1.NotFoundException('Version not found');
        await this.workspaceService.checkPermission(versionInfo.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        await this.db.client
            .updateTable('table_versions')
            .set({ is_active: false })
            .where('table_id', '=', versionInfo.table_id)
            .execute();
        await this.db.client
            .updateTable('table_versions')
            .set({ is_active: true })
            .where('id', '=', versionId)
            .execute();
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.VERSION_ACTIVATE,
            entityType: 'TableVersion',
            entityId: versionId,
        });
        return { message: 'Version activated' };
    }
    async getCells(versionId, query, userId) {
        const versionInfo = await this.db.client
            .selectFrom('table_versions as v')
            .innerJoin('dynamic_tables as t', 'v.table_id', 't.id')
            .select(['v.table_id', 't.workspace_id', 't.row_count', 't.column_count'])
            .where('v.id', '=', versionId)
            .executeTakeFirst();
        if (!versionInfo)
            throw new common_1.NotFoundException('Version not found');
        await this.workspaceService.checkPermission(versionInfo.workspace_id, userId, workspace_dto_1.WorkspaceRole.VIEWER);
        if (versionInfo.row_count === 0) {
            return [];
        }
        let dbQuery = this.db.client
            .selectFrom('table_cells')
            .selectAll()
            .where('version_id', '=', versionId);
        if (query.startRow !== undefined)
            dbQuery = dbQuery.where('row_index', '>=', query.startRow);
        if (query.endRow !== undefined)
            dbQuery = dbQuery.where('row_index', '<=', query.endRow);
        if (query.startCol !== undefined)
            dbQuery = dbQuery.where('col_index', '>=', query.startCol);
        if (query.endCol !== undefined)
            dbQuery = dbQuery.where('col_index', '<=', query.endCol);
        return dbQuery.execute();
    }
    async updateCell(versionId, dto, userId) {
        const versionInfo = await this.db.client
            .selectFrom('table_versions as v')
            .innerJoin('dynamic_tables as t', 'v.table_id', 't.id')
            .select(['v.table_id', 't.workspace_id'])
            .where('v.id', '=', versionId)
            .executeTakeFirst();
        if (!versionInfo)
            throw new common_1.NotFoundException('Version not found');
        await this.workspaceService.checkPermission(versionInfo.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        await this.db.client
            .insertInto('table_cells')
            .values({
            version_id: versionId,
            row_index: dto.rowIndex,
            col_index: dto.colIndex,
            cell_data: JSON.stringify(dto.cellData),
            created_by: userId,
            updated_by: userId,
        })
            .onConflict((oc) => oc
            .columns(['version_id', 'row_index', 'col_index'])
            .doUpdateSet({
            cell_data: JSON.stringify(dto.cellData),
            updated_by: userId,
            updated_at: new Date(),
        }))
            .execute();
        await this.db.client
            .updateTable('dynamic_tables')
            .set({ updated_at: new Date() })
            .where('id', '=', versionInfo.table_id)
            .execute();
        return { message: 'Cell updated' };
    }
    async batchUpdateCells(versionId, dto, userId) {
        const versionInfo = await this.db.client
            .selectFrom('table_versions as v')
            .innerJoin('dynamic_tables as t', 'v.table_id', 't.id')
            .select(['v.table_id', 't.workspace_id'])
            .where('v.id', '=', versionId)
            .executeTakeFirst();
        if (!versionInfo)
            throw new common_1.NotFoundException('Version not found');
        await this.workspaceService.checkPermission(versionInfo.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        for (const cell of dto.cells) {
            await this.updateCell(versionId, cell, userId);
        }
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.CELLS_UPDATE,
            entityType: 'TableVersion',
            entityId: versionId,
            details: { count: dto.cells.length },
        });
        await this.db.client
            .updateTable('dynamic_tables')
            .set({ updated_at: new Date() })
            .where('id', '=', versionInfo.table_id)
            .execute();
        return { message: 'Cells updated' };
    }
    async deleteRow(versionId, index, _userId) {
        const version = await this.db.client
            .selectFrom('table_versions')
            .selectAll()
            .where('id', '=', versionId)
            .executeTakeFirst();
        if (!version)
            throw new common_1.NotFoundException('Version not found');
        await this.db.client
            .deleteFrom('table_cells')
            .where('version_id', '=', versionId)
            .where('row_index', '=', index)
            .execute();
        await this.db.client
            .updateTable('table_cells')
            .set({
            row_index: (0, kysely_1.sql) `row_index - 1`,
        })
            .where('version_id', '=', versionId)
            .where('row_index', '>', index)
            .execute();
        await this.db.client
            .updateTable('dynamic_tables')
            .set({
            row_count: (0, kysely_1.sql) `row_count - 1`,
            updated_at: new Date(),
        })
            .where('id', '=', version.table_id)
            .execute();
        return { message: 'Row deleted and cells shifted' };
    }
    async deleteColumn(versionId, index, _userId) {
        const version = await this.db.client
            .selectFrom('table_versions')
            .selectAll()
            .where('id', '=', versionId)
            .executeTakeFirst();
        if (!version)
            throw new common_1.NotFoundException('Version not found');
        await this.db.client
            .deleteFrom('table_cells')
            .where('version_id', '=', versionId)
            .where('col_index', '=', index)
            .execute();
        await this.db.client
            .updateTable('table_cells')
            .set({
            col_index: (0, kysely_1.sql) `col_index - 1`,
        })
            .where('version_id', '=', versionId)
            .where('col_index', '>', index)
            .execute();
        const cols = version.columns;
        const newCols = cols.filter((_, i) => i !== index);
        await this.db.client
            .updateTable('table_versions')
            .set({
            columns: JSON.stringify(newCols),
        })
            .where('id', '=', versionId)
            .execute();
        await this.db.client
            .updateTable('dynamic_tables')
            .set({
            column_count: (0, kysely_1.sql) `column_count - 1`,
            updated_at: new Date(),
        })
            .where('id', '=', version.table_id)
            .execute();
        return { message: 'Column deleted and cells shifted' };
    }
    async insertRow(versionId, index, _userId) {
        const version = await this.db.client
            .selectFrom('table_versions')
            .selectAll()
            .where('id', '=', versionId)
            .executeTakeFirst();
        if (!version)
            throw new common_1.NotFoundException('Version not found');
        await this.db.client
            .updateTable('table_cells')
            .set({
            row_index: (0, kysely_1.sql) `row_index + 1`,
        })
            .where('version_id', '=', versionId)
            .where('row_index', '>=', index)
            .execute();
        await this.db.client
            .updateTable('dynamic_tables')
            .set({
            row_count: (0, kysely_1.sql) `row_count + 1`,
            updated_at: new Date(),
        })
            .where('id', '=', version.table_id)
            .execute();
        return { message: 'Row inserted and cells shifted' };
    }
    async insertColumn(versionId, index, _userId) {
        const version = await this.db.client
            .selectFrom('table_versions')
            .selectAll()
            .where('id', '=', versionId)
            .executeTakeFirst();
        if (!version)
            throw new common_1.NotFoundException('Version not found');
        await this.db.client
            .updateTable('table_cells')
            .set({
            col_index: (0, kysely_1.sql) `col_index + 1`,
        })
            .where('version_id', '=', versionId)
            .where('col_index', '>=', index)
            .execute();
        const cols = version.columns;
        const newCol = { name: `New Column`, type: 'string', width: 150 };
        cols.splice(index, 0, newCol);
        await this.db.client
            .updateTable('table_versions')
            .set({
            columns: JSON.stringify(cols),
        })
            .where('id', '=', versionId)
            .execute();
        await this.db.client
            .updateTable('dynamic_tables')
            .set({
            column_count: (0, kysely_1.sql) `column_count + 1`,
            updated_at: new Date(),
        })
            .where('id', '=', version.table_id)
            .execute();
        return { message: 'Column inserted and cells shifted' };
    }
    async createLink(targetTableId, dto, userId) {
        const table = await this.db.client
            .selectFrom('dynamic_tables')
            .select('workspace_id')
            .where('id', '=', targetTableId)
            .executeTakeFirst();
        if (!table)
            throw new common_1.NotFoundException('Target table not found');
        await this.workspaceService.checkPermission(table.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const link = (await this.db.client
            .insertInto('table_links')
            .values({
            target_table_id: targetTableId,
            source_table_id: dto.sourceTableId || null,
            source_system_entity: dto.sourceSystemEntity || null,
            link_type: dto.linkType,
            link_metadata: JSON.stringify(dto.metadata || {}),
        })
            .returningAll()
            .executeTakeFirst());
        if (link && link.source_system_entity) {
            this.eventEmitter.emit('table.link.created', { linkId: link.id, userId });
        }
        return link;
    }
    async handleLinkCreatedSync(payload) {
        try {
            await this.syncLinkData(payload.linkId, payload.userId);
        }
        catch (error) {
            console.error(`Failed to sync link ${payload.linkId}:`, error);
        }
    }
    async syncLinkData(linkId, userId) {
        const link = await this.db.client
            .selectFrom('table_links')
            .selectAll()
            .where('id', '=', linkId)
            .executeTakeFirst();
        if (!link)
            throw new common_1.NotFoundException('Link not found');
        const table = await this.findById(link.target_table_id, userId);
        const version = table.activeVersion;
        if (!version)
            return;
        const metadata = link.link_metadata;
        const mappings = metadata.mappings || [];
        if (mappings.length === 0)
            return;
        let data = [];
        const filters = metadata.filter || {};
        if (link.source_system_entity === 'regions') {
            data = await this.regionsService.findAll(filters);
        }
        else if (link.source_system_entity === 'sports') {
            data = await this.sportsService.findAll(filters);
        }
        else if (link.source_system_entity === 'indicators') {
            data = await this.indicatorsService.findAll(filters);
        }
        else if (link.source_system_entity === 'indicator-groups') {
            data = await this.indicatorGroupsService.findAll(filters);
        }
        const batchCells = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            for (const mapping of mappings) {
                batchCells.push({
                    rowIndex: i,
                    colIndex: mapping.targetColIndex,
                    cellData: { value: item[mapping.sourceField] },
                });
            }
        }
        if (batchCells.length > 0) {
            await this.batchUpdateCells(version.id, { cells: batchCells }, userId);
        }
        if (data.length > table.row_count) {
            await this.db.client
                .updateTable('dynamic_tables')
                .set({ row_count: data.length })
                .where('id', '=', table.id)
                .execute();
        }
        await this.db.client
            .updateTable('table_links')
            .set({ updated_at: new Date() })
            .where('id', '=', linkId)
            .execute();
    }
    async updateMatrixFormulas(versionId, formulas, userId) {
        const version = await this.db.client
            .selectFrom('table_versions')
            .select('table_id')
            .where('id', '=', versionId)
            .executeTakeFirst();
        if (!version)
            throw new common_1.NotFoundException('Version not found');
        const table = await this.db.client
            .selectFrom('dynamic_tables')
            .select('workspace_id')
            .where('id', '=', version.table_id)
            .executeTakeFirst();
        await this.workspaceService.checkPermission(table.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        await this.db.client
            .updateTable('table_versions')
            .set({
            matrix_formulas: JSON.stringify(formulas),
        })
            .where('id', '=', versionId)
            .execute();
        return { message: 'Matrix formulas updated' };
    }
    async getDonorStatus(tableId, _userId) {
        const linksWithDonors = await this.db.client
            .selectFrom('table_links as l')
            .leftJoin('dynamic_tables as d', 'l.source_table_id', 'd.id')
            .select([
            'l.id',
            'l.source_table_id',
            'l.source_system_entity',
            'l.updated_at',
            'd.updated_at as donor_updated_at',
        ])
            .where('l.target_table_id', '=', tableId)
            .execute();
        const statuses = linksWithDonors.map((link) => {
            let status = 'up_to_date';
            if (link.source_table_id) {
                if (link.updated_at && link.donor_updated_at) {
                    if (new Date(link.donor_updated_at) > new Date(link.updated_at)) {
                        status = 'outdated';
                    }
                }
            }
            else if (link.source_system_entity) {
                status = link.updated_at ? 'up_to_date' : 'outdated';
            }
            return {
                linkId: link.id,
                source: link.source_system_entity || link.source_table_id,
                status,
                lastUpdated: link.updated_at,
            };
        });
        return statuses;
    }
};
exports.TablesService = TablesService;
__decorate([
    (0, event_emitter_1.OnEvent)('table.link.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TablesService.prototype, "handleLinkCreatedSync", null);
exports.TablesService = TablesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        workspace_service_1.WorkspaceService,
        audit_service_1.AuditService,
        formula_service_1.FormulaService,
        regions_service_1.RegionsService,
        sports_service_1.SportsService,
        indicators_service_1.IndicatorsService,
        indicator_groups_service_1.IndicatorGroupsService,
        event_emitter_1.EventEmitter2])
], TablesService);
//# sourceMappingURL=tables.service.js.map