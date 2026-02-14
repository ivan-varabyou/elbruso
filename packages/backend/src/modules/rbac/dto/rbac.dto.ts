import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsObject, IsEnum, IsArray, IsUUID } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "custom_role" })
  @IsString()
  code!: string;

  @ApiProperty({ example: "Custom Role" })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ example: "Custom role with specific permissions" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: { users: ["read", "write"], tables: ["read"] },
    type: "object",
  })
  @IsObject()
  permissions!: Record<string, string[]>;
}

export class UpdateRoleDto {
  @ApiPropertyOptional({ example: "Updated Role Name" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "Updated description" })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdatePermissionsDto {
  @ApiProperty({
    example: { users: ["read", "write", "delete"], tables: ["read", "write"] },
    type: "object",
  })
  @IsObject()
  permissions!: Record<string, string[]>;
}

export class AssignUserRoleDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  @IsUUID()
  roleId!: string;

  @ApiProperty({ example: "webapp", enum: ["admin", "webapp"] })
  @IsEnum(["admin", "webapp"])
  appType!: "admin" | "webapp";
}

export class RoleResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  type!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional()
  description?: string | null;

  @ApiProperty()
  permissions!: Record<string, string[]>;

  @ApiProperty()
  isSystem!: boolean;

  @ApiProperty()
  isEditable!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}

export class RolesListResponseDto {
  @ApiProperty({ type: [RoleResponseDto] })
  data!: RoleResponseDto[];
}

export class DeleteRoleResponseDto {
  @ApiProperty()
  success!: boolean;

  @ApiProperty()
  id!: string;
}

export class PermissionActionDto {
  @ApiProperty({ example: "read" })
  action!: string;

  @ApiProperty({ example: true })
  enabled!: boolean;
}

export class PermissionItemDto {
  @ApiProperty({ example: "admin:users:read" })
  code!: string;

  @ApiProperty({ example: "Просмотр пользователей" })
  name!: string;

  @ApiPropertyOptional({ example: "Просмотр списка пользователей" })
  description?: string;

  @ApiProperty({ example: "users" })
  group!: string;

  @ApiProperty({ type: [String], example: ["read"] })
  actions!: string[];
}

export class PermissionGroupDto {
  @ApiProperty({ example: "users" })
  name!: string;

  @ApiProperty({ type: [PermissionItemDto] })
  permissions!: PermissionItemDto[];
}

export class PermissionsTreeDto {
  @ApiProperty({ example: "admin", enum: ["admin", "user"] })
  appType!: "admin" | "user";

  @ApiProperty({ type: [PermissionGroupDto] })
  groups!: PermissionGroupDto[];
}

export class PermissionsTreeResponseDto {
  @ApiProperty()
  data!: PermissionsTreeDto;
}
