'use client';

import { useState } from 'react';
import { PageLayout } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import { User, Shield, Building2, ChevronRight } from 'lucide-react';
import { ProfileTab } from './components/ProfileTab';
import { SecurityTab } from './components/SecurityTab';
import { OrganizationTab } from './components/OrganizationTab';

type TabType = 'profile' | 'security' | 'organization';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('profile');

    const tabs = [
        { id: 'profile', label: 'Профиль', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
        { id: 'security', label: 'Безопасность', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { id: 'organization', label: 'Организация', icon: Building2, color: 'text-purple-500', bg: 'bg-purple-50' },
    ] as const;

    return (
        <PageLayout title="Настройки" icon={Shield}>
            <div className="max-w-6xl mx-auto space-y-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">
                            <span>Настройки Системы</span>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-zinc-900">{tabs.find(t => t.id === activeTab)?.label}</span>
                        </div>
                        <h1 className="text-4xl font-black text-zinc-900 tracking-tight">
                            Управление <span className="text-blue-600">аккаунтом</span>
                        </h1>
                        <p className="text-zinc-500 max-w-lg font-medium">
                            Персонализируйте свой профиль, настройте параметры безопасности и управляйте своей организацией.
                        </p>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="relative px-4">
                    <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-100 rounded-2xl w-fit border border-zinc-200/50 shadow-inner">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                                        isActive 
                                            ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200" 
                                            : "text-zinc-500 hover:text-zinc-800 hover:bg-white/50"
                                    )}
                                >
                                    <div className={cn("p-1 rounded-lg", isActive ? tab.bg : "bg-zinc-200")}>
                                        <Icon className={cn("h-4 w-4", isActive ? tab.color : "text-zinc-400")} />
                                    </div>
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tab Content */}
                <div className="px-4 pb-20 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {activeTab === 'profile' && <ProfileTab />}
                    {activeTab === 'security' && <SecurityTab />}
                    {activeTab === 'organization' && <OrganizationTab />}
                </div>
            </div>
        </PageLayout>
    );
}
