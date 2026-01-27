'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { authApi, setTokens, clearTokens, isAuthenticated as checkAuth } from '@/shared/api';
import type { LoginDto, RegisterDto, AuthResponse } from '@/shared/api';

// User interface (simplified, extend as needed)
export interface User {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    role?: string;
    organization_id?: number | null;
    name?: string; // Legacy field, might still be in JWT or returned by old endpoints
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthContextValue extends AuthState {
    login: (credentials: LoginDto) => Promise<void>;
    register: (userData: RegisterDto) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,
    });

    // Check authentication on mount
    useEffect(() => {
        const initAuth = async () => {
            const authenticated = checkAuth();
            if (authenticated) {
                try {
                    const user = await authApi.getMe();
                    setState((prev) => ({
                        ...prev,
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    }));
                } catch (error) {
                    console.error('Failed to initialize auth:', error);
                    // If fetching user fails, we might have an expired/invalid token
                    // The axios interceptor should handle refresh, but if that fails too,
                    // we should clear everything
                    clearTokens();
                    setState((prev) => ({
                        ...prev,
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    }));
                }
            } else {
                setState((prev) => ({ ...prev, isLoading: false }));
            }
        };

        initAuth();
    }, []);

    // Silent Refresh - Refresh token 1 minute before expiry
    useEffect(() => {
        if (!state.isAuthenticated) return;

        const checkAndRefresh = async () => {
            const token = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!token || !refreshToken) return;

            try {
                const payload = decodeJwt(token);
                if (!payload || !payload.exp) return;

                const expiryTime = payload.exp * 1000;
                const now = Date.now();
                const timeUntilExpiry = expiryTime - now;

                // If less than 2 minutes left, refresh
                if (timeUntilExpiry < 120000) {
                    const response = await authApi.refreshToken(refreshToken);
                    setTokens(response.accessToken, response.refreshToken);
                }
            } catch (error) {
                console.error('Silent refresh failed:', error);
            }
        };

        const interval = setInterval(checkAndRefresh, 60000); // Check every minute
        checkAndRefresh(); // Check immediately

        return () => clearInterval(interval);
    }, [state.isAuthenticated]);

    const login = useCallback(async (credentials: LoginDto) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const response: AuthResponse = await authApi.login(credentials);
            setTokens(response.accessToken, response.refreshToken);

            const user = await authApi.getMe();

            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
            }));
            throw error;
        }
    }, []);

    const register = useCallback(async (userData: RegisterDto) => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const response: AuthResponse = await authApi.register(userData);
            setTokens(response.accessToken, response.refreshToken);

            const user = await authApi.getMe();

            setState({
                user,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Registration failed';
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
            }));
            throw error;
        }
    }, []);

    const logout = useCallback(() => {
        clearTokens();
        setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        });
    }, []);

    const clearError = useCallback(() => {
        setState((prev) => ({ ...prev, error: null }));
    }, []);

    const setUser = useCallback((user: User | null) => {
        setState((prev) => ({ ...prev, user }));
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
                clearError,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Simple JWT decoder
function decodeJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
