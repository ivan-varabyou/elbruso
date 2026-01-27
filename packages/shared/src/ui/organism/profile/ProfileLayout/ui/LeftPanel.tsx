'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import {
    LayoutDashboard,
    Building2,
    Calendar,
    TrendingUp,
    Briefcase,
    Settings,
    ChevronLeft,
    ChevronRight,
    Plus,
    User,
    LogOut,
    GripVertical,
} from 'lucide-react';
import { WorkspaceTree, CreateWorkspaceModal } from '@/shared/ui';
import { useUserStore } from '@/shared/stores';

interface LeftPanelProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const navigationItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/organizations', icon: Building2, label: 'Организации' },
    { href: '/seasons', icon: Calendar, label: 'Сезоны' },
    { href: '/indicators', icon: TrendingUp, label: 'Индикаторы' },
    { href: '/workspaces', icon: Briefcase, label: 'Рабочие области' },
    { href: '/settings', icon: Settings, label: 'Настройки' },
];

const MIN_WIDTH = 180;
const MAX_WIDTH = 400;
const COLLAPSE_THRESHOLD = 100;

export function LeftPanel({ isCollapsed, onToggle }: LeftPanelProps) {
    const pathname = usePathname();
    const { user, fetchUser, logout } = useUserStore();
    const [width, setWidth] = useState(240);
    const [isResizing, setIsResizing] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;
            
            const newWidth = e.clientX;
            if (newWidth < COLLAPSE_THRESHOLD) {
                if (!isCollapsed) onToggle();
            } else if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
                setWidth(newWidth);
                if (isCollapsed) onToggle();
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, isCollapsed, onToggle]);

    return (
        <>
            <aside
                ref={panelRef}
                className="flex flex-col bg-white border-r border-zinc-200/60 relative"
                style={{ width: isCollapsed ? '40px' : `${width}px`, transition: isResizing ? 'none' : 'width 0.2s' }}
            >
                {/* Resize Handle */}
                <div
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/20 active:bg-blue-500/30 group z-10"
                    onMouseDown={() => setIsResizing(true)}
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="h-4 w-4 text-zinc-400" />
                    </div>
                </div>

                {/* Header */}
                <div className="flex h-[45px] items-center justify-between px-3 border-b border-zinc-100">
                    {!isCollapsed && (
                        <div className="flex items-center gap-1.5 px-0.5">
                            <div className="flex h-[22px] w-[22px] items-center justify-center rounded bg-zinc-900 text-[11px] font-bold text-white">
                                E
                            </div>
                            <span className="text-[14px] font-semibold text-zinc-900">Elbruso</span>
                        </div>
                    )}
                    <button
                        onClick={onToggle}
                        className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100 transition-colors"
                        aria-label={isCollapsed ? 'Развернуть' : 'Свернуть'}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
                        ) : (
                            <ChevronLeft className="h-3.5 w-3.5 text-zinc-500" />
                        )}
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-1.5 py-1.5">
                    {/* Create Workspace Button */}
                    {!isCollapsed && (
                        <div className="mb-2">
                            <button 
                                onClick={() => setIsCreateModalOpen(true)}
                                className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
                            >
                                <Plus className="h-3.5 w-3.5" />
                                <span>Создать рабочую область</span>
                            </button>
                        </div>
                    )}

                    {/* Workspaces Section */}
                    {!isCollapsed && (
                        <div className="mb-4">
                            <div className="mb-1 px-2 text-[11px] font-medium text-zinc-500 uppercase tracking-wide">
                                Рабочие области
                            </div>
                            <WorkspaceTree />
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="space-y-px">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link key={item.href} href={item.href}>
                                    <div
                                        className={`flex items-center gap-1.5 rounded px-1.5 py-1.5 text-[13px] transition-colors ${
                                            isActive
                                                ? 'bg-zinc-100 text-zinc-900 font-medium'
                                                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                                        } ${isCollapsed ? 'justify-center' : ''}`}
                                    >
                                        <Icon className="h-4 w-4 flex-shrink-0" />
                                        {!isCollapsed && <span>{item.label}</span>}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-zinc-100 px-1.5 py-1.5">
                    {!isCollapsed ? (
                        <div className="flex items-center gap-1.5 rounded px-2 py-2 hover:bg-zinc-50 transition-colors cursor-pointer">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-medium text-zinc-700">
                                {user?.first_name?.substring(0, 1).toUpperCase() || user?.email?.substring(0, 1).toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-[13px] font-medium text-zinc-900 truncate">
                                    {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.email || 'Loading...'}
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="flex h-5 w-5 items-center justify-center rounded hover:bg-zinc-100 transition-colors"
                                title="Выйти"
                            >
                                <LogOut className="h-3 w-3 text-zinc-500" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={logout}
                            className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100 transition-colors mx-auto"
                            title="Выйти"
                        >
                            <LogOut className="h-4 w-4 text-zinc-500" />
                        </button>
                    )}
                </div>
            </aside>

            <CreateWorkspaceModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </>
    );
}

