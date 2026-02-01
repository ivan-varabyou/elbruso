import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { AdminUpdateUserDto, CreateApiKeyDto,UpdateProfileDto } from "../data-contracts";
import { Users } from "../Users";

const usersApi = new Users();

// Query Keys
export const usersKeys = {
  all: ["users"] as const,
  lists: () => [...usersKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) => [...usersKeys.lists(), filters] as const,
  details: () => [...usersKeys.all, "detail"] as const,
  detail: (id: string) => [...usersKeys.details(), id] as const,
};

// Hooks

export const useGetProfile = () => {
  return useQuery({
    queryKey: usersKeys.detail("me"),
    queryFn: () => usersApi.usersControllerGetProfile(),
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileDto) => usersApi.usersControllerUpdateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
};

export const useUsers = (filters?: Record<string, unknown>) => {
  return useQuery({
    queryKey: usersKeys.list(filters),
    queryFn: () => usersApi.usersControllerFindAll(),
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: () => usersApi.usersControllerFindOne(id),
    enabled: !!id,
  });
};

export const useUpdateUserByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminUpdateUserDto }) =>
      usersApi.usersControllerUpdateUserAdmin(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all });
      queryClient.invalidateQueries({ queryKey: usersKeys.detail(id) });
    },
  });
};

export const useCreateApiKey = () => {
  return useMutation({
    mutationFn: (data: CreateApiKeyDto) => usersApi.usersControllerCreateApiKey(data),
  });
};
