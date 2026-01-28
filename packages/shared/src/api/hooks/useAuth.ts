import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Auth } from "../Auth";
import type { LoginDto, RegisterDto, ForgotPasswordDto, ResetPasswordDto } from "../data-contracts";

const authApi = new Auth();

// Query Keys
export const authKeys = {
  all: ["auth"] as const,
  me: ["auth", "me"] as const,
};

// Hooks

export const useGetMe = () => {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: () => authApi.authControllerGetMe(),
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginDto) => authApi.authControllerLogin(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterDto) => authApi.authControllerRegister(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordDto) => authApi.authControllerForgotPassword(data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordDto) => authApi.authControllerResetPassword(data),
  });
};

export const useVerifyResetToken = (token: string) => {
  return useQuery({
    queryKey: ["auth", "verify-token", token],
    queryFn: () => authApi.authControllerVerifyResetToken(token),
    enabled: !!token,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: { currentPassword: string; newPassword: string }) => {
      // Direct axios call since swagger doesn't define body
      const response = await fetch("/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to change password");
      return response.json();
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authApi.authControllerRefresh({ refreshToken }),
  });
};
