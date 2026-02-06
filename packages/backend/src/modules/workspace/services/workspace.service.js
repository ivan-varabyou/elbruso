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
exports.WorkspaceService = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../../audit/services/audit.service");
const users_service_1 = require("../../users/services/users.service");
const database_service_1 = require("../../../../../database/src/database.service");
const workspace_dto_1 = require("../dto/workspace.dto");
let WorkspaceService = class WorkspaceService {
    constructor(_db, _usersService, _auditService) {
        this._db = _db;
        this._usersService = _usersService;
        this._auditService = _auditService;
    }
    async create(userId, dto) {
        const workspace = await this._db.client
            .insertInto('workspaces')
            .values({
            name: dto.name,
            description: dto.description || null,
            owner_id: userId,
        })
            .returningAll()
            .executeTakeFirst();
        if (!workspace) {
            throw new Error('Failed to create workspace');
        }
        await this._db.client
            .insertInto('workspace_permissions')
            .values({
            workspace_id: workspace.id,
            user_id: userId,
            permission_level: workspace_dto_1.WorkspaceRole.OWNER,
        })
            .execute();
        await this._auditService.log({
            userId,
            action: audit_service_1.AuditAction.WORKSPACE_CREATE,
            entityType: 'Workspace',
            entityId: workspace.id,
            details: { name: workspace.name },
        });
        return {
            ...workspace,
            userRole: workspace_dto_1.WorkspaceRole.OWNER,
        };
    }
    async findAll(userId) {
        const workspaces = await this._db.client
            .selectFrom('workspaces as w')
            .innerJoin('workspace_permissions as wp', 'w.id', 'wp.workspace_id')
            .select([
            'w.id',
            'w.name',
            'w.description',
            'w.created_at',
            'w.updated_at',
            'wp.permission_level as userRole',
        ])
            .where('wp.user_id', '=', userId)
            .where('w.is_active', '=', true)
            .orderBy('w.updated_at', 'desc')
            .execute();
        return workspaces;
    }
    async findOne(id, userId) {
        const workspace = await this._db.client
            .selectFrom('workspaces as w')
            .innerJoin('workspace_permissions as wp', 'w.id', 'wp.workspace_id')
            .select([
            'w.id',
            'w.name',
            'w.description',
            'w.created_at',
            'w.updated_at',
            'wp.permission_level as userRole',
        ])
            .where('w.id', '=', id)
            .where('wp.user_id', '=', userId)
            .where('w.is_active', '=', true)
            .executeTakeFirst();
        if (!workspace) {
            const exists = await this._db.client
                .selectFrom('workspaces')
                .select('id')
                .where('id', '=', id)
                .where('is_active', '=', true)
                .executeTakeFirst();
            if (exists) {
                throw new common_1.ForbiddenException('Access denied to this workspace');
            }
            throw new common_1.NotFoundException('Workspace not found');
        }
        return workspace;
    }
    async update(id, userId, dto) {
        await this.checkPermission(id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const updateData = {
            updated_at: new Date(),
        };
        if (dto.name) {
            updateData.name = dto.name;
        }
        if (dto.description !== undefined) {
            updateData.description = dto.description || null;
        }
        const workspace = await this._db.client
            .updateTable('workspaces')
            .set(updateData)
            .where('id', '=', id)
            .where('is_active', '=', true)
            .returningAll()
            .executeTakeFirst();
        if (!workspace) {
            throw new common_1.NotFoundException('Workspace not found');
        }
        const userRole = await this.getUserRole(id, userId);
        await this._auditService.log({
            userId,
            action: audit_service_1.AuditAction.WORKSPACE_UPDATE,
            entityType: 'Workspace',
            entityId: id,
            details: dto,
        });
        return {
            ...workspace,
            userRole,
        };
    }
    async delete(id, userId) {
        await this.checkPermission(id, userId, workspace_dto_1.WorkspaceRole.OWNER);
        const workspace = await this._db.client
            .updateTable('workspaces')
            .set({
            is_active: false,
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .where('is_active', '=', true)
            .returningAll()
            .executeTakeFirst();
        if (!workspace) {
            throw new common_1.NotFoundException('Workspace not found');
        }
        await this._auditService.log({
            userId,
            action: audit_service_1.AuditAction.WORKSPACE_DELETE,
            entityType: 'Workspace',
            entityId: id,
        });
        return { message: 'Workspace deleted successfully' };
    }
    async addMember(id, userId, dto) {
        if (dto.role === workspace_dto_1.WorkspaceRole.OWNER) {
            throw new common_1.BadRequestException('Cannot assign owner role');
        }
        await this.checkPermission(id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const member = await this._usersService.findByEmail(dto.email);
        if (!member) {
            throw new common_1.NotFoundException('User not found');
        }
        const existing = await this._db.client
            .selectFrom('workspace_permissions')
            .selectAll()
            .where('workspace_id', '=', id)
            .where('user_id', '=', String(member.id))
            .executeTakeFirst();
        if (existing) {
            throw new common_1.ConflictException('User is already a member');
        }
        await this._db.client
            .insertInto('workspace_permissions')
            .values({
            workspace_id: id,
            user_id: String(member.id),
            permission_level: dto.role,
        })
            .execute();
        await this._auditService.log({
            userId,
            action: audit_service_1.AuditAction.MEMBER_ADD,
            entityType: 'Workspace',
            entityId: id,
            details: { memberId: String(member.id), role: dto.role },
        });
        return {
            id: String(member.id),
            email: String(member.email),
            name: String(member.first_name ?? member.last_name ?? ''),
            role: dto.role,
        };
    }
    async getMembers(id, userId) {
        await this.checkPermission(id, userId, workspace_dto_1.WorkspaceRole.VIEWER);
        const members = await this._db.client
            .selectFrom('workspace_permissions as wp')
            .innerJoin('users as u', 'wp.user_id', 'u.id')
            .select([
            'wp.id',
            'u.id as userId',
            'u.email',
            'u.name',
            'wp.permission_level as role',
            'wp.granted_at as joinedAt',
        ])
            .where('wp.workspace_id', '=', id)
            .where('u.is_active', '=', true)
            .orderBy('wp.granted_at', 'asc')
            .execute();
        return members;
    }
    async updateMemberRole(id, userId, memberId, dto) {
        await this.checkPermission(id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const member = await this._db.client
            .selectFrom('workspace_permissions')
            .selectAll()
            .where('workspace_id', '=', id)
            .where('user_id', '=', memberId)
            .executeTakeFirst();
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        if (member.permission_level === workspace_dto_1.WorkspaceRole.OWNER) {
            throw new common_1.BadRequestException('Cannot change owner role');
        }
        if (dto.role === workspace_dto_1.WorkspaceRole.OWNER) {
            throw new common_1.BadRequestException('Cannot assign owner role');
        }
        await this._db.client
            .updateTable('workspace_permissions')
            .set({ permission_level: dto.role })
            .where('workspace_id', '=', id)
            .where('user_id', '=', memberId)
            .execute();
        await this._auditService.log({
            userId,
            action: audit_service_1.AuditAction.MEMBER_ROLE_UPDATE,
            entityType: 'Workspace',
            entityId: id,
            details: { memberId, role: dto.role },
        });
        return { message: 'Member role updated successfully' };
    }
    async removeMember(id, userId, memberId) {
        await this.checkPermission(id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const member = await this._db.client
            .selectFrom('workspace_permissions')
            .selectAll()
            .where('workspace_id', '=', id)
            .where('user_id', '=', memberId)
            .executeTakeFirst();
        if (!member) {
            throw new common_1.NotFoundException('Member not found');
        }
        if (member.permission_level === workspace_dto_1.WorkspaceRole.OWNER) {
            throw new common_1.BadRequestException('Cannot remove workspace owner');
        }
        await this._db.client
            .deleteFrom('workspace_permissions')
            .where('workspace_id', '=', id)
            .where('user_id', '=', memberId)
            .execute();
        await this._auditService.log({
            userId,
            action: audit_service_1.AuditAction.MEMBER_REMOVE,
            entityType: 'Workspace',
            entityId: id,
            details: { memberId },
        });
        return { message: 'Member removed successfully' };
    }
    async checkPermission(workspaceId, userId, requiredRole) {
        const permission = await this._db.client
            .selectFrom('workspace_permissions')
            .select(['permission_level'])
            .where('workspace_id', '=', workspaceId)
            .where('user_id', '=', userId)
            .executeTakeFirst();
        if (!permission) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const roleHierarchy = {
            [workspace_dto_1.WorkspaceRole.OWNER]: 3,
            [workspace_dto_1.WorkspaceRole.EDITOR]: 2,
            [workspace_dto_1.WorkspaceRole.VIEWER]: 1,
        };
        if (roleHierarchy[permission.permission_level] < roleHierarchy[requiredRole]) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
    }
    async getUserRole(workspaceId, userId) {
        const permission = await this._db.client
            .selectFrom('workspace_permissions')
            .select(['permission_level'])
            .where('workspace_id', '=', workspaceId)
            .where('user_id', '=', userId)
            .executeTakeFirst();
        if (!permission) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return permission.permission_level;
    }
};
exports.WorkspaceService = WorkspaceService;
exports.WorkspaceService = WorkspaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        users_service_1.UsersService,
        audit_service_1.AuditService])
], WorkspaceService);
//# sourceMappingURL=workspace.service.js.map