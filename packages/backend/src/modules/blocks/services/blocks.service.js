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
exports.BlocksService = void 0;
const common_1 = require("@nestjs/common");
const audit_service_1 = require("../../audit/services/audit.service");
const pages_service_1 = require("../../pages/services/pages.service");
const database_service_1 = require("../../../../../database/src/database.service");
let BlocksService = class BlocksService {
    constructor(db, pagesService, auditService) {
        this.db = db;
        this.pagesService = pagesService;
        this.auditService = auditService;
    }
    async create(pageId, dto, userId) {
        await this.pagesService.findById(pageId, userId);
        this.validateBlockContent(dto.type, dto.content);
        const newOrder = await this.calculateSortOrder(pageId, dto.afterBlockId);
        const block = (await this.db.client
            .insertInto('blocks')
            .values({
            page_id: pageId,
            block_type: dto.type,
            content: dto.content,
            sort_order: newOrder,
            created_by: userId,
        })
            .returningAll()
            .executeTakeFirst());
        if (!block) {
            throw new common_1.BadRequestException('Failed to create block');
        }
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.BLOCK_CREATE,
            entityType: 'Block',
            entityId: block.id,
            details: { pageId, type: dto.type },
        });
        return block;
    }
    async findByPage(pageId, userId) {
        await this.pagesService.findById(pageId, userId);
        return this.db.client
            .selectFrom('blocks')
            .selectAll()
            .where('page_id', '=', pageId)
            .where('is_active', '=', true)
            .orderBy('sort_order', 'asc')
            .execute();
    }
    async update(id, dto, userId) {
        const blockData = await this.db.client
            .selectFrom('blocks')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!blockData) {
            throw new common_1.NotFoundException('Block not found');
        }
        const block = blockData;
        await this.pagesService.findById(block.page_id, userId);
        if (dto.content) {
            this.validateBlockContent(block.block_type, dto.content);
        }
        const updated = (await this.db.client
            .updateTable('blocks')
            .set({
            content: (dto.content || block.content),
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .returningAll()
            .executeTakeFirst());
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.BLOCK_UPDATE,
            entityType: 'Block',
            entityId: id,
            details: dto,
        });
        return updated;
    }
    async move(id, dto, userId) {
        const blockData = await this.db.client
            .selectFrom('blocks')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!blockData) {
            throw new common_1.NotFoundException('Block not found');
        }
        const block = blockData;
        await this.pagesService.findById(block.page_id, userId);
        const newOrder = await this.calculateSortOrder(block.page_id, dto.afterBlockId);
        await this.db.client
            .updateTable('blocks')
            .set({
            sort_order: newOrder,
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .execute();
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.BLOCK_MOVE,
            entityType: 'Block',
            entityId: id,
            details: { newOrder },
        });
        return { message: 'Block moved successfully' };
    }
    async delete(id, userId) {
        const blockData = await this.db.client
            .selectFrom('blocks')
            .selectAll()
            .where('id', '=', id)
            .where('is_active', '=', true)
            .executeTakeFirst();
        if (!blockData) {
            throw new common_1.NotFoundException('Block not found');
        }
        const block = blockData;
        await this.pagesService.findById(block.page_id, userId);
        await this.db.client
            .updateTable('blocks')
            .set({
            is_active: false,
            updated_at: new Date(),
        })
            .where('id', '=', id)
            .execute();
        await this.auditService.log({
            userId,
            action: audit_service_1.AuditAction.BLOCK_DELETE,
            entityType: 'Block',
            entityId: id,
        });
        return { message: 'Block deleted successfully' };
    }
    validateBlockContent(type, content) {
        switch (type) {
            case 'text':
                if (!content.text || typeof content.text !== 'string') {
                    throw new common_1.BadRequestException('Text block must have text field');
                }
                break;
            case 'table':
                if (!content.tableId) {
                    throw new common_1.BadRequestException('Table block must reference a table');
                }
                break;
            case 'chart':
                if (!content.tableId || !content.chartType) {
                    throw new common_1.BadRequestException('Chart block must have tableId and chartType');
                }
                break;
            case 'divider':
                break;
            case 'image':
                if (!content.url || typeof content.url !== 'string') {
                    throw new common_1.BadRequestException('Image block must have url field');
                }
                break;
            default:
                throw new common_1.BadRequestException(`Unknown block type: ${type}`);
        }
    }
    async calculateSortOrder(pageId, afterBlockId) {
        if (!afterBlockId) {
            return 0;
        }
        const afterBlock = await this.db.client
            .selectFrom('blocks')
            .select(['sort_order'])
            .where('id', '=', afterBlockId)
            .where('page_id', '=', pageId)
            .executeTakeFirst();
        if (!afterBlock) {
            throw new common_1.BadRequestException('Reference block not found');
        }
        return (afterBlock.sort_order ?? 0) + 1;
    }
};
exports.BlocksService = BlocksService;
exports.BlocksService = BlocksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        pages_service_1.PagesService,
        audit_service_1.AuditService])
], BlocksService);
//# sourceMappingURL=blocks.service.js.map