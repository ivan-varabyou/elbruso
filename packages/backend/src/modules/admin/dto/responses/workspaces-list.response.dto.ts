import { ApiProperty } from "@nestjs/swagger";
import { WorkspaceResponseDto } from "./workspace.response.dto";

export class WorkspacesListResponseDto {
  @ApiProperty({ type: [WorkspaceResponseDto] })
  data: WorkspaceResponseDto[];
}
