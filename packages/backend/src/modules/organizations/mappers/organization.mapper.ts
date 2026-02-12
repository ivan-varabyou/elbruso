import { Organizations } from "@database";
import { Selectable } from "kysely";

import { OrganizationResponseDto } from "../dto/responses/organization.response.dto";

// Selectable extracts the SELECT result type from Kysely table definition
type OrganizationRow = Selectable<Organizations>;

export function toOrganizationDto(entity: OrganizationRow): OrganizationResponseDto {
  return {
    id: entity.id,
    name_ru: entity.name_ru,
    abbreviation_ru: entity.abbreviation_ru,
    internal_code: entity.internal_code,
    type_id: entity.type_id,
    parent_id: entity.parent_id,
    sport_id: entity.sport_id,
    region_id: entity.region_id,
    country_id: entity.country_id,
    level_id: entity.level_id,
    founded_year: entity.founded_year,
    is_active: entity.is_active ?? false,
    metadata: (entity.metadata as Record<string, unknown>) ?? null,
    created_at:
      entity.created_at instanceof Date ? entity.created_at : new Date(entity.created_at!),
    updated_at:
      entity.updated_at instanceof Date ? entity.updated_at : new Date(entity.updated_at!),
  };
}

export function toOrganizationListDto(entities: OrganizationRow[]): OrganizationResponseDto[] {
  return entities.map(toOrganizationDto);
}
