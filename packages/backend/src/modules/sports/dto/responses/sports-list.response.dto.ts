import { ApiProperty } from "@nestjs/swagger";
import { SportResponseDto } from "./sport.response.dto";

export class SportsListResponseDto {
  @ApiProperty({ type: [SportResponseDto], description: "List of sports" })
  items: SportResponseDto[];

  @ApiProperty({ example: 100, description: "Total number of sports" })
  total: number;
}
