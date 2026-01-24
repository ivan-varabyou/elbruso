import { Building2 } from 'lucide-react';
import { PageLayout } from '@/shared/ui/PageLayout';

export default function OrganizationsPage() {
    return (
        <PageLayout 
            title="Организации" 
            icon={Building2}
            description="Список организаций в подчинении с привязкой к субъектам РФ."
        />
    );
}

