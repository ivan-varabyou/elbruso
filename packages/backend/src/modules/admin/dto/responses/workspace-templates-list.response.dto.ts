import { ApiProperty } from "@nestjs/swagger";
import { WorkspaceTemplateResponseDto } from "./workspace-template.response.dto";

export class WorkspaceTemplatesListResponseDto {
  @ApiProperty({ type: [WorkspaceTemplateResponseDto] })
  data: WorkspaceTemplateResponseDto[];
}
