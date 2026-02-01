"use client";

import "../login/login.css";

import { useForgotPassword } from "@elbruso/hooks";
import { Button, Input, Logo } from "@elbruso/ui";
import { useToast } from "@elbruso/modules/notifications/hooks";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setError("Email обязателен");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Неверный формат email");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) return;

    forgotPassword(
      { email, lang: "ru" },
      {
        onSuccess: () => {
          setEmailSent(true);
          showToast("success", "Ссылка для сброса пароля отправлена на email");
        },
        onError: (error: Error) => {
          const message = error.message || "Ошибка отправки";
          showToast("error", message);
          setError(message);
        },
      },
    );
  };

  if (emailSent) {
    return (
      <div className="auth-page">
        <div className="auth-logo">
          <Logo />
        </div>

        <div className="auth-header">
          <h2>Проверьте почту</h2>
          <p>
            Мы отправили ссылку для сброса пароля на <strong>{email}</strong>
          </p>
        </div>

        <div className="auth-form">
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <p style={{ color: "#666", marginBottom: "1rem" }}>
              Не получили письмо? Проверьте папку "Спам"
            </p>
            <Button type="button" variant="outline" onClick={() => setEmailSent(false)}>
              Отправить снова
            </Button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            <Link href="/login" className="auth-link">
              Вернуться к входу
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
        <h2>Забыли пароль?</h2>
        <p>Введите email для восстановления доступа</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setError("");
          }}
          error={error}
          autoComplete="email"
          disabled={isPending}
          autoFocus
        />

        <Button type="submit" variant="primary" className="auth-submit-button" disabled={isPending}>
          {isPending ? "Отправка..." : "Отправить ссылку"}
        </Button>
      </form>

      <div className="auth-footer">
        <p>
          Вспомнили пароль?{" "}
          <Link href="/login" className="auth-link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
