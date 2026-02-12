import { ApiProperty } from "@nestjs/swagger";

export class CountryResponseDto {
  @ApiProperty({ example: 1, description: "Country ID" })
  id: number;

  @ApiProperty({ example: "RU", description: "Country code (ISO 3166-1 alpha-2)" })
  code: string;

  @ApiProperty({ example: "Россия", description: "Country name in Russian" })
  name: string;

  @ApiProperty({ example: "🇷🇺", description: "Flag emoji" })
  flag: string;
}
