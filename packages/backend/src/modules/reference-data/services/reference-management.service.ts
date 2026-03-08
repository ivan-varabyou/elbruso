import { DatabaseService } from '@database/database.service';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { sql } from 'kysely';

export class DynamicColumnDefinition {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  key!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  label!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type!: 'string' | 'number' | 'boolean' | 'date';

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  required?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  editable?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  placeholder?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  defaultValue?: string;

  @IsOptional()
  @ApiPropertyOptional()
  relation?: {
    table: string;
    labelField: string;
  };
}

export class CreateReferenceTableDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tableKey!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  label!: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  category?: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DynamicColumnDefinition)
  @ApiProperty({ type: [DynamicColumnDefinition] })
  columns!: DynamicColumnDefinition[];

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  hasIsActive?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  hasIsSystem?: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional()
  hasSortOrder?: boolean;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  permissionCode?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ enum: ["system", "user"], default: "user" })
  type?: "system" | "user";

  @IsOptional()
  @ApiPropertyOptional()
  accessLevelId?: number;
}

@Injectable()
export class ReferenceManagementService implements OnModuleInit {
  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    // Ensure metadata table exists
    await sql
      .raw(
        `
      CREATE TABLE IF NOT EXISTS reference_metadata (
        id SERIAL PRIMARY KEY,
        table_key TEXT UNIQUE NOT NULL,
        label TEXT NOT NULL,
        icon TEXT DEFAULT 'BookOpen',
        category TEXT DEFAULT 'general',
        type TEXT DEFAULT 'user',
        columns JSONB NOT NULL,
        has_is_active BOOLEAN DEFAULT true,
        has_is_system BOOLEAN DEFAULT false,
        has_sort_order BOOLEAN DEFAULT false,
        has_name_en BOOLEAN DEFAULT false,
        permission_code TEXT,
        access_level_id INTEGER,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `,
      )
      .execute(this.db.client);

