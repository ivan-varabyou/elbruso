/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { IndicatorCatalog } from '@elbruso/database';
import { IndicatorFiltersDto } from './dto/indicator-filters.dto';

@Injectable()
export class IndicatorsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(filters: IndicatorFiltersDto): Promise<IndicatorCatalog[]> {
    let query: any = this.db.client.selectFrom('indicator_catalog');

    if (filters.sportId) {
      query = query.where('sport_id' as any, '=', filters.sportId as any);
    }

    if (filters.groupId) {
      query = query
        .innerJoin(
          'indicator_catalog_groups as icg' as any,
          'icg.indicator_id' as any,
          'indicator_catalog.id' as any,
        )
        .where('icg.group_id' as any, '=', filters.groupId as any);
    }

    if (filters.search) {
      query = query.where('name_ru' as any, 'ilike' as any, `%${filters.search}%`);
    }

    return query
      .selectAll('indicator_catalog' as any)
      .where('indicator_catalog.is_active' as any, '=', true)
      .execute() as unknown as IndicatorCatalog[];
  }

  async findById(id: number): Promise<IndicatorCatalog | undefined> {
    return this.db.client
      .selectFrom('indicator_catalog')
      .selectAll()
      .where('id' as any, '=', id as any)
      .where('is_active' as any, '=', true)
      .executeTakeFirst() as unknown as IndicatorCatalog | undefined;
  }

  async findBySport(sportId: number): Promise<IndicatorCatalog[]> {
    return this.db.client
      .selectFrom('indicator_catalog')
      .selectAll()
      .where('sport_id' as any, '=', sportId as any)
      .where('is_active' as any, '=', true)
      .execute() as unknown as IndicatorCatalog[];
  }
}
