import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { AdminJwtAuthGuard } from "../guards/admin-jwt-auth.guard";
import {
  CreateWorkspaceTemplateDto,
  UpdateWorkspaceTemplateDto,
} from "../../workspace/dto/workspace-template.dto";
import { WorkspaceService } from "../../workspace/services/workspace.service";
import {
  WorkspaceTemplateResponseDto,
  DeleteWorkspaceTemplateResponseDto,
} from "../dto/responses/workspace-template.response.dto";
import { WorkspaceTemplatesListResponseDto } from "../dto/responses/workspace-templates-list.response.dto";

@ApiTags("Admin Workspace Templates")
@ApiBearerAuth("JWT-auth")
@UseGuards(AdminJwtAuthGuard)
@Controller("admin/workspace-templates")
export class AdminWorkspaceTemplateController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  @ApiOperation({ summary: "List all workspace templates" })
  @ApiQuery({ name: "organization_id", required: false, type: Number })
  @ApiQuery({ name: "sport_id", required: false, type: Number })
  @ApiQuery({ name: "country_id", required: false, type: Number })
  @ApiResponse({ status: 200, type: WorkspaceTemplatesListResponseDto })
  async findAll(
    @Query("organization_id") organizationId?: string,
    @Query("sport_id") sportId?: string,
    @Query("country_id") countryId?: string,
  ) {
    const entities = await this.workspaceService.findAllTemplates({
      organization_id: organizationId ? parseInt(organizationId) : undefined,
      sport_id: sportId ? parseInt(sportId) : undefined,
      country_id: countryId ? parseInt(countryId) : undefined,
    });
    return plainToInstance(WorkspaceTemplatesListResponseDto, { data: entities });
  }

  @Post()
  @ApiOperation({ summary: "Create a new workspace template" })
  @ApiResponse({ status: 201, type: WorkspaceTemplateResponseDto })
  async create(@Body() dto: CreateWorkspaceTemplateDto) {
    const entity = await this.workspaceService.adminCreate(dto);
    return plainToInstance(WorkspaceTemplateResponseDto, entity);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update workspace template" })
  @ApiResponse({ status: 200, type: WorkspaceTemplateResponseDto })
  async update(@Param("id", ParseUUIDPipe) id: string, @Body() dto: UpdateWorkspaceTemplateDto) {
    const entity = await this.workspaceService.adminUpdate(id, dto);
    return plainToInstance(WorkspaceTemplateResponseDto, entity);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete workspace template" })
  @ApiResponse({ status: 200, type: DeleteWorkspaceTemplateResponseDto })
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    await this.workspaceService.adminDelete(id);
    return plainToInstance(DeleteWorkspaceTemplateResponseDto, {
      message: "Workspace template deleted successfully",
    });
  }
}
