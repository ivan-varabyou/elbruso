import { ApiProperty } from "@nestjs/swagger";

export class WorkspaceTemplateResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  description: string | null;

  @ApiProperty()
  is_template: boolean;

  @ApiProperty()
  owner_id: string;

  @ApiProperty({ nullable: true })
  owner_email: string | null;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty({ nullable: true })
  metadata: Record<string, unknown> | null;

  @ApiProperty({ nullable: true })
  organization_id: number | null;

  @ApiProperty({ nullable: true })
  sport_id: number | null;

  @ApiProperty({ nullable: true })
  country_id: number | null;
}

export class DeleteWorkspaceTemplateResponseDto {
  @ApiProperty()
  message: string;
}
