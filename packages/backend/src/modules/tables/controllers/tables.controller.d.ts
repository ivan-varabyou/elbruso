import { CreateTableDto, UpdateTableDto, CreateVersionDto, BatchUpdateCellsDto, GetCellsQueryDto, CreateLinkDto, MatrixFormulaDto } from '../dto/tables.dto';
import { TablesService } from '../services/tables.service';
export declare class TablesController {
    private readonly tablesService;
    constructor(tablesService: TablesService);
    create(workspaceId: string, dto: CreateTableDto, req: any): Promise<{
        activeVersion: import("@database/types").TableVersions;
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
    findAll(workspaceId: string, groupId: string | undefined, req: any): Promise<import("@database/types").DynamicTables[]>;
    findOne(id: string, req: any): Promise<{
        activeVersion: import("@database/types").TableVersions;
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
    update(id: string, dto: UpdateTableDto, req: any): Promise<import("@database/types").DynamicTables>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
    createVersion(id: string, dto: CreateVersionDto, req: any): Promise<import("@database/types").TableVersions>;
    getVersionHistory(id: string, req: any): Promise<import("@database/types").TableVersions[]>;
    activateVersion(id: string, req: any): Promise<{
        message: string;
    }>;
    getCells(id: string, query: GetCellsQueryDto, req: any): Promise<import("@database/types").TableCells[]>;
    updateCell(id: string, rowIndex: string, colIndex: string, cellData: any, req: any): Promise<{
        message: string;
    }>;
    batchUpdateCells(id: string, dto: BatchUpdateCellsDto, req: any): Promise<{
        message: string;
    }>;
    deleteRow(id: string, index: number, req: any): Promise<{
        message: string;
    }>;
    deleteColumn(id: string, index: number, req: any): Promise<{
        message: string;
    }>;
    insertRow(id: string, index: string, req: any): Promise<{
        message: string;
    }>;
    insertColumn(id: string, index: string, req: any): Promise<{
        message: string;
    }>;
    createLink(id: string, dto: CreateLinkDto, req: any): Promise<any>;
    updateMatrixFormulas(id: string, formulas: MatrixFormulaDto[], req: any): Promise<{
        message: string;
    }>;
    getDonorStatus(id: string, req: any): Promise<{
        linkId: string;
        source: string;
        status: string;
        lastUpdated: Date;
    }[]>;
}
