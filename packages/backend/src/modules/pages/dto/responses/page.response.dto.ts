import { ApiProperty } from "@nestjs/swagger";

export class PageResponseDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string | null;

  @ApiProperty()
  icon: string | null;

  @ApiProperty()
  coverImageUrl: string | null;

  @ApiProperty()
  isPublished: boolean;

  @ApiProperty()
  isFavorite: boolean;

  @ApiProperty({ format: "uuid" })
  parentId: string | null;

  @ApiProperty({ format: "uuid" })
  groupId: string | null;

  @ApiProperty({ format: "uuid" })
  workspaceId: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  createdBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
