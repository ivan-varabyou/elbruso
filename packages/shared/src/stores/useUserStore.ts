import { create } from 'zustand';
import { usersApi } from '../api';

export interface User {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    role?: string;
    organization_id?: number | string;
    sport_id?: string;
    is_active: boolean;
    name?: string;
}


interface UserStore {
    // State
    user: User | null;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    // Initial state
    user: null,
    isLoading: false,
    error: null,

    // Actions
    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const user = await usersApi.getMe();
            set({ user, isLoading: false });
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },

    logout: async () => {
        try {
            await usersApi.logout();
            set({ user: null });
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    },
}));
