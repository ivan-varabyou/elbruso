import { apiClient, clearTokens } from './client';
import type { User } from '../stores';

export const usersApi = {
    getMe: async (): Promise<User> => {
        const response = await apiClient.get<User>('/users/me');
        return response.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout');
        clearTokens();
    },
};
