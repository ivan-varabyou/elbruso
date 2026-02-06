"use client";

import "./auth.css";

import { useCountries, useOrganizations } from "@frontend/api/hooks";
import { useToast } from "@frontend/modules/notifications/hooks";
import type { Dictionary } from "@frontend/types";
import { Button } from "@frontend/ui/primitives/Button";
import { Input } from "@frontend/ui/primitives/Input";
import { Logo } from "@frontend/ui/primitives/Logo";
import { Select } from "@frontend/ui/primitives/Select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useI18n } from "../../i18n/lib";
import { useAuth } from "../lib";

interface Country {
  id: number;
  code: string;
  name: string;
  flag: string;
}

interface Organization {
  id: number;
  name_ru: string;
  country_id: number;
}

export const RegisterForm = () => {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const { showToast } = useToast();
  const dictionary = useI18n() as Dictionary;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryId: 1,
    organizationId: "",
    acceptTerms: false,
  });

  const countries = useCountries();
  const organizations = useOrganizations(formData.countryId);
  const isLoadingOrganizations = organizations.length === 0 && formData.countryId > 0;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    }

    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Неверный формат email";
    }

    if (!formData.password) {
      newErrors.password = "Пароль обязателен";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Необходимо принять условия";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        countryId: formData.countryId,
        organizationId: formData.organizationId || undefined,
      });
      showToast("success", "Аккаунт успешно создан!");
      router.push("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Ошибка регистрации";
      showToast("error", message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number" || name === "countryId"
            ? Number(value)
            : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "countryId") {
      setFormData((prev) => ({ ...prev, organizationId: "" }));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-logo">
        <Logo />
      </div>

      <div className="auth-header">
        <h2>Создайте аккаунт</h2>
        <p>Введите данные для регистрации</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <Input
          id="name"
          name="name"
          type="text"
          label="Полное имя"
          placeholder="Иван Иванов"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          autoComplete="name"
          disabled={isLoading}
        />

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

        <Select
          id="countryId"
          name="countryId"
          label="Страна"
          value={formData.countryId}
          onChange={handleChange}
          disabled={isLoading || countries.length === 0}
          error={errors.countryId}
        >
          {countries.map((country: Country) => (
            <option key={country.id} value={country.id}>
              {country.flag} {country.name}
            </option>
          ))}
        </Select>

        <Select
          id="organizationId"
          name="organizationId"
          label="Организация"
          value={formData.organizationId}
          onChange={handleChange}
          disabled={isLoading || isLoadingOrganizations || organizations.length === 0}
          error={errors.organizationId}
        >
          <option value="">Выберите организацию</option>
          {organizations.map((org: Organization) => (
            <option key={org.id} value={org.id}>
              {org.name_ru}
            </option>
          ))}
        </Select>

        <Input
          id="password"
          name="password"
          type="password"
          label="Пароль"
          placeholder="Создайте надёжный пароль"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
          disabled={isLoading}
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Подтвердите пароль"
          placeholder="Повторите пароль"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
          disabled={isLoading}
        />

        <div className="register-terms">
          <label className="register-checkbox-label">
            <input
              type="checkbox"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              disabled={isLoading}
            />
            <span>Я согласен с Условиями использования и Политикой конфиденциальности</span>
          </label>
          {errors.acceptTerms && <p className="register-terms-error">{errors.acceptTerms}</p>}
        </div>

        <Button type="submit" variant="primary" className="auth-submit-button" disabled={isLoading}>
          {isLoading ? "Создание аккаунта..." : "Создать аккаунт"}
        </Button>
      </form>

      <div className="auth-footer">
        <p>
          Уже есть аккаунт?{" "}
          <Link href="/login" className="auth-link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
