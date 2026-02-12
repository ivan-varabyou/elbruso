import { ApiProperty } from "@nestjs/swagger";

export class RegionResponseDto {
  @ApiProperty({ example: 1, description: "Region ID" })
  id: number;

  @ApiProperty({ example: "moscow", description: "Region code" })
  code: string;

  @ApiProperty({ example: "Москва", description: "Region name in Russian" })
  name: string;

  @ApiProperty({ example: 1, description: "Country ID", nullable: true })
  countryId: number | null;

  @ApiProperty({ example: 1, description: "Federal district ID", nullable: true })
  districtId: number | null;

  @ApiProperty({ example: true, description: "Whether region is active" })
  isActive: boolean;
}
