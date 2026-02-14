import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({ example: "550e8400-e29b-41d4-a716-446655440000" })
  id!: string;

  @ApiProperty({ example: "ivan@example.com" })
  email!: string;

  @ApiProperty({ example: "Иван" })
  first_name!: string;

  @ApiProperty({ example: "Иванов" })
  last_name!: string;

  @ApiProperty({ required: false, example: "Иванович" })
  middle_name?: string;

  @ApiProperty({ required: false, example: 1 })
  organization_id?: number;

  @ApiProperty({ required: false, example: "Organization Name" })
  organization_name?: string;

  @ApiProperty({ enum: ["admin", "manager", "viewer", "user"], example: "user" })
  role!: string;

  @ApiProperty({ example: true })
  is_active!: boolean;

  @ApiProperty({ required: false })
  created_at?: Date;

  @ApiProperty({ required: false })
  updated_at?: Date;

  @ApiProperty({ required: false, type: "array" })
  workspaces?: any[];
}

export class UserProfileResponseDto extends UserResponseDto {}
