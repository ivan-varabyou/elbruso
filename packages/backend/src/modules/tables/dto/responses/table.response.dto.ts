import { ApiProperty } from '@nestjs/swagger';

export class TableResponseDto {
  @ApiProperty({
    description: 'Table ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Workspace ID that contains this table',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  workspaceId: string;

  @ApiProperty({
    description: 'Table name',
    example: 'Sales Report',
  })
  name: string;

  @ApiProperty({
    description: 'Table description',
    example: 'Monthly sales data',
  })
  description?: string;

  @ApiProperty({
    description: 'Number of columns',
    example: 5,
  })
  columnsCount: number;

  @ApiProperty({
    description: 'Number of rows',
    example: 100,
  })
  rowsCount: number;

  @ApiProperty({
    description: 'Active version ID',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  activeVersionId: string;

  @ApiProperty({
    description: 'Group ID for organization',
    example: '550e8400-e29b-41d4-a716-446655440003',
  })
  groupId?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Creator user ID',
    example: '550e8400-e29b-41d4-a716-446655440004',
  })
  createdBy: string;
}
