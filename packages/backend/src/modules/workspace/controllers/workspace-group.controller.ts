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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@backend/modules/auth/guards/jwt-auth.guard';
import {
  CreateGroupDto,
  UpdateGroupDto,
  ReorderGroupsDto,
} from '../dto/workspace-group.dto';
import { WorkspaceGroupService } from '../services/workspace-group.service';

@ApiTags('Workspace Groups')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller()
export class WorkspaceGroupController {
  constructor(private readonly groupService: WorkspaceGroupService) {}

  @Post('workspaces/:workspaceId/groups')
  @ApiOperation({ summary: 'Create a new group in workspace' })
  @ApiParam({ name: 'workspaceId', type: 'string' })
  async create(
    @Param('workspaceId') workspaceId: string,
    @Body() dto: CreateGroupDto,
    @Request() req: any,
  ) {
    return this.groupService.create(workspaceId, dto, req.user.sub);
  }

  @Get('workspaces/:workspaceId/groups')
  @ApiOperation({ summary: 'Get all groups in workspace' })
  @ApiParam({ name: 'workspaceId', type: 'string' })
  async findAll(
    @Param('workspaceId') workspaceId: string,
    @Request() req: any,
  ) {
    return this.groupService.findAll(workspaceId, req.user.sub);
  }

  @Patch('groups/:id')
  @ApiOperation({ summary: 'Update group' })
  @ApiParam({ name: 'id', type: 'string' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateGroupDto,
    @Request() req: any,
  ) {
    return this.groupService.update(id, dto, req.user.sub);
  }

  @Delete('groups/:id')
  @ApiOperation({ summary: 'Delete group' })
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.groupService.delete(id, req.user.sub);
  }

  @Post('workspaces/:workspaceId/groups/reorder')
  @ApiOperation({ summary: 'Reorder groups' })
  @ApiParam({ name: 'workspaceId', type: 'string' })
  async reorder(
    @Param('workspaceId') workspaceId: string,
    @Body() dto: ReorderGroupsDto,
    @Request() req: any,
  ) {
    return this.groupService.reorder(workspaceId, dto, req.user.sub);
  }
}
