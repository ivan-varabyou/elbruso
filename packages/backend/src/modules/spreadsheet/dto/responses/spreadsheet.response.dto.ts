import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SpreadsheetResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description!: string | null;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  organization_id!: number | null;

  @ApiPropertyOptional()
  sport_id!: number | null;

  @ApiProperty()
  type!: string;

  @ApiPropertyOptional()
  workspace_id!: string | null;

  @ApiPropertyOptional()
  group_id!: string | null;

  @ApiProperty()
  is_template!: boolean;

  @ApiProperty()
  metadata!: Record<string, unknown>;

  @ApiProperty()
  created_at!: Date;

  @ApiProperty()
  updated_at!: Date;
}

export class SpreadsheetListResponseDto {
  @ApiProperty({ type: [SpreadsheetResponseDto] })
  items!: SpreadsheetResponseDto[];

  @ApiProperty()
  total!: number;
}

export class SheetResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  spreadsheet_id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  sort_order!: number;

  @ApiProperty()
  row_count!: number;

  @ApiProperty()
  col_count!: number;

  @ApiProperty()
  settings!: Record<string, unknown>;
}

export class CellResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  sheet_id!: string;

  @ApiProperty()
  row_index!: number;

  @ApiProperty()
  col_index!: number;

  @ApiPropertyOptional()
  raw_value!: string | null;

  @ApiPropertyOptional()
  computed_value!: string | null;

  @ApiPropertyOptional()
  formula!: string | null;

  @ApiProperty()
  value_type!: string;

  @ApiProperty()
  style!: Record<string, unknown>;

  @ApiProperty()
  is_locked!: boolean;

  @ApiPropertyOptional()
  lock_reason!: string | null;
}
