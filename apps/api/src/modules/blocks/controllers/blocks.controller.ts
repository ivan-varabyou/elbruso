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
import { CreateBlockDto, UpdateBlockDto, MoveBlockDto } from '../dto';
import { BlocksService } from '../services/blocks.service';

@ApiTags('Blocks')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller()
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}

  @Post('pages/:pageId/blocks')
  @ApiOperation({ summary: 'Create a new block in page' })
  @ApiParam({ name: 'pageId', type: 'string' })
  async create(
    @Param('pageId') pageId: string,
    @Body() dto: CreateBlockDto,
    @Request() req: any,
  ) {
    return this.blocksService.create(pageId, dto, req.user.sub);
  }

  @Get('pages/:pageId/blocks')
  @ApiOperation({ summary: 'Get all blocks for a page' })
  @ApiParam({ name: 'pageId', type: 'string' })
  async findByPage(@Param('pageId') pageId: string, @Request() req: any) {
    return this.blocksService.findByPage(pageId, req.user.sub);
  }

  @Patch('blocks/:id')
  @ApiOperation({ summary: 'Update block content' })
  @ApiParam({ name: 'id', type: 'string' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBlockDto,
    @Request() req: any,
  ) {
    return this.blocksService.update(id, dto, req.user.sub);
  }

  @Post('blocks/:id/move')
  @ApiOperation({ summary: 'Move block to new position' })
  @ApiParam({ name: 'id', type: 'string' })
  async move(
    @Param('id') id: string,
    @Body() dto: MoveBlockDto,
    @Request() req: any,
  ) {
    return this.blocksService.move(id, dto, req.user.sub);
  }

  @Delete('blocks/:id')
  @ApiOperation({ summary: 'Delete block (soft delete)' })
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.blocksService.delete(id, req.user.sub);
  }
}
