import { create } from "zustand";
import type { AxiosResponse } from "axios";
import { Workspaces, type CreateWorkspaceDto, type UpdateWorkspaceDto } from "@/shared";

const workspacesApi = new Workspaces();

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
      const { data: workspaces } =
        (await workspacesApi.workspacesControllerFindAll()) as unknown as { data: Workspace[] };
      set({ workspaces, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  selectWorkspace: (id) => set({ selectedWorkspaceId: id }),

  createWorkspace: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const { data: newWorkspace } = (await workspacesApi.workspacesControllerCreate(
        data,
      )) as unknown as AxiosResponse<Workspace>;
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
      const { data: updatedWorkspace } = (await workspacesApi.workspacesControllerUpdate(
        id,
        data,
      )) as unknown as AxiosResponse<Workspace>;
      set((state) => ({
        workspaces: state.workspaces.map((w) => (w.id === id ? updatedWorkspace : w)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deleteWorkspace: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await workspacesApi.workspacesControllerDelete(id);
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
