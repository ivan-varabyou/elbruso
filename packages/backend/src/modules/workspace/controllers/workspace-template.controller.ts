import { Controller, Get, Param, Query, ParseUUIDPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { WorkspaceService } from "../services/workspace.service";
import { TemplateResponseDto, TemplatesListResponseDto } from "../workspace-template/dto/responses";

@ApiTags("Workspace Templates")
@Controller("workspace-templates")
export class WorkspaceTemplateController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  @ApiOperation({ summary: "List all available workspace templates" })
  @ApiQuery({ name: "organization_id", required: false, type: Number })
  @ApiQuery({ name: "sport_id", required: false, type: Number })
  @ApiQuery({ name: "country_id", required: false, type: Number })
  @ApiResponse({ status: 200, description: "List of templates", type: TemplatesListResponseDto })
  async findAll(
    @Query("organization_id") organizationId?: string,
    @Query("sport_id") sportId?: string,
    @Query("country_id") countryId?: string,
  ) {
    const templates = await this.workspaceService.findAllTemplates({
      organization_id: organizationId ? parseInt(organizationId) : undefined,
      sport_id: sportId ? parseInt(sportId) : undefined,
      country_id: countryId ? parseInt(countryId) : undefined,
    });
    return {
      templates: templates.map((t) => this.mapToTemplateResponse(t)),
      total: templates.length,
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get template details" })
  @ApiResponse({ status: 200, description: "Template details", type: TemplateResponseDto })
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    const template = await this.workspaceService.findTemplateOne(id);
    return this.mapToTemplateResponse(template);
  }

  private mapToTemplateResponse(template: any): TemplateResponseDto {
    const metadata =
      typeof template.metadata === "string"
        ? JSON.parse(template.metadata)
        : template.metadata || {};

    return {
      id: template.id,
      name: template.name,
      description: template.description || null,
      category: template.category || "general",
      previewImageUrl: template.preview_image_url || template.previewImageUrl || null,
      pages: [],
      organizationId: template.organization_id || metadata.organization_id || null,
      sportId: template.sport_id || metadata.sport_id || null,
      countryId: template.country_id || metadata.country_id || null,
      isDefault: template.is_default ?? false,
      isActive: template.is_active ?? true,
      createdAt: new Date(template.created_at),
      updatedAt: new Date(template.updated_at),
    };
  }
}
