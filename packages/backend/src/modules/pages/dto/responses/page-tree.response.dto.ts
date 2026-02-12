import { ApiProperty } from "@nestjs/swagger";
import { PageTreeItemResponseDto } from "./page-tree-item.response.dto";

export class PageTreeResponseDto {
  @ApiProperty({ type: [PageTreeItemResponseDto] })
  tree: PageTreeItemResponseDto[];

  @ApiProperty()
  total: number;
}
