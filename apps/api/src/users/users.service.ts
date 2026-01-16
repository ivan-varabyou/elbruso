import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDto } from './dto';
import * as crypto from 'crypto';

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
    const user = await this.db.client
      .insertInto('users')
      .values({
        email: dto.email,
        name: dto.name,
        password: dto.password,
        organization_id: dto.organizationId ? Number(dto.organizationId) : null,
      })
      .returningAll()
      .executeTakeFirst();

    return this.sanitizeUser(user);
  }

  async findByEmail(email: string) {
    const user = await this.db.client
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .where('is_active', '=', true)
      .executeTakeFirst();

    return user ? this.sanitizeUser(user) : null;
  }

  async findByEmailWithPassword(email: string) {
    const user = await this.db.client
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .where('is_active', '=', true)
      .executeTakeFirst();

    return user || null;
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

    return this.sanitizeUser(user);
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
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 дней

    await this.db.client
      .insertInto('sessions')
      .values({
        user_id: userId,
        refresh_token: refreshToken,
        expires_at: expiresAt,
      })
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

  private sanitizeUser(user: {
    id: string;
    email: string;
    name: string;
    password: string;
    [key: string]: unknown;
  }) {
    if (!user) return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...sanitized } = user;
    return sanitized;
  }
}
