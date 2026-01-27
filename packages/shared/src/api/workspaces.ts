import { apiClient } from './client';
import type { Workspace } from '../stores';

export interface CreateWorkspaceDto {
    name: string;
    description?: string;
    season_id?: string;
}

export interface UpdateWorkspaceDto {
    name?: string;
    description?: string;
}

export const workspacesApi = {
    getAll: async (): Promise<Workspace[]> => {
        const response = await apiClient.get<Workspace[]>('/workspaces');
        return response.data;
    },

    getById: async (id: string): Promise<Workspace> => {
        const response = await apiClient.get<Workspace>(`/workspaces/${id}`);
        return response.data;
    },

    create: async (data: CreateWorkspaceDto): Promise<Workspace> => {
        const response = await apiClient.post<Workspace>('/workspaces', data);
        return response.data;
    },

    update: async (id: string, data: UpdateWorkspaceDto): Promise<Workspace> => {
        const response = await apiClient.patch<Workspace>(`/workspaces/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/workspaces/${id}`);
    },
};
