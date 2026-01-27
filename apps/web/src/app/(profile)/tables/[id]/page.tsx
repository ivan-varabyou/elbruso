import { DynamicTable } from '@/shared/ui';

interface PageProps {
  params: {
    id: string;
  };
}

export default function TablePage({ params }: PageProps) {
  // TODO: Get workspace ID from context or route
  const workspaceId = 'test-workspace-id';

  return (
    <div className="h-screen flex flex-col">
      <DynamicTable 
        tableId={params.id} 
        workspaceId={workspaceId}
      />
    </div>
  );
}
