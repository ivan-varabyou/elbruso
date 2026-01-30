/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { DatabaseService } from '@database/database.service';
import { IndicatorCatalog } from '@elbruso/database';
import { IndicatorFiltersDto } from '../dto/indicator-filters.dto';
import { GenerateIndicatorsDto } from '../dto/generate-indicators.dto';
import { sql } from 'kysely';

@Injectable()
export class IndicatorsService implements OnModuleInit {
  private readonly logger = new Logger(IndicatorsService.name);

  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    try {
      this.logger.log(
        'Updating indicator_catalog schema for access control...',
      );

      await sql`
        ALTER TABLE indicator_catalog 
        ADD COLUMN IF NOT EXISTS organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL;
      `.execute(this.db.client);

      await sql`
        ALTER TABLE indicator_catalog 
        ADD COLUMN IF NOT EXISTS created_by UUID;
      `.execute(this.db.client);

      // Separate step for FK to handle cases where users table might have different types
      try {
        await sql`
          ALTER TABLE indicator_catalog
          ADD CONSTRAINT fk_indicator_created_by
          FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
        `.execute(this.db.client);
      } catch (e) {
        // Constraint might already exist
      }

      await sql`
        ALTER TABLE indicator_catalog 
        ADD COLUMN IF NOT EXISTS is_system BOOLEAN DEFAULT TRUE;
      `.execute(this.db.client);

      this.logger.log('Indicator schema updated');
    } catch (error) {
      this.logger.error('Failed to update indicator schema:', error);
    }
  }

  async findAll(filters: IndicatorFiltersDto): Promise<IndicatorCatalog[]> {
    let query: any = this.db.client.selectFrom('indicator_catalog');

    // 1. Visibility & Inheritance Logic
    if (filters.userRole !== 'ADMIN') {
      const {
        userId,
        userOrganizationId,
        userSportId,
        ancestorOrgIds,
        scopes,
        scope,
      } = filters;
      const activeScopes = scopes || (scope ? scope.split(',') : []);

      query = query.where((eb: any) => {
        const conditions: any[] = [];

        const globalCond = eb.and([
          eb('organization_id', 'is', null),
          eb('sport_id', 'is', null),
        ]);
        const sportCond = userSportId
          ? eb.and([
              eb('organization_id', 'is', null),
              eb('sport_id', '=', userSportId),
            ])
          : null;

        // Federation scope now includes ancestors
        const fedOrgs = Array.from(
          new Set([
            ...(ancestorOrgIds || []),
            ...(userOrganizationId ? [userOrganizationId] : []),
          ]),
        );
        const federationCond =
          fedOrgs.length > 0 ? eb('organization_id', 'in', fedOrgs) : null;

        const personalCond = userId ? eb('created_by', '=', userId) : null;

        if (activeScopes.length === 0) {
          // Default: all accessible
          conditions.push(globalCond);
          if (sportCond) conditions.push(sportCond);
          if (federationCond) conditions.push(federationCond);
          if (personalCond) conditions.push(personalCond);
        } else {
          if (activeScopes.includes('global')) conditions.push(globalCond);
          if (activeScopes.includes('sport') && sportCond)
            conditions.push(sportCond);
          if (activeScopes.includes('federation') && federationCond)
            conditions.push(federationCond);
          if (activeScopes.includes('personal') && personalCond)
            conditions.push(personalCond);
        }

        return conditions.length > 0 ? eb.or(conditions) : eb.val(false);
      });
    }

    // 2. Additional Filters
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
        .where('icg.group_catalog_id' as any, '=', filters.groupId as any);
    }

    if (filters.search) {
      query = query.where(
        'indicator_catalog.name_ru' as any,
        'ilike' as any,
        `%${filters.search}%`,
      );
    }

    return query
      .leftJoin('genders', 'genders.id', 'indicator_catalog.gender_id')
      .leftJoin('age_groups', 'age_groups.id', 'indicator_catalog.age_group_id')
      .leftJoin(
        'disciplines',
        'disciplines.id',
        'indicator_catalog.discipline_id',
      )
      .leftJoin('sports', 'sports.id', 'indicator_catalog.sport_id')
      .leftJoin(
        'measurement_units',
        'measurement_units.id',
        'indicator_catalog.measurement_unit_id',
      )
      .selectAll('indicator_catalog' as any)
      .select([
        'genders.name_ru as gender_name',
        'age_groups.name_ru as age_group_name',
        'disciplines.name_ru as discipline_name',
        'sports.name_ru as sport_name',
        'measurement_units.name_ru as unit_name',
      ] as any)
      .where('indicator_catalog.is_active' as any, '=', true)
      .orderBy('indicator_catalog.name_ru', 'asc')
      .execute() as unknown as any[];
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

  async create(data: any): Promise<IndicatorCatalog> {
    return this.db.client
      .insertInto('indicator_catalog' as any)
      .values({
        ...data,
        is_active: true,
      } as any)
      .returningAll()
      .executeTakeFirstOrThrow() as unknown as IndicatorCatalog;
  }

  async update(id: number, data: any): Promise<IndicatorCatalog> {
    return this.db.client
      .updateTable('indicator_catalog' as any)
      .set(data)
      .where('id' as any, '=', id as any)
      .returningAll()
      .executeTakeFirstOrThrow() as unknown as IndicatorCatalog;
  }

  async delete(id: number): Promise<void> {
    await this.db.client
      .updateTable('indicator_catalog' as any)
      .set({ is_active: false })
      .where('id' as any, '=', id as any)
      .execute();
  }

  async getTemplates(): Promise<any[]> {
    return this.db.client
      .selectFrom('indicator_generation_templates' as any)
      .selectAll()
      .where('is_active', '=', true)
      .execute();
  }

  async generate(dto: GenerateIndicatorsDto): Promise<any[]> {
    const { templateIds, sportId, category, overwrite } = dto;
    let templates: any[] = [];

    // 1. Fetch templates
    let templatesQuery = this.db.client
      .selectFrom('indicator_generation_templates' as any)
      .selectAll();

    if (templateIds && templateIds.length > 0) {
      templatesQuery = templatesQuery.where(
        'id' as any,
        'in',
        templateIds as any,
      );
    } else {
      if (sportId) {
        templatesQuery = templatesQuery.where(
          'sport_id' as any,
          '=',
          sportId as any,
        );
      }
      if (category) {
        // Need to join categories if category name/code is provided, or assume it's ID
        // For now, assume it's category_id if numeric
        if (!isNaN(Number(category))) {
          templatesQuery = templatesQuery.where(
            'category_id' as any,
            '=',
            Number(category) as any,
          );
        }
      }
    }

    templates = await templatesQuery.where('is_active', '=', true).execute();

    this.logger.log(`Found ${templates.length} templates for generation`);

    const results: any[] = [];
    for (const template of templates) {
      try {
        const result =
          await sql`SELECT * FROM generate_indicators_from_template_v5(${template.id}, ${overwrite || false})`.execute(
            this.db.client,
          );
        results.push(...(result.rows as any[]));
      } catch (err: any) {
        this.logger.error(
          `Failed to generate from template ${template.id}: ${err.message}`,
        );
      }
    }

    return results;
  }

  async generateAll(): Promise<any> {
    const result = await sql`SELECT * FROM generate_all_indicators()`.execute(
      this.db.client,
    );
    return result.rows;
  }

  async getGroups(sportId?: number): Promise<any[]> {
    let query = this.db.client
      .selectFrom('indicator_groups_catalog' as any)
      .selectAll();

    if (sportId) {
      query = query.where('sport_id' as any, '=', sportId as any);
    }

    return query
      .where('is_active', '=', true)
      .orderBy('sort_order', 'asc')
      .execute();
  }
  async getGenders(): Promise<any[]> {
    return this.db.client
      .selectFrom('genders' as any)
      .selectAll()
      .orderBy('sort_order', 'asc')
      .execute();
  }

  async getAgeGroups(): Promise<any[]> {
    return this.db.client
      .selectFrom('age_groups' as any)
      .selectAll()
      .orderBy('sort_order', 'asc')
      .execute();
  }

  async createGroup(data: any): Promise<any> {
    return this.db.client
      .insertInto('indicator_groups_catalog' as any)
      .values({
        ...data,
        is_active: true,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async updateGroup(id: number, data: any): Promise<any> {
    return this.db.client
      .updateTable('indicator_groups_catalog' as any)
      .set({
        ...data,
        updated_at: new Date(),
      })
      .where('id' as any, '=', id as any)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async deleteGroup(id: number): Promise<void> {
    await this.db.client
      .updateTable('indicator_groups_catalog' as any)
      .set({ is_active: false })
      .where('id' as any, '=', id as any)
      .execute();
  }
}
