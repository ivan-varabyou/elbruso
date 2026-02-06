"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceModule = void 0;
const common_1 = require("@nestjs/common");
const audit_1 = require("../audit");
const users_1 = require("../users");
const database_module_1 = require("../../../../database/src/database.module");
const workspace_group_controller_1 = require("./controllers/workspace-group.controller");
const workspace_controller_1 = require("./controllers/workspace.controller");
const workspace_group_service_1 = require("./services/workspace-group.service");
const workspace_service_1 = require("./services/workspace.service");
let WorkspaceModule = class WorkspaceModule {
};
exports.WorkspaceModule = WorkspaceModule;
exports.WorkspaceModule = WorkspaceModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, users_1.UsersModule, audit_1.AuditModule],
        controllers: [workspace_controller_1.WorkspaceController, workspace_group_controller_1.WorkspaceGroupController],
        providers: [workspace_service_1.WorkspaceService, workspace_group_service_1.WorkspaceGroupService],
        exports: [workspace_service_1.WorkspaceService, workspace_group_service_1.WorkspaceGroupService],
    })
], WorkspaceModule);
//# sourceMappingURL=workspace.module.js.map