import { Injectable } from '@nestjs/common';
import { EventsCatalog } from '@database';
import { DatabaseService } from '@database/database.service';
import { CreateEventDto, EventFiltersDto, UpdateEventDto } from "../dto";

@Injectable()
export class EventsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(filters: EventFiltersDto): Promise<EventsCatalog[]> {
    let query = this.db.client.selectFrom("events_catalog");

    if (filters.sportId) {
      query = query.where("sport_id", "=", filters.sportId);
    }

    // region_id and importance do not exist on events_catalog table

    return query.selectAll().where("is_active", "=", true).execute() as unknown as EventsCatalog[];
  }

  async findById(id: number): Promise<EventsCatalog | undefined> {
    return this.db.client
      .selectFrom("events_catalog")
      .selectAll()
      .where("id", "=", id)
      .where("is_active", "=", true)
      .executeTakeFirst() as unknown as EventsCatalog | undefined;
  }

  async create(dto: CreateEventDto): Promise<EventsCatalog> {
    return this.db.client
      .insertInto("events_catalog")
      .values({
        ...dto,
        is_active: true,
      })
      .returningAll()
      .executeTakeFirstOrThrow() as unknown as EventsCatalog;
  }

  async update(id: number, dto: UpdateEventDto): Promise<EventsCatalog> {
    return this.db.client
      .updateTable("events_catalog")
      .set({
        ...dto,
        updated_at: new Date() as any,
      })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow() as unknown as EventsCatalog;
  }

  async delete(id: number): Promise<void> {
    await this.db.client
      .updateTable("events_catalog")
      .set({ is_active: false, updated_at: new Date() as any })
      .where("id", "=", id)
      .execute();
  }
}
