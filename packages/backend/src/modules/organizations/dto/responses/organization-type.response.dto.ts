import { ApiProperty } from "@nestjs/swagger";

export class OrganizationTypeResponseDto {
  @ApiProperty({ description: "Type ID" })
  id!: number;

  @ApiProperty({ description: "Type name in Russian" })
  name_ru!: string;

  @ApiProperty({ description: "Type code" })
  code!: string;

  @ApiProperty({ description: "Sort order", required: false })
  sort_order!: number | null;
}
