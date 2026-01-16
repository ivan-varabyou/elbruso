import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUUID, IsOptional, IsObject, IsIn } from 'class-validator';

export class CreateBlockDto {
  @ApiProperty({ 
    example: 'text',
    enum: ['text', 'table', 'chart', 'divider', 'image']
  })
  @IsString()
  @IsIn(['text', 'table', 'chart', 'divider', 'image'])
  type: string;

  @ApiProperty({ 
    example: { text: '# Welcome', format: 'markdown' },
    description: 'Block content (structure depends on type)'
  })
  @IsObject()
  content: Record<string, unknown>;

  @ApiPropertyOptional({ 
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Insert after this block. Null for first position.' 
  })
  @IsOptional()
  @IsUUID()
  afterBlockId?: string;
}

export class UpdateBlockDto {
  @ApiPropertyOptional({ 
    example: { text: '# Updated Content', format: 'markdown' }
  })
  @IsOptional()
  @IsObject()
  content?: Record<string, unknown>;
}

export class MoveBlockDto {
  @ApiPropertyOptional({ 
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'Insert after this block. Null for first position.' 
  })
  @IsOptional()
  @IsUUID()
  afterBlockId?: string;
}
