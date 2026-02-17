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
  @ApiPropertyOptional({ enum: ['system', 'user'], default: 'user' })
  type?: 'system' | 'user';
}

@Injectable()
export class ReferenceManagementService implements OnModuleInit {
  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    // Ensure metadata table exists
    await sql.raw(`
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
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `).execute(this.db.client);

    // Migration: Add type column if it exists (for existing installations)
    try {
      await sql.raw(`ALTER TABLE reference_metadata ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'user'`).execute(this.db.client);
    } catch (e) {
      // Ignore if column already exists or other error
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
        .insertInto('reference_metadata')
        .values({
          table_key: tableKey,
          label,
          icon: dto.icon || 'BookOpen',
          category: dto.category || 'general',
          columns: JSON.stringify(columns),
          has_is_active: hasIsActive,
          has_is_system: hasIsSystem,
          has_sort_order: hasSortOrder,
          permission_code: dto.permissionCode,
          type: dto.type || 'user',
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
    const list = await this.db.client.selectFrom('reference_metadata').selectAll().execute();
    return list.map((item) => ({
      ...item,
      columns: typeof item.columns === 'string' ? JSON.parse(item.columns) : item.columns,
    }));
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
