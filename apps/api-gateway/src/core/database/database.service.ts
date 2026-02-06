import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Kysely } from 'kysely';
import { createDatabase, type Database } from '@database';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly db: Kysely<Database>;

  constructor() {
    this.db = createDatabase();
  }

  get client(): Kysely<Database> {
    return this.db;
  }

  async onModuleDestroy() {
    await this.db.destroy();
  }
}
