'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface Option {
    value: string;
    label: string;
    icon?: any;
}

interface FilterDropdownProps {
    options: Option[];
    selected: string[];
    onChange: (selected: string[]) => void;
    label: string;
    icon: any;
}

export function FilterDropdown({ options, selected, onChange, label, icon: Icon }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter(v => v !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all",
                    isOpen || selected.length > 0
                        ? "bg-white border-blue-500 text-blue-600 shadow-sm ring-1 ring-blue-500/20"
                        : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300"
                )}
            >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
                {selected.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">
                        {selected.length}
                    </span>
                )}
                <ChevronDown className={cn("ml-1 h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-zinc-200 rounded-xl shadow-xl z-50 p-1 animate-in fade-in zoom-in duration-200">
                    {options.map((option) => {
                        const isSelected = selected.includes(option.value);
                        const OptionIcon = option.icon;
                        return (
                            <button
                                key={option.value}
                                onClick={() => toggleOption(option.value)}
                                className={cn(
                                    "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors",
                                    isSelected ? "bg-blue-50 text-blue-700" : "text-zinc-600 hover:bg-zinc-50"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "flex h-4 w-4 items-center justify-center rounded border transition-all",
                                        isSelected ? "bg-blue-500 border-blue-500" : "border-zinc-300"
                                    )}>
                                        {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                                    </div>
                                    {OptionIcon && <OptionIcon className="h-4 w-4 opacity-70" />}
                                    <span>{option.label}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
