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

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly db: DatabaseService,
    private readonly usersService: UsersService,
  ) {}

  async create(userId: string, dto: CreateWorkspaceDto) {
    const slug = this.generateSlug(dto.name);

    // Create workspace
    const workspace = await this.db.client
      .insertInto('workspaces')
      .values({
        name: dto.name,
        slug,
        description: dto.description || null,
        icon: dto.icon || null,
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
        role: WorkspaceRole.OWNER,
      })
      .execute();

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
        'w.slug',
        'w.description',
        'w.icon',
        'w.created_at',
        'w.updated_at',
        'wp.role as userRole',
      ])
      .where('wp.user_id', '=', userId)
      .where('w.is_active', '=', true)
      .orderBy('w.updated_at', 'desc')
      .execute();

    return workspaces;
  }

  async findOne(id: string, userId: string) {
    await this.checkPermission(id, userId, WorkspaceRole.READ);

    const workspace = await this.db.client
      .selectFrom('workspaces as w')
      .innerJoin('workspace_permissions as wp', 'w.id', 'wp.workspace_id')
      .select([
        'w.id',
        'w.name',
        'w.slug',
        'w.description',
        'w.icon',
        'w.created_at',
        'w.updated_at',
        'wp.role as userRole',
      ])
      .where('w.id', '=', id)
      .where('wp.user_id', '=', userId)
      .where('w.is_active', '=', true)
      .executeTakeFirst();

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    return workspace;
  }

  async update(id: string, userId: string, dto: UpdateWorkspaceDto) {
    await this.checkPermission(id, userId, WorkspaceRole.ADMIN);

    const updateData: {
      name?: string;
      slug?: string;
      description?: string | null;
      icon?: string | null;
      updated_at: Date;
    } = {
      updated_at: new Date(),
    };

    if (dto.name) {
      updateData.name = dto.name;
      updateData.slug = this.generateSlug(dto.name);
    }
    if (dto.description !== undefined) {
      updateData.description = dto.description || null;
    }
    if (dto.icon !== undefined) {
      updateData.icon = dto.icon || null;
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

    return { message: 'Workspace deleted successfully' };
  }

  async addMember(id: string, userId: string, dto: AddMemberDto) {
    if (dto.role === WorkspaceRole.OWNER) {
      throw new BadRequestException('Cannot assign owner role');
    }

    await this.checkPermission(id, userId, WorkspaceRole.ADMIN);

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
        role: dto.role,
      })
      .execute();

    return {
      id: member.id,
      email: member.email,
      name: member.name,
      role: dto.role,
    };
  }

  async getMembers(id: string, userId: string) {
    await this.checkPermission(id, userId, WorkspaceRole.READ);

    const members = await this.db.client
      .selectFrom('workspace_permissions as wp')
      .innerJoin('users as u', 'wp.user_id', 'u.id')
      .select([
        'wp.id',
        'u.id as userId',
        'u.email',
        'u.name',
        'wp.role',
        'wp.created_at as joinedAt',
      ])
      .where('wp.workspace_id', '=', id)
      .where('u.is_active', '=', true)
      .orderBy('wp.created_at', 'asc')
      .execute();

    return members;
  }

  async updateMemberRole(
    id: string,
    userId: string,
    memberId: string,
    dto: UpdateMemberRoleDto,
  ) {
    await this.checkPermission(id, userId, WorkspaceRole.ADMIN);

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

    if (member.role === WorkspaceRole.OWNER) {
      throw new BadRequestException('Cannot change owner role');
    }

    if (dto.role === WorkspaceRole.OWNER) {
      throw new BadRequestException('Cannot assign owner role');
    }

    await this.db.client
      .updateTable('workspace_permissions')
      .set({ role: dto.role })
      .where('workspace_id', '=', id)
      .where('user_id', '=', memberId)
      .execute();

    return { message: 'Member role updated successfully' };
  }

  async removeMember(id: string, userId: string, memberId: string) {
    await this.checkPermission(id, userId, WorkspaceRole.ADMIN);

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

    if (member.role === WorkspaceRole.OWNER) {
      throw new BadRequestException('Cannot remove workspace owner');
    }

    await this.db.client
      .deleteFrom('workspace_permissions')
      .where('workspace_id', '=', id)
      .where('user_id', '=', memberId)
      .execute();

    return { message: 'Member removed successfully' };
  }

  async checkPermission(
    workspaceId: string,
    userId: string,
    requiredRole: WorkspaceRole,
  ): Promise<void> {
    const permission = await this.db.client
      .selectFrom('workspace_permissions')
      .select(['role'])
      .where('workspace_id', '=', workspaceId)
      .where('user_id', '=', userId)
      .executeTakeFirst();

    if (!permission) {
      throw new ForbiddenException('Access denied');
    }

    const roleHierarchy = {
      [WorkspaceRole.OWNER]: 4,
      [WorkspaceRole.ADMIN]: 3,
      [WorkspaceRole.WRITE]: 2,
      [WorkspaceRole.READ]: 1,
    };

    if (roleHierarchy[permission.role] < roleHierarchy[requiredRole]) {
      throw new ForbiddenException('Insufficient permissions');
    }
  }

  private async getUserRole(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceRole> {
    const permission = await this.db.client
      .selectFrom('workspace_permissions')
      .select(['role'])
      .where('workspace_id', '=', workspaceId)
      .where('user_id', '=', userId)
      .executeTakeFirst();

    if (!permission) {
      throw new ForbiddenException('Access denied');
    }

    return permission.role as WorkspaceRole;
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
