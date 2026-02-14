import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

import { UserRole } from "../enums/user-role.enum";

export class CreateUserDto {
  @ApiProperty({ example: "ivan@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "securePassword123" })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: "Иван" })
  @IsString()
  first_name!: string;

  @ApiProperty({ example: "Иванов" })
  @IsString()
  last_name!: string;

  @ApiPropertyOptional({ example: "Иванович" })
  @IsOptional()
  @IsString()
  middle_name?: string;

  @ApiProperty({ example: "1" })
  @IsString()
  organization_id!: string;

  @ApiProperty({ enum: UserRole, example: UserRole.MANAGER })
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiPropertyOptional({ type: "array" })
  @IsOptional()
  @IsArray()
  workspaces?: { id: string; role: string }[];
}
