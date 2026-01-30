/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { sql } from 'kysely';
import { DatabaseService } from '@database/database.service';
import { IndicatorGroupsCatalog, IndicatorCatalog } from '@elbruso/database';
import { IndicatorGroupFiltersDto } from '../dto/indicator-group-filters.dto';

@Injectable()
export class IndicatorGroupsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(
    filters: IndicatorGroupFiltersDto,
  ): Promise<IndicatorGroupsCatalog[]> {
    let query: any = this.db.client.selectFrom('indicator_groups_catalog');

    if (filters.sportId) {
      query = query.where('sport_id' as any, '=', filters.sportId as any);
    }

    return query
      .selectAll()
      .where('is_active' as any, '=', true)
      .execute() as unknown as IndicatorGroupsCatalog[];
  }

  async findById(id: number): Promise<IndicatorGroupsCatalog | undefined> {
    return this.db.client
      .selectFrom('indicator_groups_catalog')
      .selectAll()
      .where('id' as any, '=', id as any)
      .where('is_active' as any, '=', true)
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
