import { create } from 'zustand';
import { workspacesApi, type CreateWorkspaceDto, type UpdateWorkspaceDto } from '../api';

export interface Workspace {
    id: string;
    name: string;
    description?: string;
    season_id?: string;
    owner_id: string;
    created_at: string;
    updated_at: string;
}

interface WorkspaceStore {
    // State
    workspaces: Workspace[];
    selectedWorkspaceId: string | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchWorkspaces: () => Promise<void>;
    selectWorkspace: (id: string | null) => void;
    createWorkspace: (data: CreateWorkspaceDto) => Promise<void>;
    updateWorkspace: (id: string, data: UpdateWorkspaceDto) => Promise<void>;
    deleteWorkspace: (id: string) => Promise<void>;
}

export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
    // Initial state
    workspaces: [],
    selectedWorkspaceId: null,
    isLoading: false,
    error: null,

    // Actions
    fetchWorkspaces: async () => {
        set({ isLoading: true, error: null });
        try {
            const workspaces = await workspacesApi.getAll();
            set({ workspaces, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    selectWorkspace: (id) => set({ selectedWorkspaceId: id }),

    createWorkspace: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const newWorkspace = await workspacesApi.create(data);
            set((state) => ({
                workspaces: [...state.workspaces, newWorkspace],
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    updateWorkspace: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            const updatedWorkspace = await workspacesApi.update(id, data);
            set((state) => ({
                workspaces: state.workspaces.map((w) =>
                    w.id === id ? updatedWorkspace : w
                ),
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    deleteWorkspace: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await workspacesApi.delete(id);
            set((state) => ({
                workspaces: state.workspaces.filter((w) => w.id !== id),
                selectedWorkspaceId: state.selectedWorkspaceId === id ? null : state.selectedWorkspaceId,
                isLoading: false,
            }));
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },
}));
