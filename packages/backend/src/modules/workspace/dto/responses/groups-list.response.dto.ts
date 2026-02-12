import { ApiProperty } from "@nestjs/swagger";
import { WorkspaceGroupResponseDto } from "./workspace-group.response.dto";

export class GroupsListResponseDto {
  @ApiProperty({ type: [WorkspaceGroupResponseDto] })
  groups: WorkspaceGroupResponseDto[];

  @ApiProperty()
  total: number;
}
