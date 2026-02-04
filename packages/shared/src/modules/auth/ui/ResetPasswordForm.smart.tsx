"use client";

import "./auth.css";

import { useResetPassword, useVerifyResetToken } from "@elbruso/api/hooks";
import { useToast } from "@elbruso/modules/notifications/hooks";
import { PasswordStrength } from "@elbruso/modules/profile/ui";
import { Button } from "@elbruso/ui/primitives/Button";
import { Input } from "@elbruso/ui/primitives/Input";
import { Logo } from "@elbruso/ui/primitives/Logo";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      showToast("error", "Отсутствует токен сброса пароля");
    }
  }, [searchParams]);

  const { data: tokenValid, isLoading: isValidating } = useVerifyResetToken(token);
  const resetPasswordMutation = useResetPassword();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = "Пароль обязателен";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    ) {
      newErrors.password =
        "Пароль должен содержать минимум 8 символов, заглавную букву, строчную букву, цифру и спецсимвол";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    resetPasswordMutation.mutate(
      { token, newPassword: password },
      {
        onSuccess: () => {
          showToast("success", "Пароль успешно изменён!");
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        },
        onError: (error: Error) => {
          const message = error.message || "Ошибка сброса пароля";
          showToast("error", message);
        },
      },
    );
  };

  if (isValidating) {
    return (
      <div className="auth-page">
        <div className="auth-logo">
          <Logo />
        </div>
        <div className="auth-header">
          <h2>Проверка ссылки...</h2>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="auth-page">
        <div className="auth-logo">
          <Logo />
        </div>

        <div className="auth-header">
          <h2>Недействительная ссылка</h2>
          <p>Ссылка для сброса пароля недействительна или истекла</p>
        </div>

        <div className="auth-footer">
          <p>
            <Link href="/forgot-password" className="auth-link">
              Запросить новую ссылку
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-logo">
        <Logo />
      </div>

      <div className="auth-header">
        <h2>Создайте новый пароль</h2>
        <p>Введите новый пароль для вашего аккаунта</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-form-group">
          <Input
            id="password"
            name="password"
            type="password"
            label="Новый пароль"
            placeholder="Создайте надёжный пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: "" }));
              }
            }}
            error={errors.password}
            autoComplete="new-password"
            disabled={resetPasswordMutation.isPending}
            autoFocus
          />
          <PasswordStrength password={password} />
        </div>

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Подтвердите пароль"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
            }
          }}
          error={errors.confirmPassword}
          autoComplete="new-password"
          disabled={resetPasswordMutation.isPending}
        />

        <Button
          type="submit"
          variant="primary"
          className="auth-submit-button"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? "Сброс пароля..." : "Сбросить пароль"}
        </Button>
      </form>

      <div className="auth-footer">
        <p>
          <Link href="/login" className="auth-link">
            Вернуться к входу
          </Link>
        </p>
      </div>
    </div>
  );
};
