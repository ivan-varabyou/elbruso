import { ApiProperty } from "@nestjs/swagger";

export class UserListItemDto {
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
}

export class UsersListResponseDto {
  @ApiProperty({ type: [UserListItemDto] })
  data!: UserListItemDto[];

  @ApiProperty({ example: 100 })
  total!: number;

  @ApiProperty({ example: 1 })
  page!: number;

  @ApiProperty({ example: 10 })
  limit!: number;

  @ApiProperty({ example: 10 })
  totalPages!: number;
}

export class UserCreatedResponseDto {
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

  @ApiProperty({ enum: ["admin", "manager", "viewer", "user"], example: "user" })
  role!: string;

  @ApiProperty({ example: false })
  is_active!: boolean;
}

export class UserUpdatedResponseDto {
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
}

export class UserApprovedResponseDto {
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
}

export class UserBlockedResponseDto {
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

  @ApiProperty({ example: false })
  is_active!: boolean;

  @ApiProperty({ required: false })
  created_at?: Date;

  @ApiProperty({ required: false })
  updated_at?: Date;
}

export class UserDeletedResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;
}

export class ApiKeyResponseDto {
  @ApiProperty({ example: "elk_abc123..." })
  apiKey!: string;

  @ApiProperty({ example: "My API Key" })
  name!: string;
}
