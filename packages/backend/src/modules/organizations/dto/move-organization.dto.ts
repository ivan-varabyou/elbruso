import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class MoveOrganizationDto {
  @ApiProperty({ 
    description: 'New parent organization ID (null for root level)', 
    nullable: true 
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  parent_id!: number | null;
}
