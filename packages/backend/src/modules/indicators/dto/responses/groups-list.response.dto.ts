import { ApiProperty } from "@nestjs/swagger";
import { IndicatorGroupResponseDto } from "./indicator-group.response.dto";

export class GroupsListResponseDto {
  @ApiProperty({ description: "List of indicator groups", type: [IndicatorGroupResponseDto] })
  data: IndicatorGroupResponseDto[];

  @ApiProperty({ description: "Total count of groups" })
  total: number;
}
