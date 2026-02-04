import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class RegionFiltersDto {
  @ApiPropertyOptional({ description: 'Filter by country ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  countryId?: number;

  @ApiPropertyOptional({ description: 'Filter by federal district ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  federalDistrictId?: number;

  @ApiPropertyOptional({ description: 'Filter by region type ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  regionTypeId?: number;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    default: true,
  })
  @IsOptional()
  isActive?: boolean;
}
