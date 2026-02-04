import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn,IsString, MinLength } from 'class-validator';

export class CreateAdminUserDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Admin Name' })
  @IsString()
  name: string;

  @ApiProperty({ enum: ['ADMIN', 'MODERATOR', 'SUPER_ADMIN'] })
  @IsIn(['ADMIN', 'MODERATOR', 'SUPER_ADMIN'])
  role: 'ADMIN' | 'MODERATOR' | 'SUPER_ADMIN';
}
