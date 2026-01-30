"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useToast } from "../../../ui/uikit/Toast";
import { Input } from "../../../ui/uikit/Input";
import { Button } from "../../../ui/uikit/Button";
import { Logo } from "../../../ui/uikit/Logo";
import { PasswordStrength } from "../../profile/ui/Settings/PasswordStrength/PasswordStrength";
import "./auth.css";

export const ResetPasswordForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { showToast } = useToast();

    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isValidating, setIsValidating] = useState(true);
    const [isValidToken, setIsValidToken] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
            validateToken(tokenParam);
        } else {
            setIsValidating(false);
            showToast('error', 'Отсутствует токен сброса пароля');
        }
    }, [searchParams]);

    const validateToken = async (tokenValue: string) => {
        try {
            const response = await fetch(
                `http://localhost:3001/auth/verify-reset-token/${tokenValue}`
            );
            const data = await response.json();

            if (data.valid) {
                setIsValidToken(true);
            } else {
                showToast('error', 'Недействительная или истёкшая ссылка');
            }
        } catch (error) {
            showToast('error', 'Ошибка проверки токена');
        } finally {
            setIsValidating(false);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!password) {
            newErrors.password = 'Пароль обязателен';
        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
        ) {
            newErrors.password =
                'Пароль должен содержать минимум 8 символов, заглавную букву, строчную букву, цифру и спецсимвол';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Пароли не совпадают';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    newPassword: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showToast('success', 'Пароль успешно изменён!');
                setTimeout(() => {
                    router.push('/login');
                }, 1500);
            } else {
                throw new Error(data.message || 'Ошибка сброса пароля');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ошибка сброса пароля';
            showToast('error', message);
        } finally {
            setIsLoading(false);
        }
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

    if (!isValidToken) {
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
                                setErrors((prev) => ({ ...prev, password: '' }));
                            }
                        }}
                        error={errors.password}
                        autoComplete="new-password"
                        disabled={isLoading}
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
                            setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                        }
                    }}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                    disabled={isLoading}
                />

                <Button
                    type="submit"
                    variant="primary"
                    className="auth-submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Сброс пароля...' : 'Сбросить пароль'}
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
