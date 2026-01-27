'use client';

import { useState, useEffect } from 'react';
import { 
    X, 
    PlayCircle, 
    Loader2, 
    CheckCircle2, 
    AlertCircle, 
    Trophy, 
    ChevronRight, 
    ChevronLeft,
    Filter,
    Check
} from 'lucide-react';
import { Button } from '@/shared/ui';
import { referencesApi } from '@/shared/api/references';
import { cn } from '@/shared/lib/utils';
import type { Sport } from '@/shared/types';

interface GenerateIndicatorsModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

type Step = 'templates' | 'preview';

export function GenerateIndicatorsModal({ onClose, onSuccess }: GenerateIndicatorsModalProps) {
    const [step, setStep] = useState<Step>('templates');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [selectedSportId, setSelectedSportId] = useState<string>('');
    const [sports, setSports] = useState<Sport[]>([]);

    // Template states
    const [templates, setTemplates] = useState<any[]>([]);
    const [selectedTemplateIds, setSelectedTemplateIds] = useState<number[]>([]);
    const [fetchingTemplates, setFetchingTemplates] = useState(false);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const sportsData = await referencesApi.getSports();
                setSports(sportsData);
                // Initial fetch
                fetchTemplates('');
            } catch (err) {
                console.error('Failed to fetch initial data:', err);
            }
        };
        fetchInitialData();
    }, []);

    const fetchTemplates = async (sportId: string) => {
        setFetchingTemplates(true);
        try {
            const allTemplates = await referencesApi.getIndicatorTemplates();
            const filtered = sportId 
                ? allTemplates.filter(t => t.sport_id === Number(sportId))
                : allTemplates;
            
            setTemplates(filtered);
            setSelectedTemplateIds(filtered.map(t => t.id));
        } catch (err) {
            console.error('Failed to fetch templates:', err);
            setError('Не удалось загрузить шаблоны');
        } finally {
            setFetchingTemplates(false);
        }
    };

    const handleSportChange = (sportId: string) => {
        setSelectedSportId(sportId);
        fetchTemplates(sportId);
    };

    const handleNext = () => {
        if (step === 'templates') {
            setStep('preview');
        }
    };

    const handleBack = () => {
        if (step === 'preview') setStep('templates');
    };

    const toggleTemplate = (id: number) => {
        setSelectedTemplateIds(prev => 
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        );
    };

    const handleGenerate = async () => {
        setLoading(true);
        setStatus('idle');
        setError(null);
        try {
            await referencesApi.generateIndicators({
                templateIds: selectedTemplateIds,
                sportId: selectedSportId ? Number(selectedSportId) : undefined,
                overwrite: true
            });
            
            setStatus('success');
            setTimeout(() => {
                onSuccess();
                onClose();
            }, 2000);
        } catch (err: any) {
            setStatus('error');
            setError(err.message || 'Ошибка генерации');
        } finally {
            setLoading(false);
        }
    };

    const renderStepIcon = (s: Step, index: number) => {
        const isActive = step === s;
        const isCompleted = step === 'preview' && s === 'templates';
        
        return (
            <div className="flex items-center">
                <div className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    isActive ? "bg-blue-500 text-white shadow-lg shadow-blue-200" : 
                    isCompleted ? "bg-green-500 text-white" : "bg-zinc-100 text-zinc-400"
                )}>
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                {index < 1 && (
                    <div className={cn(
                        "h-[2px] w-8 mx-2",
                        isCompleted ? "bg-green-200" : "bg-zinc-100"
                    )} />
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-xl">
                            <PlayCircle className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900">Генератор индикаторов</h3>
                            <p className="text-[11px] text-zinc-400 uppercase tracking-wider font-bold">Универсальный каталог</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Progress & Quick Filters */}
                <div className="px-8 py-3 bg-zinc-50/50 flex items-center justify-between border-b border-zinc-100 shrink-0">
                    <div className="flex items-center">
                        {renderStepIcon('templates', 0)}
                        {renderStepIcon('preview', 1)}
                    </div>

                    {step === 'templates' && (
                        <div className="flex items-center gap-2">
                            <Trophy className="h-3.5 w-3.5 text-zinc-400" />
                            <select 
                                value={selectedSportId}
                                onChange={(e) => handleSportChange(e.target.value)}
                                className="bg-transparent text-xs font-semibold text-zinc-600 focus:outline-none cursor-pointer hover:text-blue-600 transition-colors"
                            >
                                <option value="">Все виды спорта</option>
                                {sports.map(s => (
                                    <option key={s.id} value={s.id}>{s.name_ru}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                            <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                                <CheckCircle2 className="h-12 w-12" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-xl font-bold text-zinc-900">Успешно запущено!</h4>
                                <p className="text-zinc-500 text-sm max-w-xs mx-auto">Индикаторы генерируются. Список обновится автоматически через мгновение.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {step === 'templates' && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <h4 className="font-semibold text-zinc-900">Выбор шаблонов</h4>
                                            <p className="text-sm text-zinc-500">Выберите шаблоны для генерации многомерных комбинаций.</p>
                                        </div>
                                        <div className="text-xs font-bold text-blue-600 px-2 py-1 bg-blue-50 rounded-lg border border-blue-100">
                                            Выбрано: {selectedTemplateIds.length}
                                        </div>
                                    </div>

                                    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                        {fetchingTemplates ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                                                <p className="text-sm text-zinc-400">Загрузка шаблонов...</p>
                                            </div>
                                        ) : templates.length > 0 ? (
                                            templates.map((template) => (
                                                <button
                                                    key={template.id}
                                                    onClick={() => toggleTemplate(template.id)}
                                                    className={cn(
                                                        "w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group",
                                                        selectedTemplateIds.includes(template.id) 
                                                            ? "bg-blue-50 border-blue-200 ring-4 ring-blue-500/5 shadow-sm" 
                                                            : "bg-white border-zinc-200 hover:border-zinc-300"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                                                            selectedTemplateIds.includes(template.id) ? "bg-blue-500 text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"
                                                        )}>
                                                            <Filter className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-zinc-900 text-sm group-hover:text-blue-700 transition-colors">
                                                                {template.name_ru || template.name}
                                                            </div>
                                                            <div className="text-[11px] text-zinc-500 mt-0.5">Шаблон кода: {template.code_pattern}</div>
                                                        </div>
                                                    </div>
                                                    <div className={cn(
                                                        "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                        selectedTemplateIds.includes(template.id) 
                                                            ? "bg-blue-500 border-blue-500 scale-110" 
                                                            : "border-zinc-200"
                                                    )}>
                                                        {selectedTemplateIds.includes(template.id) && <Check className="h-3 w-3 text-white" />}
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="py-20 text-center border-2 border-dashed border-zinc-100 rounded-3xl">
                                                <p className="text-zinc-400 text-sm">Шаблоны не найдены</p>
                                                {selectedSportId && (
                                                    <button onClick={() => handleSportChange('')} className="text-blue-600 text-xs mt-2 hover:underline">
                                                        Показать все шаблоны
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {step === 'preview' && (
                                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                                    <div className="space-y-1">
                                        <h4 className="font-semibold text-zinc-900">Подтверждение</h4>
                                        <p className="text-sm text-zinc-500">Система создаст индикаторы на основе выбранных шаблонов.</p>
                                    </div>

                                    <div className="bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden divide-y divide-zinc-100">
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 bg-white rounded-lg border border-zinc-200 flex items-center justify-center">
                                                    <Trophy className="h-4 w-4 text-zinc-400" />
                                                </div>
                                                <span className="text-sm text-zinc-600">Вид спорта</span>
                                            </div>
                                            <span className="text-sm font-bold text-zinc-900">
                                                {selectedSportId ? sports.find(s => String(s.id) === selectedSportId)?.name_ru : 'Все'}
                                            </span>
                                        </div>
                                        <div className="p-4 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 bg-white rounded-lg border border-zinc-200 flex items-center justify-center text-blue-500">
                                                    <Filter className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm text-zinc-600">Количество шаблонов</span>
                                            </div>
                                            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                                                {selectedTemplateIds.length} шт.
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 text-blue-800 text-xs leading-relaxed">
                                        <AlertCircle className="h-4 w-4 shrink-0" />
                                        <p>Будут сгенерированы все возможные комбинации Пола, Возраста и Дисциплины, указанные в выбранных шаблонах.</p>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 text-sm animate-in shake-in-1 duration-300">
                                    <AlertCircle className="h-5 w-5 shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-4 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                        {status !== 'success' && step !== 'templates' && (
                            <Button 
                                variant="outline" 
                                type="button" 
                                onClick={handleBack} 
                                disabled={loading}
                                className="h-10 gap-2 border-zinc-200 hover:bg-white"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Назад
                            </Button>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                        {status !== 'success' && (
                            <>
                                <Button 
                                    variant="outline" 
                                    type="button" 
                                    onClick={onClose} 
                                    disabled={loading}
                                    className="h-10 border-zinc-200"
                                >
                                    Отмена
                                </Button>
                                {step === 'preview' ? (
                                    <Button 
                                        variant="primary" 
                                        className="h-10 gap-2 px-8 shadow-lg shadow-blue-200" 
                                        onClick={handleGenerate}
                                        disabled={loading || selectedTemplateIds.length === 0}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Запуск...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 className="h-4 w-4" />
                                                Запустить генерацию
                                            </>
                                        )}
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="primary" 
                                        className="h-10 gap-2 px-8" 
                                        onClick={handleNext}
                                        disabled={step === 'templates' && selectedTemplateIds.length === 0}
                                    >
                                        Далее
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sub-component icon for Wand2
function Wand2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
      <path d="m14 7 3 3" />
      <path d="M5 6v4" />
      <path d="M19 14v4" />
      <path d="M10 2v2" />
      <path d="M7 8H3" />
      <path d="M21 16h-4" />
      <path d="M11 3H9" />
    </svg>
  );
}