    // Migration: Add columns if they don't exist
    try {
      await sql
        .raw(`ALTER TABLE reference_metadata ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'user'`)
        .execute(this.db.client);
      await sql
        .raw(`ALTER TABLE reference_metadata ADD COLUMN IF NOT EXISTS access_level_id INTEGER`)
        .execute(this.db.client);
    } catch (e) {
      // Ignore if columns already exist or other error
    }
  }

  async createTable(dto: CreateReferenceTableDto) {
    const { tableKey, label, columns, hasIsActive = true, hasIsSystem = false, hasSortOrder = false } = dto;

    if (!/^[a-z0-9_]+$/.test(tableKey)) {
      throw new BadRequestException('Table key must contain only lowercase letters, numbers, and underscores');
    }

    const tableName = `ref_${tableKey}`;
    let sqlQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP`;

    if (hasIsActive) sqlQuery += ', is_active BOOLEAN DEFAULT true';
    if (hasIsSystem) sqlQuery += ', is_system BOOLEAN DEFAULT false';
    if (hasSortOrder) sqlQuery += ', sort_order INTEGER DEFAULT 0';

    for (const col of columns) {
      if (['id', 'created_at', 'updated_at', 'is_active', 'is_system', 'sort_order'].includes(col.key)) continue;

      let pgType = 'TEXT';
      if (col.type === 'number') pgType = 'INTEGER';
      if (col.type === 'boolean') pgType = 'BOOLEAN';
      if (col.type === 'date') pgType = 'TIMESTAMP WITH TIME ZONE';

      sqlQuery += `, ${col.key} ${pgType}`;
      if (col.required) sqlQuery += ' NOT NULL';
    }

    sqlQuery += ');';

    try {
      await sql.raw(sqlQuery).execute(this.db.client);

      await this.db.client
        .insertInto("reference_metadata")
        .values({
          table_key: tableKey,
          label,
          icon: dto.icon || "BookOpen",
          category: dto.category || "general",
          columns: JSON.stringify(columns),
          has_is_active: hasIsActive,
          has_is_system: hasIsSystem,
          has_sort_order: hasSortOrder,
          permission_code: dto.permissionCode,
          type: dto.type || "user",
          access_level_id: dto.accessLevelId || null,
        })
        .execute();

      return { success: true, tableName };
    } catch (error: unknown) {
      const err = error as Error;
      console.error('Failed to create dynamic reference table:', err);
      throw new BadRequestException(`Failed to create table: ${err.message}`);
    }
  }

  async getMetadata() {
    const { REFERENCE_TABLES } = await import("../config/tables.config");
    const dynamicTables = await this.db.client
      .selectFrom("reference_metadata")
      .selectAll()
      .execute();

    const formattedDynamic = dynamicTables.map((item) => ({
      ...item,
      columns: typeof item.columns === "string" ? JSON.parse(item.columns) : item.columns,
    }));

    const staticTables = Object.entries(REFERENCE_TABLES).map(([key, cfg]) => ({
      id: 0, // Placeholder for static tables
      table_key: key,
      label: cfg.label,
      icon: 'BookOpen',
      category: 'system',
      type: 'system',
      columns: cfg.columns,
      has_is_active: cfg.hasIsActive,
      has_is_system: cfg.hasIsSystem,
      has_sort_order: cfg.hasSortOrder,
      created_at: new Date(0).toISOString(),
    }));

    return [...staticTables, ...formattedDynamic];
  }

  async getTableMetadata(tableKey: string) {
    const metadata = await this.db.client
      .selectFrom('reference_metadata')
      .selectAll()
      .where('table_key', '=', tableKey)
      .executeTakeFirst();

    if (metadata) {
      return {
        ...metadata,
        columns: typeof metadata.columns === 'string' ? JSON.parse(metadata.columns) : metadata.columns,
      };
    }

    // Check static tables
    const { REFERENCE_TABLES } = await import('../config/tables.config');
    const staticConfig = REFERENCE_TABLES[tableKey];
    if (staticConfig) {
      return {
        id: 0,
        table_key: tableKey,
        label: staticConfig.label,
        icon: 'BookOpen',
        category: 'system',
        type: 'system',
        columns: staticConfig.columns,
        has_is_active: staticConfig.hasIsActive,
        has_is_system: staticConfig.hasIsSystem,
        has_sort_order: staticConfig.hasSortOrder,
        created_at: new Date(0).toISOString(),
      };
    }

    throw new BadRequestException(`Table ${tableKey} not found`);
  }

  async updateTable(tableKey: string, dto: Partial<CreateReferenceTableDto>) {
    const existing = await this.getTableMetadata(tableKey);
    const tableName = existing.type === 'system' ? tableKey : `ref_${tableKey}`;

    if (dto.columns) {
      // Find new columns to add to DB
      const existingKeys = (existing.columns as DynamicColumnDefinition[]).map((c) => c.key);
      const newColumns = dto.columns.filter((c) => !existingKeys.includes(c.key));

      for (const col of newColumns) {
        let pgType = 'TEXT';
        if (col.type === 'number') pgType = 'INTEGER';
        if (col.type === 'boolean') pgType = 'BOOLEAN';
        if (col.type === 'date') pgType = 'TIMESTAMP WITH TIME ZONE';

        let alterQuery = `ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS ${col.key} ${pgType}`;
        if (col.required) alterQuery += ' NOT NULL DEFAULT ' + (col.type === 'number' ? '0' : col.type === 'boolean' ? 'false' : "''");

        await sql.raw(alterQuery).execute(this.db.client);
      }
    }

    if (existing.type === 'system' && tableKey in (await import('../config/tables.config')).REFERENCE_TABLES) {
      // For system tables, we only allow adding metadata OR we should warn that static config survives.
      // But we can still register it in reference_metadata to "override" or supplement aspects.
      // Actually, for consistency, let's upsert into reference_metadata.
    }

    await this.db.client
      .insertInto('reference_metadata')
      .values({
        table_key: tableKey,
        label: dto.label || existing.label,
        icon: dto.icon || existing.icon,
        category: dto.category || existing.category,
        columns: JSON.stringify(dto.columns || existing.columns),
        has_is_active: dto.hasIsActive ?? existing.has_is_active,
        has_is_system: dto.hasIsSystem ?? existing.has_is_system,
        has_sort_order: dto.hasSortOrder ?? existing.has_sort_order,
        permission_code: dto.permissionCode ?? existing.permission_code,
        type: dto.type || existing.type,
        access_level_id: dto.accessLevelId ?? (existing as { access_level_id?: number | null }).access_level_id,
      })
      .onConflict((oc) =>
        oc.column('table_key').doUpdateSet({
          label: (eb) => eb.ref('excluded.label'),
          icon: (eb) => eb.ref('excluded.icon'),
          category: (eb) => eb.ref('excluded.category'),
          columns: (eb) => eb.ref('excluded.columns'),
          has_is_active: (eb) => eb.ref('excluded.has_is_active'),
          has_is_system: (eb) => eb.ref('excluded.has_is_system'),
          has_sort_order: (eb) => eb.ref('excluded.has_sort_order'),
          permission_code: (eb) => eb.ref('excluded.permission_code'),
          type: (eb) => eb.ref('excluded.type'),
          access_level_id: (eb) => eb.ref('excluded.access_level_id'),
        }),
      )
      .execute();

    return { success: true };
  }

  async deleteTable(tableKey: string) {
    const tableName = `ref_${tableKey}`;
    try {
      await sql.raw(`DROP TABLE IF EXISTS ${tableName}`).execute(this.db.client);
      await this.db.client
        .deleteFrom('reference_metadata')
        .where('table_key', '=', tableKey)
        .execute();
      return { success: true };
    } catch (error: unknown) {
      const err = error as Error;
      throw new BadRequestException(`Failed to delete table: ${err.message}`);
    }
  }
}
