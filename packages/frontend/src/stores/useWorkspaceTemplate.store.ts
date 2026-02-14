import { create } from "zustand";
import { WorkspaceTemplates, type WorkspaceTemplate, type CreateWorkspaceTemplateDto } from "@frontend/api/workspace-template.api";

const templateApi = new WorkspaceTemplates();

export interface WorkspaceTemplateStore {
  templates: WorkspaceTemplate[];
  isLoading: boolean;
  error: string | null;

  fetchTemplates: (filters?: { organization_id?: number; sport_id?: number; country_id?: number }) => Promise<void>;
  fetchAdminTemplates: (filters?: { organization_id?: number; sport_id?: number; country_id?: number }) => Promise<void>;
  createTemplate: (data: CreateWorkspaceTemplateDto) => Promise<void>;
  updateTemplate: (id: string, data: Partial<CreateWorkspaceTemplateDto>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
}

export const useWorkspaceTemplateStore = create<WorkspaceTemplateStore>((set) => ({
  templates: [],
  isLoading: false,
  error: null,

  fetchTemplates: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await templateApi.findAll(filters);
      const data = (response.data as any).data || response.data;
      set({ templates: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchAdminTemplates: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await templateApi.adminFindAll(filters);
      const data = (response.data as any).data || response.data;
      set({ templates: data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createTemplate: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await templateApi.adminCreate(data);
      const newTemplate = (response.data as any).data || response.data;
      set((state) => ({ templates: [newTemplate, ...state.templates], isLoading: false }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateTemplate: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const { data: updated } = await templateApi.adminUpdate(id, data);
      set((state) => ({
        templates: state.templates.map((t) => t.id === id ? updated : t),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteTemplate: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await templateApi.adminDelete(id);
      set((state) => ({
        templates: state.templates.filter((t) => t.id !== id),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
