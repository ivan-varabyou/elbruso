import { create } from "zustand";

import { Countries, Reference } from "../api";
import { ErrorHandler } from "../api/error";
import type {
  AppError,
  Indicator,
  IndicatorGroup,
  Organization,
  ReferenceData,
  ReferenceFilter,
  Region,
  Season,
  Sport,
  Country,
} from "../types";

const referencesApi = new Reference();
const countriesApi = new Countries();

interface ReferenceStore {
  regions: Region[];
  sports: Sport[];
  indicators: Indicator[];
  indicatorGroups: IndicatorGroup[];
  seasons: Season[];
  organizations: Organization[];
  countries: Country[];
  customReferences: ReferenceData[];
  isLoading: boolean;
  error: AppError | null;

  fetchRegions: (filters?: ReferenceFilter) => Promise<void>;
  fetchSports: (filters?: ReferenceFilter) => Promise<void>;
  fetchIndicators: (filters?: ReferenceFilter) => Promise<void>;
  fetchIndicatorGroups: (filters?: ReferenceFilter) => Promise<void>;
  fetchSeasons: () => Promise<void>;
  createSeason: (data: Partial<Season>) => Promise<void>;
  updateSeason: (id: string, data: Partial<Season>) => Promise<void>;
  deleteSeason: (id: string) => Promise<void>;
  generateSeasons: (data: {
    startYear: number;
    endYear: number;
    sportId?: string | null;
  }) => Promise<void>;
  fetchOrganizations: (filters?: ReferenceFilter) => Promise<void>;
  fetchCountries: () => Promise<void>;
  fetchCustomReferences: (scope: string, entityId?: string) => Promise<void>;
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
  countries: [],
  customReferences: [],
  isLoading: false,
  error: null,

  fetchRegions: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.regionsControllerFindAll(
        filters as Parameters<typeof referencesApi.regionsControllerFindAll>[0],
      );
      set({ regions: response.data as unknown as Region[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchSports: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.sportsControllerFindAll();
      set({ sports: response.data as unknown as Sport[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchIndicators: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.indicatorsControllerFindAll(
        filters as Parameters<typeof referencesApi.indicatorsControllerFindAll>[0],
      );
      set({ indicators: response.data as unknown as Indicator[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchIndicatorGroups: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.indicatorsControllerGetGroups(
        filters as Parameters<typeof referencesApi.indicatorsControllerGetGroups>[0],
      );
      set({ indicatorGroups: response.data as unknown as IndicatorGroup[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchSeasons: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.seasonsControllerFindAll();
      set({ seasons: response.data as unknown as Season[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  createSeason: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await referencesApi.seasonsControllerCreate(
        data as Parameters<typeof referencesApi.seasonsControllerCreate>[0],
      );
      const response = await referencesApi.seasonsControllerFindAll();
      set({ seasons: response.data as unknown as Season[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  updateSeason: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      await referencesApi.seasonsControllerUpdate(
        parseInt(id),
        data as Parameters<typeof referencesApi.seasonsControllerUpdate>[1],
      );
      const response = await referencesApi.seasonsControllerFindAll();
      set({ seasons: response.data as unknown as Season[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  deleteSeason: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await referencesApi.seasonsControllerDelete(parseInt(id));
      const response = await referencesApi.seasonsControllerFindAll();
      set({ seasons: response.data as unknown as Season[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  generateSeasons: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await referencesApi.seasonsControllerGenerate(
        data as Parameters<typeof referencesApi.seasonsControllerGenerate>[0],
      );
      const response = await referencesApi.seasonsControllerFindAll();
      set({ seasons: response.data as unknown as Season[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
      throw appError;
    }
  },

  fetchOrganizations: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.organizationsControllerFindAll();
      set({ organizations: response.data as unknown as Organization[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchCountries: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await countriesApi.countriesControllerFindActive({ lang: 'ru' });
      set({ countries: response.data as unknown as Country[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchCustomReferences: async (scope, entityId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.organizationsControllerFindAll();
      set({ customReferences: response.data as unknown as ReferenceData[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
  reset: () =>
    set({
      regions: [],
      sports: [],
      indicators: [],
      indicatorGroups: [],
      seasons: [],
      organizations: [],
      countries: [],
      customReferences: [],
      error: null,
    }),
}));
