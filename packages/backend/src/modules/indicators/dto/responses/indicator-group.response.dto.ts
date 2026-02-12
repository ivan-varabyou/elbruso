import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class IndicatorGroupResponseDto {
  @ApiProperty({ description: "Group ID" })
  id: number;

  @ApiProperty({ description: "Group name in Russian" })
  name_ru: string;

  @ApiProperty({ description: "Technical code" })
  code: string;

  @ApiPropertyOptional({ description: "Group description", nullable: true })
  description: string | null;

  @ApiPropertyOptional({ description: "Sport ID", nullable: true })
  sport_id: number | null;

  @ApiPropertyOptional({ description: "Sort order", nullable: true })
  sort_order: number | null;

  @ApiProperty({ description: "Active status" })
  is_active: boolean;

  @ApiProperty({ description: "Creation timestamp" })
  created_at: Date;

  @ApiProperty({ description: "Last update timestamp" })
  updated_at: Date;
}
