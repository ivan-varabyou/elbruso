import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PagesService } from '../pages/pages.service';
import { AuditService, AuditAction } from '../common/audit/audit.service';
import { CreateBlockDto, UpdateBlockDto, MoveBlockDto } from './dto';
import { sql } from 'kysely';

@Injectable()
export class BlocksService {
  constructor(
    private readonly db: DatabaseService,
    private readonly pagesService: PagesService,
    private readonly auditService: AuditService,
  ) {}

  async create(pageId: string, dto: CreateBlockDto, userId: string) {
    // Check page permission (via workspace)
    await this.pagesService.findById(pageId, userId);

    // Validate block content
    this.validateBlockContent(dto.type, dto.content);

    // Calculate sort order
    const newOrder = await this.calculateSortOrder(pageId, dto.afterBlockId);

    // Create block
    const block = await this.db.client
      .insertInto('blocks')
      .values({
        page_id: pageId,
        block_type: dto.type,
        content: dto.content,
        sort_order: newOrder,
        created_by: userId,
      })
      .returningAll()
      .executeTakeFirst();

    if (!block) {
      throw new BadRequestException('Failed to create block');
    }

    // Audit log
    await this.auditService.log({
      userId,
      action: AuditAction.BLOCK_CREATE,
      entityType: 'Block',
      entityId: block.id,
      details: { pageId, type: dto.type },
    });

    return block;
  }

  async findByPage(pageId: string, userId: string) {
    // Check permission
    await this.pagesService.findById(pageId, userId);

    return this.db.client
      .selectFrom('blocks')
      .selectAll()
      .where('page_id', '=', pageId)
      .where('is_active', '=', true)
      .orderBy('sort_order', 'asc')
      .execute();
  }

  async update(id: string, dto: UpdateBlockDto, userId: string) {
    const block = await this.db.client
      .selectFrom('blocks')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!block) {
      throw new NotFoundException('Block not found');
    }

    // Check permission via page
    await this.pagesService.findById(block.page_id, userId);

    // Validate content if provided
    if (dto.content) {
      this.validateBlockContent(block.block_type, dto.content);
    }

    const updated = await this.db.client
      .updateTable('blocks')
      .set({
        content: dto.content || block.content,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();

    // Audit log
    await this.auditService.log({
      userId,
      action: AuditAction.BLOCK_UPDATE,
      entityType: 'Block',
      entityId: id,
      details: dto,
    });

    return updated;
  }

  async move(id: string, dto: MoveBlockDto, userId: string) {
    const block = await this.db.client
      .selectFrom('blocks')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!block) {
      throw new NotFoundException('Block not found');
    }

    // Check permission
    await this.pagesService.findById(block.page_id, userId);

    // Calculate new sort order
    const newOrder = await this.calculateSortOrder(block.page_id, dto.afterBlockId);

    // Update block
    await this.db.client
      .updateTable('blocks')
      .set({
        sort_order: newOrder,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .execute();

    // Audit log
    await this.auditService.log({
      userId,
      action: AuditAction.BLOCK_MOVE,
      entityType: 'Block',
      entityId: id,
      details: { newOrder },
    });

    return { message: 'Block moved successfully' };
  }

  async delete(id: string, userId: string) {
    const block = await this.db.client
      .selectFrom('blocks')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!block) {
      throw new NotFoundException('Block not found');
    }

    // Check permission
    await this.pagesService.findById(block.page_id, userId);

    // Soft delete
    await this.db.client
      .updateTable('blocks')
      .set({
        is_active: false,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .execute();

    // Audit log
    await this.auditService.log({
      userId,
      action: AuditAction.BLOCK_DELETE,
      entityType: 'Block',
      entityId: id,
    });

    return { message: 'Block deleted successfully' };
  }

  private validateBlockContent(type: string, content: Record<string, unknown>) {
    switch (type) {
      case 'text':
        if (!content.text || typeof content.text !== 'string') {
          throw new BadRequestException('Text block must have text field');
        }
        break;
      case 'table':
        if (!content.tableId) {
          throw new BadRequestException('Table block must reference a table');
        }
        break;
      case 'chart':
        if (!content.tableId || !content.chartType) {
          throw new BadRequestException('Chart block must have tableId and chartType');
        }
        break;
      case 'divider':
        // No validation needed
        break;
      case 'image':
        if (!content.url || typeof content.url !== 'string') {
          throw new BadRequestException('Image block must have url field');
        }
        break;
      default:
        throw new BadRequestException(`Unknown block type: ${type}`);
    }
  }

  private async calculateSortOrder(pageId: string, afterBlockId?: string): Promise<number> {
    if (!afterBlockId) {
      // Insert at beginning
      return 0;
    }

    const afterBlock = await this.db.client
      .selectFrom('blocks')
      .select(['sort_order'])
      .where('id', '=', afterBlockId)
      .where('page_id', '=', pageId)
      .executeTakeFirst();

    if (!afterBlock) {
      throw new BadRequestException('Reference block not found');
    }

    return afterBlock.sort_order + 1;
  }
}
