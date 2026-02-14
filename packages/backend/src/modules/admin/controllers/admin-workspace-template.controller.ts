import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";

import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import {
  CreateWorkspaceTemplateDto,
  UpdateWorkspaceTemplateDto,
} from "../../workspace/dto/workspace-template.dto";
import { WorkspaceService } from "../../workspace/services/workspace.service";
import {
  DeleteWorkspaceTemplateResponseDto,
  WorkspaceTemplateResponseDto,
} from "../dto/responses/workspace-template.response.dto";
import { WorkspaceTemplatesListResponseDto } from "../dto/responses/workspace-templates-list.response.dto";
import { AdminJwtAuthGuard } from "../guards/admin-jwt-auth.guard";

@ApiTags("Admin Workspace Templates")
@ApiBearerAuth("JWT-auth")
@UseGuards(AdminJwtAuthGuard)
@Controller("admin/workspace-templates")
@RbacResource({
  code: RbacPermission.ADMIN_TEMPLATES,
  name: "Шаблоны Workspace",
  group: "templates",
  appType: "admin",
})
export class AdminWorkspaceTemplateController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  @Permissions(`${RbacPermission.ADMIN_TEMPLATES}:read`)
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
  @Permissions(`${RbacPermission.ADMIN_TEMPLATES}:create`)
  @ApiOperation({ summary: "Create a new workspace template" })
  @ApiResponse({ status: 201, type: WorkspaceTemplateResponseDto })
  async create(@Body() dto: CreateWorkspaceTemplateDto) {
    const entity = await this.workspaceService.adminCreate(dto);
    return plainToInstance(WorkspaceTemplateResponseDto, entity);
  }

  @Patch(":id")
  @Permissions(`${RbacPermission.ADMIN_TEMPLATES}:write`)
  @ApiOperation({ summary: "Update workspace template" })
  @ApiResponse({ status: 200, type: WorkspaceTemplateResponseDto })
  async update(@Param("id", ParseUUIDPipe) id: string, @Body() dto: UpdateWorkspaceTemplateDto) {
    const entity = await this.workspaceService.adminUpdate(id, dto);
    return plainToInstance(WorkspaceTemplateResponseDto, entity);
  }

  @Delete(":id")
  @Permissions(`${RbacPermission.ADMIN_TEMPLATES}:delete`)
  @ApiOperation({ summary: "Delete workspace template" })
  @ApiResponse({ status: 200, type: DeleteWorkspaceTemplateResponseDto })
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    await this.workspaceService.adminDelete(id);
    return plainToInstance(DeleteWorkspaceTemplateResponseDto, {
      message: "Workspace template deleted successfully",
    });
  }
}
