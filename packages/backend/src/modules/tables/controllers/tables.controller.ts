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
  ParseUUIDPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from "@nestjs/swagger";
import { AnyJwtAuthGuard } from "@backend/modules/auth/guards/any-jwt-auth.guard";
import { Permissions } from "../../rbac/decorators/permissions.decorator";
import { RbacResource } from "../../rbac/decorators/resource.decorator";
import { RbacPermission } from "../../rbac/enums/permission.enum";
import {
  CreateTableDto,
  UpdateTableDto,
  CreateVersionDto,
  BatchUpdateCellsDto,
  GetCellsQueryDto,
  CreateLinkDto,
  MatrixFormulaDto,
} from "../dto/tables.dto";
import { TablesService } from "../services/tables.service";
import { TableResponseDto, TablesListResponseDto, CellsResponseDto } from "../dto/responses";

@ApiTags("Tables")
@Controller("tables")
@UseGuards(AnyJwtAuthGuard)
@ApiBearerAuth("JWT-auth")
@RbacResource({
  code: RbacPermission.USER_TABLES,
  name: "Таблицы",
  group: "tables",
  appType: "webapp",
})
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post("workspaces/:workspaceId/tables")
  @Permissions(`${RbacPermission.USER_TABLES}:create`)
  @ApiOperation({ summary: "Create a new table in workspace" })
  @ApiParam({ name: "workspaceId", type: "string" })
  @ApiResponse({ status: 201, description: "Table created successfully", type: TableResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async create(
    @Param("workspaceId", ParseUUIDPipe) workspaceId: string,
    @Body() dto: CreateTableDto,
    @Request() req: any,
  ) {
    const table = await this.tablesService.create(workspaceId, dto, req.user.sub);
    return this.mapToTableResponse(table);
  }

  @Get("workspaces/:workspaceId/tables")
  @Permissions(`${RbacPermission.USER_TABLES}:read`)
  @ApiOperation({ summary: "Get all tables in workspace" })
  @ApiParam({ name: "workspaceId", type: "string" })
  @ApiQuery({ name: "groupId", required: false, type: "string" })
  @ApiResponse({ status: 200, description: "List of tables", type: TablesListResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async findAll(
    @Param("workspaceId", ParseUUIDPipe) workspaceId: string,
    @Query("groupId") groupId: string | undefined,
    @Request() req: any,
  ) {
    const tables = await this.tablesService.findAll(workspaceId, req.user.sub, groupId);
    return {
      tables: tables.map((t) => this.mapToTableResponse(t)),
      total: tables.length,
    };
  }

  @Get("tables/:id")
  @Permissions(`${RbacPermission.USER_TABLES}:read`)
  @ApiOperation({ summary: "Get table by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Table details", type: TableResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Table not found" })
  async findOne(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    const table = await this.tablesService.findById(id, req.user.sub);
    return this.mapToTableResponse(table);
  }

  @Patch("tables/:id")
  @Permissions(`${RbacPermission.USER_TABLES}:write`)
  @ApiOperation({ summary: "Update table" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Table updated successfully", type: TableResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Table not found" })
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateTableDto,
    @Request() req: any,
  ) {
    const table = await this.tablesService.update(id, dto, req.user.sub);
    return this.mapToTableResponse(table);
  }

  @Delete("tables/:id")
  @Permissions(`${RbacPermission.USER_TABLES}:delete`)
  @ApiOperation({ summary: "Delete table" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Table deleted successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Table not found" })
  async delete(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    return this.tablesService.delete(id, req.user.sub);
  }

  @Post("tables/:id/versions")
  @Permissions(`${RbacPermission.USER_TABLES}:write`)
  @ApiOperation({ summary: "Create new version" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 201, description: "Version created successfully" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Table not found" })
  async createVersion(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: CreateVersionDto,
    @Request() req: any,
  ) {
    return this.tablesService.createVersion(id, dto, req.user.sub);
  }

  @Get("tables/:id/versions")
  @ApiOperation({ summary: "Get version history" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "List of versions" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async getVersionHistory(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    return this.tablesService.getVersionHistory(id, req.user.sub);
  }

  @Post("versions/:id/activate")
  @ApiOperation({ summary: "Activate version" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Version activated" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Version not found" })
  async activateVersion(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    return this.tablesService.activateVersion(id, req.user.sub);
  }

  @Get("versions/:id/cells")
  @Permissions(`${RbacPermission.USER_CELLS}:read`)
  @ApiOperation({ summary: "Get cells with pagination" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Cells data", type: CellsResponseDto })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  @ApiResponse({ status: 404, description: "Version not found" })
  async getCells(
    @Param("id", ParseUUIDPipe) id: string,
    @Query() query: GetCellsQueryDto,
    @Request() req: any,
  ) {
    return this.tablesService.getCells(id, query, req.user.sub);
  }

  @Patch("versions/:id/cells/:rowIndex/:colIndex")
  @Permissions(`${RbacPermission.USER_CELLS}:write`)
  @ApiOperation({ summary: "Update single cell" })
  @ApiParam({ name: "id", type: "string" })
  @ApiParam({ name: "rowIndex", type: "number" })
  @ApiParam({ name: "colIndex", type: "number" })
  @ApiResponse({ status: 200, description: "Cell updated" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async updateCell(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("rowIndex") rowIndex: string,
    @Param("colIndex") colIndex: string,
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

  @Post("versions/:id/cells/batch")
  @Permissions(`${RbacPermission.USER_CELLS}:write`)
  @ApiOperation({ summary: "Batch update cells" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Cells updated" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async batchUpdateCells(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: BatchUpdateCellsDto,
    @Request() req: any,
  ) {
    return this.tablesService.batchUpdateCells(id, dto, req.user.sub);
  }

  @Delete("versions/:id/rows/:index")
  @ApiOperation({ summary: "Delete a row and shift following rows" })
  @ApiParam({ name: "id", type: "string" })
  @ApiParam({ name: "index", type: "number" })
  @ApiResponse({ status: 200, description: "Row deleted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async deleteRow(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("index") index: number,
    @Request() req: any,
  ) {
    return this.tablesService.deleteRow(id, index, req.user.sub);
  }

  @Delete("versions/:id/columns/:index")
  @ApiOperation({ summary: "Delete a column and shift following columns" })
  @ApiParam({ name: "id", type: "string" })
  @ApiParam({ name: "index", type: "number" })
  @ApiResponse({ status: 200, description: "Column deleted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async deleteColumn(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("index") index: number,
    @Request() req: any,
  ) {
    return this.tablesService.deleteColumn(id, index, req.user.sub);
  }

  @Post("versions/:id/rows/:index")
  @ApiOperation({ summary: "Insert a new row and shift following rows" })
  @ApiParam({ name: "id", type: "string" })
  @ApiParam({ name: "index", type: "number" })
  @ApiResponse({ status: 201, description: "Row inserted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async insertRow(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("index") index: string,
    @Request() req: any,
  ) {
    return this.tablesService.insertRow(id, parseInt(index), req.user.sub);
  }

  @Post("versions/:id/columns/:index")
  @ApiOperation({ summary: "Insert a new column and shift following columns" })
  @ApiParam({ name: "id", type: "string" })
  @ApiParam({ name: "index", type: "number" })
  @ApiResponse({ status: 201, description: "Column inserted" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async insertColumn(
    @Param("id", ParseUUIDPipe) id: string,
    @Param("index") index: string,
    @Request() req: any,
  ) {
    return this.tablesService.insertColumn(id, parseInt(index), req.user.sub);
  }

  @Post("tables/:id/links")
  @ApiOperation({
    summary: "Connect table to donor (another table or catalog)",
  })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 201, description: "Link created" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async createLink(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: CreateLinkDto,
    @Request() req: any,
  ) {
    return this.tablesService.createLink(id, dto, req.user.sub);
  }

  @Patch("versions/:id/matrix-formulas")
  @ApiOperation({ summary: "Update range/matrix formulas for a version" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Formulas updated" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async updateMatrixFormulas(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() formulas: MatrixFormulaDto[],
    @Request() req: any,
  ) {
    return this.tablesService.updateMatrixFormulas(id, formulas, req.user.sub);
  }

  @Get("tables/:id/donor-status")
  @ApiOperation({ summary: "Check if donor data has changed" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Donor status" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @ApiResponse({ status: 403, description: "Forbidden" })
  async getDonorStatus(@Param("id", ParseUUIDPipe) id: string, @Request() req: any) {
    return this.tablesService.getDonorStatus(id, req.user.sub);
  }

  private mapToTableResponse(table: any): TableResponseDto {
    const columns =
      typeof table.activeVersion?.columns === "string"
        ? JSON.parse(table.activeVersion.columns)
        : table.activeVersion?.columns || [];

    return {
      id: table.id,
      workspaceId: table.workspace_id,
      name: table.name,
      description: table.description || undefined,
      columnsCount: columns.length || table.column_count || 0,
      rowsCount: table.row_count || 0,
      activeVersionId: table.activeVersion?.id || null,
      groupId: table.group_id || undefined,
      createdAt: new Date(table.created_at),
      updatedAt: new Date(table.updated_at),
      createdBy: table.created_by,
    };
  }
}
