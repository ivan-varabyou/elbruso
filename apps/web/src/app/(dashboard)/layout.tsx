'use client';

import { ProtectedRoute } from '@/shared/lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <div className="dashboard-layout">
                <header className="dashboard-header">
                    <div className="dashboard-header-content">
                        <h1>Elbruso</h1>
                        <nav className="dashboard-nav">
                            {/* TODO: Add navigation items */}
                        </nav>
                    </div>
                </header>
                <main className="dashboard-main">{children}</main>
            </div>
        </ProtectedRoute>
    );
}
