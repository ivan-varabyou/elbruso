import { useQuery } from "@tanstack/react-query";

import { Reference } from "../reference.api";

interface Organization {
  id: number;
  name_ru: string;
  country_id: number;
}

const referenceApi = new Reference();

const organizationKeys = {
  all: ["reference"] as const,
  organizations: () => [...organizationKeys.all, "organizations"] as const,
  organizationsByCountry: (countryId: number) =>
    [...organizationKeys.organizations(), countryId] as const,
};

export const useOrganizations = (countryId?: number): Organization[] => {
  const query = useQuery({
    queryKey: countryId
      ? organizationKeys.organizationsByCountry(countryId)
      : organizationKeys.organizations(),
    queryFn: async () => {
      const response = await referenceApi.organizationsControllerFindAll();
      const data = response.data as unknown as Organization[] | undefined;
      return data || [];
    },
    staleTime: 0,
    refetchOnMount: true,
  });
  return query.data || [];
};
