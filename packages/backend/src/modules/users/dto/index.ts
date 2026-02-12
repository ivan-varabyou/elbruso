import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsString, IsOptional, IsEnum, MinLength, IsArray, IsNotEmpty, IsBoolean } from "class-validator";
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

  @ApiPropertyOptional({ example: "1" })
  @IsOptional()
  @IsString()
  organization_id?: string;

  @ApiPropertyOptional({ enum: UserRole, example: UserRole.VIEWER })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

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
}

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

export class UpdateProfileDto {
  @ApiPropertyOptional({ description: 'First name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_name?: string;

  @ApiPropertyOptional({ description: 'Last name' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name?: string;

  @ApiPropertyOptional({ description: 'Middle name' })
  @IsOptional()
  @IsString()
  middle_name?: string;
}

export class ChangePasswordDto {
  @ApiProperty({ description: 'Current password' })
  @IsNotEmpty()
  @IsString()
  currentPassword: string;

  @ApiProperty({ description: 'New password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class AdminUpdateUserDto extends UpdateProfileDto {
  @ApiPropertyOptional({ description: 'User role' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiPropertyOptional({ description: 'Organization ID' })
  @IsOptional()
  organization_id?: number;

  @ApiPropertyOptional({
    description: 'Email (only admin can change or just show)',
  })
  @IsOptional()
  @IsEmail()
  email?: string;
}
