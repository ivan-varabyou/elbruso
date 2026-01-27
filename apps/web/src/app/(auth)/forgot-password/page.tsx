'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast, Input, Button, Logo } from '@/shared/ui';
import '../login/login.css';

export default function ForgotPasswordPage() {
    const { showToast } = useToast();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email: string): boolean => {
        if (!email) {
            setError('Email обязателен');
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Неверный формат email');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) return;

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:3001/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, lang: 'ru' }),
            });

            const data = await response.json();

            if (response.ok) {
                setEmailSent(true);
                showToast('success', 'Ссылка для сброса пароля отправлена на email');
            } else {
                throw new Error(data.message || 'Ошибка отправки');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Ошибка отправки';
            showToast('error', message);
            setError(message);
        } finally {
            setIsLoading(false);
        }
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
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <p style={{ color: '#666', marginBottom: '1rem' }}>
                            Не получили письмо? Проверьте папку "Спам"
                        </p>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setEmailSent(false)}
                        >
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
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                    }}
                    error={error}
                    autoComplete="email"
                    disabled={isLoading}
                    autoFocus
                />

                <Button
                    type="submit"
                    variant="primary"
                    className="auth-submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Отправка...' : 'Отправить ссылку'}
                </Button>
            </form>

            <div className="auth-footer">
                <p>
                    Вспомнили пароль?{' '}
                    <Link href="/login" className="auth-link">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
}
