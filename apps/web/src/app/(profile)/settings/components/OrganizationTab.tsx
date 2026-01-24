'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/shared/lib/auth';
import { apiClient } from '@/shared/api/client';
import { Building2, ChevronRight, ChevronDown, Shield, Users, Trophy } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button/Button';

interface OrgNode {
    id: number;
    name_ru: string;
    internal_code?: string;
    level_id: number;
    parent_id?: number | null;
    children: OrgNode[];
}

export function OrganizationTab() {
    const { user, setUser } = useAuth();
    const [tree, setTree] = useState<OrgNode | null>(null);
    const [loading, setLoading] = useState(true);
    const [allOrgs, setAllOrgs] = useState<any[]>([]); // For admin selection
    const [isAdmin, setIsAdmin] = useState(user?.role === 'ADMIN');

    useEffect(() => {
        const fetchData = async () => {
            if (!user?.organization_id) {
                setLoading(false);
                return;
            }
            try {
                const res = await apiClient.get(`/reference/organizations/${user.organization_id}/tree`);
                setTree(res.data);
                
                if (user.role === 'ADMIN') {
                    const allRes = await apiClient.get('/reference/organizations');
                    setAllOrgs(allRes.data);
                }
            } catch (error) {
                console.error('Fetch org tree error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user?.organization_id, user?.role]);

    const handleSwitchOrg = async (orgId: number) => {
        if (!confirm('Вы уверены, что хотите переключить текущую организацию для теста?')) return;
        try {
            const res = await apiClient.patch(`/users/${user?.id}/admin`, {
                organization_id: orgId
            });
            setUser(res.data);
            alert('Организация успешно изменена');
        } catch (error) {
            console.error('Switch org error:', error);
            alert('Ошибка при смене организации');
        }
    };

    const handleSwitchRole = async (role: string) => {
        try {
            const res = await apiClient.patch(`/users/${user?.id}/admin`, {
                role: role
            });
            setUser(res.data);
            setIsAdmin(role === 'ADMIN');
            alert(`Роль изменена на ${role}`);
        } catch (error) {
            console.error('Switch role error:', error);
        }
    };

    if (loading) return <div className="p-8 text-center animate-pulse text-zinc-400">Загрузка структуры организаций...</div>;

    return (
        <div className="space-y-8 py-4">
            {/* Admin Override Section */}
            {user?.role === 'ADMIN' && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-2 text-orange-800 font-bold mb-4">
                        <Shield className="h-5 w-5" />
                        Панель администратора (Тестирование)
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-orange-700 uppercase tracking-widest">Переключить роль</label>
                            <div className="flex gap-2">
                                <Button 
                                    size="sm" 
                                    variant={(user.role as string) === 'ADMIN' ? 'primary' : 'outline'}
                                    onClick={() => handleSwitchRole('ADMIN')}
                                >
                                    ADMIN
                                </Button>
                                <Button 
                                    size="sm" 
                                    variant={(user.role as string) === 'USER' ? 'primary' : 'outline'}
                                    onClick={() => handleSwitchRole('USER')}
                                >
                                    USER
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-orange-700 uppercase tracking-widest">Переключить организацию</label>
                            <select 
                                onChange={(e) => handleSwitchOrg(Number(e.target.value))}
                                value={user.organization_id || ''}
                                className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg text-sm"
                            >
                                <option value="">Без организации</option>
                                {allOrgs.map(o => (
                                    <option key={o.id} value={o.id}>{o.name_ru}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900">Ваша организация</h3>
                        <p className="text-sm text-zinc-500">Иерархия подчиненных структур</p>
                    </div>
                    {tree && (
                        <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-100 flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            {tree.name_ru}
                        </div>
                    )}
                </div>

                {!tree ? (
                    <div className="p-12 text-center bg-zinc-50 rounded-3xl border border-dashed border-zinc-200">
                        <Building2 className="h-12 w-12 text-zinc-300 mx-auto mb-4 opacity-20" />
                        <p className="text-zinc-500 font-medium">Вы не привязаны ни к одной организации</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <TreeNode node={tree} isRoot />
                    </div>
                )}
            </div>
        </div>
    );
}

function TreeNode({ node, depth = 0, isRoot = false }: { node: OrgNode, depth?: number, isRoot?: boolean }) {
    const [isOpen, setIsOpen] = useState(true);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className={cn("select-none", !isRoot && "ml-6 border-l border-zinc-100 pl-4 py-1")}>
            <div 
                className={cn(
                    "flex items-center gap-3 p-2 rounded-xl transition-colors cursor-pointer group",
                    isRoot ? "bg-blue-600 text-white shadow-lg" : "hover:bg-zinc-50"
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {hasChildren ? (
                        isOpen ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />
                    ) : (
                        <div className="w-4 h-4" />
                    )}
                    <Building2 className={cn("h-4 w-4 shrink-0 opacity-70", isRoot && "opacity-100")} />
                    <span className={cn("font-bold text-sm truncate", !isRoot && "text-zinc-700 group-hover:text-blue-600")}>
                        {node.name_ru}
                    </span>
                    {node.internal_code && (
                        <code className={cn("text-[9px] px-1.5 py-0.5 rounded uppercase font-mono tracking-tighter shrink-0", 
                            isRoot ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-blue-50 group-hover:text-blue-400")}>
                            {node.internal_code}
                        </code>
                    )}
                </div>
                
                {hasChildren && (
                    <div className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0", 
                        isRoot ? "bg-white/20 text-white" : "bg-zinc-50 text-zinc-400")}>
                        {node.children.length}
                    </div>
                )}
            </div>

            {hasChildren && isOpen && (
                <div className="mt-2 space-y-1 animate-in slide-in-from-left-2 duration-200">
                    {node.children.map(child => (
                        <TreeNode key={child.id} node={child} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}
