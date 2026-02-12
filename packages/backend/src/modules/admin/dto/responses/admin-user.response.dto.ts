import { ApiProperty } from "@nestjs/swagger";

export class AdminUserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty({ nullable: true })
  last_login_at: Date | null;
}

export class DeleteAdminUserResponseDto {
  @ApiProperty()
  message: string;
}
