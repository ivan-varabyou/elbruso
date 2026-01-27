import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ErrorHandler } from '../lib/errors/errorHandler';
import type { 
  Region,
  Sport,
  Indicator,
  IndicatorGroup,
  ReferenceData,
  ReferenceFilter,
  CreateReferenceDto,
  UpdateReferenceDto,
  Season,
  Organization,
} from '../types';

export const referencesApi = {
  // Read operations
  getRegions: async (filters?: ReferenceFilter): Promise<Region[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.REFERENCE_REGIONS, { params: filters });
      return response.data;
    });
  },

  getSports: async (filters?: ReferenceFilter): Promise<Sport[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.REFERENCE_SPORTS, { params: filters });
      return response.data;
    });
  },

  getIndicators: async (filters?: ReferenceFilter): Promise<Indicator[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.REFERENCE_INDICATORS, { params: filters });
      return response.data;
    });
  },

  getIndicatorGroups: async (filters?: ReferenceFilter): Promise<IndicatorGroup[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.REFERENCE_INDICATORS}/groups`, { params: filters });
      return response.data;
    });
  },

  getGenders: async (): Promise<any[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.REFERENCE_INDICATORS}/genders`);
      return response.data;
    });
  },

  getAgeGroups: async (): Promise<any[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.REFERENCE_INDICATORS}/age-groups`);
      return response.data;
    });
  },

  createIndicatorGroup: async (data: Partial<IndicatorGroup>): Promise<IndicatorGroup> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.post(`${API_ENDPOINTS.REFERENCE_INDICATORS}/groups`, data);
      return response.data;
    });
  },

  updateIndicatorGroup: async (id: string | number, data: Partial<IndicatorGroup>): Promise<IndicatorGroup> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.patch(`${API_ENDPOINTS.REFERENCE_INDICATORS}/groups/${id}`, data);
      return response.data;
    });
  },

  deleteIndicatorGroup: async (id: string | number): Promise<void> => {
    return ErrorHandler.retry(async () => {
      await apiClient.delete(`${API_ENDPOINTS.REFERENCE_INDICATORS}/groups/${id}`);
    });
  },

  createIndicator: async (data: Partial<Indicator>): Promise<Indicator> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.post(API_ENDPOINTS.REFERENCE_INDICATORS, data);
      return response.data;
    });
  },

  updateIndicator: async (id: string | number, data: Partial<Indicator>): Promise<Indicator> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.patch(`${API_ENDPOINTS.REFERENCE_INDICATORS}/${id}`, data);
      return response.data;
    });
  },

  deleteIndicator: async (id: string | number): Promise<void> => {
    return ErrorHandler.retry(async () => {
      await apiClient.delete(`${API_ENDPOINTS.REFERENCE_INDICATORS}/${id}`);
    });
  },

  getIndicatorTemplates: async (): Promise<any[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(`${API_ENDPOINTS.REFERENCE_INDICATORS}/generation/templates`);
      return response.data;
    });
  },

  generateIndicators: async (dto: { 
    templateIds?: number[]; 
    sportId?: number; 
    category?: string; 
    overwrite?: boolean;
  }): Promise<any> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.post(`${API_ENDPOINTS.REFERENCE_INDICATORS}/generation/generate`, dto);
      return response.data;
    });
  },

  generateAllIndicators: async (): Promise<any> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.post(`${API_ENDPOINTS.REFERENCE_INDICATORS}/generation/generate-all`);
      return response.data;
    });
  },



  getSeasons: async (): Promise<Season[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.REFERENCE_SEASONS);
      return response.data;
    });
  },

  createSeason: async (data: Partial<Season>): Promise<Season> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.post(API_ENDPOINTS.REFERENCE_SEASONS, data);
      return response.data;
    });
  },

  updateSeason: async (id: string, data: Partial<Season>): Promise<Season> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.patch(`${API_ENDPOINTS.REFERENCE_SEASONS}/${id}`, data);
      return response.data;
    });
  },

  deleteSeason: async (id: string): Promise<void> => {
    return ErrorHandler.retry(async () => {
      await apiClient.delete(`${API_ENDPOINTS.REFERENCE_SEASONS}/${id}`);
    });
  },

  generateSeasons: async (data: { startYear: number; endYear: number; sportId?: string | null }): Promise<void> => {
    return ErrorHandler.retry(async () => {
      await apiClient.post(`${API_ENDPOINTS.REFERENCE_SEASONS}/generate`, data);
    });
  },

  getOrganizations: async (filters?: ReferenceFilter): Promise<Organization[]> => {


    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.REFERENCE_ORGANIZATIONS, { params: filters });
      return response.data;
    });
  },


  // Custom reference CRUD
  createCustomReference: async (dto: CreateReferenceDto): Promise<ReferenceData> => {
    const response = await apiClient.post(API_ENDPOINTS.REFERENCE_CUSTOM, dto);
    return response.data;
  },

  updateReference: async (id: string, dto: UpdateReferenceDto): Promise<ReferenceData> => {
    const response = await apiClient.patch(API_ENDPOINTS.REFERENCE_BY_ID(id), dto);
    return response.data;
  },

  deleteReference: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.REFERENCE_BY_ID(id));
  },

  // Get by scope
  getReferencesByScope: async (scope: string, entityId?: string): Promise<ReferenceData[]> => {
    const response = await apiClient.get(API_ENDPOINTS.REFERENCE_CUSTOM, {
      params: { scope, entityId },
    });
    return response.data;
  },
};
