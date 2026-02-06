"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const database_module_1 = require("../../../../database/src/database.module");
const admin_auth_module_1 = require("./admin-auth.module");
const admin_setup_controller_1 = require("./controllers/admin-setup.controller");
const admin_roles_module_1 = require("./roles/admin-roles.module");
const admin_setup_service_1 = require("./services/admin-setup.service");
const admin_users_module_1 = require("./users/admin-users.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            passport_1.PassportModule.register({ defaultStrategy: 'admin-jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('ADMIN_JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get('ADMIN_JWT_EXPIRES_IN') || '1h',
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            admin_auth_module_1.AdminAuthModule,
            admin_users_module_1.AdminUsersModule,
            admin_roles_module_1.AdminRolesModule,
        ],
        controllers: [admin_setup_controller_1.AdminSetupController],
        providers: [admin_setup_service_1.AdminSetupService],
        exports: [admin_setup_service_1.AdminSetupService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map