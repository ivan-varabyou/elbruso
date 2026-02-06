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
exports.AdminSetupController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_setup_dto_1 = require("../dto/admin-setup.dto");
const admin_reset_dto_1 = require("../dto/admin-reset.dto");
const admin_setup_service_1 = require("../services/admin-setup.service");
let AdminSetupController = class AdminSetupController {
    constructor(adminSetupService) {
        this.adminSetupService = adminSetupService;
    }
    async setup(dto) {
        const count = await this.adminSetupService.countAdmins();
        if (count > 0) {
            throw new common_1.ForbiddenException('Admin users already exist. Setup cannot be completed.');
        }
        const admin = await this.adminSetupService.createFirstAdmin({
            email: dto.email,
            password: dto.password,
            name: dto.name,
        });
        return {
            message: 'SUPER_ADMIN successfully created',
            admin: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            },
        };
    }
    async resetAdmin(dto) {
        const count = await this.adminSetupService.countAdmins();
        if (count === 0) {
            throw new common_1.ForbiddenException('No admin users exist. Use /admin/setup first.');
        }
        const result = await this.adminSetupService.resetAdminPassword(dto.email, dto.password);
        return {
            message: 'Admin password reset successfully',
            updated: result,
        };
    }
};
exports.AdminSetupController = AdminSetupController;
__decorate([
    (0, common_1.Post)('setup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create the first SUPER_ADMIN user' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'SUPER_ADMIN successfully created',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Admin users already exist. Setup is not allowed.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_setup_dto_1.AdminSetupDto]),
    __metadata("design:returntype", Promise)
], AdminSetupController.prototype, "setup", null);
__decorate([
    (0, common_1.Post)('reset-admin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reset admin password (development only)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Admin password reset successfully',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_reset_dto_1.AdminResetDto]),
    __metadata("design:returntype", Promise)
], AdminSetupController.prototype, "resetAdmin", null);
exports.AdminSetupController = AdminSetupController = __decorate([
    (0, swagger_1.ApiTags)('Admin Setup'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_setup_service_1.AdminSetupService])
], AdminSetupController);
//# sourceMappingURL=admin-setup.controller.js.map