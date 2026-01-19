/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UsersService } from '../users/users.service';
import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  AddMemberDto,
  UpdateMemberRoleDto,
  WorkspaceRole,
} from './dto';
import { AuditService, AuditAction } from '../common/audit/audit.service';

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
    private readonly auditService: AuditService,
  ) {}

  async create(userId: string, dto: CreateWorkspaceDto) {
    // Create workspace
    const workspace = await this.db.client
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

    // Add creator as owner
    await this.db.client
      .insertInto('workspace_permissions')
      .values({
        workspace_id: workspace.id,
        user_id: userId,
        permission_level: WorkspaceRole.OWNER,
      })
      .execute();

    // Log action
    await this.auditService.log({
      userId,
      action: AuditAction.WORKSPACE_CREATE,
      entityType: 'Workspace',
      entityId: workspace.id,
      details: { name: workspace.name },
    });

    return {
      ...workspace,
      userRole: WorkspaceRole.OWNER,
    };
  }

  async findAll(userId: string) {
    const workspaces = await this.db.client
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

  async findOne(id: string, userId: string) {
    const workspace = await this.db.client
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
      // Check if workspace exists at all
      const exists = await this.db.client
        .selectFrom('workspaces')
        .select('id')
        .where('id', '=', id)
        .where('is_active', '=', true)
        .executeTakeFirst();

      if (exists) {
        throw new ForbiddenException('Access denied to this workspace');
      }
      throw new NotFoundException('Workspace not found');
    }

    return workspace;
  }

  async update(id: string, userId: string, dto: UpdateWorkspaceDto) {
    await this.checkPermission(id, userId, WorkspaceRole.EDITOR);

    const updateData: any = {
      updated_at: new Date(),
    };

    if (dto.name) {
      updateData.name = dto.name;
    }
    if (dto.description !== undefined) {
      updateData.description = dto.description || null;
    }

    const workspace = await this.db.client
      .updateTable('workspaces')
      .set(updateData)
      .where('id', '=', id)
      .where('is_active', '=', true)
      .returningAll()
      .executeTakeFirst();

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const userRole = await this.getUserRole(id, userId);

    // Log action
    await this.auditService.log({
      userId,
      action: AuditAction.WORKSPACE_UPDATE,
      entityType: 'Workspace',
      entityId: id,
      details: dto,
    });

    return {
      ...workspace,
      userRole,
    };
  }

  async delete(id: string, userId: string) {
    await this.checkPermission(id, userId, WorkspaceRole.OWNER);

    const workspace = await this.db.client
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
      throw new NotFoundException('Workspace not found');
    }

    // Log action
    await this.auditService.log({
      userId,
      action: AuditAction.WORKSPACE_DELETE,
      entityType: 'Workspace',
      entityId: id,
    });

    return { message: 'Workspace deleted successfully' };
  }

  async addMember(id: string, userId: string, dto: AddMemberDto) {
    if (dto.role === WorkspaceRole.OWNER) {
      throw new BadRequestException('Cannot assign owner role');
    }

    await this.checkPermission(id, userId, WorkspaceRole.EDITOR);

    // Find user by email
    const member = await this.usersService.findByEmail(dto.email);
    if (!member) {
      throw new NotFoundException('User not found');
    }

    // Check if already a member
    const existing = await this.db.client
      .selectFrom('workspace_permissions')
      .selectAll()
      .where('workspace_id', '=', id)
      .where('user_id', '=', member.id)
      .executeTakeFirst();

    if (existing) {
      throw new ConflictException('User is already a member');
    }

    await this.db.client
      .insertInto('workspace_permissions')
      .values({
        workspace_id: id,
        user_id: member.id,
        permission_level: dto.role,
      })
      .execute();

    // Log action
    await this.auditService.log({
      userId,
      action: AuditAction.MEMBER_ADD,
      entityType: 'Workspace',
      entityId: id,
      details: { memberId: member.id, role: dto.role },
    });

    return {
      id: member.id,
      email: member.email,
      name: member.name,
      role: dto.role,
    };
  }

  async getMembers(id: string, userId: string) {
    await this.checkPermission(id, userId, WorkspaceRole.VIEWER);

    const members = await this.db.client
      .selectFrom('workspace_permissions as wp')
      .innerJoin('users as u', 'wp.user_id', 'u.id')
      .select([
        'wp.id' as any,
        'u.id as userId' as any,
        'u.email' as any,
        'u.name' as any,
        'wp.permission_level as role' as any,
        'wp.granted_at as joinedAt' as any,
      ])
      .where('wp.workspace_id', '=', id)
      .where('u.is_active', '=', true)
      .orderBy('wp.granted_at', 'asc')
      .execute();

    return members;
  }

  async updateMemberRole(
    id: string,
    userId: string,
    memberId: string,
    dto: UpdateMemberRoleDto,
  ) {
    await this.checkPermission(id, userId, WorkspaceRole.EDITOR);

    // Cannot change owner role
    const member = await this.db.client
      .selectFrom('workspace_permissions')
      .selectAll()
      .where('workspace_id', '=', id)
      .where('user_id', '=', memberId)
      .executeTakeFirst();

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.permission_level === WorkspaceRole.OWNER) {
      throw new BadRequestException('Cannot change owner role');
    }

    if (dto.role === WorkspaceRole.OWNER) {
      throw new BadRequestException('Cannot assign owner role');
    }

    await this.db.client
      .updateTable('workspace_permissions')
      .set({ permission_level: dto.role })
      .where('workspace_id', '=', id)
      .where('user_id', '=', memberId)
      .execute();

    // Log action
    await this.auditService.log({
      userId,
      action: AuditAction.MEMBER_ROLE_UPDATE,
      entityType: 'Workspace',
      entityId: id,
      details: { memberId, role: dto.role },
    });

    return { message: 'Member role updated successfully' };
  }

  async removeMember(id: string, userId: string, memberId: string) {
    await this.checkPermission(id, userId, WorkspaceRole.EDITOR);

    // Cannot remove owner
    const member = await this.db.client
      .selectFrom('workspace_permissions')
      .selectAll()
      .where('workspace_id', '=', id)
      .where('user_id', '=', memberId)
      .executeTakeFirst();

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    if (member.permission_level === WorkspaceRole.OWNER) {
      throw new BadRequestException('Cannot remove workspace owner');
    }

    await this.db.client
      .deleteFrom('workspace_permissions')
      .where('workspace_id', '=', id)
      .where('user_id', '=', memberId)
      .execute();

    // Log action
    await this.auditService.log({
      userId,
      action: AuditAction.MEMBER_REMOVE,
      entityType: 'Workspace',
      entityId: id,
      details: { memberId },
    });

    return { message: 'Member removed successfully' };
  }

  async checkPermission(
    workspaceId: string,
    userId: string,
    requiredRole: WorkspaceRole,
  ): Promise<void> {
    const permission = await this.db.client
      .selectFrom('workspace_permissions')
      .select(['permission_level'])
      .where('workspace_id', '=', workspaceId)
      .where('user_id', '=', userId)
      .executeTakeFirst();

    if (!permission) {
      throw new ForbiddenException('Access denied');
    }

    const roleHierarchy: Record<string, number> = {
      [WorkspaceRole.OWNER]: 3,
      [WorkspaceRole.EDITOR]: 2,
      [WorkspaceRole.VIEWER]: 1,
    };

    if (
      roleHierarchy[permission.permission_level] < roleHierarchy[requiredRole]
    ) {
      throw new ForbiddenException('Insufficient permissions');
    }
  }

  private async getUserRole(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceRole> {
    const permission = await this.db.client
      .selectFrom('workspace_permissions')
      .select(['permission_level'])
      .where('workspace_id', '=', workspaceId)
      .where('user_id', '=', userId)
      .executeTakeFirst();

    if (!permission) {
      throw new ForbiddenException('Access denied');
    }

    return permission.permission_level as WorkspaceRole;
  }
}
