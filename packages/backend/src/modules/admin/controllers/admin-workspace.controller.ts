import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { AdminJwtAuthGuard } from "../../auth/guards/admin-jwt-auth.guard";
import { CreateWorkspaceDto, UpdateWorkspaceDto } from "../../workspace/dto/workspace.dto";
import { WorkspaceService } from "../../workspace/services/workspace.service";
import {
  WorkspaceResponseDto,
  DeleteWorkspaceResponseDto,
} from "../dto/responses/workspace.response.dto";
import { WorkspacesListResponseDto } from "../dto/responses/workspaces-list.response.dto";

@ApiTags("Admin Workspaces")
@ApiBearerAuth("JWT-auth")
@UseGuards(AdminJwtAuthGuard)
@Controller("admin/workspaces")
export class AdminWorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  @ApiOperation({ summary: "Get all workspaces (Admin only)" })
  @ApiResponse({ status: 200, type: WorkspacesListResponseDto })
  async findAll() {
    const entities = await this.workspaceService.findAllForAdmin();
    return plainToInstance(WorkspacesListResponseDto, { data: entities });
  }

  @Post()
  @ApiOperation({ summary: "Create a new workspace/template as admin" })
  @ApiResponse({ status: 201, type: WorkspaceResponseDto })
  async create(@Body() dto: CreateWorkspaceDto) {
    const entity = await this.workspaceService.adminCreate(dto);
    return plainToInstance(WorkspaceResponseDto, entity);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update any workspace" })
  @ApiResponse({ status: 200, type: WorkspaceResponseDto })
  async update(@Param("id", ParseUUIDPipe) id: string, @Body() dto: UpdateWorkspaceDto) {
    const entity = await this.workspaceService.adminUpdate(id, dto);
    return plainToInstance(WorkspaceResponseDto, entity);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete any workspace" })
  @ApiResponse({ status: 200, type: DeleteWorkspaceResponseDto })
  async delete(@Param("id", ParseUUIDPipe) id: string) {
    await this.workspaceService.adminDelete(id);
    return plainToInstance(DeleteWorkspaceResponseDto, {
      message: "Workspace deleted successfully",
    });
  }
}
