import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Auth } from "../auth.api";
import { API_VERSION } from "../config.constant";
import type { LoginDto, RegisterDto } from "../data-contracts";

const authApi = new Auth();

export const authKeys = {
  all: ["auth"] as const,
  me: ["auth", "me"] as const,
};

export const useGetMe = () =>
  useQuery({
    queryKey: authKeys.me,
    queryFn: () => authApi.authControllerGetMe(),
    retry: false,
  });

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginDto) => authApi.authControllerLogin(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.me }),
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RegisterDto) => authApi.authControllerRegister(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: authKeys.me }),
  });
};

export const useChangePassword = () =>
  useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      const response = await fetch(`/${API_VERSION}/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to change password");
      return response.json();
    },
  });

export const useRefreshToken = () =>
  useMutation({
    mutationFn: (refreshToken: string) => authApi.authControllerRefresh({ refreshToken }),
  });
