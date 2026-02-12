import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {
  @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." })
  accessToken!: string;

  @ApiProperty({ example: "def50200a3b7..." })
  refreshToken!: string;

  @ApiProperty({ example: "15m" })
  expiresIn!: string;
}

export class LoginResponseDto extends AuthResponseDto {}

export class RegisterResponseDto extends AuthResponseDto {}

export class RefreshTokenResponseDto extends AuthResponseDto {}

export class LogoutResponseDto {
  @ApiProperty({ example: "Successfully logged out" })
  message!: string;
}
