import { ApiProperty } from '@nestjs/swagger';

export class BlockResponseDto {
  @ApiProperty({
    description: 'Block ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Page ID that contains this block',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  pageId: string;

  @ApiProperty({
    description: 'Block type',
    enum: ['text', 'table', 'chart', 'divider', 'image'],
    example: 'text',
  })
  type: string;

  @ApiProperty({
    description: 'Block content (structure depends on type)',
    example: { text: '# Welcome', format: 'markdown' },
  })
  content: Record<string, unknown>;

  @ApiProperty({
    description: 'Block position order',
    example: 0,
  })
  position: number;

  @ApiProperty({
    description: 'Whether block is deleted (soft delete)',
    example: false,
  })
  isDeleted: boolean;

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
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  createdBy: string;
}
