import { ApiProperty } from "@nestjs/swagger";
import { RoleResponseDto } from "./role.response.dto";

export class RolesListResponseDto {
  @ApiProperty({ type: [RoleResponseDto] })
  data: RoleResponseDto[];
}
