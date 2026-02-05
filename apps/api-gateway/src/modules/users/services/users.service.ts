import * as crypto from 'crypto';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '@elbruso/database';
import { DatabaseService } from '@database/database.service';
import { CreateUserDto } from '../dto';
import { UpdateProfileDto, AdminUpdateUserDto } from '../dto/user-settings.dto';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateUserDto) {
    // Проверяем существование пользователя
    const existing = await this.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    // Создаем пользователя
    let orgId: number | null = null;
    if (dto.organizationId) {
      const parsed = parseInt(dto.organizationId, 10);
      if (!isNaN(parsed)) {
        orgId = parsed;
      }
    }

    const countryId =
      (dto as CreateUserDto & { countryId?: number }).countryId || 1;

    const user = await this.db.client
      .insertInto('users')
      .values({
        email: dto.email,
        first_name: dto.name,
        password: dto.password,
        organization_id: orgId,
        country_id: countryId,
      })
      .returningAll()
      .executeTakeFirst();

    if (!user) {
      throw new ConflictException('Failed to create user');
    }

    return this.sanitizeUser(user as unknown as Users);
  }

  async findByEmail(email: string) {
    const user = await this.db.client
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .where('is_active', '=', true)
      .executeTakeFirst();

    return user ? this.sanitizeUser(user as unknown as Users) : null;
  }

  async findByEmailWithPassword(email: string) {
    const user = await this.db.client
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .where('is_active', '=', true)
      .executeTakeFirst();

    return (user as unknown as Users) || null;
  }

  async findById(id: string) {
    const user = await this.db.client
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitizeUser(user as unknown as Users);
  }

  async findByApiKey(apiKey: string) {
    // Хешируем API ключ для поиска
    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

    const apiKeyRecord = await this.db.client
      .selectFrom('api_keys')
      .selectAll()
      .where('key_hash', '=', keyHash)
      .where('is_active', '=', true)
      .executeTakeFirst();

    if (!apiKeyRecord) {
      return null;
    }

    // Обновляем last_used_at
    await this.db.client
      .updateTable('api_keys')
      .set({ last_used_at: new Date() })
      .where('id', '=', apiKeyRecord.id)
      .execute();

    return this.findById(apiKeyRecord.user_id);
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await this.db.client
      .insertInto('sessions')
      .values({
        user_id: userId,
        refresh_token: refreshToken,
        expires_at: expiresAt,
      })
      .execute();
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const session = await this.db.client
      .selectFrom('sessions')
      .selectAll()
      .where('user_id', '=', userId)
      .where('refresh_token', '=', refreshToken)
      .where('expires_at', '>', new Date())
      .executeTakeFirst();

    return !!session;
  }

  async revokeRefreshToken(userId: string, refreshToken: string) {
    await this.db.client
      .deleteFrom('sessions')
      .where('user_id', '=', userId)
      .where('refresh_token', '=', refreshToken)
      .execute();
  }

  async createApiKey(userId: string, name: string, permissions: string[]) {
    // Генерируем случайный API ключ
    const apiKey = `elk_${crypto.randomBytes(32).toString('hex')}`;
    const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

    await this.db.client
      .insertInto('api_keys')
      .values({
        user_id: userId,
        name,
        key_hash: keyHash,
        permissions: JSON.stringify(permissions),
      })
      .execute();

    // Возвращаем ключ только один раз
    return { apiKey, name };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.db.client
      .updateTable('users')
      .set({
        ...dto,
        updated_at: new Date(),
      })
      .where('id', '=', userId)
      .returningAll()
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitizeUser(user as unknown as Users);
  }

  async findAll() {
    return this.db.client
      .selectFrom('users')
      .selectAll()
      .where('is_active', '=', true)
      .execute();
  }

  async updateUserAdmin(userId: string, dto: AdminUpdateUserDto) {
    const user = await this.db.client
      .updateTable('users')
      .set({
        ...dto,
        updated_at: new Date(),
      })
      .where('id', '=', userId)
      .returningAll()
      .executeTakeFirst();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.sanitizeUser(user as unknown as Users);
  }

  private sanitizeUser(user: Users | null) {
    if (!user) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...sanitized } = user;
    return sanitized;
  }
}
