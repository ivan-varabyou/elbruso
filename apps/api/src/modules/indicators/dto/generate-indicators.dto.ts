import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GenerateIndicatorsDto {
  @ApiPropertyOptional({ description: 'Template IDs to generate from' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  templateIds?: number[];

  @ApiPropertyOptional({ description: 'Sport ID filter' })
  @IsOptional()
  @IsNumber()
  sportId?: number;

  @ApiPropertyOptional({ description: 'Category filter' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'Overwrite existing indicators' })
  @IsOptional()
  @IsBoolean()
  overwrite?: boolean;
}
