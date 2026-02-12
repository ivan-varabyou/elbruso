import { ApiProperty } from "@nestjs/swagger";

export class TemplatePageResponseDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string | null;

  @ApiProperty()
  order: number;

  @ApiProperty({ type: [TemplatePageResponseDto], required: false })
  children?: TemplatePageResponseDto[];
}

export class TemplateResponseDto {
  @ApiProperty({ format: "uuid" })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string | null;

  @ApiProperty()
  category: string;

  @ApiProperty()
  previewImageUrl: string | null;

  @ApiProperty({ type: [TemplatePageResponseDto] })
  pages: TemplatePageResponseDto[];

  @ApiProperty()
  organizationId: number | null;

  @ApiProperty()
  sportId: number | null;

  @ApiProperty()
  countryId: number | null;

  @ApiProperty()
  isDefault: boolean;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
