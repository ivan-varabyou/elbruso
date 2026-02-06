'use client';

import { useWorkspaceStore } from '@frontend/stores';
import { ChevronRight, FileText, History, MoreHorizontal,Share2 } from 'lucide-react';

interface TableHeaderProps {
    tableName: string;
    description?: string;
    workspaceId: string;
}

export function TableHeader({ tableName, description, workspaceId }: TableHeaderProps) {
    const { workspaces } = useWorkspaceStore();
    const workspace = workspaces.find(w => w.id === workspaceId);

    return (
        <div className="border-b border-zinc-100 bg-white px-4 py-2">
            <div className="flex flex-col gap-1">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-[13px] text-zinc-500">
                    <span className="hover:text-zinc-900 cursor-pointer">Рабочие области</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="hover:text-zinc-900 cursor-pointer">{workspace?.name || 'Workspace'}</span>
                </div>

                {/* Title and Actions */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 shadow-sm border border-zinc-200/50">
                            <FileText className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">{tableName}</h1>
                            {description && (
                                <p className="mt-1 text-sm text-zinc-500 leading-relaxed max-w-2xl">
                                    {description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Secondary Actions */}
                    <div className="flex items-center gap-2">
                        <button className="flex h-8 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900">
                            <Share2 className="h-4 w-4" />
                            <span>Поделиться</span>
                        </button>
                        <button className="flex h-8 items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 text-[13px] font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900">
                            <History className="h-4 w-4" />
                            <span>История</span>
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900">
                            <MoreHorizontal className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
