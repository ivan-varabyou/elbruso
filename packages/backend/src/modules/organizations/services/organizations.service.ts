import { OrganizationLevels, Organizations, OrganizationTypes } from "@database";
import { DatabaseService } from "@database/database.service";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Selectable, sql } from "kysely";

import { CreateOrganizationDto } from "../dto/create-organization.dto";
import { OrganizationFiltersDto } from "../dto/organization-filters.dto";
import { UpdateOrganizationDto } from "../dto/update-organization.dto";

export interface OrganizationTreeNode extends Organizations {
  children: OrganizationTreeNode[];
}

@Injectable()
export class OrganizationsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(filters: OrganizationFiltersDto): Promise<Organizations[]> {
    let query = this.db.client.selectFrom("organizations");

    if (filters.typeId) {
      query = query.where("type_id", "=", filters.typeId);
    }
    if (filters.sportId) {
      query = query.where("sport_id", "=", filters.sportId);
    }
    if (filters.regionId) {
      query = query.where("region_id", "=", filters.regionId);
    }
    if (filters.parentId) {
      query = query.where("parent_id", "=", filters.parentId);
    }
    if (filters.countryId) {
      query = query.where("country_id", "=", filters.countryId);
    }

    return query.selectAll().where("is_active", "=", true).execute() as unknown as Organizations[];
  }

  async findById(id: number): Promise<Organizations | undefined> {
    return this.db.client
      .selectFrom("organizations")
      .selectAll()
      .where("id", "=", id)
      .where("is_active", "=", true)
      .executeTakeFirst() as unknown as Organizations | undefined;
  }

  async findFederations(filters: OrganizationFiltersDto): Promise<Organizations[]> {
    let query = this.db.client.selectFrom("organizations").where("type_id", "in", [2, 3]); // 2: National Federation, 3: Regional Federation

    if (filters.sportId) {
      query = query.where("sport_id", "=", filters.sportId);
    }
    if (filters.regionId) {
      query = query.where("region_id", "=", filters.regionId);
    }

    return query.selectAll().where("is_active", "=", true).execute() as unknown as Organizations[];
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

  async getTree(orgId: number): Promise<OrganizationTreeNode | null> {
    const flat = await this.getHierarchy(orgId);

    const buildTree = (parentId: number | null): OrganizationTreeNode[] => {
      return flat
        .filter((org) => (org.parent_id as unknown as number | null) === parentId)
        .map((org) => ({
          ...(org as Organizations),
          children: buildTree(org.id as unknown as number),
        }));
    };

    const root = flat.find((o) => (o.id as unknown as number) === orgId);
    if (!root) return null;

    return {
      ...(root as Organizations),
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

  // Admin methods

  async create(dto: CreateOrganizationDto): Promise<Organizations> {
    const result = await this.db.client
      .insertInto("organizations")
      .values({
        name_ru: dto.name_ru,
        abbreviation_ru: dto.abbreviation_ru ?? null,
        internal_code: dto.internal_code ?? null,
        type_id: dto.type_id,
        parent_id: dto.parent_id ?? null,
        sport_id: dto.sport_id ?? null,
        region_id: dto.region_id ?? null,
        country_id: dto.country_id ?? null,
        level_id: dto.level_id,
        founded_year: dto.founded_year ?? null,
        is_active: dto.is_active ?? true,
        metadata: dto.metadata ? JSON.stringify(dto.metadata) : null,
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Organizations;
  }

  async update(id: number, dto: UpdateOrganizationDto): Promise<Organizations> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    const updateData: Record<string, unknown> = {};

    if (dto.name_ru !== undefined) updateData.name_ru = dto.name_ru;
    if (dto.abbreviation_ru !== undefined) updateData.abbreviation_ru = dto.abbreviation_ru;
    if (dto.internal_code !== undefined) updateData.internal_code = dto.internal_code;
    if (dto.type_id !== undefined) updateData.type_id = dto.type_id;
    if (dto.parent_id !== undefined) updateData.parent_id = dto.parent_id;
    if (dto.sport_id !== undefined) updateData.sport_id = dto.sport_id;
    if (dto.region_id !== undefined) updateData.region_id = dto.region_id;
    if (dto.country_id !== undefined) updateData.country_id = dto.country_id;
    if (dto.level_id !== undefined) updateData.level_id = dto.level_id;
    if (dto.founded_year !== undefined) updateData.founded_year = dto.founded_year;
    if (dto.is_active !== undefined) updateData.is_active = dto.is_active;
    if (dto.metadata !== undefined)
      updateData.metadata = dto.metadata ? JSON.stringify(dto.metadata) : null;

    if (Object.keys(updateData).length === 0) {
      return existing;
    }

    const result = await this.db.client
      .updateTable("organizations")
      .set(updateData)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Organizations;
  }

  async delete(id: number): Promise<void> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    // Soft delete
    await this.db.client
      .updateTable("organizations")
      .set({ is_active: false })
      .where("id", "=", id)
      .execute();
  }

  async move(id: number, newParentId: number | null): Promise<Organizations> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    // Validate the move
    const isValid = await this.validateMove(id, newParentId);
    if (!isValid) {
      throw new BadRequestException(
        "Cannot move organization: this would create a circular dependency",
      );
    }

    const result = await this.db.client
      .updateTable("organizations")
      .set({ parent_id: newParentId })
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as unknown as Organizations;
  }

  async validateMove(id: number, newParentId: number | null): Promise<boolean> {
    if (newParentId === null) {
      return true; // Moving to root is always valid
    }

    if (id === newParentId) {
      return false; // Cannot be its own parent
    }

    // Check if newParentId is a descendant of id
    const descendants = await this.getHierarchy(id);
    const descendantIds = descendants.map((org) => (org as unknown as { id: number }).id);

    return !descendantIds.includes(newParentId);
  }

  async findAllIncludingInactive(filters: OrganizationFiltersDto): Promise<Organizations[]> {
    let query = this.db.client.selectFrom("organizations");

    if (filters.typeId) {
      query = query.where("type_id", "=", filters.typeId);
    }
    if (filters.sportId) {
      query = query.where("sport_id", "=", filters.sportId);
    }
    if (filters.regionId) {
      query = query.where("region_id", "=", filters.regionId);
    }
    if (filters.parentId) {
      query = query.where("parent_id", "=", filters.parentId);
    }
    if (filters.countryId) {
      query = query.where("country_id", "=", filters.countryId);
    }

    return query.selectAll().execute() as unknown as Organizations[];
  }

  async findAllTypes(): Promise<Selectable<OrganizationTypes>[]> {
    return this.db.client
      .selectFrom("organization_types")
      .selectAll()
      .orderBy("sort_order", "asc")
      .execute();
  }

  async findAllLevels(): Promise<Selectable<OrganizationLevels>[]> {
    return this.db.client
      .selectFrom("organization_levels")
      .selectAll()
      .orderBy("sort_order", "asc")
      .execute();
  }
}
