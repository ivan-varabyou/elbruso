/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { sql } from 'kysely';
import { AuditService, AuditAction } from '@backend/modules/audit/services/audit.service';
import { WorkspaceRole } from '@backend/modules/workspace/dto/workspace.dto';
import { WorkspaceService } from '@backend/modules/workspace/services/workspace.service';
import { DatabaseService } from '@database/database.service';
import { CreatePageDto, UpdatePageDto, MovePageDto } from '../dto';

export interface PageTreeNode {
  id: string;
  workspace_id: string;
  parent_page_id: string | null;
  title: string;
  icon: string | null;
  cover_image: string | null;
  sort_order: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
  children: PageTreeNode[];
}

@Injectable()
export class PagesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly workspaceService: WorkspaceService,
    private readonly auditService: AuditService,
  ) {}

  async create(workspaceId: string, dto: CreatePageDto, userId: string) {
    await this.workspaceService.checkPermission(
      workspaceId,
      userId,
      WorkspaceRole.EDITOR,
    );

    let query = this.db.client
      .selectFrom('pages')
      .select(sql<number>`COALESCE(MAX(sort_order), -1) + 1`.as('next_order'))
      .where('workspace_id', '=', workspaceId)
      .where('is_active', '=', true);

    if (dto.parentPageId) {
      query = query.where('parent_page_id', '=', dto.parentPageId);
    } else {
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
      throw new BadRequestException('Failed to create page');
    }

    await this.auditService.log({
      userId,
      action: AuditAction.PAGE_CREATE,
      entityType: 'Page',
      entityId: page.id,
      details: { title: page.title, workspaceId },
    });

    return page;
  }

  async findById(id: string, userId: string) {
    const page = await this.db.client
      .selectFrom('pages')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!page) {
      throw new NotFoundException('Page not found');
    }

    await this.workspaceService.checkPermission(
      page.workspace_id,
      userId,
      WorkspaceRole.VIEWER,
    );

    return page;
  }

  async getPageTree(
    workspaceId: string,
    userId: string,
  ): Promise<PageTreeNode[]> {
    await this.workspaceService.checkPermission(
      workspaceId,
      userId,
      WorkspaceRole.VIEWER,
    );

    const pages = await this.db.client
      .selectFrom('pages')
      .selectAll()
      .where('workspace_id', '=', workspaceId)
      .where('is_active', '=', true)
      .orderBy('sort_order', 'asc')
      .execute();

    return this.buildTree(pages, null);
  }

  private buildTree(pages: any[], parentId: string | null): PageTreeNode[] {
    return pages
      .filter((p) => p.parent_page_id === parentId)
      .map((page) => ({
        ...page,
        children: this.buildTree(pages, page.id),
      }));
  }

  async update(id: string, dto: UpdatePageDto, userId: string) {
    const page = await this.findById(id, userId);

    await this.workspaceService.checkPermission(
      page.workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    const updateData: any = {
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
      action: AuditAction.PAGE_UPDATE,
      entityType: 'Page',
      entityId: id,
      details: dto,
    });

    return updated;
  }

  async move(id: string, dto: MovePageDto, userId: string) {
    const page = await this.findById(id, userId);

    await this.workspaceService.checkPermission(
      page.workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    if (dto.parentPageId) {
      const isDescendant = await this.isDescendant(id, dto.parentPageId);
      if (isDescendant) {
        throw new BadRequestException('Cannot move page to its own descendant');
      }
    }

    const newOrder = await this.calculateSortOrder(
      page.workspace_id,
      dto.parentPageId || null,
      dto.afterPageId,
    );

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
      action: AuditAction.PAGE_MOVE,
      entityType: 'Page',
      entityId: id,
      details: { newParentId: dto.parentPageId, newOrder },
    });

    return { message: 'Page moved successfully' };
  }

  async delete(id: string, userId: string) {
    const page = await this.findById(id, userId);

    await this.workspaceService.checkPermission(
      page.workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

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
      action: AuditAction.PAGE_DELETE,
      entityType: 'Page',
      entityId: id,
    });

    return { message: 'Page deleted successfully' };
  }

  private async isDescendant(
    pageId: string,
    potentialDescendantId: string,
  ): Promise<boolean> {
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

  private async calculateSortOrder(
    workspaceId: string,
    parentPageId: string | null,
    afterPageId?: string,
  ): Promise<number> {
    if (!afterPageId) {
      return 0;
    }

    const afterPage = await this.db.client
      .selectFrom('pages')
      .select(['sort_order'])
      .where('id', '=', afterPageId)
      .executeTakeFirst();

    if (!afterPage) {
      throw new BadRequestException('Reference page not found');
    }

    return afterPage.sort_order + 1;
  }
}
