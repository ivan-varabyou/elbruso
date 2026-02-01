import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsUUID,
  IsNumber,
  IsObject,
  IsArray,
  ValidateNested,
  Min,
  IsIn,
} from 'class-validator';

export class CreateTableDto {
  @ApiProperty({
    description: 'Table name',
    example: 'Q1 Sales Data',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Table description',
    example: 'Sales data for Q1 2024',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Group ID to organize table',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsOptional()
  groupId?: string;

  @ApiPropertyOptional({
    description: 'Initial number of rows',
    example: 10,
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  initialRows?: number;

  @ApiPropertyOptional({
    description: 'Initial number of columns',
    example: 5,
    default: 5,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  initialColumns?: number;
}

export class UpdateTableDto {
  @ApiPropertyOptional({
    description: 'Table name',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Table description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Group ID',
  })
  @IsUUID()
  @IsOptional()
  groupId?: string | null;
}

export class ColumnDefinition {
  @ApiProperty({ example: 'Product Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'string',
    enum: ['string', 'number', 'boolean', 'date'],
  })
  @IsString()
  @IsIn(['string', 'number', 'boolean', 'date'])
  type: string;

  @ApiPropertyOptional({ example: 150 })
  @IsNumber()
  @IsOptional()
  width?: number;
}

export class CreateVersionDto {
  @ApiProperty({
    description: 'Column definitions for this version',
    type: [ColumnDefinition],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColumnDefinition)
  columnDefinitions: ColumnDefinition[];

  @ApiPropertyOptional({
    description: 'Copy data from this version ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsOptional()
  copyDataFromVersion?: string;
}

export class CellDataDto {
  @ApiPropertyOptional({ description: 'Cell value' })
  @IsOptional()
  value?: string | number | boolean | null;

  @ApiPropertyOptional({ description: 'Cell formula', example: '=SUM(A1:A10)' })
  @IsString()
  @IsOptional()
  formula?: string;

  @ApiPropertyOptional({
    description: 'Cell type',
    enum: ['string', 'number', 'boolean', 'formula'],
  })
  @IsString()
  @IsOptional()
  @IsIn(['string', 'number', 'boolean', 'formula'])
  type?: string;

  @ApiPropertyOptional({
    description: 'Cell format',
    example: { bold: true, color: '#FF0000' },
  })
  @IsObject()
  @IsOptional()
  format?: Record<string, unknown>;
}

export class UpdateCellDto {
  @ApiProperty({ description: 'Row index (0-based)', example: 0 })
  @IsNumber()
  @Min(0)
  rowIndex: number;

  @ApiProperty({ description: 'Column index (0-based)', example: 0 })
  @IsNumber()
  @Min(0)
  colIndex: number;

  @ApiProperty({ description: 'Cell data', type: CellDataDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CellDataDto)
  cellData: CellDataDto;
}

export class BatchCellUpdate {
  @ApiProperty({ description: 'Row index', example: 0 })
  @IsNumber()
  @Min(0)
  rowIndex: number;

  @ApiProperty({ description: 'Column index', example: 0 })
  @IsNumber()
  @Min(0)
  colIndex: number;

  @ApiProperty({ description: 'Cell data', type: CellDataDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CellDataDto)
  cellData: CellDataDto;
}

export class BatchUpdateCellsDto {
  @ApiProperty({
    description: 'Array of cell updates',
    type: [BatchCellUpdate],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BatchCellUpdate)
  cells: BatchCellUpdate[];
}

export class GetCellsQueryDto {
  @ApiPropertyOptional({ description: 'Start row (0-based)', example: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  startRow?: number;

  @ApiPropertyOptional({ description: 'End row (0-based)', example: 99 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  endRow?: number;

  @ApiPropertyOptional({ description: 'Start column (0-based)', example: 0 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  startCol?: number;

  @ApiPropertyOptional({ description: 'End column (0-based)', example: 9 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  endCol?: number;
}

export class LinkFieldMapping {
  @ApiProperty({ description: 'Source field name from catalog' })
  @IsString()
  sourceField: string;

  @ApiProperty({ description: 'Target column index in dynamic table' })
  @IsNumber()
  targetColIndex: number;
}

export class LinkMetadata {
  @ApiPropertyOptional({ description: 'Source column identifier (legacy)' })
  @IsString()
  @IsOptional()
  sourceColumn?: string;

  @ApiPropertyOptional({ description: 'Target column identifier (legacy)' })
  @IsString()
  @IsOptional()
  targetColumn?: string;

  @ApiPropertyOptional({
    type: [LinkFieldMapping],
    description: 'Field to column mappings',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LinkFieldMapping)
  mappings?: LinkFieldMapping[];

  @ApiPropertyOptional({ description: 'Filter criteria for link' })
  @IsOptional()
  filter?: Record<string, any>;
}

export class CreateLinkDto {
  @ApiPropertyOptional({ description: 'Donor table ID' })
  @IsUUID()
  @IsOptional()
  sourceTableId?: string;

  @ApiPropertyOptional({ description: 'Donor system entity (e.g. regions)' })
  @IsString()
  @IsOptional()
  sourceSystemEntity?: string;

  @ApiProperty({
    enum: ['cell_reference', 'lookup_reference', 'aggregation', 'shared_keys'],
  })
  @IsString()
  linkType: string;

  @ApiPropertyOptional({ type: LinkMetadata })
  @IsOptional()
  @ValidateNested()
  @Type(() => LinkMetadata)
  metadata?: LinkMetadata;
}

export class MatrixFormulaDto {
  @ApiProperty({ example: 'A1:A100' })
  @IsString()
  range: string;

  @ApiProperty({ example: '=SUM(B:B)' })
  @IsString()
  formula: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Step for formula replication',
  })
  @IsNumber()
  @IsOptional()
  step?: number;
}
