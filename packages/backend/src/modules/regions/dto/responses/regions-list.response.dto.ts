import { ApiProperty } from "@nestjs/swagger";
import { RegionResponseDto } from "./region.response.dto";

export class RegionsListResponseDto {
  @ApiProperty({ type: [RegionResponseDto], description: "List of regions" })
  items: RegionResponseDto[];

  @ApiProperty({ example: 100, description: "Total number of regions" })
  total: number;
}
