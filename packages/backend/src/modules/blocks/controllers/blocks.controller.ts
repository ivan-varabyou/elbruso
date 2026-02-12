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
  NotFoundException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AnyJwtAuthGuard } from "@backend/modules/auth/guards/any-jwt-auth.guard";
import { CreateBlockDto, UpdateBlockDto, MoveBlockDto } from "../dto";
import { BlocksService } from "../services/blocks.service";
import { BlockResponseDto, BlocksListResponseDto } from "../dto/responses";

@ApiTags("Blocks")
@ApiBearerAuth("JWT-auth")
@UseGuards(AnyJwtAuthGuard)
@Controller()
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post("pages/:pageId/blocks")
  @ApiOperation({ summary: "Create a new block in page" })
  @ApiParam({ name: "pageId", type: "string" })
  @ApiResponse({ status: 201, description: "Block created successfully", type: BlockResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Page not found" })
  async create(
    @Param("pageId", ParseUUIDPipe) pageId: string,
    @Body() dto: CreateBlockDto,
    @Request() req: any,
  ) {
    const block = await this.blocksService.create(pageId, dto, req.user.sub);
    return this.mapToBlockResponse(block);
  }

  @Get("pages/:pageId/blocks")
  @ApiOperation({ summary: "Get all blocks for a page" })
  @ApiParam({ name: "pageId", type: "string" })
  @ApiResponse({ status: 200, description: "List of blocks", type: BlocksListResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async findByPage(@Param("pageId", ParseUUIDPipe) pageId: string, @Request() req: any) {
    const blocks = await this.blocksService.findByPage(pageId, req.user.sub);
    return {
      blocks: blocks.map((b) => this.mapToBlockResponse(b)),
      total: blocks.length,
    };
  }

  @Get("blocks/:id")
  @ApiOperation({ summary: "Get block by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Block details", type: BlockResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Block not found" })
  async findOne(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    const blocks = await this.blocksService.findByPage("", req.user.sub);
    const block = blocks.find((b: any) => b.id === id);
    if (block) {
      return this.mapToBlockResponse(block);
    }
    throw new NotFoundException("Block not found");
  }

  @Patch("blocks/:id")
  @ApiOperation({ summary: "Update block content" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Block updated successfully", type: BlockResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Block not found" })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateBlockDto,
    @Request() req: any,
  ) {
    const block = await this.blocksService.update(id, dto, req.user.sub);
    return this.mapToBlockResponse(block);
  }

  @Post("blocks/:id/move")
  @ApiOperation({ summary: "Move block to new position" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Block moved successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Block not found" })
  async move(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: MoveBlockDto,
    @Request() req: any,
  ) {
    return this.blocksService.move(id, dto, req.user.sub);
  }

  @Delete("blocks/:id")
  @ApiOperation({ summary: "Delete block (soft delete)" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Block deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Block not found" })
  async delete(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    return this.blocksService.delete(id, req.user.sub);
  }

  private mapToBlockResponse(block: any): BlockResponseDto {
    return {
      id: block.id,
      pageId: block.page_id,
      type: block.block_type,
      content: typeof block.content === "string" ? JSON.parse(block.content) : block.content || {},
      position: block.sort_order ?? 0,
      isDeleted: block.is_active === false,
      createdAt: new Date(block.created_at),
      updatedAt: new Date(block.updated_at),
      createdBy: block.created_by,
    };
  }
}
