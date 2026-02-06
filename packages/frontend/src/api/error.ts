import type { AppError, ErrorCode } from "@frontend/types";
import axios, { AxiosError } from "axios";

export class ErrorHandler {
  static handle(error: unknown): AppError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;

      switch (status) {
        case 401:
          return {
            code: "UNAUTHORIZED" as ErrorCode,
            message: "Необходима авторизация",
            retryable: false,
          };
        case 403:
          return {
            code: "FORBIDDEN" as ErrorCode,
            message: "Недостаточно прав",
            retryable: false,
          };
        case 404:
          return {
            code: "NOT_FOUND" as ErrorCode,
            message: "Ресурс не найден",
            retryable: false,
          };
        case 409:
          return {
            code: "CONFLICT" as ErrorCode,
            message: "Конфликт данных",
            details: axiosError.response?.data as Record<string, unknown>,
            retryable: true,
          };
        case 422:
          return {
            code: "VALIDATION_ERROR" as ErrorCode,
            message: "Ошибка валидации",
            details: axiosError.response?.data as Record<string, unknown>,
            retryable: false,
          };
        default:
          return {
            code: "SERVER_ERROR" as ErrorCode,
            message: "Ошибка сервера",
            retryable: true,
          };
      }
    }

    return {
      code: "NETWORK_ERROR" as ErrorCode,
      message: "Ошибка сети",
      retryable: true,
    };
  }

  static async retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
  ): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        const appError = ErrorHandler.handle(error);

        if (!appError.retryable || i === maxRetries - 1) {
          throw appError;
        }

        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
      }
    }

    throw new Error("Max retries exceeded");
  }
}
