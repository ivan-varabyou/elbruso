import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLicenseCategoryDto {
  @ApiProperty({ description: 'Sport ID' })
  @IsInt()
  sport_id!: number;

  @ApiProperty({ description: 'Category name in Russian' })
  @IsString()
  @MaxLength(255)
  name_ru!: string;

  @ApiPropertyOptional({ description: 'Short name in Russian' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  short_name_ru?: string;

  @ApiProperty({ description: 'Unique code' })
  @IsString()
  @MaxLength(100)
  code!: string;

  @ApiPropertyOptional({ description: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Level (numeric value for sorting/logic)' })
  @IsInt()
  level!: number;

  @ApiProperty({ description: 'Personnel type (e.g., referee, coach)' })
  @IsString()
  @MaxLength(50)
  personnel_type!: string;

  @ApiPropertyOptional({ description: 'Requirements text' })
  @IsOptional()
  @IsString()
  requirements?: string;

  @ApiPropertyOptional({ description: 'Discipline ID' })
  @IsOptional()
  @IsInt()
  discipline_id?: number;

  @ApiPropertyOptional({ description: 'Is active status', default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}

export class UpdateLicenseCategoryDto {
  @ApiPropertyOptional({ description: 'Category name in Russian' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name_ru?: string;

  @ApiPropertyOptional({ description: 'Short name in Russian' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  short_name_ru?: string;

  @ApiPropertyOptional({ description: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Level' })
  @IsOptional()
  @IsInt()
  level?: number;

  @ApiPropertyOptional({ description: 'Requirements text' })
  @IsOptional()
  @IsString()
  requirements?: string;

  @ApiPropertyOptional({ description: 'Is active status' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
