import { useMutation, useQuery } from "@tanstack/react-query";
import { Auth } from "../Auth";
import type { ResetPasswordDto } from "../data-contracts";

const authApi = new Auth();

export const useResetPassword = () =>
  useMutation({
    mutationFn: (data: ResetPasswordDto) => authApi.authControllerResetPassword(data),
  });

export const useVerifyResetToken = (token: string) =>
  useQuery({
    queryKey: ["auth", "verify-token", token],
    queryFn: () => authApi.authControllerVerifyResetToken(token),
    enabled: !!token,
  });
