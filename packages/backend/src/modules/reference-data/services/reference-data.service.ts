/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatabaseService } from "@database/database.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { sql } from "kysely";

import { getTableConfig, type TableConfig, REFERENCE_TABLES } from "../config/tables.config";

@Injectable()
export class ReferenceDataService {
  constructor(private readonly db: DatabaseService) {}

  /**
   * Returns metadata for all available reference tables.
   */
  async getAvailableTables() {
    const dynamicMeta = await this.db.client.selectFrom("reference_metadata").selectAll().execute();

    const combined: Record<string, any> = {};

    // Add static tables
    for (const [key, config] of Object.entries(REFERENCE_TABLES)) {
      combined[key] = {
        tableName: config.tableName,
        label: config.label,
        hasIsActive: config.hasIsActive,
        hasIsSystem: config.hasIsSystem,
        hasSortOrder: config.hasSortOrder,
        hasNameEn: config.hasNameEn,
        permissionCode: config.permissionCode,
        type: "system",
        columns: config.columns,
      };
    }

    // Add dynamic tables
    for (const meta of dynamicMeta) {
      combined[meta.table_key] = {
        tableName: `ref_${meta.table_key}`,
        label: meta.label,
        hasIsActive: meta.has_is_active ?? true,
        hasIsSystem: meta.has_is_system ?? false,
        hasSortOrder: meta.has_sort_order ?? false,
        hasNameEn: meta.has_name_en ?? false,
        permissionCode: meta.permission_code,
        type: meta.type || "user",
        columns: typeof meta.columns === "string" ? JSON.parse(meta.columns) : meta.columns,
      };
    }

    return combined;
  }

  /**
   * Returns table config or throws if not whitelisted.
   */
  async resolveTable(tableKey: string): Promise<TableConfig> {
    const staticConfig = getTableConfig(tableKey);
    if (staticConfig) return staticConfig;

    const dynamicConfig = await this.db.client
      .selectFrom("reference_metadata")
      .selectAll()
      .where("table_key", "=", tableKey)
      .executeTakeFirst();

    if (!dynamicConfig) {
      throw new BadRequestException(`Table "${tableKey}" is not available as a reference table`);
    }

    return {
      tableName: `ref_${dynamicConfig.table_key}`,
      label: dynamicConfig.label,
      hasIsActive: dynamicConfig.has_is_active ?? true,
      hasIsSystem: dynamicConfig.has_is_system ?? false,
      hasSortOrder: dynamicConfig.has_sort_order ?? false,
      hasNameEn: dynamicConfig.has_name_en ?? false,
      permissionCode: dynamicConfig.permission_code,
      type: dynamicConfig.type || "user",
      columns:
        typeof dynamicConfig.columns === "string"
          ? JSON.parse(dynamicConfig.columns)
          : dynamicConfig.columns,
    };
  }

  /**
   * List all records from a reference table, optionally filtering by search.
   */
  async findAll(
    tableKey: string,
    search?: string,
  ): Promise<{ data: Record<string, unknown>[]; total: number; config: TableConfig }> {
    const config = await this.resolveTable(tableKey);

    let query = this.db.client.selectFrom(config.tableName as any).selectAll() as any;

    if (search) {
      // Search across common text columns
      const textColumns = config.columns.filter((c) => c.type === "string").map((c) => c.key);
      if (textColumns.length > 0) {
        const searchPattern = `%${search.toLowerCase()}%`;
        query = query.where((eb: any) => {
          const conditions = textColumns.map((col) =>
            eb(sql`LOWER(CAST(${sql.ref(col)} AS TEXT))`, "like", searchPattern),
          );
          return eb.or(conditions);
        });
      }
    }

    // Order by sort_order if available, otherwise by id
    if (config.hasSortOrder) {
      query = query.orderBy("sort_order" as any, "asc");
    }
    query = query.orderBy("id" as any, "asc");

    try {
      const rows = await query.execute();
      return {
        data: rows as Record<string, unknown>[],
        total: rows.length,
        config,
      };
    } catch (error) {
      console.error(`[ReferenceDataService] Error fetching table ${tableKey}:`, error);
      throw error;
    }
  }

  /**
   * Get a single record by ID.
   */
  async findById(tableKey: string, id: number): Promise<Record<string, unknown>> {
    const config = await this.resolveTable(tableKey);

    const row = await this.db.client
      .selectFrom(config.tableName as any)
      .selectAll()
      .where("id" as any, "=", id)
      .executeTakeFirst();

    if (!row) {
      throw new NotFoundException(`Record with ID ${id} not found in ${config.label}`);
    }
    return row as Record<string, unknown>;
  }

  /**
   * Create a new record in a reference table.
   */
  async create(tableKey: string, data: Record<string, unknown>): Promise<Record<string, unknown>> {
    const config = await this.resolveTable(tableKey);

    // Filter only editable columns
    const editableKeys = config.columns.filter((c) => c.editable).map((c) => c.key);
    const filteredData: Record<string, unknown> = {};
    for (const key of editableKeys) {
      if (data[key] !== undefined) {
        filteredData[key] = data[key];
      }
    }

    const result = await this.db.client
      .insertInto(config.tableName as any)
      .values(filteredData as any)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as Record<string, unknown>;
  }

  /**
   * Update a record by ID.
   */
  async update(
    tableKey: string,
    id: number,
    data: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const config = await this.resolveTable(tableKey);

    // Filter only editable columns
    const editableKeys = config.columns.filter((c) => c.editable).map((c) => c.key);
    const filteredData: Record<string, unknown> = {};
    for (const key of editableKeys) {
      if (data[key] !== undefined) {
        filteredData[key] = data[key];
      }
    }

    if (Object.keys(filteredData).length === 0) {
      throw new BadRequestException("No valid fields to update");
    }

    const result = await this.db.client
      .updateTable(config.tableName as any)
      .set(filteredData as any)
      .where("id" as any, "=", id)
      .returningAll()
      .executeTakeFirst();

    if (!result) {
      throw new NotFoundException(`Record with ID ${id} not found in ${config.label}`);
    }
    return result as Record<string, unknown>;
  }

  /**
   * Delete (or soft-deactivate) a record.
   * System records (is_system = true or sort_order = 100) are protected from hard deletion.
   */
  async delete(tableKey: string, id: number): Promise<void> {
    const config = await this.resolveTable(tableKey);

    // Fetch the record first to check system status
    const record = await this.findById(tableKey, id);
    const isSystemRecord =
      (config.hasIsSystem && record.is_system === true) ||
      (config.hasSortOrder && record.sort_order === 100);

    if (isSystemRecord) {
      if (config.hasIsActive) {
        // System records can only be deactivated, never deleted
        await this.db.client
          .updateTable(config.tableName as any)
          .set({ is_active: false } as any)
          .where("id" as any, "=", id)
          .execute();
        return;
      } else {
        throw new BadRequestException(`Cannot delete system record in ${config.label}`);
      }
    }

    if (config.hasIsActive) {
      // Soft-delete for normal records
      await this.db.client
        .updateTable(config.tableName as any)
        .set({ is_active: false } as any)
        .where("id" as any, "=", id)
        .execute();
    } else {
      // Hard-delete for normal records
      await this.db.client
        .deleteFrom(config.tableName as any)
        .where("id" as any, "=", id)
        .execute();
    }
  }
}
