import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateWorkspaceTemplateDto {
  @ApiProperty({
    description: 'Template name',
    example: 'Regional Organization Template',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @ApiPropertyOptional({
    description: 'Template description',
    example: 'Standard workspace for regional organizations',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Template icon (emoji or URL)',
    example: '🏢',
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({
    description: 'Organization ID linking',
  })
  @IsNumber()
  @IsOptional()
  organization_id?: number;

  @ApiPropertyOptional({
    description: 'Sport ID linking',
  })
  @IsNumber()
  @IsOptional()
  sport_id?: number;

  @ApiPropertyOptional({
    description: 'Country ID linking (stored in metadata)',
  })
  @IsNumber()
  @IsOptional()
  country_id?: number;
}

export class UpdateWorkspaceTemplateDto {
  @ApiPropertyOptional({
    description: 'Template name',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Template description',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Template icon',
  })
  @IsString()
  @IsOptional()
  icon?: string;

  @ApiPropertyOptional({
    description: 'Organization ID linking',
  })
  @IsNumber()
  @IsOptional()
  organization_id?: number;

  @ApiPropertyOptional({
    description: 'Sport ID linking',
  })
  @IsNumber()
  @IsOptional()
  sport_id?: number;

  @ApiPropertyOptional({
    description: 'Country ID linking (stored in metadata)',
  })
  @IsNumber()
  @IsOptional()
  country_id?: number;
}
