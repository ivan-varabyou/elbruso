import { useMutation } from "@tanstack/react-query";
import { Auth } from "../Auth";
import type { ForgotPasswordDto } from "../data-contracts";

const authApi = new Auth();

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (data: ForgotPasswordDto) => authApi.authControllerForgotPassword(data),
  });
