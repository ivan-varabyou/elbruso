import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { AnyJwtAuthGuard } from "../../auth/guards/any-jwt-auth.guard";
import { RequestWithUser } from "../../auth/interfaces";
import { CreateWorkspaceDto, UpdateWorkspaceDto, AddMemberDto, UpdateMemberRoleDto } from "../dto";
import { WorkspaceService } from "../services/workspace.service";
import { WorkspaceResponseDto, WorkspacesListResponseDto } from "../dto/responses";

@ApiTags("Workspaces")
@ApiBearerAuth("JWT-auth")
@UseGuards(AnyJwtAuthGuard)
@Controller("workspaces")
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiOperation({ summary: "Create a new workspace" })
  @ApiResponse({
    status: 201,
    description: "Workspace created successfully",
    type: WorkspaceResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async create(@Request() req: RequestWithUser, @Body() dto: CreateWorkspaceDto) {
    const workspace = await this.workspaceService.create(req.user.sub, dto);
    return this.mapToWorkspaceResponse(workspace);
  }

  @Get()
  @ApiOperation({ summary: "Get all workspaces for current user" })
  @ApiResponse({ status: 200, description: "List of workspaces", type: WorkspacesListResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async findAll(@Request() req: RequestWithUser) {
    const workspaces = await this.workspaceService.findAll(req.user.sub);
    return {
      workspaces: workspaces.map((w) => this.mapToWorkspaceResponse(w)),
      total: workspaces.length,
    };
  }

  @Get(":id")
  @ApiOperation({ summary: "Get workspace by ID" })
  @ApiResponse({ status: 200, description: "Workspace details", type: WorkspaceResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Workspace not found" })
  async findOne(@Request() req: RequestWithUser, @Param("id", ParseUUIDPipe) id: string) {
    const workspace = await this.workspaceService.findOne(id, req.user.sub);
    return this.mapToWorkspaceResponse(workspace);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update workspace" })
  @ApiResponse({
    status: 200,
    description: "Workspace updated successfully",
    type: WorkspaceResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Workspace not found" })
  async update(
    @Request() req: RequestWithUser,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateWorkspaceDto,
  ) {
    const workspace = await this.workspaceService.update(id, req.user.sub, dto);
    return this.mapToWorkspaceResponse(workspace);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete workspace" })
  @ApiResponse({ status: 200, description: "Workspace deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Workspace not found" })
  async delete(@Request() req: RequestWithUser, @Param("id", ParseUUIDPipe) id: string) {
    return this.workspaceService.delete(id, req.user.sub);
  }

  @Post(":id/members")
  @ApiOperation({ summary: "Add member to workspace" })
  @ApiResponse({ status: 201, description: "Member added successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "User or workspace not found" })
  @ApiResponse({ status: 409, description: "User is already a member" })
  async addMember(
    @Request() req: RequestWithUser,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: AddMemberDto,
  ) {
    return this.workspaceService.addMember(id, req.user.sub, dto);
  }

  @Get(":id/members")
  @ApiOperation({ summary: "Get workspace members" })
  @ApiResponse({ status: 200, description: "List of members" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Workspace not found" })
  async getMembers(@Request() req: RequestWithUser, @Param("id", ParseUUIDPipe) id: string) {
    return this.workspaceService.getMembers(id, req.user.sub);
  }

  @Patch(":id/members/:memberId")
  @ApiOperation({ summary: "Update member role" })
  @ApiResponse({ status: 200, description: "Member role updated successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Member not found" })
  async updateMemberRole(
    @Request() req: RequestWithUser,
    @Param("id", ParseUUIDPipe) id: string,
    @Param("memberId", ParseUUIDPipe) memberId: string,
    @Body() dto: UpdateMemberRoleDto,
  ) {
    return this.workspaceService.updateMemberRole(id, req.user.sub, memberId, dto);
  }

  @Delete(":id/members/:memberId")
  @ApiOperation({ summary: "Remove member from workspace" })
  @ApiResponse({ status: 200, description: "Member removed successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Member not found" })
  async removeMember(
    @Request() req: RequestWithUser,
    @Param("id", ParseUUIDPipe) id: string,
    @Param("memberId", ParseUUIDPipe) memberId: string,
  ) {
    return this.workspaceService.removeMember(id, req.user.sub, memberId);
  }

  private mapToWorkspaceResponse(workspace: any): WorkspaceResponseDto {
    return {
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      slug: workspace.slug || "",
      logoUrl: workspace.logo_url || workspace.logoUrl || null,
      primaryColor: workspace.primary_color || workspace.primaryColor || null,
      isPersonal: workspace.is_template === false,
      isActive: workspace.is_active ?? true,
      ownerId: workspace.owner_id || "",
      createdAt: new Date(workspace.created_at),
      updatedAt: new Date(workspace.updated_at),
      members: [],
      membersCount: 0,
    };
  }
}
