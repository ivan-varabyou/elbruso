'use client';

import { ProtectedRoute } from '@/shared/lib/auth';
import { ProfileLayout } from '@/shared/ui';

export default function ProfileLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <ProfileLayout>{children}</ProfileLayout>
        </ProtectedRoute>
    );
}
