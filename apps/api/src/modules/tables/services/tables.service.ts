/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { sql } from 'kysely';
import { DatabaseService } from '@database/database.service';
import { WorkspaceService } from '../../workspace/services/workspace.service';
import { AuditService, AuditAction } from '../../audit/services/audit.service';
import { FormulaService } from './formula.service';
import { WorkspaceRole } from '../../workspace/dto/workspace.dto';
import { RegionsService } from '../../regions/services/regions.service';
import { SportsService } from '../../sports/services/sports.service';
import { IndicatorsService } from '../../indicators/services/indicators.service';
import { IndicatorGroupsService } from '../../indicators/services/indicator-groups.service';
import {
  CreateTableDto,
  UpdateTableDto,
  CreateVersionDto,
  UpdateCellDto,
  BatchUpdateCellsDto,
  GetCellsQueryDto,
  CreateLinkDto,
  MatrixFormulaDto,
} from '../dto/tables.dto';
import { DynamicTables, TableVersions, TableCells } from '@elbruso/database';

@Injectable()
export class TablesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly workspaceService: WorkspaceService,
    private readonly auditService: AuditService,
    private readonly formulaService: FormulaService,
    private readonly regionsService: RegionsService,
    private readonly sportsService: SportsService,
    private readonly indicatorsService: IndicatorsService,
    private readonly indicatorGroupsService: IndicatorGroupsService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // ==================== Table Management ====================

  async create(workspaceId: string, dto: CreateTableDto, userId: string) {
    await this.workspaceService.checkPermission(
      workspaceId,
      userId,
      WorkspaceRole.EDITOR,
    );

    if (dto.groupId) {
      const group = await this.db.client
        .selectFrom('workspace_groups')
        .select('id')
        .where('id', '=', dto.groupId as any)
        .where('workspace_id', '=', workspaceId as any)
        .executeTakeFirst();

      if (!group) {
        throw new BadRequestException('Group not found');
      }
    }

    const initialRows = dto.initialRows || 10;
    const initialColumns = dto.initialColumns || 5;

    const table = (await this.db.client
      .insertInto('dynamic_tables')
      .values({
        workspace_id: workspaceId as any,
        group_id: dto.groupId || null,
        name: dto.name,
        description: dto.description || null,
        row_count: initialRows,
        column_count: initialColumns,
        created_by: userId as any,
      })
      .returningAll()
      .executeTakeFirst()) as unknown as DynamicTables;

    if (!table) {
      throw new BadRequestException('Failed to create table');
    }

    const defaultColumns = Array.from({ length: initialColumns }, (_, i) => ({
      name: `Column ${String.fromCharCode(65 + i)}`,
      type: 'string',
      width: 150,
    }));

    const version = (await this.db.client
      .insertInto('table_versions')
      .values({
        table_id: table.id as any,
        version_number: 1,
        columns: JSON.stringify(defaultColumns),
        is_active: true,
        created_by: userId as any,
      } as any)
      .returningAll()
      .executeTakeFirst()) as unknown as TableVersions;

    await this.auditService.log({
      userId,
      action: AuditAction.TABLE_CREATE,
      entityType: 'DynamicTable',
      entityId: table.id as any,
      details: { name: table.name, workspaceId },
    });

    return { ...table, activeVersion: version };
  }

  async findAll(workspaceId: string, userId: string, groupId?: string) {
    await this.workspaceService.checkPermission(
      workspaceId,
      userId,
      WorkspaceRole.VIEWER,
    );

    let query = this.db.client
      .selectFrom('dynamic_tables')
      .selectAll()
      .where('workspace_id', '=', workspaceId as any)
      .where('is_active', '=', true);

    if (groupId) {
      query = query.where('group_id', '=', groupId as any);
    }

    return query.execute() as unknown as DynamicTables[];
  }

  async findById(id: string, userId: string) {
    const table = (await this.db.client
      .selectFrom('dynamic_tables')
      .selectAll()
      .where('id', '=', id as any)
      .where('is_active', '=', true)
      .executeTakeFirst()) as unknown as DynamicTables;

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    await this.workspaceService.checkPermission(
      table.workspace_id as any,
      userId,
      WorkspaceRole.VIEWER,
    );

    const version = (await this.db.client
      .selectFrom('table_versions')
      .selectAll()
      .where('table_id', '=', id as any)
      .where('is_active', '=', true)
      .executeTakeFirst()) as unknown as TableVersions;

    return { ...table, activeVersion: version };
  }

  async update(id: string, dto: UpdateTableDto, userId: string) {
    const table = (await this.db.client
      .selectFrom('dynamic_tables')
      .selectAll()
      .where('id', '=', id as any)
      .where('is_active', '=', true)
      .executeTakeFirst()) as unknown as DynamicTables;

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    await this.workspaceService.checkPermission(
      table.workspace_id as any,
      userId,
      WorkspaceRole.EDITOR,
    );

    const updated = (await this.db.client
      .updateTable('dynamic_tables')
      .set({
        name: dto.name || table.name,
        description:
          dto.description !== undefined ? dto.description : table.description,
        group_id: dto.groupId !== undefined ? dto.groupId : table.group_id,
        updated_at: new Date(),
      } as any)
      .where('id', '=', id as any)
      .returningAll()
      .executeTakeFirst()) as unknown as DynamicTables;

    await this.auditService.log({
      userId,
      action: AuditAction.TABLE_UPDATE,
      entityType: 'DynamicTable',
      entityId: id as any,
      details: dto,
    });

    return updated;
  }

  async delete(id: string, userId: string) {
    const table = (await this.db.client
      .selectFrom('dynamic_tables')
      .selectAll()
      .where('id', '=', id as any)
      .where('is_active', '=', true)
      .executeTakeFirst()) as unknown as DynamicTables;

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    await this.workspaceService.checkPermission(
      table.workspace_id as any,
      userId,
      WorkspaceRole.OWNER,
    );

    await this.db.client
      .updateTable('dynamic_tables')
      .set({ is_active: false } as any)
      .where('id', '=', id as any)
      .execute();

    await this.auditService.log({
      userId,
      action: AuditAction.TABLE_DELETE,
      entityType: 'DynamicTable',
      entityId: id as any,
    });

    return { message: 'Table deleted successfully' };
  }

  // ==================== Version Management ====================

  async createVersion(tableId: string, dto: CreateVersionDto, userId: string) {
    const table = await this.db.client
      .selectFrom('dynamic_tables')
      .select(['workspace_id', 'row_count', 'column_count'])
      .where('id', '=', tableId as any)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!table) {
      throw new NotFoundException('Table not found');
    }

    await this.workspaceService.checkPermission(
      (table as any).workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    const lastVersion = await this.db.client
      .selectFrom('table_versions')
      .select('version_number')
      .where('table_id', '=', tableId as any)
      .orderBy('version_number', 'desc')
      .executeTakeFirst();

    const nextVersion = lastVersion
      ? (lastVersion as any).version_number + 1
      : 1;

    const version = (await this.db.client
      .insertInto('table_versions')
      .values({
        table_id: tableId as any,
        version_number: nextVersion,
        columns: JSON.stringify(dto.columnDefinitions),
        is_active: false,
        created_by: userId as any,
      } as any)
      .returningAll()
      .executeTakeFirst()) as unknown as TableVersions;

    if (dto.copyDataFromVersion) {
      // Logic for copying cells would go here
    }

    await this.auditService.log({
      userId,
      action: AuditAction.VERSION_CREATE,
      entityType: 'TableVersion',
      entityId: version.id as any,
      details: { tableId, versionNumber: nextVersion },
    });

    return version;
  }

  async getVersionHistory(tableId: string, userId: string) {
    const table = await this.db.client
      .selectFrom('dynamic_tables')
      .select('workspace_id')
      .where('id', '=', tableId as any)
      .executeTakeFirst();

    if (!table) throw new NotFoundException('Table not found');

    await this.workspaceService.checkPermission(
      (table as any).workspace_id,
      userId,
      WorkspaceRole.VIEWER,
    );

    return this.db.client
      .selectFrom('table_versions')
      .selectAll()
      .where('table_id', '=', tableId as any)
      .orderBy('version_number', 'desc')
      .execute() as unknown as TableVersions[];
  }

  async activateVersion(versionId: string, userId: string) {
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
      .where('v.id', '=', versionId as any)
      .executeTakeFirst();

    if (!versionInfo) throw new NotFoundException('Version not found');

    await this.workspaceService.checkPermission(
      (versionInfo as any).workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    await this.db.client
      .updateTable('table_versions')
      .set({ is_active: false } as any)
      .where('table_id', '=', (versionInfo as any).table_id)
      .execute();

    await this.db.client
      .updateTable('table_versions')
      .set({ is_active: true } as any)
      .where('id', '=', versionId as any)
      .execute();

    await this.auditService.log({
      userId,
      action: AuditAction.VERSION_ACTIVATE,
      entityType: 'TableVersion',
      entityId: versionId as any,
    });

    return { message: 'Version activated' };
  }

  // ==================== Cell Operations ====================

  async getCells(versionId: string, query: GetCellsQueryDto, userId: string) {
    const versionInfo = await this.db.client
      .selectFrom('table_versions as v')
      .innerJoin('dynamic_tables as t', 'v.table_id', 't.id')
      .select(['v.table_id', 't.workspace_id', 't.row_count', 't.column_count'])
      .where('v.id', '=', versionId as any)
      .executeTakeFirst();

    if (!versionInfo) throw new NotFoundException('Version not found');

    await this.workspaceService.checkPermission(
      (versionInfo as any).workspace_id,
      userId,
      WorkspaceRole.VIEWER,
    );

    if ((versionInfo as any).row_count === 0) {
      return [];
    }

    let dbQuery = this.db.client
      .selectFrom('table_cells')
      .selectAll()
      .where('version_id', '=', versionId as any);

    if (query.startRow !== undefined)
      dbQuery = dbQuery.where('row_index', '>=', query.startRow);
    if (query.endRow !== undefined)
      dbQuery = dbQuery.where('row_index', '<=', query.endRow);
    if (query.startCol !== undefined)
      dbQuery = dbQuery.where('col_index', '>=', query.startCol);
    if (query.endCol !== undefined)
      dbQuery = dbQuery.where('col_index', '<=', query.endCol);

    return dbQuery.execute() as unknown as TableCells[];
  }

  async updateCell(versionId: string, dto: UpdateCellDto, userId: string) {
    const versionInfo = await this.db.client
      .selectFrom('table_versions as v')
      .innerJoin('dynamic_tables as t', 'v.table_id', 't.id')
      .select(['v.table_id', 't.workspace_id'])
      .where('v.id', '=', versionId as any)
      .executeTakeFirst();

    if (!versionInfo) throw new NotFoundException('Version not found');

    await this.workspaceService.checkPermission(
      (versionInfo as any).workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    await this.db.client
      .insertInto('table_cells')
      .values({
        version_id: versionId as any,
        row_index: dto.rowIndex,
        col_index: dto.colIndex,
        cell_data: JSON.stringify(dto.cellData),
        created_by: userId as any,
        updated_by: userId as any,
      } as any)
      .onConflict((oc) =>
        oc
          .columns(['version_id', 'row_index', 'col_index'] as any)
          .doUpdateSet({
            cell_data: JSON.stringify(dto.cellData),
            updated_by: userId as any,
            updated_at: new Date(),
          } as any),
      )
      .execute();

    await this.db.client
      .updateTable('dynamic_tables')
      .set({ updated_at: new Date() } as any)
      .where('id', '=', (versionInfo as any).table_id)
      .execute();

    return { message: 'Cell updated' };
  }

  async batchUpdateCells(
    versionId: string,
    dto: BatchUpdateCellsDto,
    userId: string,
  ) {
    const versionInfo = await this.db.client
      .selectFrom('table_versions as v')
      .innerJoin('dynamic_tables as t', 'v.table_id', 't.id')
      .select(['v.table_id', 't.workspace_id'])
      .where('v.id', '=', versionId as any)
      .executeTakeFirst();

    if (!versionInfo) throw new NotFoundException('Version not found');

    await this.workspaceService.checkPermission(
      (versionInfo as any).workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    for (const cell of dto.cells) {
      await this.updateCell(versionId, cell, userId);
    }

    await this.auditService.log({
      userId,
      action: AuditAction.CELLS_UPDATE,
      entityType: 'TableVersion',
      entityId: versionId as any,
      details: { count: dto.cells.length },
    });

    await this.db.client
      .updateTable('dynamic_tables')
      .set({ updated_at: new Date() } as any)
      .where('id', '=', (versionInfo as any).table_id)
      .execute();

    return { message: 'Cells updated' };
  }

  async deleteRow(versionId: string, index: number, userId: string) {
    const version = await this.db.client
      .selectFrom('table_versions')
      .selectAll()
      .where('id', '=', versionId as any)
      .executeTakeFirst();

    if (!version) throw new NotFoundException('Version not found');

    // 1. Delete cells at index
    await this.db.client
      .deleteFrom('table_cells')
      .where('version_id', '=', versionId as any)
      .where('row_index', '=', index)
      .execute();

    // 2. Shift following cells
    await this.db.client
      .updateTable('table_cells')
      .set({
        row_index: sql`row_index - 1`,
      } as any)
      .where('version_id', '=', versionId as any)
      .where('row_index', '>', index)
      .execute();

    // 3. Update table row count
    await this.db.client
      .updateTable('dynamic_tables')
      .set({
        row_count: sql`row_count - 1`,
        updated_at: new Date(),
      } as any)
      .where('id', '=', (version as any).table_id)
      .execute();

    // 4. (Optional) Adjust matrix formulas
    // For now, we log the need for recalculation or manually adjust if they use specific ranges.
    // Basic: just refresh updated_at will trigger donor-status 'outdated' for dependents.

    return { message: 'Row deleted and cells shifted' };
  }

  async deleteColumn(versionId: string, index: number, userId: string) {
    const version = await this.db.client
      .selectFrom('table_versions')
      .selectAll()
      .where('id', '=', versionId as any)
      .executeTakeFirst();

    if (!version) throw new NotFoundException('Version not found');

    // 1. Delete cells at index
    await this.db.client
      .deleteFrom('table_cells')
      .where('version_id', '=', versionId as any)
      .where('col_index', '=', index)
      .execute();

    // 2. Shift following cells
    await this.db.client
      .updateTable('table_cells')
      .set({
        col_index: sql`col_index - 1`,
      } as any)
      .where('version_id', '=', versionId as any)
      .where('col_index', '>', index)
      .execute();

    // 3. Update version columns structure
    const cols = (version as any).columns as any[];
    const newCols = cols.filter((_, i) => i !== index);

    await this.db.client
      .updateTable('table_versions')
      .set({
        columns: JSON.stringify(newCols),
      } as any)
      .where('id', '=', versionId as any)
      .execute();

    // 4. Update table column count
    await this.db.client
      .updateTable('dynamic_tables')
      .set({
        column_count: sql`column_count - 1`,
        updated_at: new Date(),
      } as any)
      .where('id', '=', (version as any).table_id)
      .execute();

    return { message: 'Column deleted and cells shifted' };
  }

  async insertRow(versionId: string, index: number, userId: string) {
    const version = await this.db.client
      .selectFrom('table_versions')
      .selectAll()
      .where('id', '=', versionId as any)
      .executeTakeFirst();

    if (!version) throw new NotFoundException('Version not found');

    // 1. Shift cells down (starting from bottom to avoid conflicts if we had unique constraints on indices, but Kysely handles updates fine)
    await this.db.client
      .updateTable('table_cells')
      .set({
        row_index: sql`row_index + 1`,
      } as any)
      .where('version_id', '=', versionId as any)
      .where('row_index', '>=', index)
      .execute();

    // 2. Update table row count
    await this.db.client
      .updateTable('dynamic_tables')
      .set({
        row_count: sql`row_count + 1`,
        updated_at: new Date(),
      } as any)
      .where('id', '=', (version as any).table_id)
      .execute();

    return { message: 'Row inserted and cells shifted' };
  }

  async insertColumn(versionId: string, index: number, userId: string) {
    const version = await this.db.client
      .selectFrom('table_versions')
      .selectAll()
      .where('id', '=', versionId as any)
      .executeTakeFirst();

    if (!version) throw new NotFoundException('Version not found');

    // 1. Shift cells right
    await this.db.client
      .updateTable('table_cells')
      .set({
        col_index: sql`col_index + 1`,
      } as any)
      .where('version_id', '=', versionId as any)
      .where('col_index', '>=', index)
      .execute();

    // 2. Update version columns structure (insert default column)
    const cols = (version as any).columns as any[];
    const newCol = { name: `New Column`, type: 'string', width: 150 };
    cols.splice(index, 0, newCol);

    await this.db.client
      .updateTable('table_versions')
      .set({
        columns: JSON.stringify(cols),
      } as any)
      .where('id', '=', versionId as any)
      .execute();

    // 3. Update table column count
    await this.db.client
      .updateTable('dynamic_tables')
      .set({
        column_count: sql`column_count + 1`,
        updated_at: new Date(),
      } as any)
      .where('id', '=', (version as any).table_id)
      .execute();

    return { message: 'Column inserted and cells shifted' };
  }

  // ==================== Linking & Matrix Logic ====================

  async createLink(targetTableId: string, dto: CreateLinkDto, userId: string) {
    const table = await this.db.client
      .selectFrom('dynamic_tables')
      .select('workspace_id')
      .where('id', '=', targetTableId as any)
      .executeTakeFirst();

    if (!table) throw new NotFoundException('Target table not found');

    await this.workspaceService.checkPermission(
      (table as any).workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    const link = (await this.db.client
      .insertInto('table_links')
      .values({
        target_table_id: targetTableId as any,
        source_table_id: (dto.sourceTableId as any) || null,
        source_system_entity: dto.sourceSystemEntity || null,
        link_type: dto.linkType as any,
        link_metadata: JSON.stringify(dto.metadata || {}),
      } as any)
      .returningAll()
      .executeTakeFirst()) as any;

    if (link && link.source_system_entity) {
      this.eventEmitter.emit('table.link.created', { linkId: link.id, userId });
    }

    return link;
  }

  @OnEvent('table.link.created')
  async handleLinkCreatedSync(payload: { linkId: string; userId: string }) {
    try {
      await this.syncLinkData(payload.linkId, payload.userId);
    } catch (error) {
      console.error(`Failed to sync link ${payload.linkId}:`, error);
    }
  }

  async syncLinkData(linkId: string, userId: string) {
    const link = await this.db.client
      .selectFrom('table_links')
      .selectAll()
      .where('id', '=', linkId as any)
      .executeTakeFirst();

    if (!link) throw new NotFoundException('Link not found');

    const table = await this.findById(link.target_table_id as any, userId);
    const version = table.activeVersion;

    if (!version) return;

    const metadata = link.link_metadata as any;
    const mappings = metadata.mappings || [];

    if (mappings.length === 0) return;

    // 1. Fetch data from donor
    let data: any[] = [];
    const filters = metadata.filter || {};

    if (link.source_system_entity === 'regions') {
      data = await this.regionsService.findAll(filters);
    } else if (link.source_system_entity === 'sports') {
      data = await this.sportsService.findAll(filters);
    } else if (link.source_system_entity === 'indicators') {
      data = await this.indicatorsService.findAll(filters);
    } else if (link.source_system_entity === 'indicator-groups') {
      data = await this.indicatorGroupsService.findAll(filters);
    }

    // 2. Map and update cells
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
      await this.batchUpdateCells(
        version.id as any,
        { cells: batchCells },
        userId,
      );
    }

    // 3. Update table dimensions if needed
    if (data.length > (table.row_count as any)) {
      await this.db.client
        .updateTable('dynamic_tables')
        .set({ row_count: data.length } as any)
        .where('id', '=', table.id as any)
        .execute();
    }

    await this.db.client
      .updateTable('table_links')
      .set({ updated_at: new Date() } as any)
      .where('id', '=', linkId as any)
      .execute();
  }

  async updateMatrixFormulas(
    versionId: string,
    formulas: MatrixFormulaDto[],
    userId: string,
  ) {
    const version = await this.db.client
      .selectFrom('table_versions')
      .select('table_id')
      .where('id', '=', versionId as any)
      .executeTakeFirst();

    if (!version) throw new NotFoundException('Version not found');

    const table = await this.db.client
      .selectFrom('dynamic_tables')
      .select('workspace_id')
      .where('id', '=', (version as any).table_id)
      .executeTakeFirst();

    await this.workspaceService.checkPermission(
      (table as any).workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    await this.db.client
      .updateTable('table_versions')
      .set({
        matrix_formulas: JSON.stringify(formulas),
      } as any)
      .where('id', '=', versionId as any)
      .execute();

    return { message: 'Matrix formulas updated' };
  }

  async getDonorStatus(tableId: string, userId: string) {
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
      .where('l.target_table_id', '=', tableId as any)
      .execute();

    const statuses = linksWithDonors.map((link) => {
      let status = 'up_to_date';

      if (link.source_table_id) {
        if (link.updated_at && link.donor_updated_at) {
          if (new Date(link.donor_updated_at) > new Date(link.updated_at)) {
            status = 'outdated';
          }
        }
      } else if (link.source_system_entity) {
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
}
