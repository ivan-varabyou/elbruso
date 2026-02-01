import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  CreateIndicatorGroupDto,
  GenerateIndicatorsDto,
  UpdateIndicatorGroupDto,
} from "../data-contracts";
import { Reference } from "../Reference";

const referenceApi = new Reference();

// Query Keys
export const referenceKeys = {
  all: ["reference"] as const,
  sports: () => [...referenceKeys.all, "sports"] as const,
  sport: (id: number) => [...referenceKeys.sports(), id] as const,
  disciplines: (sportId: number) => [...referenceKeys.sport(sportId), "disciplines"] as const,
  regions: () => [...referenceKeys.all, "regions"] as const,
  region: (id: number) => [...referenceKeys.regions(), id] as const,
  indicators: () => [...referenceKeys.all, "indicators"] as const,
  indicator: (id: number) => [...referenceKeys.indicators(), id] as const,
  indicatorGroups: () => [...referenceKeys.all, "indicator-groups"] as const,
  indicatorTemplates: () => [...referenceKeys.all, "indicator-templates"] as const,
  seasons: () => [...referenceKeys.all, "seasons"] as const,
  season: (id: number) => [...referenceKeys.seasons(), id] as const,
  organizations: () => [...referenceKeys.all, "organizations"] as const,
  organization: (id: number) => [...referenceKeys.organizations(), id] as const,
};

// Sports
export const useSports = () => {
  return useQuery({
    queryKey: referenceKeys.sports(),
    queryFn: () => referenceApi.sportsControllerFindAll(),
  });
};

export const useSport = (id: number) => {
  return useQuery({
    queryKey: referenceKeys.sport(id),
    queryFn: () => referenceApi.sportsControllerFindById(id),
    enabled: !!id,
  });
};

export const useSportDisciplines = (sportId: number) => {
  return useQuery({
    queryKey: referenceKeys.disciplines(sportId),
    queryFn: () => referenceApi.sportsControllerFindDisciplines(sportId),
    enabled: !!sportId,
  });
};

// Regions
export const useRegions = (filters?: {
  countryId?: number;
  federalDistrictId?: number;
  regionTypeId?: number;
  isActive?: boolean;
}) => {
  return useQuery({
    queryKey: [...referenceKeys.regions(), filters],
    queryFn: () => referenceApi.regionsControllerFindAll(filters),
  });
};

export const useRegion = (id: number) => {
  return useQuery({
    queryKey: referenceKeys.region(id),
    queryFn: () => referenceApi.regionsControllerFindById(id),
    enabled: !!id,
  });
};

export const useRegionsByDistrict = (districtId: number) => {
  return useQuery({
    queryKey: [...referenceKeys.regions(), "district", districtId],
    queryFn: () => referenceApi.regionsControllerFindByDistrict(districtId),
    enabled: !!districtId,
  });
};

// Indicators
export const useIndicators = (filters?: {
  sportId?: number;
  regionId?: number;
  groupId?: number;
  search?: string;
  scope?: string;
  scopes?: string[];
}) => {
  return useQuery({
    queryKey: [...referenceKeys.indicators(), filters],
    queryFn: () => referenceApi.indicatorsControllerFindAll(filters),
  });
};

export const useIndicator = (id: number) => {
  return useQuery({
    queryKey: referenceKeys.indicator(id),
    queryFn: () => referenceApi.indicatorsControllerFindById(id),
    enabled: !!id,
  });
};

export const useIndicatorsBySport = (sportId: number) => {
  return useQuery({
    queryKey: [...referenceKeys.indicators(), "sport", sportId],
    queryFn: () => referenceApi.indicatorsControllerFindBySport(sportId),
    enabled: !!sportId,
  });
};

export const useIndicatorTemplates = () => {
  return useQuery({
    queryKey: referenceKeys.indicatorTemplates(),
    queryFn: () => referenceApi.indicatorsControllerGetTemplates(),
  });
};

export const useGenerateIndicators = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GenerateIndicatorsDto) => referenceApi.indicatorsControllerGenerate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: referenceKeys.indicators() });
    },
  });
};

export const useIndicatorGenders = () => {
  return useQuery({
    queryKey: [...referenceKeys.indicators(), "genders"],
    queryFn: () => referenceApi.indicatorsControllerGetGenders(),
  });
};

export const useIndicatorAgeGroups = () => {
  return useQuery({
    queryKey: [...referenceKeys.indicators(), "age-groups"],
    queryFn: () => referenceApi.indicatorsControllerGetAgeGroups(),
  });
};

// Indicator Groups
export const useIndicatorGroups = () => {
  return useQuery({
    queryKey: referenceKeys.indicatorGroups(),
    queryFn: () => referenceApi.indicatorsControllerGetGroups(),
  });
};

export const useCreateIndicatorGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateIndicatorGroupDto) =>
      referenceApi.indicatorsControllerCreateGroup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: referenceKeys.indicatorGroups() });
    },
  });
};

export const useUpdateIndicatorGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateIndicatorGroupDto }) =>
      referenceApi.indicatorsControllerUpdateGroup(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: referenceKeys.indicatorGroups() });
    },
  });
};

// Seasons
export const useSeasons = () => {
  return useQuery({
    queryKey: referenceKeys.seasons(),
    queryFn: () => referenceApi.seasonsControllerFindAll(),
  });
};

export const useSeason = (id: number) => {
  return useQuery({
    queryKey: referenceKeys.season(id),
    queryFn: () => referenceApi.seasonsControllerFindById(id),
    enabled: !!id,
  });
};

export const useCurrentSeason = () => {
  return useQuery({
    queryKey: [...referenceKeys.seasons(), "current"],
    queryFn: () => referenceApi.seasonsControllerFindCurrent(),
  });
};

// Organizations
export const useOrganizations = () => {
  return useQuery({
    queryKey: referenceKeys.organizations(),
    queryFn: () => referenceApi.organizationsControllerFindAll(),
  });
};

export const useOrganization = (id: number) => {
  return useQuery({
    queryKey: referenceKeys.organization(id),
    queryFn: () => referenceApi.organizationsControllerFindById(id),
    enabled: !!id,
  });
};

export const useOrganizationTree = (id: number) => {
  return useQuery({
    queryKey: [...referenceKeys.organization(id), "tree"],
    queryFn: () => referenceApi.organizationsControllerGetTree(id),
    enabled: !!id,
  });
};
