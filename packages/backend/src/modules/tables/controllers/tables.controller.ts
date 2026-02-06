/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@backend/modules/auth/guards/jwt-auth.guard';
import {
  CreateTableDto,
  UpdateTableDto,
  CreateVersionDto,
  BatchUpdateCellsDto,
  GetCellsQueryDto,
  CreateLinkDto,
  MatrixFormulaDto,
} from '../dto/tables.dto';
import { TablesService } from '../services/tables.service';

@ApiTags('Tables')
@Controller('tables')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  // ==================== Table Management ====================

  @Post('workspaces/:workspaceId/tables')
  @ApiOperation({ summary: 'Create a new table in workspace' })
  @ApiParam({ name: 'workspaceId', type: 'string' })
  async create(
    @Param('workspaceId') workspaceId: string,
    @Body() dto: CreateTableDto,
    @Request() req: any,
  ) {
    return this.tablesService.create(workspaceId, dto, req.user.sub);
  }

  @Get('workspaces/:workspaceId/tables')
  @ApiOperation({ summary: 'Get all tables in workspace' })
  @ApiParam({ name: 'workspaceId', type: 'string' })
  @ApiQuery({ name: 'groupId', required: false, type: 'string' })
  async findAll(
    @Param('workspaceId') workspaceId: string,
    @Query('groupId') groupId: string | undefined,
    @Request() req: any,
  ) {
    return this.tablesService.findAll(workspaceId, req.user.sub, groupId);
  }

  @Get('tables/:id')
  @ApiOperation({ summary: 'Get table by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Param('id') id: string, @Request() req: any) {
    return this.tablesService.findById(id, req.user.sub);
  }

  @Patch('tables/:id')
  @ApiOperation({ summary: 'Update table' })
  @ApiParam({ name: 'id', type: 'string' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTableDto,
    @Request() req: any,
  ) {
    return this.tablesService.update(id, dto, req.user.sub);
  }

  @Delete('tables/:id')
  @ApiOperation({ summary: 'Delete table' })
  @ApiParam({ name: 'id', type: 'string' })
  async delete(@Param('id') id: string, @Request() req: any) {
    return this.tablesService.delete(id, req.user.sub);
  }

  // ==================== Version Management ====================

  @Post('tables/:id/versions')
  @ApiOperation({ summary: 'Create new version' })
  @ApiParam({ name: 'id', type: 'string' })
  async createVersion(
    @Param('id') id: string,
    @Body() dto: CreateVersionDto,
    @Request() req: any,
  ) {
    return this.tablesService.createVersion(id, dto, req.user.sub);
  }

  @Get('tables/:id/versions')
  @ApiOperation({ summary: 'Get version history' })
  @ApiParam({ name: 'id', type: 'string' })
  async getVersionHistory(@Param('id') id: string, @Request() req: any) {
    return this.tablesService.getVersionHistory(id, req.user.sub);
  }

  @Post('versions/:id/activate')
  @ApiOperation({ summary: 'Activate version' })
  @ApiParam({ name: 'id', type: 'string' })
  async activateVersion(@Param('id') id: string, @Request() req: any) {
    return this.tablesService.activateVersion(id, req.user.sub);
  }

  // ==================== Cell Operations ====================

  @Get('versions/:id/cells')
  @ApiOperation({ summary: 'Get cells with pagination' })
  @ApiParam({ name: 'id', type: 'string' })
  async getCells(
    @Param('id') id: string,
    @Query() query: GetCellsQueryDto,
    @Request() req: any,
  ) {
    return this.tablesService.getCells(id, query, req.user.sub);
  }

  @Patch('versions/:id/cells/:rowIndex/:colIndex')
  @ApiOperation({ summary: 'Update single cell' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'rowIndex', type: 'number' })
  @ApiParam({ name: 'colIndex', type: 'number' })
  async updateCell(
    @Param('id') id: string,
    @Param('rowIndex') rowIndex: string,
    @Param('colIndex') colIndex: string,
    @Body() cellData: any,
    @Request() req: any,
  ) {
    return this.tablesService.updateCell(
      id,
      {
        rowIndex: parseInt(rowIndex),
        colIndex: parseInt(colIndex),
        cellData,
      },
      req.user.sub,
    );
  }

  @Post('versions/:id/cells/batch')
  @ApiOperation({ summary: 'Batch update cells' })
  @ApiParam({ name: 'id', type: 'string' })
  async batchUpdateCells(
    @Param('id') id: string,
    @Body() dto: BatchUpdateCellsDto,
    @Request() req: any,
  ) {
    return this.tablesService.batchUpdateCells(id, dto, req.user.sub);
  }

  @Delete('versions/:id/rows/:index')
  @ApiOperation({ summary: 'Delete a row and shift following rows' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'index', type: 'number' })
  async deleteRow(
    @Param('id') id: string,
    @Param('index') index: number,
    @Request() req: any,
  ) {
    return this.tablesService.deleteRow(id, index, req.user.sub);
  }

  @Delete('versions/:id/columns/:index')
  @ApiOperation({ summary: 'Delete a column and shift following columns' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'index', type: 'number' })
  async deleteColumn(
    @Param('id') id: string,
    @Param('index') index: number,
    @Request() req: any,
  ) {
    return this.tablesService.deleteColumn(id, index, req.user.sub);
  }
  @Post('versions/:id/rows/:index')
  @ApiOperation({ summary: 'Insert a new row and shift following rows' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'index', type: 'number' })
  async insertRow(
    @Param('id') id: string,
    @Param('index') index: string,
    @Request() req: any,
  ) {
    return this.tablesService.insertRow(id, parseInt(index), req.user.sub);
  }

  @Post('versions/:id/columns/:index')
  @ApiOperation({ summary: 'Insert a new column and shift following columns' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiParam({ name: 'index', type: 'number' })
  async insertColumn(
    @Param('id') id: string,
    @Param('index') index: string,
    @Request() req: any,
  ) {
    return this.tablesService.insertColumn(id, parseInt(index), req.user.sub);
  }

  // ==================== Linking & Matrix Operations ====================

  @Post('tables/:id/links')
  @ApiOperation({
    summary: 'Connect table to donor (another table or catalog)',
  })
  @ApiParam({ name: 'id', type: 'string' })
  async createLink(
    @Param('id') id: string,
    @Body() dto: CreateLinkDto,
    @Request() req: any,
  ) {
    return this.tablesService.createLink(id, dto, req.user.sub);
  }

  @Patch('versions/:id/matrix-formulas')
  @ApiOperation({ summary: 'Update range/matrix formulas for a version' })
  @ApiParam({ name: 'id', type: 'string' })
  async updateMatrixFormulas(
    @Param('id') id: string,
    @Body() formulas: MatrixFormulaDto[],
    @Request() req: any,
  ) {
    return this.tablesService.updateMatrixFormulas(id, formulas, req.user.sub);
  }

  @Get('tables/:id/donor-status')
  @ApiOperation({ summary: 'Check if donor data has changed' })
  @ApiParam({ name: 'id', type: 'string' })
  async getDonorStatus(@Param('id') id: string, @Request() req: any) {
    return this.tablesService.getDonorStatus(id, req.user.sub);
  }
}
