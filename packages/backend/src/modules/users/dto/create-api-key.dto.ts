import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class CreateApiKeyDto {
  @ApiProperty({ example: "My API Key" })
  @IsString()
  name!: string;

  @ApiProperty({
    example: ["read:workspaces", "write:tables"],
  })
  @IsArray()
  @IsString({ each: true })
  permissions!: string[];
}
