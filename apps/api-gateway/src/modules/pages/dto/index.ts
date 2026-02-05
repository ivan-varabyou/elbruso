import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePageDto {
  @ApiPropertyOptional({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsOptional()
  @IsUUID()
  parentPageId?: string;

  @ApiProperty({ example: 'My Page' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  title: string;

  @ApiPropertyOptional({ example: '📄' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  icon?: string;

  @ApiPropertyOptional({ example: 'https://example.com/cover.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;
}

export class UpdatePageDto {
  @ApiPropertyOptional({ example: 'Updated Title' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  title?: string;

  @ApiPropertyOptional({ example: '📈' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  icon?: string;

  @ApiPropertyOptional({ example: 'https://example.com/new-cover.jpg' })
  @IsOptional()
  @IsString()
  coverImage?: string;
}

export class MovePageDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440002',
    description: 'New parent page ID. Null for root level.',
  })
  @IsOptional()
  @IsUUID()
  parentPageId?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440003',
    description: 'Insert after this page. Null for first position.',
  })
  @IsOptional()
  @IsUUID()
  afterPageId?: string;
}
