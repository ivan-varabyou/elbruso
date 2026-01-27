'use client';

import { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { Button, Input, Select } from '@/shared/ui';
import { referencesApi } from '@/shared/api/references';
import type { Indicator } from '@/shared/types';

interface CreateIndicatorModalProps {
    onClose: () => void;
    onSuccess: (indicator: Indicator) => void;
}

export function CreateIndicatorModal({ onClose, onSuccess }: CreateIndicatorModalProps) {
    const [formData, setFormData] = useState({
        name_ru: '',
        code: '',
        weight: 1.0,
        value_type: 'number'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const result = await referencesApi.createIndicator(formData);
            onSuccess(result as Indicator);
            onClose();
        } catch (err: any) {
            setError(err.message || 'Ошибка при создании индикатора');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
                    <h3 className="font-semibold text-zinc-900">Создать индикатор</h3>
                    <button onClick={onClose} className="p-1 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-red-700 text-sm">
                            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <Input
                        label="Название (RU)"
                        placeholder="Например: Количество тренеров..."
                        required
                        value={formData.name_ru}
                        onChange={(e) => setFormData({ ...formData, name_ru: e.target.value })}
                    />

                    <Input
                        label="Код"
                        placeholder="FED_COACHES_COUNT"
                        required
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase().replace(/\s/g, '_') })}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Вес"
                            type="number"
                            step="0.1"
                            value={formData.weight}
                            onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                        />
                        <Select
                            label="Тип значения"
                            value={formData.value_type}
                            onChange={(e) => setFormData({ ...formData, value_type: e.target.value })}
                        >
                            <option value="number">Число</option>
                            <option value="boolean">Логическое</option>
                            <option value="decimal">Дробное</option>
                        </Select>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 mt-6 -mx-6 px-6 pt-4">
                        <Button variant="outline" type="button" onClick={onClose} disabled={loading}>
                            Отмена
                        </Button>
                        <Button variant="primary" type="submit" className="gap-2" disabled={loading}>
                            <Save className="h-4 w-4" />
                            {loading ? 'Создание...' : 'Сохранить'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
