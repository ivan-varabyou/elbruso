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
exports.SportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sports_service_1 = require("../services/sports.service");
let SportsController = class SportsController {
    constructor(sportsService) {
        this.sportsService = sportsService;
    }
    async findAll() {
        return this.sportsService.findAll();
    }
    async findById(id) {
        const sport = await this.sportsService.findById(id);
        if (!sport) {
            throw new common_1.NotFoundException(`Sport with ID ${id} not found`);
        }
        return sport;
    }
    async findDisciplines(id) {
        return this.sportsService.findDisciplines(id);
    }
};
exports.SportsController = SportsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all sports' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of sports' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SportsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get sport by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns sport' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Sport not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SportsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/disciplines'),
    (0, swagger_1.ApiOperation)({ summary: 'Get disciplines for a sport' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of disciplines' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SportsController.prototype, "findDisciplines", null);
exports.SportsController = SportsController = __decorate([
    (0, common_1.Controller)('reference/sports'),
    (0, swagger_1.ApiTags)('Sports'),
    __metadata("design:paramtypes", [sports_service_1.SportsService])
], SportsController);
//# sourceMappingURL=sports.controller.js.map