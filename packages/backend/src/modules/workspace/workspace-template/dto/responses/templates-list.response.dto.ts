import { ApiProperty } from "@nestjs/swagger";
import { TemplateResponseDto } from "./template.response.dto";

export class TemplatesListResponseDto {
  @ApiProperty({ type: [TemplateResponseDto] })
  templates: TemplateResponseDto[];

  @ApiProperty()
  total: number;
}
