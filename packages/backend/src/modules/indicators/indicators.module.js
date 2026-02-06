"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicatorsModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../../../database/src/database.module");
const organizations_module_1 = require("../organizations/organizations.module");
const users_module_1 = require("../users/users.module");
const indicator_groups_controller_1 = require("./controllers/indicator-groups.controller");
const indicators_controller_1 = require("./controllers/indicators.controller");
const indicator_groups_service_1 = require("./services/indicator-groups.service");
const indicators_service_1 = require("./services/indicators.service");
let IndicatorsModule = class IndicatorsModule {
};
exports.IndicatorsModule = IndicatorsModule;
exports.IndicatorsModule = IndicatorsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, users_module_1.UsersModule, organizations_module_1.OrganizationsModule],
        controllers: [indicators_controller_1.IndicatorsController, indicator_groups_controller_1.IndicatorGroupsController],
        providers: [indicators_service_1.IndicatorsService, indicator_groups_service_1.IndicatorGroupsService],
        exports: [indicators_service_1.IndicatorsService, indicator_groups_service_1.IndicatorGroupsService],
    })
], IndicatorsModule);
//# sourceMappingURL=indicators.module.js.map