import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ description: 'Sport ID' })
  @IsInt()
  sport_id!: number;

  @ApiProperty({ description: 'Unique code' })
  @IsString()
  @MaxLength(100)
  code!: string;

  @ApiProperty({ description: 'Full name in Russian' })
  @IsString()
  @MaxLength(255)
  name_ru!: string;

  @ApiPropertyOptional({ description: 'Short name in Russian' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  short_name_ru?: string;

  @ApiPropertyOptional({ description: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Event type ID' })
  @IsOptional()
  @IsInt()
  event_type_id?: number;

  @ApiPropertyOptional({ description: 'Event level ID' })
  @IsOptional()
  @IsInt()
  level_id?: number;

  @ApiPropertyOptional({ description: 'Stage ID' })
  @IsOptional()
  @IsInt()
  stage_id?: number;

  @ApiPropertyOptional({ description: 'Discipline ID' })
  @IsOptional()
  @IsInt()
  discipline_id?: number;

  @ApiPropertyOptional({ description: 'Age group ID' })
  @IsOptional()
  @IsInt()
  age_group_id?: number;

  @ApiPropertyOptional({ description: 'Gender ID' })
  @IsOptional()
  @IsInt()
  gender_id?: number;

  @ApiPropertyOptional({ description: 'Organizer ID' })
  @IsOptional()
  @IsInt()
  organizer_id?: number;

  @ApiPropertyOptional({ description: 'Parent event ID' })
  @IsOptional()
  @IsInt()
  parent_event_id?: number;

  @ApiPropertyOptional({ description: 'Is active', default: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
