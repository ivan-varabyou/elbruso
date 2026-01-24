import { create } from 'zustand';
import { referencesApi } from '../api';
import { ErrorHandler } from '../lib/errors/errorHandler';
import type { 
  Region,
  Sport,
  Indicator,
  IndicatorGroup,
  ReferenceData,
  ReferenceFilter,
  AppError,
  Season,
  Organization,
} from '../types';

interface ReferenceStore {
  // State
  regions: Region[];
  sports: Sport[];
  indicators: Indicator[];
  indicatorGroups: IndicatorGroup[];
  seasons: Season[];
  organizations: Organization[];
  customReferences: ReferenceData[];
  isLoading: boolean;
  error: AppError | null;

  // Actions
  fetchRegions: (filters?: ReferenceFilter) => Promise<void>;
  fetchSports: (filters?: ReferenceFilter) => Promise<void>;
  fetchIndicators: (filters?: ReferenceFilter) => Promise<void>;
  fetchIndicatorGroups: (filters?: ReferenceFilter) => Promise<void>;
  fetchSeasons: () => Promise<void>;
  createSeason: (data: Partial<Season>) => Promise<void>;
  updateSeason: (id: string, data: Partial<Season>) => Promise<void>;
  deleteSeason: (id: string) => Promise<void>;
  generateSeasons: (data: { startYear: number; endYear: number; sportId?: string | null }) => Promise<void>;
  fetchOrganizations: (filters?: ReferenceFilter) => Promise<void>;


  fetchCustomReferences: (scope: string, entityId?: string) => Promise<void>;
  
  // Utility
  clearError: () => void;
  reset: () => void;
}

export const useReferenceStore = create<ReferenceStore>((set, get) => ({
  regions: [],
  sports: [],
  indicators: [],
  indicatorGroups: [],
  seasons: [],
  organizations: [],
  customReferences: [],
  isLoading: false,
  error: null,

  fetchRegions: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const regions = await referencesApi.getRegions(filters);
      set({ regions, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchSports: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const sports = await referencesApi.getSports(filters);
      set({ sports, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchIndicators: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const indicators = await referencesApi.getIndicators(filters);
      set({ indicators, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchIndicatorGroups: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const indicatorGroups = await referencesApi.getIndicatorGroups(filters);
      set({ indicatorGroups, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchSeasons: async () => {
    set({ isLoading: true, error: null });
    try {
      const seasons = await referencesApi.getSeasons();
      set({ seasons, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  createSeason: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await referencesApi.createSeason(data);
      const seasons = await referencesApi.getSeasons();
      set({ seasons, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  updateSeason: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await referencesApi.updateSeason(id, data);
      const seasons = await referencesApi.getSeasons();
      set({ seasons, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  deleteSeason: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await referencesApi.deleteSeason(id);
      const seasons = await referencesApi.getSeasons();
      set({ seasons, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  generateSeasons: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await referencesApi.generateSeasons(data);
      const seasons = await referencesApi.getSeasons();
      set({ seasons, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },



  fetchOrganizations: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const organizations = await referencesApi.getOrganizations(filters);
      set({ organizations, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchCustomReferences: async (scope, entityId) => {
    set({ isLoading: true, error: null });
    try {
      const customReferences = await referencesApi.getReferencesByScope(scope, entityId);
      set({ customReferences, isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
  reset: () => set({ 
    regions: [], 
    sports: [], 
    indicators: [], 
    indicatorGroups: [],
    seasons: [],
    organizations: [],
    customReferences: [],
    error: null 
  }),
}));

