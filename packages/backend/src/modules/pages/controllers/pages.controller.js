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
exports.PagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const dto_1 = require("../dto");
const pages_service_1 = require("../services/pages.service");
let PagesController = class PagesController {
    constructor(pagesService) {
        this.pagesService = pagesService;
    }
    async create(workspaceId, dto, req) {
        return this.pagesService.create(workspaceId, dto, req.user.sub);
    }
    async getTree(workspaceId, req) {
        return this.pagesService.getPageTree(workspaceId, req.user.sub);
    }
    async findOne(id, req) {
        return this.pagesService.findById(id, req.user.sub);
    }
    async update(id, dto, req) {
        return this.pagesService.update(id, dto, req.user.sub);
    }
    async move(id, dto, req) {
        return this.pagesService.move(id, dto, req.user.sub);
    }
    async delete(id, req) {
        return this.pagesService.delete(id, req.user.sub);
    }
};
exports.PagesController = PagesController;
__decorate([
    (0, common_1.Post)('workspaces/:workspaceId/pages'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new page in workspace' }),
    (0, swagger_1.ApiParam)({ name: 'workspaceId', type: 'string' }),
    __param(0, (0, common_1.Param)('workspaceId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreatePageDto, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('workspaces/:workspaceId/pages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get page tree for workspace' }),
    (0, swagger_1.ApiParam)({ name: 'workspaceId', type: 'string' }),
    __param(0, (0, common_1.Param)('workspaceId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "getTree", null);
__decorate([
    (0, common_1.Get)('pages/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get page by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('pages/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update page' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePageDto, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('pages/:id/move'),
    (0, swagger_1.ApiOperation)({ summary: 'Move page to new parent or position' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.MovePageDto, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "move", null);
__decorate([
    (0, common_1.Delete)('pages/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete page (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PagesController.prototype, "delete", null);
exports.PagesController = PagesController = __decorate([
    (0, swagger_1.ApiTags)('Pages'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [pages_service_1.PagesService])
], PagesController);
//# sourceMappingURL=pages.controller.js.map