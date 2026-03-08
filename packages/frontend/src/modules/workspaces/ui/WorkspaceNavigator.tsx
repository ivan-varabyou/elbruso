import { WorkspaceGroupResponseDto } from '@frontend/api/data-contracts';
import { Workspaces as WorkspacesApi } from '@frontend/api/workspaces.api';
import { spreadsheetApi } from '@frontend/modules/spreadsheet/api/spreadsheet.api';
import { Spreadsheet, SpreadsheetType } from '@frontend/modules/spreadsheet/types/spreadsheet.types';
import { useWorkspaceStore } from '@frontend/stores/useWorkspace.store';
import { 
  Button, 
  Card, 
  CardBody, 
  ScrollShadow, 
  Tooltip 
} from '@heroui/react';
import { 
  Book, 
  ChevronDown, 
  ChevronRight, 
  Folder, 
  Hash, 
  MoreVertical, 
  Plus, 
  Table 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const workspacesApiClient = new WorkspacesApi();

interface WorkspaceData {
  groups: WorkspaceGroupResponseDto[];
  entities: Spreadsheet[];
}

type LoadingState = Record<string, boolean>;
type ExpandedState = Record<string, boolean>;
type WorkspaceDataState = Record<string, WorkspaceData>;

export const WorkspaceNavigator: React.FC = () => {
  const router = useRouter();
  const { workspaces, fetchWorkspaces } = useWorkspaceStore();
  const [expandedWorkspaces, setExpandedWorkspaces] = useState<ExpandedState>({});
  const [workspaceData, setWorkspaceData] = useState<WorkspaceDataState>({});
  const [loading, setLoading] = useState<LoadingState>({});
  const [activeEntityId, setActiveEntityId] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  const toggleWorkspace = async (workspaceId: string) => {
    const isExpanded = !expandedWorkspaces[workspaceId];
    setExpandedWorkspaces(prev => ({ ...prev, [workspaceId]: isExpanded }));

    if (isExpanded && !workspaceData[workspaceId]) {
      await loadWorkspaceData(workspaceId);
    }
  };

  const loadWorkspaceData = async (workspaceId: string) => {
    setLoading(prev => ({ ...prev, [workspaceId]: true }));
    try {
      // Fetch groups
      const groupsResponse = await workspacesApiClient.workspaceGroupsControllerFindAll(workspaceId);
      // Based on API contract in Workspaces.ts (GroupsListResponseDto)
      const groups: WorkspaceGroupResponseDto[] = ((groupsResponse as unknown) as { data: WorkspaceGroupResponseDto[] }).data || [];

      // Fetch all entities for this workspace
      const entitiesResponse = await spreadsheetApi.getSpreadsheets({ workspace_id: workspaceId });
      const entities = entitiesResponse.items || [];

      setWorkspaceData(prev => ({
        ...prev,
        [workspaceId]: { groups, entities }
      }));
    } catch (error) {
      console.error('Failed to load workspace data:', error);
    } finally {
      setLoading(prev => ({ ...prev, [workspaceId]: false }));
    }
  };

  const renderEntityIcon = (type: SpreadsheetType) => {
    switch (type) {
      case SpreadsheetType.TABLE:
        return <Table className="w-4 h-4 text-blue-500" />;
      case SpreadsheetType.REFERENCE:
        return <Book className="w-4 h-4 text-green-500" />;
      case SpreadsheetType.INDICATOR:
        return <Hash className="w-4 h-4 text-orange-500" />;
      default:
        return <Table className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleEntityClick = (entity: Spreadsheet) => {
    setActiveEntityId(entity.id);
    // Navigate to the spreadsheet editor
    router.push(`/spreadsheets/${entity.id}`);
  };

  const renderEntities = (entities: Spreadsheet[]) => {
    if (entities.length === 0) return null;

    return (
      <div className="flex flex-col gap-1 ml-4 mt-1">
        {entities.map(entity => (
          <div 
            key={entity.id}
            onClick={() => handleEntityClick(entity)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer group transition-colors ${
              activeEntityId === entity.id ? 'bg-primary-50 text-primary font-medium' : 'hover:bg-default-100'
            }`}
          >
            {renderEntityIcon(entity.type)}
            <span className="text-sm truncate flex-1">{entity.name}</span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Button isIconOnly size="sm" variant="light" onClick={(e) => {
                e.stopPropagation();
                // Add entity actions here helper
              }}>
                <MoreVertical className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="h-full border-none bg-transparent shadow-none">
      <CardBody className="p-2 gap-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <h3 className="font-semibold text-sm uppercase text-default-500 tracking-wider">Рабочие области</h3>
          <Tooltip content="Создать рабочую область">
            <Button isIconOnly size="sm" variant="light">
              <Plus className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>

        <ScrollShadow className="h-[calc(100vh-200px)]">
          <div className="flex flex-col gap-1">
            {workspaces.map((workspace) => (
              <div key={workspace.id} className="flex flex-col">
                <div 
                  className={`flex items-center gap-2 px-2 py-2 hover:bg-default-100 rounded-xl cursor-pointer transition-colors ${
                    expandedWorkspaces[workspace.id] ? 'bg-default-50' : ''
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleWorkspace(workspace.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleWorkspace(workspace.id);
                    }
                  }}
                >
                  {expandedWorkspaces[workspace.id] ? (
                    <ChevronDown className="w-4 h-4 text-default-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-default-400" />
                  )}
                  <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary font-bold">
                    {workspace.name.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-sm font-medium truncate">{workspace.name}</span>
                    <span className="text-xs text-default-400 truncate">
                      {workspace.is_template ? 'Шаблон' : 'Личный'}
                    </span>
                  </div>
                </div>

                {expandedWorkspaces[workspace.id] && (
                  <div className="flex flex-col ml-4 mt-2 border-l-2 border-default-100 pl-2 gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    {loading[workspace.id] ? (
                      <div className="text-xs text-default-400 p-2 italic">Загрузка...</div>
                    ) : (
                      <>
                        {/* Groups */}
                        {workspaceData[workspace.id]?.groups.map(group => (
                          <div key={group.id} className="flex flex-col">
                              <div 
                                className="flex items-center gap-2 px-2 py-1.5 hover:bg-default-100 rounded-lg cursor-pointer group"
                                onClick={() => router.push(`/spreadsheets?workspace_id=${workspace.id}&group_id=${group.id}`)}
                              >
                                <Folder className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
                                <span className="text-sm font-medium flex-1">{group.name}</span>
                                <Button isIconOnly size="sm" variant="light" className="opacity-0 group-hover:opacity-100">
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            {renderEntities(workspaceData[workspace.id]?.entities.filter(e => e.group_id === group.id) || [])}
                          </div>
                        ))}

                        {/* Entities not in groups */}
                        <div className="flex flex-col mt-1">
                          {renderEntities(workspaceData[workspace.id]?.entities.filter(e => !e.group_id) || [])}
                        </div>

                        {/* Quick actions for workspace */}
                        <div className="mt-2 pt-2 border-t border-default-100">
                          <Button 
                            fullWidth 
                            variant="light" 
                            size="sm" 
                            startContent={<Plus className="w-3 h-3" />}
                            className="justify-start px-2 text-default-500 h-8"
                          >
                            Новая сущность
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollShadow>
      </CardBody>
    </Card>
  );
};
