import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ErrorHandler } from '../lib/errors/errorHandler';
import type { Template } from '../types';

export const templatesApi = {
  getAll: async (filters?: { sport_id?: string; organization_id?: string }): Promise<Template[]> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.TEMPLATES, { params: filters });
      return response.data;
    });
  },

  getById: async (id: string): Promise<Template> => {
    return ErrorHandler.retry(async () => {
      const response = await apiClient.get(API_ENDPOINTS.TEMPLATE(id));
      return response.data;
    });
  },

  apply: async (templateId: string, workspaceId: string): Promise<void> => {
    return ErrorHandler.retry(async () => {
      await apiClient.post(API_ENDPOINTS.TEMPLATE_APPLY(templateId), { workspaceId });
    });
  },
};
