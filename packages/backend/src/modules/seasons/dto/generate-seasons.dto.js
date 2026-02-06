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
exports.GenerateSeasonsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class GenerateSeasonsDto {
}
exports.GenerateSeasonsDto = GenerateSeasonsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Start year for generation', example: 2024 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.Max)(2100),
    __metadata("design:type", Number)
], GenerateSeasonsDto.prototype, "startYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'End year for generation', example: 2030 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.Max)(2100),
    __metadata("design:type", Number)
], GenerateSeasonsDto.prototype, "endYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Specific sport ID (optional)', required: false }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GenerateSeasonsDto.prototype, "sportId", void 0);
//# sourceMappingURL=generate-seasons.dto.js.map