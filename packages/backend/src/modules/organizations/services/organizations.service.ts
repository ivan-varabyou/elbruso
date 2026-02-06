import { Injectable } from '@nestjs/common';
import { sql } from 'kysely';
import { Organizations } from '@database';
import { DatabaseService } from '@database/database.service';
import { OrganizationFiltersDto } from '../dto/organization-filters.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly db: DatabaseService) {}

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

  async getHierarchy(orgId: number): Promise<Organizations[]> {
    const result = await sql`
      WITH RECURSIVE org_hierarchy AS (
        SELECT * FROM organizations WHERE id = ${orgId}
        UNION ALL
        SELECT o.* FROM organizations o
        JOIN org_hierarchy oh ON o.parent_id = oh.id
      )
      SELECT * FROM org_hierarchy WHERE is_active = true
    `.execute(this.db.client);

    return result.rows as unknown as Organizations[];
  }

  async getTree(orgId: number): Promise<any> {
    const flat = await this.getHierarchy(orgId);

    const buildTree = (parentId: number | null) => {
      return flat
        .filter((org) => (org as any).parent_id === parentId)
        .map((org) => ({
          ...org,
          children: buildTree((org as any).id),
        }));
    };

    const root = flat.find((o) => (o as any).id === orgId);
    if (!root) return null;

    return {
      ...root,
      children: buildTree(orgId),
    };
  }

  async getAncestors(orgId: number): Promise<Organizations[]> {
    const result = await sql`
      WITH RECURSIVE org_ancestors AS (
        SELECT * FROM organizations WHERE id = ${orgId}
        UNION ALL
        SELECT o.* FROM organizations o
        JOIN org_ancestors oa ON oa.parent_id = o.id
      )
      SELECT * FROM org_ancestors WHERE is_active = true
    `.execute(this.db.client);

    return result.rows as unknown as Organizations[];
  }
}
