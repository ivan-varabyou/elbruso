import { DatabaseService } from '@database/database.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import { 
  CreateSheetDto, 
  CreateSpreadsheetDto, 
  SpreadsheetStatus,
  SpreadsheetType,
  UpdateCellDto, 
  UpdateSheetDto, 
  UpdateSpreadsheetDto} from '../dto/spreadsheet.dto';

@Injectable()
export class SpreadsheetService {
  constructor(private readonly db: DatabaseService) {}

  async createSpreadsheet(dto: CreateSpreadsheetDto, userId: string) {
    return this.db.client.transaction().execute(async (trx) => {
      const spreadsheet = await trx
        .insertInto('spreadsheets')
        .values({
          name: dto.name,
          description: dto.description || null,
          organization_id: dto.organization_id || null,
          sport_id: dto.sport_id || null,
          type: dto.type || SpreadsheetType.TABLE,
          workspace_id: dto.workspace_id || null,
          group_id: dto.group_id || null,
          is_template: dto.is_template || false,
          metadata: JSON.stringify(dto.metadata || {}),
          created_by: userId,
          status: SpreadsheetStatus.DRAFT,
        })
        .returningAll()
        .executeTakeFirstOrThrow();

      // Create initial sheet by default
      await trx
        .insertInto('spreadsheet_sheets')
        .values({
          spreadsheet_id: spreadsheet.id,
          name: 'Лист 1',
          sort_order: 0,
          row_count: 100,
          col_count: 26,
        })
        .execute();

      return spreadsheet;
    });
  }

  async findAll(filters: {
    status?: string;
    organization_id?: number;
    sport_id?: number;
    type?: string;
    workspace_id?: string;
    group_id?: string;
    is_template?: boolean;
  }) {
    let query = this.db.client.selectFrom('spreadsheets').selectAll();

    if (filters.status) {
      query = query.where('status', '=', filters.status);
    }
    if (filters.organization_id) {
      query = query.where('organization_id', '=', filters.organization_id);
    }
    if (filters.sport_id) {
      query = query.where('sport_id', '=', filters.sport_id);
    }
    if (filters.type) {
      query = query.where('type', '=', filters.type);
    }
    if (filters.workspace_id) {
      query = query.where('workspace_id', '=', filters.workspace_id);
    }
    if (filters.group_id) {
      query = query.where('group_id', '=', filters.group_id);
    }
    if (filters.is_template !== undefined) {
      query = query.where('is_template', '=', filters.is_template);
    }

    return query.orderBy('created_at', 'desc').execute();
  }

  async findById(id: string) {
    const spreadsheet = await this.db.client
      .selectFrom('spreadsheets')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!spreadsheet) {
      throw new NotFoundException('Spreadsheet not found');
    }

    const sheets = await this.db.client
      .selectFrom('spreadsheet_sheets')
      .selectAll()
      .where('spreadsheet_id', '=', id)
      .orderBy('sort_order', 'asc')
      .execute();

    return {
      ...spreadsheet,
      sheets,
    };
  }

  async updateSpreadsheet(id: string, dto: UpdateSpreadsheetDto) {
    const result = await this.db.client
      .updateTable('spreadsheets')
      .set({
        name: dto.name,
        description: dto.description,
        status: dto.status,
        type: dto.type,
        workspace_id: dto.workspace_id,
        group_id: dto.group_id,
        is_template: dto.is_template,
        metadata: dto.metadata ? JSON.stringify(dto.metadata) : undefined,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!result) {
      throw new NotFoundException('Spreadsheet not found');
    }

    return result;
  }

  async createSheet(spreadsheetId: string, dto: CreateSheetDto) {
    return this.db.client
      .insertInto('spreadsheet_sheets')
      .values({
        spreadsheet_id: spreadsheetId,
        name: dto.name,
        sort_order: dto.sort_order || 0,
        row_count: dto.row_count || 100,
        col_count: dto.col_count || 26,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async updateSheet(sheetId: string, dto: UpdateSheetDto) {
    return this.db.client
      .updateTable('spreadsheet_sheets')
      .set({
        name: dto.name,
        sort_order: dto.sort_order,
        settings: dto.settings ? JSON.stringify(dto.settings) : undefined,
        updated_at: new Date(),
      })
      .where('id', '=', sheetId)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async getCells(sheetId: string) {
    return this.db.client
      .selectFrom('spreadsheet_cells')
      .selectAll()
      .where('sheet_id', '=', sheetId)
      .execute();
  }

  async updateCells(sheetId: string, updates: UpdateCellDto[]) {
    return this.db.client.transaction().execute(async (trx) => {
      for (const update of updates) {
        await trx
          .insertInto('spreadsheet_cells')
          .values({
            sheet_id: sheetId,
            row_index: update.row_index,
            col_index: update.col_index,
            raw_value: update.data.raw_value !== undefined ? String(update.data.raw_value) : null,
            value_type: update.data.value_type || 'text',
            style: JSON.stringify(update.data.style || {}),
            is_locked: update.data.is_locked || false,
            lock_reason: update.data.lock_reason || null,
            updated_at: new Date(),
          })
          .onConflict((oc) => 
            oc.columns(['sheet_id', 'row_index', 'col_index']).doUpdateSet({
              raw_value: update.data.raw_value !== undefined ? String(update.data.raw_value) : null,
              value_type: update.data.value_type || 'text',
              style: JSON.stringify(update.data.style || {}),
              is_locked: update.data.is_locked,
              lock_reason: update.data.lock_reason || null,
              updated_at: new Date(),
            })
          )
          .execute();
      }
    });
  }

  async deleteSpreadsheet(id: string) {
    const result = await this.db.client
      .deleteFrom('spreadsheets')
      .where('id', '=', id)
      .executeTakeFirst();

    if (result.numDeletedRows === 0n) {
      throw new NotFoundException('Spreadsheet not found');
    }
  }
}
