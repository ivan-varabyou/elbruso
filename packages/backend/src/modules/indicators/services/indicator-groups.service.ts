import { Injectable } from '@nestjs/common';
import { sql } from 'kysely';
import { IndicatorGroupsCatalog, IndicatorCatalog } from '@database';
import { DatabaseService } from '@database/database.service';
import { IndicatorGroupFiltersDto } from '../dto/indicator-group-filters.dto';

@Injectable()
export class IndicatorGroupsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(
    filters: IndicatorGroupFiltersDto,
  ): Promise<IndicatorGroupsCatalog[]> {
    let query = this.db.client.selectFrom('indicator_groups_catalog');

    if (filters.sportId) {
      query = query.where('sport_id', '=', filters.sportId);
    }

    return query
      .selectAll()
      .where('is_active', '=', true)
      .execute() as unknown as IndicatorGroupsCatalog[];
  }

  async findById(id: number): Promise<IndicatorGroupsCatalog | undefined> {
    return this.db.client
      .selectFrom('indicator_groups_catalog')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst() as unknown as IndicatorGroupsCatalog | undefined;
  }

  async findIndicatorsByGroup(groupId: number): Promise<IndicatorCatalog[]> {
    const result = await sql<IndicatorCatalog>`
      SELECT ic.* 
      FROM indicator_catalog ic
      JOIN indicator_catalog_groups icg ON ic.id = icg.indicator_id
      WHERE icg.group_id = ${groupId} AND ic.is_active = true
    `.execute(this.db.client);

    return result.rows;
  }
}
