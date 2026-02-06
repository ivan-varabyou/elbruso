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
exports.BlocksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const dto_1 = require("../dto");
const blocks_service_1 = require("../services/blocks.service");
let BlocksController = class BlocksController {
    constructor(blocksService) {
        this.blocksService = blocksService;
    }
    async create(pageId, dto, req) {
        return this.blocksService.create(pageId, dto, req.user.sub);
    }
    async findByPage(pageId, req) {
        return this.blocksService.findByPage(pageId, req.user.sub);
    }
    async update(id, dto, req) {
        return this.blocksService.update(id, dto, req.user.sub);
    }
    async move(id, dto, req) {
        return this.blocksService.move(id, dto, req.user.sub);
    }
    async delete(id, req) {
        return this.blocksService.delete(id, req.user.sub);
    }
};
exports.BlocksController = BlocksController;
__decorate([
    (0, common_1.Post)('pages/:pageId/blocks'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new block in page' }),
    (0, swagger_1.ApiParam)({ name: 'pageId', type: 'string' }),
    __param(0, (0, common_1.Param)('pageId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.CreateBlockDto, Object]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('pages/:pageId/blocks'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all blocks for a page' }),
    (0, swagger_1.ApiParam)({ name: 'pageId', type: 'string' }),
    __param(0, (0, common_1.Param)('pageId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "findByPage", null);
__decorate([
    (0, common_1.Patch)('blocks/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update block content' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateBlockDto, Object]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('blocks/:id/move'),
    (0, swagger_1.ApiOperation)({ summary: 'Move block to new position' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.MoveBlockDto, Object]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "move", null);
__decorate([
    (0, common_1.Delete)('blocks/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete block (soft delete)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlocksController.prototype, "delete", null);
exports.BlocksController = BlocksController = __decorate([
    (0, swagger_1.ApiTags)('Blocks'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [blocks_service_1.BlocksService])
], BlocksController);
//# sourceMappingURL=blocks.controller.js.map