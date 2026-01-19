/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { WorkspacesService } from '../workspaces/workspaces.service';
import { AuditService, AuditAction } from '../common/audit/audit.service';
import { CreatePageDto, UpdatePageDto, MovePageDto } from './dto';
import { WorkspaceRole } from '../workspaces/dto';
import { sql } from 'kysely';

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
    private readonly workspacesService: WorkspacesService,
    private readonly auditService: AuditService,
  ) {}

  async create(workspaceId: string, dto: CreatePageDto, userId: string) {
    // Check workspace permission
    await this.workspacesService.checkPermission(
      workspaceId,
      userId,
      WorkspaceRole.EDITOR,
    );

    // Calculate sort order
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

    // Create page
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

    // Audit log
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

    // Check permission via workspace
    await this.workspacesService.checkPermission(
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
    // Check permission
    await this.workspacesService.checkPermission(
      workspaceId,
      userId,
      WorkspaceRole.VIEWER,
    );

    // Get all pages
    const pages = await this.db.client
      .selectFrom('pages')
      .selectAll()
      .where('workspace_id', '=', workspaceId)
      .where('is_active', '=', true)
      .orderBy('sort_order', 'asc')
      .execute();

    // Build tree
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

    // Check write permission
    await this.workspacesService.checkPermission(
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

    // Audit log
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

    // Check write permission
    await this.workspacesService.checkPermission(
      page.workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    // Prevent circular references
    if (dto.parentPageId) {
      const isDescendant = await this.isDescendant(id, dto.parentPageId);
      if (isDescendant) {
        throw new BadRequestException('Cannot move page to its own descendant');
      }
    }

    // Calculate new sort order
    const newOrder = await this.calculateSortOrder(
      page.workspace_id,
      dto.parentPageId || null,
      dto.afterPageId,
    );

    // Update page
    await this.db.client
      .updateTable('pages')
      .set({
        parent_page_id: dto.parentPageId || null,
        sort_order: newOrder,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .execute();

    // Audit log
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

    // Check write permission
    await this.workspacesService.checkPermission(
      page.workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    // Soft delete (cascades to children via DB)
    await this.db.client
      .updateTable('pages')
      .set({
        is_active: false,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .execute();

    // Audit log
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
      // Insert at beginning
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
