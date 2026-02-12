import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class OrganizationResponseDto {
  @ApiProperty({ description: "Organization ID" })
  id: number;

  @ApiProperty({ description: "Organization name in Russian" })
  name_ru: string;

  @ApiPropertyOptional({ description: "Abbreviation in Russian", nullable: true })
  abbreviation_ru: string | null;

  @ApiPropertyOptional({ description: "Internal code", nullable: true })
  internal_code: string | null;

  @ApiProperty({ description: "Organization type ID" })
  type_id: number;

  @ApiPropertyOptional({ description: "Parent organization ID", nullable: true })
  parent_id: number | null;

  @ApiPropertyOptional({ description: "Sport ID", nullable: true })
  sport_id: number | null;

  @ApiPropertyOptional({ description: "Region ID", nullable: true })
  region_id: number | null;

  @ApiPropertyOptional({ description: "Country ID", nullable: true })
  country_id: number | null;

  @ApiProperty({ description: "Organization level ID" })
  level_id: number;

  @ApiPropertyOptional({ description: "Founded year", nullable: true })
  founded_year: number | null;

  @ApiProperty({ description: "Active status" })
  is_active: boolean;

  @ApiPropertyOptional({ description: "Metadata (JSON)", nullable: true })
  metadata: Record<string, unknown> | null;

  @ApiProperty({ description: "Creation timestamp" })
  created_at: Date;

  @ApiProperty({ description: "Last update timestamp" })
  updated_at: Date;
}
