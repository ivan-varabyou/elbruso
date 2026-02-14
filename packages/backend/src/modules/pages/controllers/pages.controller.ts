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
import { AnyJwtAuthGuard } from "@backend/modules/auth/guards/any-jwt-auth.guard";
import { CreatePageDto, UpdatePageDto, MovePageDto } from "../dto";
import { PagesService } from "../services/pages.service";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import {
  PageResponseDto,
  PagesListResponseDto,
  PageTreeResponseDto,
  PageTreeItemResponseDto,
} from "../dto/responses";

@ApiTags("Pages")
@ApiBearerAuth("JWT-auth")
@UseGuards(AnyJwtAuthGuard)
@Controller()
@RbacResource({
  code: RbacPermission.USER_PAGES,
  name: "Страницы",
  group: "pages",
  appType: "webapp",
})
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post("workspaces/:workspaceId/pages")
  @Permissions(`${RbacPermission.USER_PAGES}:create`)
  @ApiOperation({ summary: "Create a new page in workspace" })
  @ApiParam({ name: "workspaceId", type: "string" })
  @ApiResponse({ status: 201, description: "Page created successfully", type: PageResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async create(
    @Param("workspaceId", ParseUUIDPipe) workspaceId: string,
    @Body() dto: CreatePageDto,
    @Request() req: any,
  ) {
    const page = await this.pagesService.create(workspaceId, dto, req.user.sub);
    return this.mapToPageResponse(page);
  }

  @Get("workspaces/:workspaceId/pages")
  @Permissions(`${RbacPermission.USER_PAGES}:read`)
  @ApiOperation({ summary: "Get page tree for workspace" })
  @ApiParam({ name: "workspaceId", type: "string" })
  @ApiResponse({ status: 200, description: "Page tree", type: PageTreeResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async getTree(@Param("workspaceId", ParseUUIDPipe) workspaceId: string, @Request() req: any) {
    const tree = await this.pagesService.getPageTree(workspaceId, req.user.sub);
    return {
      tree: tree.map((node) => this.mapToTreeItem(node)),
      total: this.countTreeNodes(tree),
    };
  }

  @Get("pages/:id")
  @Permissions(`${RbacPermission.USER_PAGES}:read`)
  @ApiOperation({ summary: "Get page by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Page details", type: PageResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Page not found" })
  async findOne(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    const page = await this.pagesService.findById(id, req.user.sub);
    return this.mapToPageResponse(page);
  }

  @Patch("pages/:id")
  @Permissions(`${RbacPermission.USER_PAGES}:write`)
  @ApiOperation({ summary: "Update page" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Page updated successfully", type: PageResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Page not found" })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdatePageDto,
    @Request() req: any,
  ) {
    const page = await this.pagesService.update(id, dto, req.user.sub);
    return this.mapToPageResponse(page);
  }

  @Post("pages/:id/move")
  @Permissions(`${RbacPermission.USER_PAGES}:write`)
  @ApiOperation({ summary: "Move page to new parent or position" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Page moved successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Page not found" })
  async move(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: MovePageDto,
    @Request() req: any,
  ) {
    return this.pagesService.move(id, dto, req.user.sub);
  }

  @Delete("pages/:id")
  @Permissions(`${RbacPermission.USER_PAGES}:delete`)
  @ApiOperation({ summary: "Delete page (soft delete)" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Page deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Page not found" })
  async delete(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    return this.pagesService.delete(id, req.user.sub);
  }

  private mapToPageResponse(page: any): PageResponseDto {
    return {
      id: page.id,
      title: page.title,
      content: page.content || null,
      icon: page.icon || null,
      coverImageUrl: page.cover_image || page.coverImage || null,
      isPublished: page.is_published ?? false,
      isFavorite: page.is_favorite ?? false,
      parentId: page.parent_page_id || null,
      groupId: page.group_id || null,
      workspaceId: page.workspace_id,
      order: page.sort_order ?? 0,
      createdBy: page.created_by,
      createdAt: new Date(page.created_at),
      updatedAt: new Date(page.updated_at),
    };
  }

  private mapToTreeItem(node: any): PageTreeItemResponseDto {
    return {
      id: node.id,
      title: node.title,
      icon: node.icon || null,
      order: node.sort_order ?? 0,
      isPublished: node.is_published ?? false,
      children: (node.children || []).map((child: any) => this.mapToTreeItem(child)),
    };
  }

  private countTreeNodes(nodes: any[]): number {
    let count = 0;
    for (const node of nodes) {
      count += 1 + this.countTreeNodes(node.children || []);
    }
    return count;
  }
}
