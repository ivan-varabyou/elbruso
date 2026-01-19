import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Sports, Disciplines } from '@elbruso/database';
import { SportFiltersDto } from './dto/sport-filters.dto';

@Injectable()
export class SportsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(filters?: SportFiltersDto): Promise<Sports[]> {
    let query = this.db.client.selectFrom('sports');

    if (filters?.olympicCategoryId) {
      query = query.where('olympic_category_id', '=', filters.olympicCategoryId);
    }

    if (filters?.sportTypeId) {
      query = query.where('sport_type_id', '=', filters.sportTypeId);
    }

    return query
      .selectAll()
      .where('is_active', '=', filters?.isActive ?? true)
      .orderBy('name_ru', 'asc')
      .execute() as unknown as Sports[];
  }

  async findById(id: number): Promise<Sports | undefined> {
    return this.db.client
      .selectFrom('sports')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst() as unknown as Sports | undefined;
  }

  async findDisciplines(sportId: number): Promise<Disciplines[]> {
    return this.db.client
      .selectFrom('disciplines')
      .selectAll()
      .where('country_sport_id', '=', sportId)
      .where('is_active', '=', true)
      .orderBy('name_ru', 'asc')
      .execute() as unknown as Disciplines[];
  }
}
