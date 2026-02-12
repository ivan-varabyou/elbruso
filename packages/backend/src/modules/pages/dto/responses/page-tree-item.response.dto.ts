import { ApiProperty } from "@nestjs/swagger";

export class PageTreeItemResponseDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  icon: string | null;

  @ApiProperty()
  order: number;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty({ type: [PageTreeItemResponseDto] })
  children: PageTreeItemResponseDto[];
}
