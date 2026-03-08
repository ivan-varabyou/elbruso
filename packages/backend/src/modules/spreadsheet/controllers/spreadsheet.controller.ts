import { JwtAuthGuard } from '@backend/modules/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth,ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RequestWithUser } from '../../auth/interfaces/auth.interface';
import {
  CellResponseDto,
  SheetResponseDto,
  SpreadsheetListResponseDto,
  SpreadsheetResponseDto,
} from '../dto/responses/spreadsheet.response.dto';
import {
  CreateSheetDto,
  CreateSpreadsheetDto,
  UpdateCellDto,
  UpdateSheetDto,
  UpdateSpreadsheetDto,
} from '../dto/spreadsheet.dto';
import { SpreadsheetService } from '../services/spreadsheet.service';

@ApiTags('Spreadsheets')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('spreadsheets')
export class SpreadsheetController {
  constructor(private readonly spreadsheetService: SpreadsheetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new spreadsheet' })
  @ApiResponse({ status: 201, type: SpreadsheetResponseDto })
  async create(
    @Body() dto: CreateSpreadsheetDto,
    @Request() req: RequestWithUser,
  ) {
    return this.spreadsheetService.createSpreadsheet(dto, req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'List all spreadsheets' })
  @ApiResponse({ status: 200, type: SpreadsheetListResponseDto })
  async findAll(
    @Query('status') status?: string,
    @Query('organization_id') organizationId?: number,
    @Query('sport_id') sportId?: number,
  ) {
    const items = await this.spreadsheetService.findAll({
      status,
      organization_id: organizationId,
      sport_id: sportId,
    });
    return {
      items,
      total: items.length,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get spreadsheet by ID with sheets' })
  @ApiResponse({ status: 200, type: SpreadsheetResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.spreadsheetService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update spreadsheet metadata' })
  @ApiResponse({ status: 200, type: SpreadsheetResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSpreadsheetDto,
  ) {
    return this.spreadsheetService.updateSpreadsheet(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete spreadsheet' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.spreadsheetService.deleteSpreadsheet(id);
  }

  @Post(':id/sheets')
  @ApiOperation({ summary: 'Add a new sheet to spreadsheet' })
  @ApiResponse({ status: 201, type: SheetResponseDto })
  async addSheet(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateSheetDto,
  ) {
    return this.spreadsheetService.createSheet(id, dto);
  }

  @Put(':id/sheets/:sheetId')
  @ApiOperation({ summary: 'Update sheet settings' })
  @ApiResponse({ status: 200, type: SheetResponseDto })
  async updateSheet(
    @Param('sheetId', ParseUUIDPipe) sheetId: string,
    @Body() dto: UpdateSheetDto,
  ) {
    return this.spreadsheetService.updateSheet(sheetId, dto);
  }

  @Get(':id/sheets/:sheetId/cells')
  @ApiOperation({ summary: 'Get all cells for a sheet' })
  @ApiResponse({ status: 200, type: [CellResponseDto] })
  async getCells(@Param('sheetId', ParseUUIDPipe) sheetId: string) {
    return this.spreadsheetService.getCells(sheetId);
  }

  @Put(':id/sheets/:sheetId/cells/batch')
  @ApiOperation({ summary: 'Batch update cells in a sheet' })
  @ApiResponse({ status: 200 })
  async updateCells(
    @Param('sheetId', ParseUUIDPipe) sheetId: string,
    @Body() updates: UpdateCellDto[],
  ) {
    await this.spreadsheetService.updateCells(sheetId, updates);
    return { message: 'Cells updated' };
  }
}
