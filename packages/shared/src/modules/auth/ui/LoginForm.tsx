"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../lib/auth";
import { useToast } from "../../../ui/uikit/Toast";
import { Input } from "../../../ui/uikit/Input";
import { Button } from "../../../ui/uikit/Button";
import { Logo } from "../../../ui/uikit/Logo";
import { useI18n } from "../../../lib/i18n";
import { Dictionary } from "../../../types";
import "./auth.css";

export const LoginForm = () => {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { showToast } = useToast();
  const dictionary = useI18n() as Dictionary;

  const [formData, setFormData] = useState({
    email: "user@example.com",
    password: "Password123!",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const error = typeof window !== 'undefined' ? window.localStorage.getItem("auth_error") : null;
    if (error) {
      setAuthError(error);
      window.localStorage.removeItem("auth_error");
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await login(formData);
      showToast("success", "Welcome back!");
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid credentials";
      showToast("error", message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-logo">
        <Logo />
      </div>

      <div className="auth-header">
        <h2>Nice to see you!</h2>
        <p>Enter your email and password to sign in</p>
      </div>

      {authError && (
        <div className="auth-error mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          autoComplete="email"
          disabled={isLoading}
        />

        <Input
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
          disabled={isLoading}
        />

        <div className="auth-form-footer">
          <Link href="/forgot-password" summer-friendly="true" className="auth-link-small">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="primary" className="auth-submit-button" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="auth-footer">
        <p>
          Don't have an account?{" "}
          <Link href="/register" className="auth-link">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};
