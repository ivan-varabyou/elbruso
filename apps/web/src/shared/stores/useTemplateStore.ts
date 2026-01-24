import { create } from 'zustand';
import { templatesApi } from '../api/templates';
import { ErrorHandler } from '../lib/errors/errorHandler';
import type { Template, AppError } from '../types';

interface TemplateStore {
  templates: Template[];
  isLoading: boolean;
  error: AppError | null;

  fetchTemplates: (filters?: { sport_id?: string; organization_id?: string }) => Promise<void>;
  applyTemplate: (templateId: string, workspaceId: string) => Promise<void>;
  clearError: () => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],
  isLoading: false,
  error: null,

  fetchTemplates: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const templates = await templatesApi.getAll(filters);
      set({ templates, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  applyTemplate: async (templateId, workspaceId) => {
    set({ isLoading: true, error: null });
    try {
      await templatesApi.apply(templateId, workspaceId);
      set({ isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  clearError: () => set({ error: null }),
}));
