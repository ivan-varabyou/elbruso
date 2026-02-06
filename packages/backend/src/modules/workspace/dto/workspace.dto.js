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
exports.UpdateMemberRoleDto = exports.AddMemberDto = exports.WorkspaceRole = exports.UpdateWorkspaceDto = exports.CreateWorkspaceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateWorkspaceDto {
}
exports.CreateWorkspaceDto = CreateWorkspaceDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Workspace name',
        example: 'My Workspace',
        minLength: 1,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateWorkspaceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workspace description',
        example: 'Team collaboration workspace',
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], CreateWorkspaceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workspace icon (emoji or URL)',
        example: '🚀',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateWorkspaceDto.prototype, "icon", void 0);
class UpdateWorkspaceDto {
}
exports.UpdateWorkspaceDto = UpdateWorkspaceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workspace name',
        example: 'Updated Workspace',
        minLength: 1,
        maxLength: 100,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateWorkspaceDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workspace description',
        maxLength: 500,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    __metadata("design:type", String)
], UpdateWorkspaceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Workspace icon',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateWorkspaceDto.prototype, "icon", void 0);
var WorkspaceRole;
(function (WorkspaceRole) {
    WorkspaceRole["OWNER"] = "owner";
    WorkspaceRole["EDITOR"] = "editor";
    WorkspaceRole["VIEWER"] = "viewer";
})(WorkspaceRole || (exports.WorkspaceRole = WorkspaceRole = {}));
class AddMemberDto {
}
exports.AddMemberDto = AddMemberDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Member email address',
        example: 'user@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Member role',
        enum: WorkspaceRole,
        example: WorkspaceRole.EDITOR,
    }),
    (0, class_validator_1.IsEnum)(WorkspaceRole),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "role", void 0);
class UpdateMemberRoleDto {
}
exports.UpdateMemberRoleDto = UpdateMemberRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'New member role',
        enum: WorkspaceRole,
        example: WorkspaceRole.EDITOR,
    }),
    (0, class_validator_1.IsEnum)(WorkspaceRole),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMemberRoleDto.prototype, "role", void 0);
//# sourceMappingURL=workspace.dto.js.map