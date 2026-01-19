import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { WorkspacesService } from '../workspaces/workspaces.service';
import { WorkspaceRole } from '../workspaces/dto';
import { CreateGroupDto, UpdateGroupDto, ReorderGroupsDto } from './dto';

@Injectable()
export class WorkspaceGroupsService {
  constructor(
    private readonly db: DatabaseService,
    private readonly workspacesService: WorkspacesService,
  ) {}

  async create(workspaceId: string, dto: CreateGroupDto, userId: string) {
    // Check workspace permission
    await this.workspacesService.checkPermission(
      workspaceId,
      userId,
      WorkspaceRole.EDITOR,
    );

    // Calculate sort order
    const maxOrder = await this.db.client
      .selectFrom('workspace_groups')
      .select((eb) =>
        eb.fn.coalesce(eb.fn.max('sort_order'), eb.lit(-1)).as('max_order'),
      )
      .where('workspace_id', '=', workspaceId)
      .executeTakeFirst();

    const group = await this.db.client
      .insertInto('workspace_groups')
      .values({
        workspace_id: workspaceId,
        name: dto.name,
        description: dto.description || null,
        sort_order: ((maxOrder?.max_order as number) ?? -1) + 1,
      })
      .returningAll()
      .executeTakeFirst();

    if (!group) {
      throw new BadRequestException('Failed to create group');
    }

    return group;
  }

  async findAll(workspaceId: string, userId: string) {
    // Check workspace permission
    await this.workspacesService.checkPermission(
      workspaceId,
      userId,
      WorkspaceRole.VIEWER,
    );

    return this.db.client
      .selectFrom('workspace_groups')
      .selectAll()
      .where('workspace_id', '=', workspaceId)
      .orderBy('sort_order', 'asc')
      .execute();
  }

  async findById(groupId: string, userId: string) {
    const group = await this.db.client
      .selectFrom('workspace_groups')
      .selectAll()
      .where('id', '=', groupId)
      .executeTakeFirst();

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    // Check workspace permission
    await this.workspacesService.checkPermission(
      group.workspace_id,
      userId,
      WorkspaceRole.VIEWER,
    );

    return group;
  }

  async update(groupId: string, dto: UpdateGroupDto, userId: string) {
    const group = await this.findById(groupId, userId);

    // Check write permission
    await this.workspacesService.checkPermission(
      group.workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    const updated = await this.db.client
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

  async delete(groupId: string, userId: string) {
    const group = await this.findById(groupId, userId);

    // Check write permission
    await this.workspacesService.checkPermission(
      group.workspace_id,
      userId,
      WorkspaceRole.EDITOR,
    );

    // Move all tables in this group to root (group_id = null)
    await this.db.client
      .updateTable('dynamic_tables')
      .set({ group_id: null })
      .where('group_id', '=', groupId)
      .execute();

    // Delete the group
    await this.db.client
      .deleteFrom('workspace_groups')
      .where('id', '=', groupId)
      .execute();

    return { message: 'Group deleted successfully' };
  }

  async reorder(workspaceId: string, dto: ReorderGroupsDto, userId: string) {
    // Check workspace permission
    await this.workspacesService.checkPermission(
      workspaceId,
      userId,
      WorkspaceRole.EDITOR,
    );

    // Update sort order for each group
    for (let i = 0; i < dto.groupIds.length; i++) {
      await this.db.client
        .updateTable('workspace_groups')
        .set({ sort_order: i })
        .where('id', '=', dto.groupIds[i])
        .where('workspace_id', '=', workspaceId)
        .execute();
    }

    return { message: 'Groups reordered successfully' };
  }
}
