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

const extractArray = (res: any): any[] => {
  if (Array.isArray(res)) return res;
  if (!res || typeof res !== "object") return [];

  // Try extracting from known properties
  if (Array.isArray(res.items)) return res.items;
  if (Array.isArray(res.data)) return res.data;

  // Recursive check for double-wrapped data (e.g., { success: true, data: { items: [...] } })
  if (res.items) return extractArray(res.items);
  if (res.data) return extractArray(res.data);

  return [];
};

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
      const data = extractArray(response.data);
      const normalized = data.map((r: any) => ({
        ...r,
        name_ru: r.name_ru || r.name,
        country_id: r.country_id || r.countryId,
      }));
      set({ regions: normalized as Region[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchSports: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.sportsControllerFindAll();
      const data = extractArray(response.data);
      const normalized = data.map((s: any) => ({
        ...s,
        name_ru: s.name_ru || s.name,
      }));
      set({ sports: normalized as Sport[], isLoading: false });
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
      const data = extractArray(response.data);
      const normalized = data.map((i: any) => ({
        ...i,
        name_ru: i.name_ru || i.name,
      }));
      set({ indicators: normalized as Indicator[], isLoading: false });
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
      const data = extractArray(response.data);
      const normalized = data.map((g: any) => ({
        ...g,
        name_ru: g.name_ru || g.name,
      }));
      set({ indicatorGroups: normalized as IndicatorGroup[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchSeasons: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.seasonsControllerFindAll();
      const data = extractArray(response.data);
      const normalized = data.map((s: any) => ({
        ...s,
        name_ru: s.name_ru || s.name,
        start_date: s.start_date || s.startDate,
        end_date: s.end_date || s.endDate,
        sports: s.sports?.map((sp: any) => ({
          ...sp,
          name_ru: sp.name_ru || sp.name,
        })),
      }));
      set({ seasons: normalized as Season[], isLoading: false });
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
      const dataList = extractArray(response.data);
      const normalized = dataList.map((s: any) => ({
        ...s,
        name_ru: s.name_ru || s.name,
        start_date: s.start_date || s.startDate,
        end_date: s.end_date || s.endDate,
        sports: s.sports?.map((sp: any) => ({
          ...sp,
          name_ru: sp.name_ru || sp.name,
        })),
      }));
      set({ seasons: normalized as Season[], isLoading: false });
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
      const dataList = extractArray(response.data);
      const normalized = dataList.map((s: any) => ({
        ...s,
        name_ru: s.name_ru || s.name,
        start_date: s.start_date || s.startDate,
        end_date: s.end_date || s.endDate,
        sports: s.sports?.map((sp: any) => ({
          ...sp,
          name_ru: sp.name_ru || sp.name,
        })),
      }));
      set({ seasons: normalized as Season[], isLoading: false });
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
      const dataList = extractArray(response.data);
      const normalized = dataList.map((s: any) => ({
        ...s,
        name_ru: s.name_ru || s.name,
        start_date: s.start_date || s.startDate,
        end_date: s.end_date || s.endDate,
        sports: s.sports?.map((sp: any) => ({
          ...sp,
          name_ru: sp.name_ru || sp.name,
        })),
      }));
      set({ seasons: normalized as Season[], isLoading: false });
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
      const dataList = extractArray(response.data);
      const normalized = dataList.map((s: any) => ({
        ...s,
        name_ru: s.name_ru || s.name,
        start_date: s.start_date || s.startDate,
        end_date: s.end_date || s.endDate,
        sports: s.sports?.map((sp: any) => ({
          ...sp,
          name_ru: sp.name_ru || sp.name,
        })),
      }));
      set({ seasons: normalized as Season[], isLoading: false });
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
      const data = extractArray(response.data);
      const normalized = data.map((o: any) => ({
        ...o,
        name_ru: o.name_ru || o.name,
      }));
      set({ organizations: normalized as Organization[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchCountries: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await countriesApi.countriesControllerFindActive({ lang: "ru" });
      const data = extractArray(response.data);
      const normalized = data.map((c: any) => ({
        ...c,
        name_ru: c.name_ru || c.name,
      }));
      set({ countries: normalized as Country[], isLoading: false });
    } catch (error) {
      const appError = ErrorHandler.handle(error);
      set({ error: appError, isLoading: false });
    }
  },

  fetchCustomReferences: async (scope, entityId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await referencesApi.organizationsControllerFindAll();
      const dataList = extractArray(response.data);
      const normalized = dataList.map((o: any) => ({
        ...o,
        name_ru: o.name_ru || o.name,
      }));
      set({ customReferences: normalized as unknown as ReferenceData[], isLoading: false });
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
