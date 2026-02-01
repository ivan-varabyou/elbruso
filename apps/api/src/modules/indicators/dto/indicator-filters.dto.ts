import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsString } from 'class-validator';

export class IndicatorFiltersDto {
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

  @ApiPropertyOptional({ description: 'Filter by indicator group ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  groupId?: number;

  @ApiPropertyOptional({ description: 'Search query' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Scope filters (global, sport, federation, personal)',
  })
  @IsOptional()
  @IsString()
  scope?: string;

  @ApiPropertyOptional({ description: 'Multiple scopes' })
  @IsOptional()
  @IsString({ each: true })
  scopes?: string[];

  // INTERNAL use (from controller)
  userId?: string;
  userOrganizationId?: number;
  userSportId?: number;
  ancestorOrgIds?: number[];
  userRole?: string;
}
