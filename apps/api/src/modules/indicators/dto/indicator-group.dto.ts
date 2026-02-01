import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateIndicatorGroupDto {
  [key: string]: unknown;

  @ApiProperty({ description: 'Group name in Russian' })
  @IsNotEmpty()
  @IsString()
  name_ru: string;

  @ApiProperty({ description: 'Technical code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiPropertyOptional({ description: 'Group description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Sport ID' })
  @IsOptional()
  @IsNumber()
  sport_id?: number;

  @ApiPropertyOptional({ description: 'Sort order' })
  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateIndicatorGroupDto {
  [key: string]: unknown;

  @ApiPropertyOptional({ description: 'Group name in Russian' })
  @IsOptional()
  @IsString()
  name_ru?: string;

  @ApiPropertyOptional({ description: 'Technical code' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional({ description: 'Group description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Sport ID' })
  @IsOptional()
  @IsNumber()
  sport_id?: number;

  @ApiPropertyOptional({ description: 'Sort order' })
  @IsOptional()
  @IsNumber()
  sort_order?: number;

  @ApiPropertyOptional({ description: 'Active status' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

import { Type } from 'class-transformer';

export class GetIndicatorGroupsDto {
  @ApiPropertyOptional({ description: 'Filter by sport ID' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  sportId?: number;
}
