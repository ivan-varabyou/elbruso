import { apiClient } from './client';

// Re-export types from backend
export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    name: string;
    password: string;
    organizationId?: string;
    countryId?: number;
    lang?: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
}

export interface RefreshTokenDto {
    refreshToken: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: string;
}

// Auth API service
export const authApi = {
    async login(credentials: LoginDto): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return data;
    },

    async register(userData: RegisterDto): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>('/auth/register', userData);
        return data;
    },

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
        return data;
    },

    async getMe(): Promise<User> {
        const { data } = await apiClient.get<User>('/auth/me');
        return data;
    },
};
