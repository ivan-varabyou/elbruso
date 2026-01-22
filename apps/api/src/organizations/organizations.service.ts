import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Organizations } from '@elbruso/database';
import { OrganizationFiltersDto } from './dto/organization-filters.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly db: DatabaseService) { }

  async findAll(filters: OrganizationFiltersDto): Promise<Organizations[]> {
    let query = this.db.client.selectFrom('organizations');

    if (filters.typeId) {
      query = query.where('type_id', '=', filters.typeId);
    }
    if (filters.sportId) {
      query = query.where('sport_id', '=', filters.sportId);
    }
    if (filters.regionId) {
      query = query.where('region_id', '=', filters.regionId);
    }
    if (filters.parentId) {
      query = query.where('parent_id', '=', filters.parentId);
    }
    if (filters.countryId) {
      query = query.where('country_id', '=', filters.countryId);
    }

    return query
      .selectAll()
      .where('is_active', '=', true)
      .execute() as unknown as Organizations[];
  }

  async findById(id: number): Promise<Organizations | undefined> {
    return this.db.client
      .selectFrom('organizations')
      .selectAll()
      .where('id', '=', id)
      .where('is_active', '=', true)
      .executeTakeFirst() as unknown as Organizations | undefined;
  }

  async findFederations(
    filters: OrganizationFiltersDto,
  ): Promise<Organizations[]> {
    let query = this.db.client
      .selectFrom('organizations')
      .where('type_id', 'in', [2, 3]); // 2: National Federation, 3: Regional Federation

    if (filters.sportId) {
      query = query.where('sport_id', '=', filters.sportId);
    }
    if (filters.regionId) {
      query = query.where('region_id', '=', filters.regionId);
    }

    return query
      .selectAll()
      .where('is_active', '=', true)
      .execute() as unknown as Organizations[];
  }
}
