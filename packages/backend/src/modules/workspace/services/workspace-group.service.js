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
exports.WorkspaceGroupService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../../../../database/src/database.service");
const workspace_dto_1 = require("../dto/workspace.dto");
const workspace_service_1 = require("./workspace.service");
let WorkspaceGroupService = class WorkspaceGroupService {
    constructor(_db, _workspaceService) {
        this._db = _db;
        this._workspaceService = _workspaceService;
    }
    async create(workspaceId, dto, userId) {
        await this._workspaceService.checkPermission(workspaceId, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const maxOrder = await this._db.client
            .selectFrom('workspace_groups')
            .select((eb) => eb.fn.coalesce(eb.fn.max('sort_order'), eb.lit(-1)).as('max_order'))
            .where('workspace_id', '=', workspaceId)
            .executeTakeFirst();
        const group = await this._db.client
            .insertInto('workspace_groups')
            .values({
            workspace_id: workspaceId,
            name: dto.name,
            description: dto.description || null,
            sort_order: (maxOrder?.max_order ?? -1) + 1,
        })
            .returningAll()
            .executeTakeFirst();
        if (!group) {
            throw new common_1.BadRequestException('Failed to create group');
        }
        return group;
    }
    async findAll(workspaceId, userId) {
        await this._workspaceService.checkPermission(workspaceId, userId, workspace_dto_1.WorkspaceRole.VIEWER);
        return this._db.client
            .selectFrom('workspace_groups')
            .selectAll()
            .where('workspace_id', '=', workspaceId)
            .orderBy('sort_order', 'asc')
            .execute();
    }
    async findById(groupId, userId) {
        const group = await this._db.client
            .selectFrom('workspace_groups')
            .selectAll()
            .where('id', '=', groupId)
            .executeTakeFirst();
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        await this._workspaceService.checkPermission(group.workspace_id, userId, workspace_dto_1.WorkspaceRole.VIEWER);
        return group;
    }
    async update(groupId, dto, userId) {
        const group = await this.findById(groupId, userId);
        await this._workspaceService.checkPermission(group.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const updated = await this._db.client
            .updateTable('workspace_groups')
            .set({
            name: dto.name ?? group.name,
            description: dto.description ?? group.description,
        })
            .where('id', '=', groupId)
            .returningAll()
            .executeTakeFirst();
        return updated;
    }
    async delete(groupId, userId) {
        const group = await this.findById(groupId, userId);
        await this._workspaceService.checkPermission(group.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        await this._db.client
            .updateTable('dynamic_tables')
            .set({ group_id: null })
            .where('group_id', '=', groupId)
            .execute();
        await this._db.client
            .deleteFrom('workspace_groups')
            .where('id', '=', groupId)
            .execute();
        return { message: 'Group deleted successfully' };
    }
    async reorder(workspaceId, dto, userId) {
        await this._workspaceService.checkPermission(workspaceId, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        for (let i = 0; i < dto.groupIds.length; i++) {
            await this._db.client
                .updateTable('workspace_groups')
                .set({ sort_order: i })
                .where('id', '=', dto.groupIds[i])
                .where('workspace_id', '=', workspaceId)
                .execute();
        }
        return { message: 'Groups reordered successfully' };
    }
};
exports.WorkspaceGroupService = WorkspaceGroupService;
exports.WorkspaceGroupService = WorkspaceGroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        workspace_service_1.WorkspaceService])
], WorkspaceGroupService);
//# sourceMappingURL=workspace-group.service.js.map