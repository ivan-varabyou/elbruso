import { ApiProperty } from "@nestjs/swagger";

export class AdminLoginResponseDto {
  @ApiProperty()
  access_token!: string;

  @ApiProperty({ type: "AdminUserResponseDto" })
  user!: any;
}

export class AdminLogoutResponseDto {
  @ApiProperty()
  message!: string;
}

export class AdminRefreshResponseDto {
  @ApiProperty()
  access_token!: string;
}
