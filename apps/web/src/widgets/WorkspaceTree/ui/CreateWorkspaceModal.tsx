'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, Calendar, Layout, Trophy, Building2, ChevronDown, Plus } from 'lucide-react';

import { useWorkspaceStore, useReferenceStore, useTemplateStore, useUserStore } from '@/shared/stores';

import { motion, AnimatePresence } from 'framer-motion';

interface CreateWorkspaceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateWorkspaceModal({ isOpen, onClose }: CreateWorkspaceModalProps) {
    const { createWorkspace, isLoading: isCreating } = useWorkspaceStore();
    const { user } = useUserStore();
    const { 
        seasons, fetchSeasons, 
        isLoading: isRefsLoading 
    } = useReferenceStore();
    const { 
        templates, fetchTemplates, 
        applyTemplate,
        isLoading: isTemplatesLoading 
    } = useTemplateStore();

    const [name, setName] = useState('');
    const [seasonId, setSeasonId] = useState('');
    const [templateId, setTemplateId] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchSeasons();
        }
    }, [isOpen, fetchSeasons]);

    useEffect(() => {
        if (isOpen && user) {
            fetchTemplates({ 
                sport_id: user.sport_id, 
                organization_id: user.organization_id 
            });
        }
    }, [isOpen, user, fetchTemplates]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError('Название обязательно');
            return;
        }

        try {
            await createWorkspace({ 
                name, 
                season_id: seasonId || undefined 
            });
            
            onClose();
            resetForm();
        } catch (err: any) {
            setError(err?.message || 'Ошибка при создании');
        }
    };

    const resetForm = () => {
        setName('');
        setSeasonId('');
        setTemplateId('');
        setError(null);
    };

    const isLoading = isCreating || isRefsLoading || isTemplatesLoading;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl border border-zinc-200"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white">
                                    <Layout className="h-4 w-4" />
                                </div>
                                <h2 className="text-[16px] font-bold text-zinc-900">Новая рабочая область</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-1.5 hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 space-y-5">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="name" className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                        Название
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        autoFocus
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Напр. Аналитика сезона 2024/25"
                                        className="w-full rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all"
                                    />
                                    {error && <p className="text-[11px] text-red-500 font-medium">! {error}</p>}
                                </div>

                                {/* Season Select */}
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                        Сезон / Год
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={seasonId}
                                            onChange={(e) => setSeasonId(e.target.value)}
                                            className="w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-9 pr-8 py-2 text-sm focus:border-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-900/[0.03] transition-all"
                                        >
                                            <option value="">Выберите сезон...</option>
                                            {seasons.map(s => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </select>
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Template Selection */}
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                                        Использовать шаблон
                                    </label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {templates.length === 0 ? (
                                            <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50 flex flex-col items-center justify-center gap-1">
                                                <Layout className="h-5 w-5 text-zinc-300" />
                                                <p className="text-[11px] text-zinc-400 text-center italic">
                                                    Для вашего вида спорта и организации шаблонов не найдено
                                                </p>
                                            </div>
                                        ) : (
                                            templates.map(t => (
                                                <label 
                                                    key={t.id}
                                                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                                        templateId === t.id 
                                                        ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-900/10' 
                                                        : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                                                    }`}
                                                >
                                                    <input 
                                                        type="radio" 
                                                        name="template" 
                                                        className="hidden"
                                                        checked={templateId === t.id}
                                                        onChange={() => setTemplateId(t.id)}
                                                    />
                                                    <div className={`p-1.5 rounded-lg ${templateId === t.id ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                                                        <Layout className={`h-4 w-4 ${templateId === t.id ? 'text-white' : 'text-zinc-600'}`} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-[13px] font-bold leading-none mb-0.5">{t.name}</div>
                                                        <div className={`text-[11px] ${templateId === t.id ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                                            {t.description || 'Набор типовых таблиц и отчетов'}
                                                        </div>
                                                    </div>
                                                </label>
                                            ))
                                        )}
                                        <label 
                                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                                !templateId 
                                                ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg shadow-zinc-900/10' 
                                                : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                                            }`}
                                        >
                                            <input 
                                                type="radio" 
                                                name="template" 
                                                className="hidden"
                                                checked={!templateId}
                                                onChange={() => setTemplateId('')}
                                            />
                                            <div className={`p-1.5 rounded-lg ${!templateId ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                                                <Plus className={`h-4 w-4 ${!templateId ? 'text-white' : 'text-zinc-600'}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-[13px] font-bold leading-none mb-0.5">Пустая рабочая область</div>
                                                <div className={`text-[11px] ${!templateId ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                                    Создать чистую область без шаблонов
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <div className="flex justify-end gap-3 pt-4 border-t border-zinc-100">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl px-5 py-2 text-[14px] font-semibold text-zinc-600 hover:bg-zinc-100 transition-colors"
                                >
                                    Отмена
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading || !name.trim()}
                                    className="flex items-center gap-2 rounded-xl bg-zinc-900 px-7 py-2 text-[14px] font-bold text-white hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        'Создать'
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

