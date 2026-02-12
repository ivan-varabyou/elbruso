import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { AdminRole } from '../../enums/admin-role.enum';

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

  @ApiProperty({ enum: AdminRole })
  @IsEnum(AdminRole)
  role: AdminRole;
}
