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
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CreatePageDto, UpdatePageDto, MovePageDto } from '../dto';
import { PagesService } from '../services/pages.service';

@ApiTags('Pages')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller()
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post('workspaces/:workspaceId/pages')
  @ApiOperation({ summary: 'Create a new page in workspace' })
  @ApiParam({ name: 'workspaceId', type: 'string' })
  async create(
    @Param('workspaceId') workspaceId: string,
    @Body() dto: CreatePageDto,
    @Request() req: any,
  ) {
    return this.pagesService.create(workspaceId, dto, req.user.sub);
  }

  @Get('workspaces/:workspaceId/pages')
  @ApiOperation({ summary: 'Get page tree for workspace' })
  @ApiParam({ name: 'workspaceId', type: 'string' })
  async getTree(
    @Param('workspaceId') workspaceId: string,
    @Request() req: any,
  ) {
    return this.pagesService.getPageTree(workspaceId, req.user.sub);
  }

  @Get('pages/:id')
  @ApiOperation({ summary: 'Get page by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.pagesService.findById(id, req.user.sub);
  }

  @Patch('pages/:id')
  @ApiOperation({ summary: 'Update page' })
  @ApiParam({ name: 'id', type: 'string' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePageDto,
    @Request() req: any,
  ) {
    return this.pagesService.update(id, dto, req.user.sub);
  }

  @Post('pages/:id/move')
  @ApiOperation({ summary: 'Move page to new parent or position' })
  @ApiParam({ name: 'id', type: 'string' })
  async move(
    @Param('id') id: string,
    @Body() dto: MovePageDto,
    @Request() req: any,
  ) {
    return this.pagesService.move(id, dto, req.user.sub);
  }

  @Delete('pages/:id')
  @ApiOperation({ summary: 'Delete page (soft delete)' })
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.pagesService.delete(id, req.user.sub);
  }
}
