import { create } from "zustand";

import {
  adminOrganizationsApi,
  OrganizationLevel,
  OrganizationType,
  ReferenceItem,
  Region,
  Sport,
} from "../api/admin/admin-organizations.api";

export interface Organization {
  id: number;
  name_ru: string;
  abbreviation_ru: string | null;
  internal_code: string | null;
  type_id: number;
  parent_id: number | null;
  sport_id: number | null;
  region_id: number | null;
  country_id: number | null;
  level_id: number;
  founded_year: number | null;
  is_active: boolean;
  metadata: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
}

export interface OrganizationTreeNode extends Organization {
  children: OrganizationTreeNode[];
}

interface OrganizationsFilters {
  typeId?: number;
  sportId?: number;
  regionId?: number;
  parentId?: number;
  countryId?: number;
  search?: string;
  showInactive?: boolean;
}

interface OrganizationsState {
  organizations: Organization[];
  tree: OrganizationTreeNode | null;
  selectedOrganization: Organization | null;
  types: OrganizationType[];
  levels: OrganizationLevel[];
  countries: ReferenceItem[];
  regions: Region[];
  sports: Sport[];
  viewMode: "tree" | "list";
  filters: OrganizationsFilters;
  loading: boolean;
  error: string | null;

  // Actions
  setViewMode: (mode: "tree" | "list") => void;
  setFilters: (filters: Partial<OrganizationsFilters>) => void;
  clearFilters: () => void;
  setSelectedOrganization: (org: Organization | null) => void;

  // CRUD operations
  fetchOrganizations: () => Promise<void>;
  fetchTypes: () => Promise<void>;
  fetchLevels: () => Promise<void>;
  fetchCountries: () => Promise<void>;
  fetchRegions: () => Promise<void>;
  fetchSports: () => Promise<void>;
  fetchTree: (rootId?: number) => Promise<void>;
  createOrganization: (data: Partial<Organization>) => Promise<void>;
  updateOrganization: (id: number, data: Partial<Organization>) => Promise<void>;
  deleteOrganization: (id: number) => Promise<void>;
  moveOrganization: (id: number, newParentId: number | null) => Promise<void>;
}

export const useOrganizationsStore = create<OrganizationsState>((set, get) => ({
  organizations: [],
  tree: null,
  selectedOrganization: null,
  types: [],
  levels: [],
  countries: [],
  regions: [],
  sports: [],
  viewMode: "tree",
  filters: {},
  loading: false,
  error: null,

  setViewMode: (mode) => set({ viewMode: mode }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  clearFilters: () => set({ filters: {} }),

  setSelectedOrganization: (org) => set({ selectedOrganization: org }),

  fetchOrganizations: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const response = await adminOrganizationsApi.getAll(filters);

      // Axios response.data is the body, then .data is the wrapper, then .data is the array
      let organizations = response.data.data.data;

      // Apply client-side search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        organizations = organizations.filter((org: Organization) =>
          org.name_ru.toLowerCase().includes(searchLower),
        );
      }

      // Filter by active status
      if (!filters.showInactive) {
        organizations = organizations.filter((org: Organization) => org.is_active);
      }

      set({ organizations, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch organizations",
        loading: false,
      });
    }
  },

  fetchTypes: async () => {
    try {
      const response = await adminOrganizationsApi.getTypes();
      set({ types: response.data.data });
    } catch (error) {
      console.error("Failed to fetch types:", error);
    }
  },

  fetchLevels: async () => {
    try {
      const response = await adminOrganizationsApi.getLevels();
      set({ levels: response.data.data });
    } catch (error) {
      console.error("Failed to fetch levels:", error);
    }
  },

  fetchCountries: async () => {
    try {
      const response = await adminOrganizationsApi.getCountries();
      set({ countries: response.data.data || response.data });
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    }
  },

  fetchRegions: async () => {
    try {
      const response = await adminOrganizationsApi.getRegions();
      set({ regions: response.data.data || response.data });
    } catch (error) {
      console.error("Failed to fetch regions:", error);
    }
  },

  fetchSports: async () => {
    try {
      const response = await adminOrganizationsApi.getSports();
      set({ sports: response.data.data || response.data });
    } catch (error) {
      console.error("Failed to fetch sports:", error);
    }
  },

  fetchTree: async (rootId) => {
    set({ loading: true, error: null });
    try {
      if (rootId) {
        const response = await adminOrganizationsApi.getTree(rootId);
        set({ tree: response.data.data, loading: false });
      } else {
        // Build tree from all organizations
        const { filters } = get();
        const response = await adminOrganizationsApi.getAll(filters);
        let organizations = response.data.data.data;

        // Filter by active status
        if (!filters.showInactive) {
          organizations = organizations.filter((org: Organization) => org.is_active);
        }

        const buildTree = (parentId: number | null): OrganizationTreeNode[] => {
          return (organizations as Organization[])
            .filter((org: Organization) => org.parent_id === parentId)
            .map((org: Organization) => ({
              ...org,
              children: buildTree(org.id),
            }));
        };

        const rootNodes = buildTree(null);
        set({
          tree: rootNodes.length > 0 ? rootNodes[0] : null,
          organizations,
          loading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch tree",
        loading: false,
      });
    }
  },

  createOrganization: async (data) => {
    set({ loading: true, error: null });
    try {
      await adminOrganizationsApi.create(data);
      await get().fetchOrganizations();
      if (get().viewMode === "tree") {
        await get().fetchTree();
      }
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create organization",
        loading: false,
      });
      throw error;
    }
  },

  updateOrganization: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await adminOrganizationsApi.update(id, data);
      await get().fetchOrganizations();
      if (get().viewMode === "tree") {
        await get().fetchTree();
      }
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update organization",
        loading: false,
      });
      throw error;
    }
  },

  deleteOrganization: async (id) => {
    set({ loading: true, error: null });
    try {
      await adminOrganizationsApi.delete(id);
      await get().fetchOrganizations();
      if (get().viewMode === "tree") {
        await get().fetchTree();
      }
      set({ loading: false, selectedOrganization: null });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete organization",
        loading: false,
      });
      throw error;
    }
  },

  moveOrganization: async (id, newParentId) => {
    set({ loading: true, error: null });
    try {
      await adminOrganizationsApi.move(id, newParentId);
      await get().fetchOrganizations();
      if (get().viewMode === "tree") {
        await get().fetchTree();
      }
      set({ loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to move organization",
        loading: false,
      });
      throw error;
    }
  },
}));
