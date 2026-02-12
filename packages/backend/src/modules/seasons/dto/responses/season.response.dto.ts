import { ApiProperty } from "@nestjs/swagger";

export class SportReferenceDto {
  @ApiProperty({ example: 1, description: "Sport ID" })
  id: number;

  @ApiProperty({ example: "Football", description: "Sport name" })
  name: string;
}

export class SeasonResponseDto {
  @ApiProperty({ example: 1, description: "Season ID" })
  id: number;

  @ApiProperty({ example: "CY_2024_25", description: "Season code" })
  code: string;

  @ApiProperty({ example: "Сезон 2024/2025", description: "Season name in Russian" })
  name: string;

  @ApiProperty({ example: 2024, description: "Season year", nullable: true })
  seasonYear: number | null;

  @ApiProperty({ example: "cross_year", description: "Season type", nullable: true })
  seasonType: string | null;

  @ApiProperty({ example: "2024-09-01", description: "Season start date" })
  startDate: Date;

  @ApiProperty({ example: "2025-08-31", description: "Season end date" })
  endDate: Date;

  @ApiProperty({ example: true, description: "Whether season is active" })
  isActive: boolean;

  @ApiProperty({
    type: [SportReferenceDto],
    description: "Sports associated with season",
    nullable: true,
  })
  sports: SportReferenceDto[];
}
