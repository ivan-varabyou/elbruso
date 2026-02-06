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
exports.IndicatorGroupsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const indicator_group_filters_dto_1 = require("../dto/indicator-group-filters.dto");
const indicator_groups_service_1 = require("../services/indicator-groups.service");
let IndicatorGroupsController = class IndicatorGroupsController {
    constructor(indicatorGroupsService) {
        this.indicatorGroupsService = indicatorGroupsService;
    }
    async findAll(filters) {
        return this.indicatorGroupsService.findAll(filters);
    }
    async findById(id) {
        const group = await this.indicatorGroupsService.findById(id);
        if (!group) {
            throw new common_1.NotFoundException(`Indicator group with ID ${id} not found`);
        }
        return group;
    }
    async findIndicatorsByGroup(id) {
        return this.indicatorGroupsService.findIndicatorsByGroup(id);
    }
};
exports.IndicatorGroupsController = IndicatorGroupsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all indicator groups' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of groups' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [indicator_group_filters_dto_1.IndicatorGroupFiltersDto]),
    __metadata("design:returntype", Promise)
], IndicatorGroupsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get indicator group by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns group' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Group not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IndicatorGroupsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(':id/indicators'),
    (0, swagger_1.ApiOperation)({ summary: 'Get indicators for a specific group' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of indicators' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IndicatorGroupsController.prototype, "findIndicatorsByGroup", null);
exports.IndicatorGroupsController = IndicatorGroupsController = __decorate([
    (0, common_1.Controller)('reference/indicator-groups'),
    (0, swagger_1.ApiTags)('Indicator Groups'),
    __metadata("design:paramtypes", [indicator_groups_service_1.IndicatorGroupsService])
], IndicatorGroupsController);
//# sourceMappingURL=indicator-groups.controller.js.map