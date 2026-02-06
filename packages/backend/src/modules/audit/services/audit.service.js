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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditService = exports.AuditAction = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../../database/src/database.service");
var AuditAction;
(function (AuditAction) {
    AuditAction["LOGIN"] = "LOGIN";
    AuditAction["LOGOUT"] = "LOGOUT";
    AuditAction["REGISTER"] = "REGISTER";
    AuditAction["TOKEN_REFRESH"] = "TOKEN_REFRESH";
    AuditAction["WORKSPACE_CREATE"] = "WORKSPACE_CREATE";
    AuditAction["WORKSPACE_UPDATE"] = "WORKSPACE_UPDATE";
    AuditAction["WORKSPACE_DELETE"] = "WORKSPACE_DELETE";
    AuditAction["MEMBER_ADD"] = "MEMBER_ADD";
    AuditAction["MEMBER_REMOVE"] = "MEMBER_REMOVE";
    AuditAction["MEMBER_ROLE_UPDATE"] = "MEMBER_ROLE_UPDATE";
    AuditAction["PAGE_CREATE"] = "PAGE_CREATE";
    AuditAction["PAGE_UPDATE"] = "PAGE_UPDATE";
    AuditAction["PAGE_DELETE"] = "PAGE_DELETE";
    AuditAction["PAGE_MOVE"] = "PAGE_MOVE";
    AuditAction["BLOCK_CREATE"] = "BLOCK_CREATE";
    AuditAction["BLOCK_UPDATE"] = "BLOCK_UPDATE";
    AuditAction["BLOCK_DELETE"] = "BLOCK_DELETE";
    AuditAction["BLOCK_MOVE"] = "BLOCK_MOVE";
    AuditAction["TABLE_CREATE"] = "TABLE_CREATE";
    AuditAction["TABLE_UPDATE"] = "TABLE_UPDATE";
    AuditAction["TABLE_DELETE"] = "TABLE_DELETE";
    AuditAction["VERSION_CREATE"] = "VERSION_CREATE";
    AuditAction["VERSION_ACTIVATE"] = "VERSION_ACTIVATE";
    AuditAction["CELLS_UPDATE"] = "CELLS_UPDATE";
    AuditAction["FORMULA_CALCULATE"] = "FORMULA_CALCULATE";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
let AuditService = class AuditService {
    constructor(db) {
        this.db = db;
    }
    async log(params) {
        try {
            await this.db.client
                .insertInto('audit_logs')
                .values({
                user_id: params.userId || null,
                action: params.action,
                entity_type: params.entityType,
                entity_id: params.entityId || null,
                details: params.details ? JSON.stringify(params.details) : null,
                ip_address: params.ipAddress || null,
                user_agent: params.userAgent || null,
            })
                .execute();
        }
        catch (error) {
            console.error('Failed to save audit log:', error);
        }
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], AuditService);
//# sourceMappingURL=audit.service.js.map