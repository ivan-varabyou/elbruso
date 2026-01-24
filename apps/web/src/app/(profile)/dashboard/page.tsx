import { LayoutDashboard } from 'lucide-react';
import { PageLayout } from '@/shared/ui/PageLayout';

export default function DashboardPage() {
    return (
        <PageLayout 
            title="Dashboard" 
            icon={LayoutDashboard}
            description="Основные индикаторы системы с привязкой к организации. Настроим позже."
        />
    );
}

