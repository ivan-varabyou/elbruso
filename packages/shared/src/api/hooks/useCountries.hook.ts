import { useQuery } from "@tanstack/react-query";

import { Countries } from "../countries.api";

const countriesApi = new Countries();

export const countriesKeys = {
  all: ["countries"] as const,
  lists: () => [...countriesKeys.all, "list"] as const,
  list: (filters: { active?: boolean }) => [...countriesKeys.lists(), filters] as const,
};

interface Country {
  id: number;
  code: string;
  name: string;
  flag: string;
}

export const useCountries = (): Country[] => {
  const query = useQuery({
    queryKey: countriesKeys.list({}),
    queryFn: async () => {
      const response = await countriesApi.countriesControllerFindAll({ lang: "ru" });
      const data = response.data as unknown as Country[] | undefined;
      return data || [];
    },
    staleTime: 0,
    refetchOnMount: true,
  });
  return query.data || [];
};

export const useActiveCountries = (): Country[] => {
  return useCountries();
};
