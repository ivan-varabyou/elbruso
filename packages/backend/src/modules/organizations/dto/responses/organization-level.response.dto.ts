import { ApiProperty } from "@nestjs/swagger";

export class OrganizationLevelResponseDto {
  @ApiProperty({ description: "Level ID" })
  id!: number;

  @ApiProperty({ description: "Level name in Russian" })
  name_ru!: string;

  @ApiProperty({ description: "Level code" })
  code!: string;

  @ApiProperty({ description: "Sort order" })
  sort_order!: number;
}
