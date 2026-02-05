import { ApiProperty } from '@nestjs/swagger';
import { IsArray,IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  organizationId?: string;
}

export class CreateApiKeyDto {
  @ApiProperty({ example: 'My API Key' })
  @IsString()
  name: string;

  @ApiProperty({
    example: ['read:workspaces', 'write:tables'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
