import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsIn } from 'class-validator';

export class UpdateAdminUserDto {
  @ApiPropertyOptional({ example: 'Updated Name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ['ADMIN', 'MODERATOR', 'SUPER_ADMIN'] })
  @IsOptional()
  @IsIn(['ADMIN', 'MODERATOR', 'SUPER_ADMIN'])
  role?: 'ADMIN' | 'MODERATOR' | 'SUPER_ADMIN';

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
