import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsJSON, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateIndicatorTemplateDto {
  @ApiProperty()
  @IsString()
  name_ru!: string;

  @ApiProperty()
  @IsString()
  name_pattern!: string;

  @ApiProperty()
  @IsString()
  code_pattern!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description_pattern?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sport_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  category_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  measurement_unit_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  base_weight?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  value_type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  use_population?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsJSON()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generation_config?: any;
}

export class UpdateIndicatorTemplateDto extends CreateIndicatorTemplateDto {}

export class GetIndicatorTemplatesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sportId?: number;
}
