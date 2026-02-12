import { apiClient as adminApiClient } from './client';

export interface CreateOrganizationDto {
  name_ru: string;
  abbreviation_ru?: string | null;
  internal_code?: string | null;
  type_id: number;
  parent_id?: number | null;
  sport_id?: number | null;
  region_id?: number | null;
  country_id?: number | null;
  level_id: number;
  founded_year?: number | null;
  is_active?: boolean;
  metadata?: Record<string, unknown> | null;
}

export interface UpdateOrganizationDto extends Partial<CreateOrganizationDto> {}

export interface MoveOrganizationDto {
  parent_id: number | null;
}

export interface OrganizationsFilters {
  typeId?: number;
  sportId?: number;
  regionId?: number;
  parentId?: number;
  countryId?: number;
}

export interface OrganizationType {
  id: number;
  name_ru: string;
  code: string;
}

export interface OrganizationLevel {
  id: number;
  name_ru: string;
  code: string;
}

export const adminOrganizationsApi = {
  getAll: (filters?: OrganizationsFilters) => {
    return adminApiClient.get('organizations', { params: filters });
  },

  getTypes: () => {
    return adminApiClient.get('reference/organizations/types');
  },

  getLevels: () => {
    return adminApiClient.get('reference/organizations/levels');
  },

  getTree: (id: number) => {
    return adminApiClient.get(`organizations/${id}/tree`);
  },

  create: (data: Partial<CreateOrganizationDto>) => {
    return adminApiClient.post('organizations', data);
  },

  update: (id: number, data: Partial<UpdateOrganizationDto>) => {
    return adminApiClient.patch(`organizations/${id}`, data);
  },

  delete: (id: number) => {
    return adminApiClient.delete(`organizations/${id}`);
  },

  move: (id: number, newParentId: number | null) => {
    return adminApiClient.put(`organizations/${id}/move`, {
      parent_id: newParentId,
    });
  },
};
