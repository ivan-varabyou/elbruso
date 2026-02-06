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
exports.IndicatorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const organizations_service_1 = require("../../organizations/services/organizations.service");
const users_service_1 = require("../../users/services/users.service");
const database_service_1 = require("../../../../../database/src/database.service");
const generate_indicators_dto_1 = require("../dto/generate-indicators.dto");
const indicator_filters_dto_1 = require("../dto/indicator-filters.dto");
const indicator_group_dto_1 = require("../dto/indicator-group.dto");
const indicators_service_1 = require("../services/indicators.service");
let IndicatorsController = class IndicatorsController {
    constructor(indicatorsService, usersService, organizationsService, db) {
        this.indicatorsService = indicatorsService;
        this.usersService = usersService;
        this.organizationsService = organizationsService;
        this.db = db;
    }
    async findAll(req, filters) {
        const user = await this.usersService.findById(req.user.sub);
        if (user) {
            filters.userId = String(user.id);
            filters.userOrganizationId = user.organization_id ?? undefined;
            filters.userRole = String(user.role ?? '');
            if (filters.userOrganizationId) {
                const ancestors = await this.organizationsService.getAncestors(filters.userOrganizationId);
                filters.ancestorOrgIds = ancestors.map((a) => a.id);
                const federation = await this.db.client
                    .selectFrom('federations')
                    .select('sport_id')
                    .where('organization_id', '=', filters.userOrganizationId)
                    .executeTakeFirst();
                if (federation) {
                    filters.userSportId = federation.sport_id;
                }
            }
        }
        return this.indicatorsService.findAll(filters);
    }
    async create(req, data) {
        const user = await this.usersService.findById(req.user.sub);
        return this.indicatorsService.create({
            ...data,
            created_by: req.user.sub,
            organization_id: user?.organization_id,
            is_system: false,
        });
    }
    async update(id, data) {
        return this.indicatorsService.update(id, data);
    }
    async delete(id) {
        return this.indicatorsService.delete(id);
    }
    async findById(id) {
        const indicator = await this.indicatorsService.findById(id);
        if (!indicator) {
            throw new common_1.NotFoundException(`Indicator with ID ${id} not found`);
        }
        return indicator;
    }
    async findBySport(sportId) {
        return this.indicatorsService.findBySport(sportId);
    }
    async getTemplates() {
        return this.indicatorsService.getTemplates();
    }
    async generate(dto) {
        return this.indicatorsService.generate(dto);
    }
    async getGroups(dto) {
        const sportId = dto.sportId ? Number(dto.sportId) : undefined;
        return this.indicatorsService.getGroups(sportId);
    }
    async getGenders() {
        return this.indicatorsService.getGenders();
    }
    async getAgeGroups() {
        return this.indicatorsService.getAgeGroups();
    }
    async createGroup(data) {
        return this.indicatorsService.createGroup(data);
    }
    async updateGroup(id, data) {
        return this.indicatorsService.updateGroup(id, data);
    }
    async deleteGroup(id) {
        return this.indicatorsService.deleteGroup(id);
    }
};
exports.IndicatorsController = IndicatorsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all indicators with filters' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of indicators' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, indicator_filters_dto_1.IndicatorFiltersDto]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a manual indicator' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Indicator created' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update indicator' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete indicator (mark as inactive)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get indicator by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns indicator' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Indicator not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('by-sport/:sportId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get indicators for a sport' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns list of indicators' }),
    __param(0, (0, common_1.Param)('sportId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "findBySport", null);
__decorate([
    (0, common_1.Get)('generation/templates'),
    (0, swagger_1.ApiOperation)({ summary: 'Get indicator generation templates' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Post)('generation/generate'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate indicators (flexible)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_indicators_dto_1.GenerateIndicatorsDto]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "generate", null);
__decorate([
    (0, common_1.Get)('groups'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all indicator groups' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [indicator_group_dto_1.GetIndicatorGroupsDto]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "getGroups", null);
__decorate([
    (0, common_1.Get)('genders'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all genders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "getGenders", null);
__decorate([
    (0, common_1.Get)('age-groups'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all age groups' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "getAgeGroups", null);
__decorate([
    (0, common_1.Post)('groups'),
    (0, swagger_1.ApiOperation)({ summary: 'Create indicator group' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [indicator_group_dto_1.CreateIndicatorGroupDto]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Patch)('groups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update indicator group' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, indicator_group_dto_1.UpdateIndicatorGroupDto]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "updateGroup", null);
__decorate([
    (0, common_1.Delete)('groups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete indicator group' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], IndicatorsController.prototype, "deleteGroup", null);
exports.IndicatorsController = IndicatorsController = __decorate([
    (0, common_1.Controller)('reference/indicators'),
    (0, swagger_1.ApiTags)('Indicators'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [indicators_service_1.IndicatorsService,
        users_service_1.UsersService,
        organizations_service_1.OrganizationsService,
        database_service_1.DatabaseService])
], IndicatorsController);
//# sourceMappingURL=indicators.controller.js.map