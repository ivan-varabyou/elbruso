import { ApiProperty } from "@nestjs/swagger";

export class SportResponseDto {
  @ApiProperty({ example: 1, description: "Sport ID" })
  id: number;

  @ApiProperty({ example: "Футбол", description: "Sport name in Russian" })
  name: string;

  @ApiProperty({ example: 1, description: "Olympic category ID", nullable: true })
  olympicCategoryId: number | null;

  @ApiProperty({ example: 1, description: "Sport type ID", nullable: true })
  sportTypeId: number | null;

  @ApiProperty({ example: true, description: "Whether sport is active" })
  isActive: boolean;
}
