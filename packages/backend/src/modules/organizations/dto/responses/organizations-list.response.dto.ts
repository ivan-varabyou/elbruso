import { ApiProperty } from "@nestjs/swagger";
import { OrganizationResponseDto } from "./organization.response.dto";

export class OrganizationsListResponseDto {
  @ApiProperty({ description: "List of organizations", type: [OrganizationResponseDto] })
  data: OrganizationResponseDto[];

  @ApiProperty({ description: "Total count of organizations" })
  total: number;
}
