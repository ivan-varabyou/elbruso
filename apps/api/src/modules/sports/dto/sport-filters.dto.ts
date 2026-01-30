import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class SportFiltersDto {
  @ApiPropertyOptional({ description: 'Filter by olympic category ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  olympicCategoryId?: number;

  @ApiPropertyOptional({ description: 'Filter by sport type ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sportTypeId?: number;

  @ApiPropertyOptional({
    description: 'Filter by active status',
    default: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  isActive?: boolean;
}
