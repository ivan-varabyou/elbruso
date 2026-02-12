import { IndicatorGroupsCatalog } from "@database";
import { IndicatorGroupResponseDto } from "../dto/responses/indicator-group.response.dto";

export function toIndicatorGroupDto(entity: any): IndicatorGroupResponseDto {
  return {
    id: entity.id,
    name_ru: entity.name_ru,
    code: entity.code,
    description: entity.description ?? null,
    sport_id: entity.sport_id ?? null,
    sort_order: entity.sort_order ?? null,
    is_active: entity.is_active ?? false,
    created_at: entity.created_at ? new Date(entity.created_at) : new Date(),
    updated_at: entity.updated_at ? new Date(entity.updated_at) : new Date(),
  };
}

export function toIndicatorGroupListDto(entities: any[]): IndicatorGroupResponseDto[] {
  return entities.map(toIndicatorGroupDto);
}
