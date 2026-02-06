"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixFormulaDto = exports.CreateLinkDto = exports.LinkMetadata = exports.LinkFieldMapping = exports.GetCellsQueryDto = exports.BatchUpdateCellsDto = exports.BatchCellUpdate = exports.UpdateCellDto = exports.CellDataDto = exports.CreateVersionDto = exports.ColumnDefinition = exports.UpdateTableDto = exports.CreateTableDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateTableDto {
}
exports.CreateTableDto = CreateTableDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Table name',
        example: 'Q1 Sales Data',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateTableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Table description',
        example: 'Sales data for Q1 2024',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTableDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Group ID to organize table',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTableDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Initial number of rows',
        example: 10,
        default: 10,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTableDto.prototype, "initialRows", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Initial number of columns',
        example: 5,
        default: 5,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTableDto.prototype, "initialColumns", void 0);
class UpdateTableDto {
}
exports.UpdateTableDto = UpdateTableDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Table name',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UpdateTableDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Table description',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTableDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Group ID',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTableDto.prototype, "groupId", void 0);
class ColumnDefinition {
}
exports.ColumnDefinition = ColumnDefinition;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Product Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ColumnDefinition.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'string',
        enum: ['string', 'number', 'boolean', 'date'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['string', 'number', 'boolean', 'date']),
    __metadata("design:type", String)
], ColumnDefinition.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 150 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ColumnDefinition.prototype, "width", void 0);
class CreateVersionDto {
}
exports.CreateVersionDto = CreateVersionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Column definitions for this version',
        type: [ColumnDefinition],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ColumnDefinition),
    __metadata("design:type", Array)
], CreateVersionDto.prototype, "columnDefinitions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Copy data from this version ID',
        example: '550e8400-e29b-41d4-a716-446655440000',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateVersionDto.prototype, "copyDataFromVersion", void 0);
class CellDataDto {
}
exports.CellDataDto = CellDataDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cell value' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CellDataDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Cell formula', example: '=SUM(A1:A10)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CellDataDto.prototype, "formula", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Cell type',
        enum: ['string', 'number', 'boolean', 'formula'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['string', 'number', 'boolean', 'formula']),
    __metadata("design:type", String)
], CellDataDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Cell format',
        example: { bold: true, color: '#FF0000' },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CellDataDto.prototype, "format", void 0);
class UpdateCellDto {
}
exports.UpdateCellDto = UpdateCellDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Row index (0-based)', example: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCellDto.prototype, "rowIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Column index (0-based)', example: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCellDto.prototype, "colIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cell data', type: CellDataDto }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CellDataDto),
    __metadata("design:type", CellDataDto)
], UpdateCellDto.prototype, "cellData", void 0);
class BatchCellUpdate {
}
exports.BatchCellUpdate = BatchCellUpdate;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Row index', example: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BatchCellUpdate.prototype, "rowIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Column index', example: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BatchCellUpdate.prototype, "colIndex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cell data', type: CellDataDto }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CellDataDto),
    __metadata("design:type", CellDataDto)
], BatchCellUpdate.prototype, "cellData", void 0);
class BatchUpdateCellsDto {
}
exports.BatchUpdateCellsDto = BatchUpdateCellsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of cell updates',
        type: [BatchCellUpdate],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BatchCellUpdate),
    __metadata("design:type", Array)
], BatchUpdateCellsDto.prototype, "cells", void 0);
class GetCellsQueryDto {
}
exports.GetCellsQueryDto = GetCellsQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Start row (0-based)', example: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetCellsQueryDto.prototype, "startRow", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End row (0-based)', example: 99 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetCellsQueryDto.prototype, "endRow", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Start column (0-based)', example: 0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetCellsQueryDto.prototype, "startCol", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'End column (0-based)', example: 9 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetCellsQueryDto.prototype, "endCol", void 0);
class LinkFieldMapping {
}
exports.LinkFieldMapping = LinkFieldMapping;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Source field name from catalog' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinkFieldMapping.prototype, "sourceField", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target column index in dynamic table' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LinkFieldMapping.prototype, "targetColIndex", void 0);
class LinkMetadata {
}
exports.LinkMetadata = LinkMetadata;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Source column identifier (legacy)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LinkMetadata.prototype, "sourceColumn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Target column identifier (legacy)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LinkMetadata.prototype, "targetColumn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [LinkFieldMapping],
        description: 'Field to column mappings',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => LinkFieldMapping),
    __metadata("design:type", Array)
], LinkMetadata.prototype, "mappings", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Filter criteria for link' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], LinkMetadata.prototype, "filter", void 0);
class CreateLinkDto {
}
exports.CreateLinkDto = CreateLinkDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Donor table ID' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLinkDto.prototype, "sourceTableId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Donor system entity (e.g. regions)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLinkDto.prototype, "sourceSystemEntity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['cell_reference', 'lookup_reference', 'aggregation', 'shared_keys'],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLinkDto.prototype, "linkType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: LinkMetadata }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LinkMetadata),
    __metadata("design:type", LinkMetadata)
], CreateLinkDto.prototype, "metadata", void 0);
class MatrixFormulaDto {
}
exports.MatrixFormulaDto = MatrixFormulaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A1:A100' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MatrixFormulaDto.prototype, "range", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '=SUM(B:B)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MatrixFormulaDto.prototype, "formula", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Step for formula replication',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], MatrixFormulaDto.prototype, "step", void 0);
//# sourceMappingURL=tables.dto.js.map