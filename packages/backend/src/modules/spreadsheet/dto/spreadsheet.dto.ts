import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export enum SpreadsheetStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum SpreadsheetType {
  TABLE = 'table',
  REFERENCE = 'reference',
  INDICATOR = 'indicator',
  CUSTOM_REFERENCE = 'custom_reference',
}

export class CreateSpreadsheetDto {
  @ApiProperty({ example: 'My Spreadsheet' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  organization_id?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  sport_id?: number;

  @ApiPropertyOptional({ enum: SpreadsheetType, example: SpreadsheetType.TABLE })
  @IsOptional()
  @IsEnum(SpreadsheetType)
  type?: SpreadsheetType;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  workspace_id?: string;

  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  group_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_template?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class UpdateSpreadsheetDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: SpreadsheetStatus })
  @IsOptional()
  @IsEnum(SpreadsheetStatus)
  status?: SpreadsheetStatus;

  @ApiPropertyOptional({ enum: SpreadsheetType })
  @IsOptional()
  @IsEnum(SpreadsheetType)
  type?: SpreadsheetType;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  workspace_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  group_id?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_template?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown>;
}

export class CreateSheetDto {
  @ApiProperty({ example: 'Sheet 1' })
  @IsString()
  name!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  row_count?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1)
  col_count?: number;
}

export class UpdateSheetDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  settings?: Record<string, unknown>;
}

export class UpdateCellDataDto {
  @ApiPropertyOptional()
  @IsOptional()
  raw_value?: string | number | boolean;

  @ApiPropertyOptional({ example: 'number' })
  @IsOptional()
  @IsString()
  value_type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  style?: Record<string, unknown>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_locked?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lock_reason?: string;
}

export class UpdateCellDto {
  @ApiProperty()
  @IsNumber()
  row_index!: number;

  @ApiProperty()
  @IsNumber()
  col_index!: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateCellDataDto)
  data!: UpdateCellDataDto;
}
