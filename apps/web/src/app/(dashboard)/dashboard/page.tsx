'use client';

import { useAuth } from '@/shared/lib/auth';
import { Button } from '@/shared/ui/Button';
import { useRouter } from 'next/navigation';
import './dashboard.css';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-welcome">
                <h1>Welcome back, {user?.name || 'User'}!</h1>
                <p>You have successfully logged in to Elbruso</p>
            </div>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>Quick Stats</h3>
                    <div className="dashboard-stat">
                        <span className="dashboard-stat-value">0</span>
                        <span className="dashboard-stat-label">Projects</span>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3>Recent Activity</h3>
                    <p className="dashboard-card-empty">No recent activity</p>
                </div>

                <div className="dashboard-card">
                    <h3>Getting Started</h3>
                    <ul className="dashboard-list">
                        <li>✓ Account created</li>
                        <li>○ Complete profile</li>
                        <li>○ Create first project</li>
                    </ul>
                </div>
            </div>

            <div className="dashboard-actions">
                <Button variant="outline" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}
