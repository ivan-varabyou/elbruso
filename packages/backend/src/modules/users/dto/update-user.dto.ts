import { IsString, IsOptional, IsEnum, IsBoolean, IsArray } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { UserRole } from "../enums/user-role.enum";

export class UpdateUserDto {
  @ApiPropertyOptional({ example: "Иван" })
  @IsOptional()
  @IsString()
  first_name?: string;

  @ApiPropertyOptional({ example: "Иванов" })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({ example: "Иванович" })
  @IsOptional()
  @IsString()
  middle_name?: string;

  @ApiPropertyOptional({ example: "1" })
  @IsOptional()
  @IsString()
  organization_id?: string;

  @ApiPropertyOptional({ enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  is_approved?: boolean;

  @ApiPropertyOptional({ type: "array" })
  @IsOptional()
  @IsArray()
  workspaces?: { id: string; role: string }[];
}
