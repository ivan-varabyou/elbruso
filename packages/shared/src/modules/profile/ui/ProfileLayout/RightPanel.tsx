'use client';

import { GripVertical,Send, Sparkles, X } from 'lucide-react';
import { useEffect,useRef, useState } from 'react';

interface RightPanelProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const MIN_WIDTH = 280;
const MAX_WIDTH = 600;
const COLLAPSE_THRESHOLD = 150;

export function RightPanel({ isCollapsed, onToggle }: RightPanelProps) {
    const [message, setMessage] = useState('');
    const [width, setWidth] = useState(360);
    const [isResizing, setIsResizing] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !panelRef.current) return;
            
            const newWidth = window.innerWidth - e.clientX;
            
            if (newWidth < COLLAPSE_THRESHOLD) {
                // Keep it open or handle threshold logic here
            } else if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
                setWidth(newWidth);
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
    }, [isResizing]);

    return (
        <>
            {/* Floating Toggle Button - Always visible or only when collapsed? 
                User asked to move the icon to the corner, usually for opening. */}
            {isCollapsed && (
                <button
                    onClick={onToggle}
                    className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition-all hover:scale-110 active:scale-95 hover:bg-zinc-800"
                    aria-label="Открыть AI-ассистента"
                >
                    <Sparkles className="h-6 w-6" />
                </button>
            )}

            {/* AI Assistant Side Panel */}
            {!isCollapsed && (
                <aside 
                    ref={panelRef}
                    className="fixed inset-y-0 right-0 z-40 flex flex-col border-l border-zinc-200/60 bg-white shadow-2xl transition-all duration-300 ease-in-out"
                    style={{ 
                        width: `${width}px`,
                        transform: isCollapsed ? 'translateX(100%)' : 'translateX(0)',
                    }}
                >
                    {/* Resize Handle */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-zinc-900/10 active:bg-zinc-900/20 group z-10"
                        onMouseDown={() => setIsResizing(true)}
                    >
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="h-4 w-4 text-zinc-400" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="flex h-11 items-center justify-between px-3 border-b border-zinc-100 bg-white">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-zinc-600" />
                            <span className="text-sm font-semibold text-zinc-900">AI Ассистент</span>
                        </div>
                        <button
                            onClick={onToggle}
                            className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-zinc-100 transition-colors text-zinc-500"
                            aria-label="Закрыть"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-auto p-4">
                        <div className="space-y-4">
                            <div className="rounded-lg bg-zinc-50 border border-zinc-100 p-3">
                                <p className="text-sm text-zinc-700 leading-relaxed">
                                    Привет! Я AI-ассистент Elbruso. Могу помочь с созданием таблиц,
                                    заполнением данных, построением графиков и предложением критериев
                                    оценки.
                                </p>
                            </div>
                            <div className="text-center text-xs text-zinc-400">
                                Начните диалог, чтобы я мог вам помочь
                            </div>
                        </div>
                    </div>

                    {/* Input */}
                    <div className="border-t border-zinc-100 p-3 bg-white">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Напишите сообщение..."
                                className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300"
                            />
                            <button
                                className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-900 text-white transition-colors hover:bg-zinc-800 disabled:opacity-40"
                                disabled={!message.trim()}
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                        <p className="mt-2 text-[11px] text-zinc-400 leading-relaxed">
                            Изменения будут показаны в режиме preview
                        </p>
                    </div>
                </aside>
            )}
        </>
    );
}


