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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceGroupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const workspace_group_dto_1 = require("../dto/workspace-group.dto");
const workspace_group_service_1 = require("../services/workspace-group.service");
let WorkspaceGroupController = class WorkspaceGroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async create(workspaceId, dto, req) {
        return this.groupService.create(workspaceId, dto, req.user.sub);
    }
    async findAll(workspaceId, req) {
        return this.groupService.findAll(workspaceId, req.user.sub);
    }
    async update(id, dto, req) {
        return this.groupService.update(id, dto, req.user.sub);
    }
    async delete(id, req) {
        return this.groupService.delete(id, req.user.sub);
    }
    async reorder(workspaceId, dto, req) {
        return this.groupService.reorder(workspaceId, dto, req.user.sub);
    }
};
exports.WorkspaceGroupController = WorkspaceGroupController;
__decorate([
    (0, common_1.Post)('workspaces/:workspaceId/groups'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new group in workspace' }),
    (0, swagger_1.ApiParam)({ name: 'workspaceId', type: 'string' }),
    __param(0, (0, common_1.Param)('workspaceId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, workspace_group_dto_1.CreateGroupDto, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('workspaces/:workspaceId/groups'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all groups in workspace' }),
    (0, swagger_1.ApiParam)({ name: 'workspaceId', type: 'string' }),
    __param(0, (0, common_1.Param)('workspaceId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('groups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update group' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, workspace_group_dto_1.UpdateGroupDto, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('groups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete group' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('workspaces/:workspaceId/groups/reorder'),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder groups' }),
    (0, swagger_1.ApiParam)({ name: 'workspaceId', type: 'string' }),
    __param(0, (0, common_1.Param)('workspaceId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, workspace_group_dto_1.ReorderGroupsDto, Object]),
    __metadata("design:returntype", Promise)
], WorkspaceGroupController.prototype, "reorder", null);
exports.WorkspaceGroupController = WorkspaceGroupController = __decorate([
    (0, swagger_1.ApiTags)('Workspace Groups'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [workspace_group_service_1.WorkspaceGroupService])
], WorkspaceGroupController);
//# sourceMappingURL=workspace-group.controller.js.map