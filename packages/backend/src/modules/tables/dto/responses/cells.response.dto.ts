import { ApiProperty } from '@nestjs/swagger';

export class CellDataDto {
  @ApiProperty({
    description: 'Raw cell value',
    example: 1500,
  })
  value: unknown;

  @ApiProperty({
    description: 'Cell formula (if any)',
    example: '=SUM(A1:A10)',
  })
  formula?: string;

  @ApiProperty({
    description: 'Cell format type',
    example: 'currency',
  })
  format?: string;
}

export class CellResponseDto {
  @ApiProperty({
    description: 'Row index',
    example: 0,
  })
  rowIndex: number;

  @ApiProperty({
    description: 'Column index',
    example: 0,
  })
  colIndex: number;

  @ApiProperty({
    description: 'Column name',
    example: 'A',
  })
  colName: string;

  @ApiProperty({
    description: 'Cell data',
    type: CellDataDto,
  })
  data: CellDataDto;
}

export class CellsResponseDto {
  @ApiProperty({
    description: 'Version ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  versionId: string;

  @ApiProperty({
    description: 'List of cells',
    type: [CellResponseDto],
  })
  cells: CellResponseDto[];

  @ApiProperty({
    description: 'Total number of rows',
    example: 100,
  })
  totalRows: number;

  @ApiProperty({
    description: 'Total number of columns',
    example: 5,
  })
  totalColumns: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Page size',
    example: 50,
  })
  pageSize: number;

  @ApiProperty({
    description: 'Total number of cells',
    example: 5000,
  })
  total: number;
}
