import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class AdminRolesService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const roles = await this.db.client
      .selectFrom('roles')
      .selectAll()
      .orderBy('id', 'asc')
      .execute();

    return roles.map((role) => this.formatRole(role));
  }

  async create(dto: CreateRoleDto) {
    const existing = await this.db.client
      .selectFrom('roles')
      .select(['id'])
      .where('code', '=', dto.code)
      .executeTakeFirst();

    if (existing) {
      throw new ConflictException('Role with this code already exists');
    }

    const role = await this.db.client
      .insertInto('roles')
      .values({
        code: dto.code,
        name: dto.name,
        description: dto.description || null,
        permissions: JSON.stringify(dto.permissions) as any,
        is_system: false,
      })
      .returningAll()
      .executeTakeFirst();

    return this.formatRole(role);
  }

  async findOne(id: string) {
    const role = await this.db.client
      .selectFrom('roles')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return this.formatRole(role);
  }

  async update(id: string, dto: UpdateRoleDto) {
    await this.findOne(id);

    const updateData: Record<string, unknown> = {
      updated_at: new Date(),
    };

    if (dto.name !== undefined) {
      updateData.name = dto.name;
    }
    if (dto.description !== undefined) {
      updateData.description = dto.description;
    }
    if (dto.permissions !== undefined) {
      updateData.permissions = JSON.stringify(dto.permissions);
    }

    const role = await this.db.client
      .updateTable('roles')
      .set(updateData)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();

    return this.formatRole(role);
  }

  async remove(id: string) {
    const role = await this.findOne(id);

    if (role.is_system) {
      throw new ConflictException('Cannot delete system role');
    }

    await this.db.client.deleteFrom('roles').where('id', '=', id).execute();

    return { success: true, id };
  }

  async checkSystemRole(id: string): Promise<boolean> {
    const role = await this.db.client
      .selectFrom('roles')
      .select(['is_system'])
      .where('id', '=', id)
      .executeTakeFirst();

    return role?.is_system ?? false;
  }

  private formatRole(role: any) {
    let permissions = [];
    try {
      permissions =
        typeof role.permissions === 'string'
          ? JSON.parse(role.permissions)
          : role.permissions || [];
    } catch {
      permissions = [];
    }

    return {
      id: role.id,
      code: role.code,
      name: role.name,
      description: role.description,
      permissions,
      is_system: Boolean(role.is_system),
      created_at: role.created_at,
      updated_at: role.updated_at,
    };
  }
}
