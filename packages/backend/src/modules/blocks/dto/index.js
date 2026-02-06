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
exports.MoveBlockDto = exports.UpdateBlockDto = exports.CreateBlockDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBlockDto {
}
exports.CreateBlockDto = CreateBlockDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'text',
        enum: ['text', 'table', 'chart', 'divider', 'image'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['text', 'table', 'chart', 'divider', 'image']),
    __metadata("design:type", String)
], CreateBlockDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { text: '# Welcome', format: 'markdown' },
        description: 'Block content (structure depends on type)',
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateBlockDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '550e8400-e29b-41d4-a716-446655440001',
        description: 'Insert after this block. Null for first position.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateBlockDto.prototype, "afterBlockId", void 0);
class UpdateBlockDto {
}
exports.UpdateBlockDto = UpdateBlockDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { text: '# Updated Content', format: 'markdown' },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateBlockDto.prototype, "content", void 0);
class MoveBlockDto {
}
exports.MoveBlockDto = MoveBlockDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '550e8400-e29b-41d4-a716-446655440002',
        description: 'Insert after this block. Null for first position.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MoveBlockDto.prototype, "afterBlockId", void 0);
//# sourceMappingURL=index.js.map