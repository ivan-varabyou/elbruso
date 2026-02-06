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
exports.OrganizationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const organization_filters_dto_1 = require("../dto/organization-filters.dto");
const organizations_service_1 = require("../services/organizations.service");
let OrganizationsController = class OrganizationsController {
    constructor(organizationsService) {
        this.organizationsService = organizationsService;
    }
    async findAll(filters) {
        return this.organizationsService.findAll(filters);
    }
    async findFederations(filters) {
        return this.organizationsService.findFederations(filters);
    }
    async getTree(id) {
        return this.organizationsService.getTree(id);
    }
    async getHierarchy(id) {
        return this.organizationsService.getHierarchy(id);
    }
    async findById(id) {
        const organization = await this.organizationsService.findById(id);
        if (!organization) {
            throw new common_1.NotFoundException(`Organization with ID ${id} not found`);
        }
        return organization;
    }
};
exports.OrganizationsController = OrganizationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all organizations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of organizations' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_filters_dto_1.OrganizationFiltersDto]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('federations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get federations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of federations' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_filters_dto_1.OrganizationFiltersDto]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "findFederations", null);
__decorate([
    (0, common_1.Get)(':id/tree'),
    (0, swagger_1.ApiOperation)({ summary: 'Get organization tree' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getTree", null);
__decorate([
    (0, common_1.Get)(':id/hierarchy'),
    (0, swagger_1.ApiOperation)({ summary: 'Get organization hierarchy (flat list)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "getHierarchy", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get organization by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns organization' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Organization not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationsController.prototype, "findById", null);
exports.OrganizationsController = OrganizationsController = __decorate([
    (0, common_1.Controller)('reference/organizations'),
    (0, swagger_1.ApiTags)('Organizations'),
    __metadata("design:paramtypes", [organizations_service_1.OrganizationsService])
], OrganizationsController);
//# sourceMappingURL=organizations.controller.js.map