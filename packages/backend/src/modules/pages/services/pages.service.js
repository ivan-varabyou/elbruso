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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const kysely_1 = require("kysely");
const audit_service_1 = require("../../audit/services/audit.service");
const workspace_dto_1 = require("../../workspace/dto/workspace.dto");
const workspace_service_1 = require("../../workspace/services/workspace.service");
const database_service_1 = require("../../../../../database/src/database.service");
let PagesService = class PagesService {
    constructor(db, workspaceService, auditService) {
        this.db = db;
        this.workspaceService = workspaceService;
        this.auditService = auditService;
    }
    async create(workspaceId, dto, userId) {
        await this.workspaceService.checkPermission(workspaceId, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        let query = this.db.client
            .selectFrom('pages')
            .select((0, kysely_1.sql) `COALESCE(MAX(sort_order), -1) + 1`.as('next_order'))
            .where('workspace_id', '=', workspaceId)
            .where('is_active', '=', true);
        if (dto.parentPageId) {
            query = query.where('parent_page_id', '=', dto.parentPageId);
        }
        else {
            query = query.where('parent_page_id', 'is', null);
        }
        const maxOrder = await query.executeTakeFirst();
        const page = await this.db.client
            .insertInto('pages')
            .values({
            workspace_id: workspaceId,
            parent_page_id: dto.parentPageId || null,
            title: dto.title,
            icon: dto.icon || null,
            cover_image: dto.coverImage || null,
            sort_order: maxOrder?.next_order ?? 0,
            created_by: userId,
        })
            .returningAll()
            .executeTakeFirst();
        if (!page) {
            throw new common_1.BadRequestException('Failed to create page');
        }
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.PAGE_CREATE,
            entityType: 'Page',
            entityId: page.id,
            details: { title: page.title, workspaceId },
        });
        return page;
    }
    async findById(id, userId) {
        const page = await this.db.client
            .selectFrom('pages')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!page) {
            throw new common_1.NotFoundException('Page not found');
        }
        await this.workspaceService.checkPermission(page.workspace_id, userId, workspace_dto_1.WorkspaceRole.VIEWER);
        return page;
    }
    async getPageTree(workspaceId, userId) {
        await this.workspaceService.checkPermission(workspaceId, userId, workspace_dto_1.WorkspaceRole.VIEWER);
        const pages = await this.db.client
            .selectFrom('pages')
            .selectAll()
            .where('workspace_id', '=', workspaceId)
            .where('is_active', '=', true)
            .orderBy('sort_order', 'asc')
            .execute();
        return this.buildTree(pages, null);
    }
    buildTree(pages, parentId) {
        return pages
            .filter((p) => p.parent_page_id === parentId)
            .map((page) => ({
            ...page,
            children: this.buildTree(pages, page.id),
        }));
    }
    async update(id, dto, userId) {
        const page = await this.findById(id, userId);
        await this.workspaceService.checkPermission(page.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        const updateData = {
            updated_at: new Date(),
        };
        if (dto.title !== undefined) {
            updateData.title = dto.title;
        }
        if (dto.icon !== undefined) {
            updateData.icon = dto.icon || null;
        }
        if (dto.coverImage !== undefined) {
            updateData.cover_image = dto.coverImage || null;
        }
        const updated = await this.db.client
            .updateTable('pages')
            .set(updateData)
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirst();
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.PAGE_UPDATE,
            entityType: 'Page',
            entityId: id,
            details: dto,
        });
        return updated;
    }
    async move(id, dto, userId) {
        const page = await this.findById(id, userId);
        await this.workspaceService.checkPermission(page.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        if (dto.parentPageId) {
            const isDescendant = await this.isDescendant(id, dto.parentPageId);
            if (isDescendant) {
                throw new common_1.BadRequestException('Cannot move page to its own descendant');
            }
        }
        const newOrder = await this.calculateSortOrder(page.workspace_id, dto.parentPageId || null, dto.afterPageId);
        await this.db.client
            .updateTable('pages')
            .set({
            parent_page_id: dto.parentPageId || null,
            sort_order: newOrder,
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .execute();
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.PAGE_MOVE,
            entityType: 'Page',
            entityId: id,
            details: { newParentId: dto.parentPageId, newOrder },
        });
        return { message: 'Page moved successfully' };
    }
    async delete(id, userId) {
        const page = await this.findById(id, userId);
        await this.workspaceService.checkPermission(page.workspace_id, userId, workspace_dto_1.WorkspaceRole.EDITOR);
        await this.db.client
            .updateTable('pages')
            .set({
            is_active: false,
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .execute();
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.PAGE_DELETE,
            entityType: 'Page',
            entityId: id,
        });
        return { message: 'Page deleted successfully' };
    }
    async isDescendant(pageId, potentialDescendantId) {
        const page = await this.db.client
            .selectFrom('pages')
            .select(['parent_page_id'])
            .where('id', '=', potentialDescendantId)
            .executeTakeFirst();
        if (!page || !page.parent_page_id) {
            return false;
        }
        if (page.parent_page_id === pageId) {
            return true;
        }
        return this.isDescendant(pageId, page.parent_page_id);
    }
    async calculateSortOrder(workspaceId, parentPageId, afterPageId) {
        if (!afterPageId) {
            return 0;
        }
        const afterPage = await this.db.client
            .selectFrom('pages')
            .select(['sort_order'])
            .where('id', '=', afterPageId)
            .executeTakeFirst();
        if (!afterPage) {
            throw new common_1.BadRequestException('Reference page not found');
        }
        return afterPage.sort_order + 1;
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        workspace_service_1.WorkspaceService,
        audit_service_1.AuditService])
], PagesService);
//# sourceMappingURL=pages.service.js.map