import { ApiProperty } from "@nestjs/swagger";

export class AdminCreatedResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  role!: string;
}

export class AdminSetupResponseDto {
  @ApiProperty()
  message!: string;

  @ApiProperty({ type: AdminCreatedResponseDto })
  admin!: AdminCreatedResponseDto;
}

export class AdminResetResponseDto {
  @ApiProperty()
  message!: string;

  @ApiProperty()
  updated!: string;
}
