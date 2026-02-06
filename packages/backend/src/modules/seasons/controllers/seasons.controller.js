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
exports.SeasonsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const seasons_service_1 = require("../services/seasons.service");
let SeasonsController = class SeasonsController {
    constructor(seasonsService) {
        this.seasonsService = seasonsService;
    }
    async findAll() {
        return this.seasonsService.findAll();
    }
    async create(data) {
        return this.seasonsService.create(data);
    }
    async update(id, data) {
        return this.seasonsService.update(id, data);
    }
    async delete(id) {
        return this.seasonsService.delete(id);
    }
    async generate(data) {
        return this.seasonsService.generate(data.startYear, data.endYear, data.sportId);
    }
    async findCurrent() {
        const season = await this.seasonsService.findCurrent();
        if (!season) {
            throw new common_1.NotFoundException('No current season found');
        }
        return season;
    }
    async findById(id) {
        const season = await this.seasonsService.findById(id);
        if (!season) {
            throw new common_1.NotFoundException(`Season with ID ${id} not found`);
        }
        return season;
    }
};
exports.SeasonsController = SeasonsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all seasons' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of seasons' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new season' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Season created' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing season' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Season updated' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a season' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Season deleted' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Autogenerate seasons based on logic' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Seasons generated' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.GenerateSeasonsDto]),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)('current'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current season' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns current season' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No current season found' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "findCurrent", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get season by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns season' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Season not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SeasonsController.prototype, "findById", null);
exports.SeasonsController = SeasonsController = __decorate([
    (0, common_1.Controller)('reference/seasons'),
    (0, swagger_1.ApiTags)('Seasons'),
    __metadata("design:paramtypes", [seasons_service_1.SeasonsService])
], SeasonsController);
//# sourceMappingURL=seasons.controller.js.map