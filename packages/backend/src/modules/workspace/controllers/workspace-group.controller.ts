/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AnyJwtAuthGuard } from "../../auth/guards/any-jwt-auth.guard";
import { CreateGroupDto, UpdateGroupDto, ReorderGroupsDto } from "../dto/workspace-group.dto";
import { WorkspaceGroupService } from "../services/workspace-group.service";
import { PermissionsGuard } from "../../admin/guards/permissions.guard";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import { WorkspaceGroupResponseDto, GroupsListResponseDto } from "../dto/responses";

@ApiTags("Workspace Groups")
@ApiBearerAuth("JWT-auth")
@UseGuards(AnyJwtAuthGuard, PermissionsGuard)
@Controller()
@RbacResource({
  code: RbacPermission.USER_WORKSPACES,
  name: "Группы рабочих пространств",
  group: "workspaces",
  appType: "webapp",
})
export class WorkspaceGroupController {
  constructor(private readonly groupService: WorkspaceGroupService) {}

  @Post("workspaces/:workspaceId/groups")
  @Permissions(`${RbacPermission.USER_WORKSPACES}:write`)
  @ApiOperation({ summary: "Create a new group in workspace" })
  @ApiParam({ name: "workspaceId", type: "string" })
  @ApiResponse({
    status: 201,
    description: "Group created successfully",
    type: WorkspaceGroupResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Workspace not found" })
  async create(
    @Param("workspaceId", ParseUUIDPipe) workspaceId: string,
    @Body() dto: CreateGroupDto,
    @Request() req: any,
  ) {
    const group = await this.groupService.create(workspaceId, dto, req.user.sub);
    return this.mapToGroupResponse(group, workspaceId);
  }

  @Get("workspaces/:workspaceId/groups")
  @Permissions(`${RbacPermission.USER_WORKSPACES}:read`)
  @ApiOperation({ summary: "Get all groups in workspace" })
  @ApiParam({ name: "workspaceId", type: "string" })
  @ApiResponse({ status: 200, description: "List of groups", type: GroupsListResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async findAll(@Param("workspaceId", ParseUUIDPipe) workspaceId: string, @Request() req: any) {
    const groups = await this.groupService.findAll(workspaceId, req.user.sub);
    return {
      groups: groups.map((g) => this.mapToGroupResponse(g, workspaceId)),
      total: groups.length,
    };
  }

  @Patch("groups/:id")
  @Permissions(`${RbacPermission.USER_WORKSPACES}:write`)
  @ApiOperation({ summary: "Update group" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({
    status: 200,
    description: "Group updated successfully",
    type: WorkspaceGroupResponseDto,
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Group not found" })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateGroupDto,
    @Request() req: any,
  ) {
    const group = await this.groupService.update(id, dto, req.user.sub);
    if (!group) {
      return { message: "Group updated successfully" };
    }
    return this.mapToGroupResponse(group, group.workspace_id);
  }

  @Delete("groups/:id")
  @Permissions(`${RbacPermission.USER_WORKSPACES}:delete`)
  @ApiOperation({ summary: "Delete group" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Group deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Group not found" })
  async delete(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    return this.groupService.delete(id, req.user.sub);
  }

  @Post("workspaces/:workspaceId/groups/reorder")
  @Permissions(`${RbacPermission.USER_WORKSPACES}:write`)
  @ApiOperation({ summary: "Reorder groups" })
  @ApiParam({ name: "workspaceId", type: "string" })
  @ApiResponse({ status: 200, description: "Groups reordered successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async reorder(
    @Param("workspaceId", ParseUUIDPipe) workspaceId: string,
    @Body() dto: ReorderGroupsDto,
    @Request() req: any,
  ) {
    return this.groupService.reorder(workspaceId, dto, req.user.sub);
  }

  private mapToGroupResponse(group: any, workspaceId: string): WorkspaceGroupResponseDto {
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      color: group.color || null,
      icon: group.icon || null,
      order: group.sort_order ?? 0,
      workspaceId: workspaceId,
      createdAt: new Date(group.created_at),
      updatedAt: new Date(group.updated_at),
    };
  }
}
