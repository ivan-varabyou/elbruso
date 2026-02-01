import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsEmail,
} from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({
    description: 'Workspace name',
    example: 'My Workspace',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Workspace description',
    example: 'Team collaboration workspace',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Workspace icon (emoji or URL)',
    example: '🚀',
  })
  @IsString()
  @IsOptional()
  icon?: string;
}

export class UpdateWorkspaceDto {
  @ApiPropertyOptional({
    description: 'Workspace name',
    example: 'Updated Workspace',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @ApiPropertyOptional({
    description: 'Workspace description',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @ApiPropertyOptional({
    description: 'Workspace icon',
  })
  @IsString()
  @IsOptional()
  icon?: string;
}

export enum WorkspaceRole {
  OWNER = 'owner',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

export class AddMemberDto {
  @ApiProperty({
    description: 'Member email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Member role',
    enum: WorkspaceRole,
    example: WorkspaceRole.EDITOR,
  })
  @IsEnum(WorkspaceRole)
  @IsNotEmpty()
  role: WorkspaceRole;
}

export class UpdateMemberRoleDto {
  @ApiProperty({
    description: 'New member role',
    enum: WorkspaceRole,
    example: WorkspaceRole.EDITOR,
  })
  @IsEnum(WorkspaceRole)
  @IsNotEmpty()
  role: WorkspaceRole;
}
