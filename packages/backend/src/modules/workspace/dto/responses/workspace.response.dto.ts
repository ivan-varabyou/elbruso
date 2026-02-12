import { ApiProperty } from "@nestjs/swagger";

export class WorkspaceMemberResponseDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  avatarUrl: string | null;

  @ApiProperty()
  role: string;

  @ApiProperty()
  joinedAt: Date;
}

export class WorkspaceResponseDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  logoUrl: string | null;

  @ApiProperty()
  primaryColor: string | null;

  @ApiProperty()
  isPersonal: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: [WorkspaceMemberResponseDto] })
  members: WorkspaceMemberResponseDto[];

  @ApiProperty()
  membersCount: number;
}
