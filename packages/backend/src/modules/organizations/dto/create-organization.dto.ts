import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsObject, IsOptional, IsString, Min,MinLength } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ description: 'Organization name in Russian' })
  @IsString()
  @MinLength(1)
  name_ru!: string;

  @ApiPropertyOptional({ description: 'Abbreviation in Russian', nullable: true })
  @IsOptional()
  @IsString()
  abbreviation_ru?: string | null;

  @ApiPropertyOptional({ description: 'Internal code', nullable: true })
  @IsOptional()
  @IsString()
  internal_code?: string | null;

  @ApiProperty({ description: 'Organization type ID' })
  @IsInt()
  @Type(() => Number)
  type_id!: number;

  @ApiPropertyOptional({ description: 'Parent organization ID', nullable: true })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  parent_id?: number | null;

  @ApiPropertyOptional({ description: 'Sport ID', nullable: true })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  sport_id?: number | null;

  @ApiPropertyOptional({ description: 'Region ID', nullable: true })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  region_id?: number | null;

  @ApiPropertyOptional({ description: 'Country ID', nullable: true })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  country_id?: number | null;

  @ApiProperty({ description: 'Organization level ID' })
  @IsInt()
  @Type(() => Number)
  level_id!: number;

  @ApiPropertyOptional({ description: 'Founded year', nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1800)
  @Type(() => Number)
  founded_year?: number | null;

  @ApiPropertyOptional({ description: 'Active status', default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ description: 'Metadata (JSON)', nullable: true })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, unknown> | null;
}
