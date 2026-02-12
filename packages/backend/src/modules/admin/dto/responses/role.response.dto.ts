import { ApiProperty } from "@nestjs/swagger";

export class RoleResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty({ type: [String] })
  permissions: string[];

  @ApiProperty()
  is_system: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class DeleteRoleResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  id: string;
}
