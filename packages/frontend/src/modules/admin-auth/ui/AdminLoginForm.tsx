"use client";

import "./auth.css";

import { useToast } from "@frontend/modules/notifications/hooks";
import { Dictionary } from "@frontend/types";
import { Button } from "@frontend/ui/primitives/Button";
import { Input } from "@frontend/ui/primitives/Input";
import { Logo } from "@frontend/ui/primitives/Logo";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useI18n } from "../../i18n/lib";
import { useAdminAuth } from "../lib/AdminAuthContext";

export const AdminLoginForm = () => {
  const router = useRouter();
  const { login, isLoading } = useAdminAuth();
  const { showToast } = useToast();
  const dictionary = useI18n() as Dictionary;

  const [formData, setFormData] = useState({
    email: "admin@elbruso.ru",
    password: "admin123",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if already authenticated
    if (localStorage.getItem("adminAccessToken")) {
      router.replace("/dashboard");
    }

    const error =
      typeof window !== "undefined" ? window.localStorage.getItem("admin_auth_error") : null;
    if (error) {
      setAuthError(error);
      window.localStorage.removeItem("admin_auth_error");
    }
  }, [router]);

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
      showToast("success", "Welcome to Admin Panel!");
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
        <h2>Admin Login</h2>
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
          placeholder="admin@elbruso.ru"
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

        <Button type="submit" variant="primary" className="auth-submit-button" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="auth-footer">
        <p>Admin Panel - Elbruso BI System</p>
      </div>
    </div>
  );
};
