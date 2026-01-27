'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/shared/lib/auth';
import { useToast, Input, Button, Select, PasswordStrength, Logo } from '@/shared/ui';
import '../login/login.css';
import './register.css';

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

export default function RegisterPage() {
    const router = useRouter();
    const { register, isLoading } = useAuth();
    const { showToast } = useToast();

    const [countries, setCountries] = useState<Country[]>([]);
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loadingData, setLoadingData] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        countryId: 1, // Default to Russia
        organizationId: '',
        acceptTerms: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Fetch countries on mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('http://localhost:3001/countries/active?lang=ru');
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Failed to fetch countries:', error);
                showToast('error', 'Failed to load countries');
            }
        };
        fetchCountries();
    }, []);

    // Fetch organizations when country changes
    useEffect(() => {
        const fetchOrganizations = async () => {
            if (!formData.countryId) {
                setOrganizations([]);
                return;
            }

            try {
                setLoadingData(true);
                const response = await fetch(
                    `http://localhost:3001/organizations?countryId=${formData.countryId}`
                );
                const data = await response.json();
                setOrganizations(data);
            } catch (error) {
                console.error('Failed to fetch organizations:', error);
                showToast('error', 'Failed to load organizations');
            } finally {
                setLoadingData(false);
            }
        };
        fetchOrganizations();
    }, [formData.countryId]);

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Имя обязательно';
        }

        if (!formData.email) {
            newErrors.email = 'Email обязателен';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Неверный формат email';
        }

        if (!formData.password) {
            newErrors.password = 'Пароль обязателен';
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)
        ) {
            newErrors.password =
                'Пароль должен содержать минимум 8 символов, заглавную букву, строчную букву, цифру и спецсимвол';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'Необходимо принять условия';
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
            showToast('success', 'Аккаунт успешно создан!');
            router.push('/dashboard');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ошибка регистрации';
            showToast('error', message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' || name === 'countryId' ? Number(value) : value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }

        // Reset organization when country changes
        if (name === 'countryId') {
            setFormData((prev) => ({ ...prev, organizationId: '' }));
        }
    };

    const filteredOrganizations = organizations.filter(
        (org) => org.country_id === formData.countryId
    );

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
                    {countries.map((country) => (
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
                    disabled={isLoading || loadingData || filteredOrganizations.length === 0}
                    error={errors.organizationId}
                    helperText="Необязательное поле"
                >
                    <option value="">Выберите организацию</option>
                    {filteredOrganizations.map((org) => (
                        <option key={org.id} value={org.id}>
                            {org.name_ru}
                        </option>
                    ))}
                </Select>    {filteredOrganizations.length === 0 && !loadingData && (
                    <small className="form-hint">Нет доступных организаций для выбранной страны</small>
                )}

                <div>
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
                    <PasswordStrength password={formData.password} />
                </div>

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
                        <span>
                            Я согласен с{' '}
                            <Link href="/terms" className="auth-link-small">
                                Условиями использования
                            </Link>{' '}
                            и{' '}
                            <Link href="/privacy" className="auth-link-small">
                                Политикой конфиденциальности
                            </Link>
                        </span>
                    </label>
                    {errors.acceptTerms && <p className="register-terms-error">{errors.acceptTerms}</p>}
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="auth-submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
                </Button>
            </form>

            <div className="auth-footer">
                <p>
                    Уже есть аккаунт?{' '}
                    <Link href="/login" className="auth-link">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
}
