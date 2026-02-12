import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class IndicatorResponseDto {
  @ApiProperty({ description: "Indicator ID" })
  id: number;

  @ApiProperty({ description: "Indicator name in Russian" })
  name_ru: string;

  @ApiProperty({ description: "Technical code" })
  code: string;

  @ApiPropertyOptional({ description: "Indicator description", nullable: true })
  description: string | null;

  @ApiPropertyOptional({ description: "Source hint", nullable: true })
  source_hint: string | null;

  @ApiPropertyOptional({ description: "Calculation formula", nullable: true })
  calculation_formula: string | null;

  @ApiProperty({ description: "Value type" })
  value_type: string;

  @ApiPropertyOptional({ description: "Default weight", nullable: true })
  default_weight: number | null;

  @ApiPropertyOptional({ description: "Category ID", nullable: true })
  category_id: number | null;

  @ApiPropertyOptional({ description: "Sport ID", nullable: true })
  sport_id: number | null;

  @ApiPropertyOptional({ description: "Gender ID", nullable: true })
  gender_id: number | null;

  @ApiPropertyOptional({ description: "Age group ID", nullable: true })
  age_group_id: number | null;

  @ApiPropertyOptional({ description: "Discipline ID", nullable: true })
  discipline_id: number | null;

  @ApiPropertyOptional({ description: "Measurement unit ID", nullable: true })
  measurement_unit_id: number | null;

  @ApiPropertyOptional({ description: "Organization ID", nullable: true })
  organization_id: number | null;

  @ApiPropertyOptional({ description: "Created by user ID", nullable: true })
  created_by: string | null;

  @ApiProperty({ description: "System indicator flag" })
  is_system: boolean;

  @ApiProperty({ description: "Normalize by population" })
  use_population: boolean;

  @ApiProperty({ description: "Active status" })
  is_active: boolean;

  @ApiPropertyOptional({ description: "Metadata (JSON)", nullable: true })
  metadata: Record<string, unknown> | null;

  @ApiProperty({ description: "Creation timestamp" })
  created_at: Date;

  @ApiProperty({ description: "Last update timestamp" })
  updated_at: Date;

  @ApiPropertyOptional({ description: "Gender name in Russian", nullable: true })
  gender_name: string | null;

  @ApiPropertyOptional({ description: "Age group name in Russian", nullable: true })
  age_group_name: string | null;

  @ApiPropertyOptional({ description: "Discipline name in Russian", nullable: true })
  discipline_name: string | null;

  @ApiPropertyOptional({ description: "Sport name in Russian", nullable: true })
  sport_name: string | null;

  @ApiPropertyOptional({ description: "Measurement unit name in Russian", nullable: true })
  unit_name: string | null;
}
