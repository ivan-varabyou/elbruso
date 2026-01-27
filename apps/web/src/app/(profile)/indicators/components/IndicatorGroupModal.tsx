'use client';

import { useState, useEffect } from 'react';
import { 
    X, 
    Layers, 
    Check,
    AlertCircle,
    Trophy
} from 'lucide-react';
import { Button } from '@/shared/ui';
import { referencesApi } from '@/shared/api/references';
import type { IndicatorGroup, Sport } from '@/shared/types';
import { cn } from '@/shared/lib/utils';

interface Props {
    group: IndicatorGroup | null;
    onClose: () => void;
    onSuccess: () => void;
}

export function IndicatorGroupModal({ group, onClose, onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [sports, setSports] = useState<Sport[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name_ru: group?.name_ru || '',
        code: group?.code || '',
        description: group?.description || '',
        sport_id: group?.sport_id || null,
        sort_order: group?.sort_order || 0
    });

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const data = await referencesApi.getSports();
                setSports(data);
            } catch (err) {
                console.error('Failed to fetch sports:', err);
            }
        };
        fetchSports();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (group) {
                await referencesApi.updateIndicatorGroup(group.id, formData as any);
            } else {
                await referencesApi.createIndicatorGroup(formData as any);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Произошла ошибка при сохранении');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
            
            <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-8 py-6 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
                            <Layers className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900">
                                {group ? 'Редактировать группу' : 'Новая группа индикаторов'}
                            </h2>
                            <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mt-0.5">Классификация и группировка</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/50 rounded-xl transition-all"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">
                                Название группы
                            </label>
                            <input
                                required
                                value={formData.name_ru}
                                onChange={e => setFormData(prev => ({ ...prev, name_ru: e.target.value }))}
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm font-medium"
                                placeholder="Например: Маркетинг и PR"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">
                                Технический код
                            </label>
                            <input
                                required
                                value={formData.code}
                                onChange={e => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase().replace(/\s/g, '_') }))}
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none font-mono text-xs focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                placeholder="MARKETING_GROUP"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">
                                Описание (необязательно)
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm min-h-[100px] resize-none"
                                placeholder="Опишите назначение данной группы..."
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 ml-1">
                                Вид спорта (необязательно)
                            </label>
                            <div className="relative group/select">
                                <Trophy className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within/select:text-blue-500 transition-colors" />
                                <select
                                    value={formData.sport_id || ''}
                                    onChange={e => setFormData(prev => ({ ...prev, sport_id: e.target.value ? Number(e.target.value) : null }))}
                                    className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm appearance-none"
                                >
                                    <option value="">Все виды спорта (Глобальная)</option>
                                    {sports.map(s => (
                                        <option key={s.id} value={s.id}>{s.name_ru}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 h-12 rounded-2xl font-bold"
                            onClick={onClose}
                        >
                            Отмена
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            loading={loading}
                            className="flex-[2] h-12 rounded-2xl font-bold shadow-lg shadow-blue-200/50"
                        >
                            {loading ? 'Сохранение...' : (group ? 'Сохранить изменения' : 'Создать группу')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
