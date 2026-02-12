import { ApiProperty } from "@nestjs/swagger";

export class WorkspaceGroupResponseDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  color: string | null;

  @ApiProperty()
  icon: string | null;

  @ApiProperty()
  order: number;

  @ApiProperty({ format: "uuid" })
  workspaceId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
