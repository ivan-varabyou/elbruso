import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class OrganizationFiltersDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  typeId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sportId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  regionId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  parentId?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  countryId?: number;
}
