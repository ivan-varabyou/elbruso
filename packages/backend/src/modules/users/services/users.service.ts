import { Users } from "@database";
import { DatabaseService } from "@database/database.service";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import * as crypto from "crypto";

import { RbacAppType } from "../../rbac/enums/permission.enum";
import { RbacService } from "../../rbac/services/rbac.service";
import { CreateUserDto, UpdateUserDto } from "../dto";
import { AdminUpdateUserDto, UpdateProfileDto } from "../dto/user-settings.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly db: DatabaseService,
    private readonly rbacService: RbacService,
  ) {}

  async create(dto: CreateUserDto) {
    const existing = await this.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException("User with this email already exists");
    }

    const user = await this.db.client
      .insertInto("users")
      .values({
        email: dto.email,
        password: dto.password,
        first_name: dto.first_name,
        last_name: dto.last_name,
        middle_name: dto.middle_name || null,
        organization_id: dto.organization_id ? parseInt(dto.organization_id, 10) : null,
        role: dto.role || "VIEWER",
        is_active: false,
      })
      .returningAll()
      .executeTakeFirst();

    if (!user) {
      throw new Error("Failed to create user");
    }

    // Sync role with RBAC
    if (dto.role) {
      const rbacRole = await this.rbacService.getRoleByTypeAndCode(
        RbacAppType.WEBAPP,
        dto.role.toLowerCase(),
      );
      if (rbacRole) {
        await this.rbacService.assignUserRole(user.id, RbacAppType.WEBAPP, rbacRole.id);
      }
    }

    // Process workspaces if provided
    if (dto.workspaces && dto.workspaces.length > 0) {
      await this.db.client
        .insertInto("workspace_permissions")
        .values(
          dto.workspaces.map((ws) => ({
            user_id: user.id,
            workspace_id: ws.id,
            permission_level: ws.role,
            granted_at: new Date(),
          })),
        )
        .execute();
    }

    return this.findById(user.id);
  }

  async findAll(filters?: {
    search?: string;
    organization_id?: number;
    role?: string;
    is_active?: boolean;
  }) {
    let query = this.db.client.selectFrom("users").selectAll();

    if (filters?.search) {
      query = query.where((eb) =>
        eb.or([
          eb("first_name", "ilike", `%${filters.search}%`),
          eb("last_name", "ilike", `%${filters.search}%`),
          eb("email", "ilike", `%${filters.search}%`),
        ]),
      );
    }

    if (filters?.organization_id) {
      query = query.where("organization_id", "=", filters.organization_id);
    }

    if (filters?.role) {
      query = query.where("role", "=", filters.role);
    }

    if (filters?.is_active !== undefined) {
      query = query.where("is_active", "=", filters.is_active);
    }

    const users = await query.execute();

    const usersWithOrg = await Promise.all(
      users.map(async (user) => {
        let organization_name = null;
        if (user.organization_id) {
          const org = await this.db.client
            .selectFrom("organizations")
            .select(["name_ru"])
            .where("id", "=", user.organization_id)
            .executeTakeFirst();
          organization_name = org?.name_ru || null;
        }
        return {
          ...this.sanitizeUser(user as unknown as Users),
          organization_name,
        };
      }),
    );

    return usersWithOrg;
  }

  async findById(id: string) {
    const user = await this.db.client
      .selectFrom("users")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    let organization_name = null;
    if (user.organization_id) {
      const org = await this.db.client
        .selectFrom("organizations")
        .select(["name_ru"])
        .where("id", "=", user.organization_id)
        .executeTakeFirst();
      organization_name = org?.name_ru || null;
    }

    const workspaces = await this.db.client
      .selectFrom("workspaces as w")
      .innerJoin("workspace_permissions as wp", "w.id", "wp.workspace_id")
      .select(["w.id", "w.name", "wp.permission_level as role", "wp.granted_at"])
      .where("wp.user_id", "=", id)
      .execute();

    return {
      ...this.sanitizeUser(user as unknown as Users),
      organization_name,
      workspaces,
    };
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.db.client
      .selectFrom("users")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const updateData: any = {
      updated_at: new Date(),
    };

    if (dto.first_name !== undefined) updateData.first_name = dto.first_name;
    if (dto.last_name !== undefined) updateData.last_name = dto.last_name;
    if (dto.middle_name !== undefined) updateData.middle_name = dto.middle_name;
    if (dto.organization_id !== undefined) {
      updateData.organization_id = dto.organization_id ? parseInt(dto.organization_id, 10) : null;
    }
    if (dto.role !== undefined) updateData.role = dto.role;
    if (dto.is_active !== undefined) updateData.is_active = dto.is_active;

    const updated = await this.db.client
      .updateTable("users")
      .set(updateData)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();

    // Sync role with RBAC
    if (dto.role) {
      const rbacRole = await this.rbacService.getRoleByTypeAndCode(
        RbacAppType.WEBAPP,
        dto.role.toLowerCase(),
      );
      if (rbacRole) {
        await this.rbacService.assignUserRole(id, RbacAppType.WEBAPP, rbacRole.id);
      }
    }

    // Process workspaces if provided
    if (dto.workspaces) {
      // 1. Remove existing workspace permissions
      await this.db.client.deleteFrom("workspace_permissions").where("user_id", "=", id).execute();

      // 2. Add new workspace permissions
      if (dto.workspaces.length > 0) {
        await this.db.client
          .insertInto("workspace_permissions")
          .values(
            dto.workspaces.map((ws) => ({
              user_id: id,
              workspace_id: ws.id,
              permission_level: ws.role,
              granted_at: new Date(),
            })),
          )
          .execute();
      }
    }

    return this.findById(id);
  }

  async approve(id: string) {
    return this.update(id, { is_active: true, is_approved: true });
  }

  async block(id: string, block: boolean = true) {
    return this.update(id, { is_active: !block });
  }

  async remove(id: string) {
    await this.db.client.deleteFrom("users").where("id", "=", id).execute();
    return { success: true };
  }

  async findByEmail(email: string) {
    const user = await this.db.client
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    return user ? this.sanitizeUser(user as unknown as Users) : null;
  }

  async findByEmailWithPassword(email: string) {
    const user = await this.db.client
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    return (user as unknown as Users) || null;
  }

  async findByApiKey(apiKey: string) {
    const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

    const apiKeyRecord = await this.db.client
      .selectFrom("api_keys")
      .selectAll()
      .where("key_hash", "=", keyHash)
      .executeTakeFirst();

    if (!apiKeyRecord) return null;

    await this.db.client
      .updateTable("api_keys")
      .set({ last_used_at: new Date() })
      .where("id", "=", apiKeyRecord.id)
      .execute();

    return this.findById(apiKeyRecord.user_id);
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.db.client
      .insertInto("sessions")
      .values({
        user_id: userId,
        refresh_token: refreshToken,
        expires_at: expiresAt,
      })
      .execute();
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const session = await this.db.client
      .selectFrom("sessions")
      .selectAll()
      .where("user_id", "=", userId)
      .where("refresh_token", "=", refreshToken)
      .where("expires_at", ">", new Date())
      .executeTakeFirst();

    return !!session;
  }

  async revokeRefreshToken(userId: string, refreshToken: string) {
    await this.db.client
      .deleteFrom("sessions")
      .where("user_id", "=", userId)
      .where("refresh_token", "=", refreshToken)
      .execute();
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.db.client
      .updateTable("users")
      .set({
        ...dto,
        updated_at: new Date(),
      })
      .where("id", "=", userId)
      .returningAll()
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.sanitizeUser(user as unknown as Users);
  }

  async createApiKey(userId: string, name: string, permissions: string[]) {
    const apiKey = `elk_${crypto.randomBytes(32).toString("hex")}`;
    const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");

    await this.db.client
      .insertInto("api_keys")
      .values({
        user_id: userId,
        name,
        key_hash: keyHash,
        permissions: JSON.stringify(permissions),
      })
      .execute();

    return { apiKey, name };
  }

  async updateUserAdmin(userId: string, dto: AdminUpdateUserDto) {
    const user = await this.db.client
      .updateTable("users")
      .set({
        ...dto,
        updated_at: new Date(),
      })
      .where("id", "=", userId)
      .returningAll()
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.sanitizeUser(user as unknown as Users);
  }

  private sanitizeUser(user: Users | null) {
    if (!user) return null;
    const { password: _password, ...sanitized } = user;
    return sanitized;
  }
}
