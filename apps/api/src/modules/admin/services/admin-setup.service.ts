import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../../database/database.service';

@Injectable()
export class AdminSetupService {
  constructor(private readonly db: DatabaseService) {}

  async countAdmins(): Promise<number> {
    const result = await this.db.client
      .selectFrom('admin_users')
      .select((eb) => eb.fn.countAll<number>().as('count'))
      .executeTakeFirst();

    return parseInt((result as any).count || '0', 10);
  }

  async createFirstAdmin(data: {
    email: string;
    password: string;
    name: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const existingCount = await this.countAdmins();
    if (existingCount > 0) {
      throw new ForbiddenException(
        'Admin users already exist. Setup cannot be completed.',
      );
    }

    const result = await this.db.client
      .insertInto('admin_users')
      .values({
        email: data.email,
        password_hash: hashedPassword,
        name: data.name,
        role: 'SUPER_ADMIN',
        is_active: true,
      })
      .returningAll()
      .executeTakeFirst();

    return result;
  }
}
