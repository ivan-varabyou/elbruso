import { IndicatorCatalog } from "@database";
import { IndicatorResponseDto } from "../dto/responses/indicator.response.dto";

export function toIndicatorDto(entity: any): IndicatorResponseDto {
  return {
    id: entity.id,
    name_ru: entity.name_ru,
    code: entity.code,
    description: entity.description ?? null,
    source_hint: entity.source_hint ?? null,
    calculation_formula: entity.calculation_formula ?? null,
    value_type: entity.value_type,
    default_weight: entity.default_weight ?? null,
    category_id: entity.category_id ?? null,
    sport_id: entity.sport_id ?? null,
    gender_id: entity.gender_id ?? null,
    age_group_id: entity.age_group_id ?? null,
    discipline_id: entity.discipline_id ?? null,
    measurement_unit_id: entity.measurement_unit_id ?? null,
    organization_id: entity.organization_id ?? null,
    created_by: entity.created_by ?? null,
    is_system: entity.is_system ?? null,
    use_population: entity.use_population ?? false,
    is_active: entity.is_active ?? false,
    metadata: entity.metadata ?? null,
    created_at: entity.created_at ? new Date(entity.created_at) : new Date(),
    updated_at: entity.updated_at ? new Date(entity.updated_at) : new Date(),
    gender_name: entity.gender_name ?? null,
    age_group_name: entity.age_group_name ?? null,
    discipline_name: entity.discipline_name ?? null,
    sport_name: entity.sport_name ?? null,
    unit_name: entity.unit_name ?? null,
  };
}

export function toIndicatorListDto(entities: any[]): IndicatorResponseDto[] {
  return entities.map(toIndicatorDto);
}
