import { ApiProperty } from "@nestjs/swagger";
import { IndicatorResponseDto } from "./indicator.response.dto";

export class IndicatorsListResponseDto {
  @ApiProperty({ description: "List of indicators", type: [IndicatorResponseDto] })
  data: IndicatorResponseDto[];

  @ApiProperty({ description: "Total count of indicators" })
  total: number;
}
