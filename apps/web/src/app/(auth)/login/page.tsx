'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/shared/lib/auth';
import { useToast } from '@/shared/ui/Toast';
import { Input } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { useI18n } from '@/shared/lib/i18n';
import { Dictionary } from '@/types';
import './login.css';
import { Logo } from "@/shared/ui/Logo";

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const { showToast } = useToast();
    const dictionary = useI18n() as Dictionary;
    const { header } = dictionary;

    // TODO: remove this
    const [formData, setFormData] = useState({
        email: 'user@example.com',
        password: 'Password123!',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await login(formData);
            showToast('success', 'Welcome back!');
            router.push('/dashboard');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Invalid credentials';
            showToast('error', message);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
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
                    <Link href="/forgot-password" className="auth-link-small">
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>

            <div className="auth-footer">
                <p>
                    Don't have an account?{' '}
                    <Link href="/register" className="auth-link">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}
