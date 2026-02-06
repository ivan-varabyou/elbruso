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
exports.RegionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const region_filters_dto_1 = require("../dto/region-filters.dto");
const regions_service_1 = require("../services/regions.service");
let RegionsController = class RegionsController {
    constructor(regionsService) {
        this.regionsService = regionsService;
    }
    async findAll(filters) {
        return this.regionsService.findAll(filters);
    }
    async findById(id) {
        const region = await this.regionsService.findById(id);
        if (!region) {
            throw new common_1.NotFoundException(`Region with ID ${id} not found`);
        }
        return region;
    }
    async findByDistrict(districtId) {
        return this.regionsService.findByDistrict(districtId);
    }
    async findByCountry(countryId) {
        return this.regionsService.findByCountry(countryId);
    }
};
exports.RegionsController = RegionsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all regions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of regions' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [region_filters_dto_1.RegionFiltersDto]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get region by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns region' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Region not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('by-district/:districtId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get regions by federal district' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of regions' }),
    __param(0, (0, common_1.Param)('districtId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findByDistrict", null);
__decorate([
    (0, common_1.Get)('by-country/:countryId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get regions by country' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of regions' }),
    __param(0, (0, common_1.Param)('countryId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RegionsController.prototype, "findByCountry", null);
exports.RegionsController = RegionsController = __decorate([
    (0, common_1.Controller)('reference/regions'),
    (0, swagger_1.ApiTags)('Regions'),
    __metadata("design:paramtypes", [regions_service_1.RegionsService])
], RegionsController);
//# sourceMappingURL=regions.controller.js.map