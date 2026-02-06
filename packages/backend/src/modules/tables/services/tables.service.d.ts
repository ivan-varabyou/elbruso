import { EventEmitter2 } from '@nestjs/event-emitter';
import { DynamicTables, TableVersions, TableCells } from '@database';
import { AuditService } from '@backend/modules/audit/services/audit.service';
import { IndicatorGroupsService } from '@backend/modules/indicators/services/indicator-groups.service';
import { IndicatorsService } from '@backend/modules/indicators/services/indicators.service';
import { RegionsService } from '@backend/modules/regions/services/regions.service';
import { SportsService } from '@backend/modules/sports/services/sports.service';
import { WorkspaceService } from '@backend/modules/workspace/services/workspace.service';
import { DatabaseService } from '@database/database.service';
import { CreateTableDto, UpdateTableDto, CreateVersionDto, UpdateCellDto, BatchUpdateCellsDto, GetCellsQueryDto, CreateLinkDto, MatrixFormulaDto } from '../dto/tables.dto';
import { FormulaService } from './formula.service';
export declare class TablesService {
    private readonly db;
    private readonly workspaceService;
    private readonly auditService;
    private readonly formulaService;
    private readonly regionsService;
    private readonly sportsService;
    private readonly indicatorsService;
    private readonly indicatorGroupsService;
    private readonly eventEmitter;
    constructor(db: DatabaseService, workspaceService: WorkspaceService, auditService: AuditService, formulaService: FormulaService, regionsService: RegionsService, sportsService: SportsService, indicatorsService: IndicatorsService, indicatorGroupsService: IndicatorGroupsService, eventEmitter: EventEmitter2);
    create(workspaceId: string, dto: CreateTableDto, userId: string): Promise<{
        activeVersion: TableVersions;
        column_count: import("@database/types").Generated<number | null>;
        created_at: import("@database/types").Generated<import("@database/types").Timestamp | null>;
        created_by: string | null;
        description: string | null;
        group_id: string | null;
        id: import("@database/types").Generated<string>;
        is_active: import("@database/types").Generated<boolean | null>;
        is_reference: import("@database/types").Generated<boolean | null>;
        metadata: import("@database/types").Generated<import("@database/types").Json | null>;
        name: string;
        reference_type: string | null;
        row_count: import("@database/types").Generated<number | null>;
        updated_at: import("@database/types").Generated<import("@database/types").Timestamp | null>;
        workspace_id: string;
    }>;
    findAll(workspaceId: string, userId: string, groupId?: string): Promise<DynamicTables[]>;
    findById(id: string, userId: string): Promise<{
        activeVersion: TableVersions;
        column_count: import("@database/types").Generated<number | null>;
        created_at: import("@database/types").Generated<import("@database/types").Timestamp | null>;
        created_by: string | null;
        description: string | null;
        group_id: string | null;
        id: import("@database/types").Generated<string>;
        is_active: import("@database/types").Generated<boolean | null>;
        is_reference: import("@database/types").Generated<boolean | null>;
        metadata: import("@database/types").Generated<import("@database/types").Json | null>;
        name: string;
        reference_type: string | null;
        row_count: import("@database/types").Generated<number | null>;
        updated_at: import("@database/types").Generated<import("@database/types").Timestamp | null>;
        workspace_id: string;
    }>;
    update(id: string, dto: UpdateTableDto, userId: string): Promise<DynamicTables>;
    delete(id: string, userId: string): Promise<{
        message: string;
    }>;
    createVersion(tableId: string, dto: CreateVersionDto, userId: string): Promise<TableVersions>;
    getVersionHistory(tableId: string, userId: string): Promise<TableVersions[]>;
    activateVersion(versionId: string, userId: string): Promise<{
        message: string;
    }>;
    getCells(versionId: string, query: GetCellsQueryDto, userId: string): Promise<TableCells[]>;
    updateCell(versionId: string, dto: UpdateCellDto, userId: string): Promise<{
        message: string;
    }>;
    batchUpdateCells(versionId: string, dto: BatchUpdateCellsDto, userId: string): Promise<{
        message: string;
    }>;
    deleteRow(versionId: string, index: number, _userId: string): Promise<{
        message: string;
    }>;
    deleteColumn(versionId: string, index: number, _userId: string): Promise<{
        message: string;
    }>;
    insertRow(versionId: string, index: number, _userId: string): Promise<{
        message: string;
    }>;
    insertColumn(versionId: string, index: number, _userId: string): Promise<{
        message: string;
    }>;
    createLink(targetTableId: string, dto: CreateLinkDto, userId: string): Promise<any>;
    handleLinkCreatedSync(payload: {
        linkId: string;
        userId: string;
    }): Promise<void>;
    syncLinkData(linkId: string, userId: string): Promise<void>;
    updateMatrixFormulas(versionId: string, formulas: MatrixFormulaDto[], userId: string): Promise<{
        message: string;
    }>;
    getDonorStatus(tableId: string, _userId: string): Promise<{
        linkId: string;
        source: string;
        status: string;
        lastUpdated: Date;
    }[]>;
}
