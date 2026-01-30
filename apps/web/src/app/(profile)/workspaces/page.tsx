import { Briefcase } from 'lucide-react';
import { PageLayout } from '@/shared/ui';

export default function WorkspacesPage() {
    return (
        <PageLayout 
            title="Рабочие области" 
            icon={Briefcase}
            description="Список доступных рабочих областей с динамическими таблицами."
        />
    );
}

