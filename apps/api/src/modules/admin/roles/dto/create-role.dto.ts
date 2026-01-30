import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'MODERATOR' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Moderator' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, example: 'Can moderate content' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: ['read:users', 'write:posts'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
