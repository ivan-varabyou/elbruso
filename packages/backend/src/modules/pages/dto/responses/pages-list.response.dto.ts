import { ApiProperty } from "@nestjs/swagger";
import { PageResponseDto } from "./page.response.dto";

export class PagesListResponseDto {
  @ApiProperty({ type: [PageResponseDto] })
  pages: PageResponseDto[];

  @ApiProperty()
  total: number;
}
