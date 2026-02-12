import type { ReferenceScope,SystemEntityType } from "./enums";

export interface ReferenceData {
  id: string;
  type: SystemEntityType;
  scope: ReferenceScope;
  sport_id?: string;
  organization_id?: string;
  user_id?: string;
  data: unknown[];
}

export interface Country {
  id: number;
  name: string;
  code: string;
  flag: string;
  name_ru?: string;
  code_alpha2?: string;
}

export interface Region {
  id: string;
  code: string;
  name_ru: string;
  country_id: string;
  population?: number;
}

export interface Sport {
  id: string;
  name_ru: string;
  code: string;
}

export interface Indicator {
  id: string | number;
  code: string;
  name_ru: string;
  description?: string;
  default_weight?: number;
  weight?: number; // legacy/alias
  sport_id?: string | number;
  organization_id?: string | number;
  gender_id?: string | number;
  age_group_id?: string | number;
  discipline_id?: string | number;

  // Joined fields
  gender_name?: string;
  age_group_name?: string;
  discipline_name?: string;
  sport_name?: string;
  unit_name?: string;

  created_by?: string | number;
  is_system?: boolean;
  is_active?: boolean;
}

export interface IndicatorGroup {
  id: number;
  code: string;
  name_ru: string;
  description?: string;
  sport_id?: number;
  sort_order?: number;
  is_active?: boolean;
  parent_id?: number | string;
}

export interface Season {
  id: string | number;
  name_ru: string;
  start_date: string;
  end_date: string;
  sports?: { id: string | number; name_ru: string }[];
}

export interface Organization {
  id: string;
  name_ru: string;
  parent_id?: string;
  sport_id?: string;
}

export interface ReferenceFilter {
  sportId?: string | number;
  organizationId?: string;
  search?: string;
}

export interface Template {
  id: string;
  name: string;
  description?: string;
  sport_id?: string;
  organization_id?: string;
}
