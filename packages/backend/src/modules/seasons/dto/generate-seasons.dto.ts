import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class GenerateSeasonsDto {
  @ApiProperty({ description: 'Start year for generation', example: 2024 })
  @IsInt()
  @Min(2000)
  @Max(2100)
  startYear: number;

  @ApiProperty({ description: 'End year for generation', example: 2030 })
  @IsInt()
  @Min(2000)
  @Max(2100)
  endYear: number;

  @ApiProperty({ description: 'Specific sport ID (optional)', required: false })
  @IsOptional()
  sportId?: number;
}
