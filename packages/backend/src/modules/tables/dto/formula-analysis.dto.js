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
exports.FormulaAnalysisResponse = exports.ExternalRefResponse = exports.AnalyzeFormulaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AnalyzeFormulaDto {
}
exports.AnalyzeFormulaDto = AnalyzeFormulaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Formula to analyze',
        example: '=SUM([Revenue]!A1:A10)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AnalyzeFormulaDto.prototype, "formula", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current workspace ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], AnalyzeFormulaDto.prototype, "workspaceId", void 0);
class ExternalRefResponse {
}
exports.ExternalRefResponse = ExternalRefResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExternalRefResponse.prototype, "fullReference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], ExternalRefResponse.prototype, "workspaceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExternalRefResponse.prototype, "tableId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExternalRefResponse.prototype, "tableName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ExternalRefResponse.prototype, "range", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ExternalRefResponse.prototype, "hasAccess", void 0);
class FormulaAnalysisResponse {
}
exports.FormulaAnalysisResponse = FormulaAnalysisResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], FormulaAnalysisResponse.prototype, "valid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], FormulaAnalysisResponse.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ExternalRefResponse] }),
    __metadata("design:type", Array)
], FormulaAnalysisResponse.prototype, "externalDependencies", void 0);
//# sourceMappingURL=formula-analysis.dto.js.map