import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class IndicatorGroupFiltersDto {
  @ApiPropertyOptional({ description: 'Filter by sport ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sportId?: number;

  @ApiPropertyOptional({ description: 'Filter by region ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  regionId?: number;

  @ApiPropertyOptional({
    description: 'Filter by group type',
    enum: ['Unified', 'Legacy', 'Custom'],
  })
  @IsOptional()
  @IsString()
  type?: string;
}
