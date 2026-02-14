import { create } from "zustand";

import { Countries, Reference } from "../api";
import { ErrorHandler } from "../api/error";
import type {
  AppError,
  Country,
  Indicator,
  IndicatorGroup,
  Organization,
  ReferenceData,
  ReferenceFilter,
  Region,
  Season,
  Sport,
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
      // Backend returns { data: Region[], ... }
      const data = (response.data as any).data || response.data;
      set({ regions: data as Region[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchSports: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.sportsControllerFindAll();
      // Backend returns { data: Sport[], ... }
      const data = (response.data as any).data || response.data;
      set({ sports: data as Sport[], isLoading: false });
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
      // Backend returns { data: Indicator[], ... }
      const data = (response.data as any).data || response.data;
      set({ indicators: data as Indicator[], isLoading: false });
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
      // Backend returns { data: IndicatorGroup[], ... }
      const data = (response.data as any).data || response.data;
      set({ indicatorGroups: data as IndicatorGroup[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchSeasons: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.seasonsControllerFindAll();
      // Backend returns { items: Season[], ... }
      const data = (response.data as any).items || (response.data as any).data || response.data;
      set({ seasons: data as Season[], isLoading: false });
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
      const seasonData =
        (response.data as any).items || (response.data as any).data || response.data;
      set({ seasons: seasonData as Season[], isLoading: false });
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
      const seasonData =
        (response.data as any).items || (response.data as any).data || response.data;
      set({ seasons: seasonData as Season[], isLoading: false });
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
      const seasonData =
        (response.data as any).items || (response.data as any).data || response.data;
      set({ seasons: seasonData as Season[], isLoading: false });
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
      const seasonData =
        (response.data as any).items || (response.data as any).data || response.data;
      set({ seasons: seasonData as Season[], isLoading: false });
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
      // Backend returns { data: Organization[], ... }
      const data = (response.data as any).data || response.data;
      set({ organizations: data as Organization[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchCountries: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await countriesApi.countriesControllerFindActive({ lang: "ru" });
      // Backend returns { data: Country[], ... }
      const data = (response.data as any).data || response.data;
      set({ countries: data as Country[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchCustomReferences: async (scope, entityId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.organizationsControllerFindAll();
      const data = (response.data as any).data || response.data;
      set({ customReferences: data as unknown as ReferenceData[], isLoading: false });
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
