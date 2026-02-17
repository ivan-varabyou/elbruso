import { IndicatorCatalog } from "@database";
import { DatabaseService } from "@database/database.service";
import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { sql } from "kysely";

import { GenerateIndicatorsDto } from "../dto/generate-indicators.dto";
import { IndicatorFiltersDto } from "../dto/indicator-filters.dto";

@Injectable()
export class IndicatorsService implements OnModuleInit {
  private readonly logger = new Logger(IndicatorsService.name);

  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    try {
      this.logger.log("Updating indicator_catalog schema for access control...");

      await sql`
        ALTER TABLE indicator_catalog 
        ADD COLUMN IF NOT EXISTS organization_id INTEGER REFERENCES organizations(id) ON DELETE SET NULL;
      `.execute(this.db.client);

      await sql`
        ALTER TABLE indicator_catalog 
        ADD COLUMN IF NOT EXISTS created_by UUID;
      `.execute(this.db.client);

      try {
        await sql`
          ALTER TABLE indicator_catalog
          ADD CONSTRAINT fk_indicator_created_by
          FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
        `.execute(this.db.client);
      } catch (_) {}

      await sql`
        ALTER TABLE indicator_catalog 
        ADD COLUMN IF NOT EXISTS is_system BOOLEAN DEFAULT TRUE;
      `.execute(this.db.client);

      this.logger.log("Indicator schema updated");
    } catch (error) {
      this.logger.error("Failed to update indicator schema:", error);
    }
  }

  async findAll(filters: IndicatorFiltersDto): Promise<IndicatorCatalog[]> {
    let query = this.db.client.selectFrom("indicator_catalog");

    const adminRoles = ["ADMIN", "SUPER_ADMIN", "MODERATOR"];
    if (!filters.userRole || !adminRoles.includes(filters.userRole)) {
      const { userId, userOrganizationId, userSportId, ancestorOrgIds, scopes, scope } = filters;
      const activeScopes = scopes || (scope ? scope.split(",") : []);

      query = query.where((eb) => {
        const conditions: ReturnType<typeof eb.and>[] = [];

        const globalCond = eb.and([eb("organization_id", "is", null), eb("sport_id", "is", null)]);
        const sportCond = userSportId
          ? eb.and([eb("organization_id", "is", null), eb("sport_id", "=", userSportId)])
          : null;

        const fedOrgs = Array.from(
          new Set([...(ancestorOrgIds || []), ...(userOrganizationId ? [userOrganizationId] : [])]),
        );
        const federationCond = fedOrgs.length > 0 ? eb("organization_id", "in", fedOrgs) : null;

        const personalCond = userId ? eb("created_by", "=", userId) : null;

        if (activeScopes.length === 0) {
          conditions.push(globalCond);
          if (sportCond) conditions.push(sportCond);
          if (federationCond) conditions.push(federationCond);
          if (personalCond) conditions.push(personalCond);
        } else {
          if (activeScopes.includes("global")) conditions.push(globalCond);
          if (activeScopes.includes("sport") && sportCond) conditions.push(sportCond);
          if (activeScopes.includes("federation") && federationCond)
            conditions.push(federationCond);
          if (activeScopes.includes("personal") && personalCond) conditions.push(personalCond);
        }

        return conditions.length > 0 ? eb.or(conditions) : eb.val(false);
      });
    }

    if (filters.sportId) {
      query = query.where("sport_id", "=", filters.sportId);
    }

    if (filters.groupId) {
      query = query
        .innerJoin("indicator_catalog_groups as icg", (eb) =>
          eb.on("indicator_catalog.id", "=", sql`icg.indicator_id`),
        )
        .where("icg.group_catalog_id", "=", filters.groupId);
    }

    if (filters.search) {
      query = query.where("indicator_catalog.name_ru", "ilike", `%${filters.search}%`);
    }

    return query
      .leftJoin("genders", "genders.id", "indicator_catalog.gender_id")
      .leftJoin("age_groups", "age_groups.id", "indicator_catalog.age_group_id")
      .leftJoin("disciplines", "disciplines.id", "indicator_catalog.discipline_id")
      .leftJoin("sports", "sports.id", "indicator_catalog.sport_id")
      .leftJoin(
        "measurement_units",
        "measurement_units.id",
        "indicator_catalog.measurement_unit_id",
      )
      .selectAll("indicator_catalog")
      .select([
        "genders.name_ru as gender_name",
        "age_groups.name_ru as age_group_name",
        "disciplines.name_ru as discipline_name",
        "sports.name_ru as sport_name",
        "measurement_units.name_ru as unit_name",
      ])
      .where("indicator_catalog.is_active", "=", true)
      .orderBy("indicator_catalog.name_ru", "asc")
      .execute() as unknown as IndicatorCatalog[];
  }

  async findById(id: number): Promise<IndicatorCatalog | undefined> {
    return this.db.client
      .selectFrom("indicator_catalog")
      .selectAll()
      .where("id", "=", id)
      .where("is_active", "=", true)
      .executeTakeFirst() as unknown as IndicatorCatalog | undefined;
  }

  async findBySport(sportId: number): Promise<IndicatorCatalog[]> {
    return this.db.client
      .selectFrom("indicator_catalog")
      .selectAll()
      .where("sport_id", "=", sportId)
      .where("is_active", "=", true)
      .execute() as unknown as IndicatorCatalog[];
  }

  async create(data: Record<string, unknown>): Promise<IndicatorCatalog> {
    return this.db.client
      .insertInto("indicator_catalog")
      .values({
        ...data,
        is_active: true,
      } as Record<string, unknown>)
      .returningAll()
      .executeTakeFirstOrThrow() as unknown as IndicatorCatalog;
  }

  async update(id: number, data: Record<string, unknown>): Promise<IndicatorCatalog> {
    return this.db.client
      .updateTable("indicator_catalog")
      .set(data)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow() as unknown as IndicatorCatalog;
  }

  async delete(id: number): Promise<void> {
    await this.db.client
      .updateTable("indicator_catalog")
      .set({ is_active: false })
      .where("id", "=", id)
      .execute();
  }

  async getTemplates(): Promise<unknown[]> {
    return this.db.client
      .selectFrom("indicator_generation_templates")
      .selectAll()
      .where("is_active", "=", true)
      .execute();
  }

  async getTemplateParams(templateId: number): Promise<unknown[]> {
    const params = await this.db.client
      .selectFrom("template_generation_params")
      .selectAll()
      .where("template_id", "=", templateId)
      .orderBy("sort_order", "asc")
      .execute();

    const resolvedParams = [];

    for (const param of params) {
      const { param_name, param_type, param_values } = param;
      let options: any[] = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const values = param_values as any;
      const ids = Array.isArray(values) ? values : [];

      if (ids.length > 0) {
        if (param_type === "event_id" || param_type === "event") {
          options = await this.db.client
            .selectFrom("events_catalog")
            .select(["id", "name_ru as label"])
            .where("id", "in", ids.map(Number))
            .execute();
        } else if (param_type === "license_category") {
          options = await this.db.client
            .selectFrom("referee_license_categories")
            .select(["id", "name_ru as label"])
            .where("id", "in", ids.map(Number))
            .execute();
        } else if (param_type === "gender") {
          options = await this.db.client
            .selectFrom("genders")
            .select(["id", "name_ru as label"])
            .where("id", "in", ids.map(Number))
            .execute();
        } else if (param_type === "age_group") {
          options = await this.db.client
            .selectFrom("age_groups")
            .select(["id", "name_ru as label"])
            .where("id", "in", ids.map(Number))
            .execute();
        } else if (param_type === "discipline") {
          options = await this.db.client
            .selectFrom("disciplines")
            .select(["id", "name_ru as label"])
            .where("id", "in", ids.map(Number))
            .execute();
        } else if (param_type === "place") {
          options = ids.map((id: string) => ({ id, label: `${id} место` }));
        }
      }

      resolvedParams.push({
        name: param_name,
        type: param_type,
        options,
      });
    }

    return resolvedParams;
  }

  async generate(dto: GenerateIndicatorsDto): Promise<unknown[]> {
    const { templateIds, sportId, category, overwrite, filters } = dto;
    let templates: { id: number }[] = [];

    let templatesQuery = this.db.client.selectFrom("indicator_generation_templates").select(["id"]);

    if (templateIds && templateIds.length > 0) {
      templatesQuery = templatesQuery.where("id", "in", templateIds);
    } else {
      if (sportId) {
        templatesQuery = templatesQuery.where("sport_id", "=", sportId);
      }
      if (category) {
        if (!isNaN(Number(category))) {
          templatesQuery = templatesQuery.where("category_id", "=", Number(category));
        }
      }
    }

    templates = await templatesQuery.where("is_active", "=", true).execute();

    this.logger.log(`Found ${templates.length} templates for generation`);

    const results: unknown[] = [];
    for (const template of templates) {
      try {
        const result =
          await sql`SELECT * FROM generate_indicators_from_template_v7(${template.id}, ${JSON.stringify(filters || {})}, ${overwrite || false})`.execute(
            this.db.client,
          );
        results.push(...result.rows);
      } catch (err: unknown) {
        const error = err as { message?: string };
        this.logger.error(`Failed to generate from template ${template.id}: ${error.message}`);
      }
    }

    return results;
  }

  async generateAll(): Promise<unknown> {
    const result = await sql`SELECT * FROM generate_all_indicators()`.execute(this.db.client);
    return result.rows;
  }

  async getGroups(sportId?: number): Promise<unknown[]> {
    let query = this.db.client.selectFrom("indicator_groups_catalog").selectAll();

    if (sportId) {
      query = query.where("sport_id", "=", sportId);
    }

    return query
      .where("is_active", "=", true)
      .orderBy(sql`sort_order`, "asc")
      .execute();
  }
  async getGenders(): Promise<unknown[]> {
    return this.db.client
      .selectFrom("genders")
      .selectAll()
      .orderBy(sql`sort_order`, "asc")
      .execute();
  }

  async getAgeGroups(): Promise<unknown[]> {
    return this.db.client
      .selectFrom("age_groups")
      .selectAll()
      .orderBy(sql`sort_order`, "asc")
      .execute();
  }

  async createGroup(data: Record<string, unknown>): Promise<unknown> {
    return this.db.client
      .insertInto("indicator_groups_catalog")
      .values({
        ...data,
        is_active: true,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async updateGroup(id: number, data: Record<string, unknown>): Promise<unknown> {
    return this.db.client
      .updateTable("indicator_groups_catalog")
      .set({
        ...data,
        updated_at: new Date(),
      })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async deleteGroup(id: number): Promise<void> {
    await this.db.client
      .updateTable("indicator_groups_catalog")
      .set({ is_active: false })
      .where("id", "=", id)
      .execute();
  }
}
