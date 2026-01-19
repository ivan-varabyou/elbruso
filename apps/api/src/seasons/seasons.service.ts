import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Seasons } from '@elbruso/database';

@Injectable()
export class SeasonsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Seasons[]> {
    return this.db.client
      .selectFrom('seasons')
      .selectAll()
      .orderBy('start_date', 'desc')
      .execute() as unknown as Seasons[];
  }

  async findById(id: number): Promise<Seasons | undefined> {
    return this.db.client
      .selectFrom('seasons')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst() as unknown as Seasons | undefined;
  }

  async findCurrent(): Promise<Seasons | undefined> {
    const now = new Date();
    return this.db.client
      .selectFrom('seasons')
      .selectAll()
      .where('start_date', '<=', now)
      .where('end_date', '>=', now)
      .executeTakeFirst() as unknown as Seasons | undefined;
  }

  async findLatest(): Promise<Seasons | undefined> {
    return this.db.client
      .selectFrom('seasons')
      .selectAll()
      .orderBy('start_date', 'desc')
      .executeTakeFirst() as unknown as Seasons | undefined;
  }
}
