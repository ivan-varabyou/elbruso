import { ApiProperty } from "@nestjs/swagger";
import { SeasonResponseDto } from "./season.response.dto";

export class SeasonsListResponseDto {
  @ApiProperty({ type: [SeasonResponseDto], description: "List of seasons" })
  items: SeasonResponseDto[];

  @ApiProperty({ example: 100, description: "Total number of seasons" })
  total: number;
}
