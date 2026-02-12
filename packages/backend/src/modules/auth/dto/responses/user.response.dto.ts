import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  id!: string;

  @ApiProperty({ example: "user@example.com" })
  email!: string;

  @ApiProperty({ example: "John Doe" })
  name!: string;

  @ApiProperty({ required: false, example: "ru" })
  lang?: string;
}

export class MeResponseDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  id!: string;

  @ApiProperty({ example: "user@example.com" })
  email!: string;

  @ApiProperty({ example: "Иван" })
  first_name!: string;

  @ApiProperty({ example: "Иванов" })
  last_name!: string;

  @ApiProperty({ required: false, example: "Иванович" })
  middle_name?: string;

  @ApiProperty({ required: false, example: 1 })
  organization_id?: number;

  @ApiProperty({ enum: ["admin", "manager", "viewer", "user"], example: "user" })
  role!: string;

  @ApiProperty({ example: true })
  is_active!: boolean;

  @ApiProperty({ required: false })
  created_at?: Date;

  @ApiProperty({ required: false })
  updated_at?: Date;
}

export class MessageResponseDto {
  @ApiProperty({ example: "Operation completed successfully" })
  message!: string;
}

export class TokenValidityResponseDto {
  @ApiProperty({ example: true })
  valid!: boolean;
}
