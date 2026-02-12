import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { DatabaseService } from "@database/database.service";
import { AdminRole } from "../enums/admin-role.enum";
import { CreateAdminUserDto } from "./dto/create-admin-user.dto";
import { UpdateAdminUserDto } from "./dto/update-admin-user.dto";

interface PaginationParams {
  page?: number;
  limit?: number;
}

@Injectable()
export class AdminUsersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(pagination: PaginationParams = {}) {
    const page = pagination.page || 1;
    const limit = pagination.limit || 20;
    const offset = (page - 1) * limit;

    const users = await this.db.client
      .selectFrom("admin_users")
      .select([
        "id",
        "email",
        "name",
        "role",
        "is_active",
        "created_at",
        "updated_at",
        "last_login_at",
      ])
      .orderBy("created_at", "desc")
      .limit(limit)
      .offset(offset)
      .execute();

    const result = await this.db.client
      .selectFrom("admin_users")
      .select((eb) => [eb.fn.countAll().as("count")])
      .executeTakeFirst();
    const count = Number(result?.count || 0);

    return {
      data: users,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async create(dto: CreateAdminUserDto) {
    const existing = await this.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException("Admin user with this email already exists");
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.db.client
      .insertInto("admin_users")
      .values({
        email: dto.email,
        name: dto.name,
        password_hash: passwordHash,
        role: dto.role,
        is_active: true,
      })
      .returningAll()
      .executeTakeFirst();

    return this.sanitizeUser(user as any);
  }

  async findOne(id: string) {
    const user = await this.db.client
      .selectFrom("admin_users")
      .select([
        "id",
        "email",
        "name",
        "role",
        "is_active",
        "created_at",
        "updated_at",
        "last_login_at",
      ])
      .where("id", "=", id)
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException("Admin user not found");
    }

    return user;
  }

  async findById(id: string) {
    return this.findOne(id);
  }

  async update(id: string, dto: UpdateAdminUserDto & { password?: string }) {
    await this.findOne(id);

    const { password, ...rest } = dto;
    const updateData: any = { ...rest, updated_at: new Date() };

    if (password) {
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    const user = await this.db.client
      .updateTable("admin_users")
      .set(updateData)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();

    return this.sanitizeUser(user as any);
  }

  async updateMe(id: string, dto: any) {
    const { password, ...rest } = dto;
    const updateData: any = { ...rest, updated_at: new Date() };

    if (password) {
      updateData.password_hash = await bcrypt.hash(password, 10);
    }

    const user = await this.db.client
      .updateTable("admin_users")
      .set(updateData)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();

    return this.sanitizeUser(user as any);
  }

  async remove(id: string, requestingUserId: string) {
    // Prevent self-deletion
    if (id === requestingUserId) {
      throw new BadRequestException("You cannot delete yourself");
    }

    const user = await this.findOne(id);

    if (user.role === AdminRole.SUPER_ADMIN) {
      const superAdminCount = await this.countSuperAdmins();
      if (superAdminCount <= 1) {
        throw new BadRequestException("Cannot delete the last SUPER_ADMIN");
      }
    }

    await this.db.client.deleteFrom("admin_users").where("id", "=", id).execute();

    return { message: "Admin user deleted successfully" };
  }

  async checkLastSuperAdmin(id: string): Promise<boolean> {
    const user = await this.findOne(id);
    if (user.role !== AdminRole.SUPER_ADMIN) {
      return false;
    }
    const count = await this.countSuperAdmins();
    return count <= 1;
  }

  private async findByEmail(email: string) {
    const user = await this.db.client
      .selectFrom("admin_users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    return user || null;
  }

  private async countSuperAdmins(): Promise<number> {
    const result = await this.db.client
      .selectFrom("admin_users")
      .select((eb) => [eb.fn.countAll().as("count")])
      .where("role", "=", AdminRole.SUPER_ADMIN)
      .where("is_active", "=", true)
      .executeTakeFirst();

    return Number(result?.count || 0);
  }

  private sanitizeUser(user: any) {
    if (!user) return null;
    const { password_hash: _password, ...sanitized } = user;
    return sanitized;
  }
}
