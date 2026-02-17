import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class EventResponseDto {
  @ApiProperty({ description: "Event ID" })
  id!: number;

  @ApiPropertyOptional({ description: "Parent event ID" })
  parent_event_id?: number | null;

  @ApiProperty({ description: "Unique code" })
  code!: string;

  @ApiProperty({ description: "Full name in Russian" })
  name_ru!: string;

  @ApiPropertyOptional({ description: "Short name in Russian" })
  short_name_ru?: string | null;

  @ApiPropertyOptional({ description: "Event type ID" })
  event_type_id?: number | null;

  @ApiPropertyOptional({ description: "Event level ID" })
  level_id?: number | null;

  @ApiPropertyOptional({ description: "Event stage ID" })
  stage_id?: number | null;

  @ApiPropertyOptional({ description: "Sport ID" })
  sport_id?: number | null;

  @ApiPropertyOptional({ description: "Discipline ID" })
  discipline_id?: number | null;

  @ApiPropertyOptional({ description: "Gender ID" })
  gender_id?: number | null;

  @ApiPropertyOptional({ description: "Age group ID" })
  age_group_id?: number | null;

  @ApiPropertyOptional({ description: "Organizer ID" })
  organizer_id?: number | null;

  @ApiPropertyOptional({ description: "Description" })
  description?: string | null;

  @ApiPropertyOptional({ description: "Metadata (JSON)" })
  metadata?: any;

  @ApiProperty({ description: "Active status" })
  is_active!: boolean;

  @ApiProperty({ description: "Creation date" })
  createdAt!: Date;

  @ApiProperty({ description: "Last update date" })
  updatedAt!: Date;
}
