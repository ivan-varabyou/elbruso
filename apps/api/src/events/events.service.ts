import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EventsCatalog } from '@elbruso/database';
import { EventFiltersDto } from './dto/event-filters.dto';

@Injectable()
export class EventsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(filters: EventFiltersDto): Promise<EventsCatalog[]> {
    let query = this.db.client.selectFrom('events_catalog');

    if (filters.sportId) {
      query = query.where('sport_id', '=', filters.sportId);
    }

    // region_id and importance do not exist on events_catalog table

    return query
      .selectAll()
      .where('is_active', '=', true)
      .execute() as unknown as EventsCatalog[];
  }

  async findById(id: number): Promise<EventsCatalog | undefined> {
    return this.db.client
      .selectFrom('events_catalog')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst() as unknown as EventsCatalog | undefined;
  }
}
