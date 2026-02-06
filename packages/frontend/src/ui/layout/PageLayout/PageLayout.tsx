import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface PageLayoutProps {
    title: string;
    icon: LucideIcon;
    children?: ReactNode;
    description?: string;
    actions?: ReactNode;
}



export function PageLayout({ title, icon: Icon, children, description, actions }: PageLayoutProps) {

    return (
        <div className="h-full">
            {/* Page Header */}
            <div className="border-b border-zinc-100 px-4 py-2">
                <div className="flex h-9 items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                            <Icon className="h-4 w-4" />
                        </div>
                        <h1 className="text-lx font-medium text-zinc-900 tracking-tight">{title}</h1>
                    </div>
                    {actions && (
                        <div className="flex items-center gap-2">
                            {actions}
                        </div>
                    )}
                </div>

            </div>

            {/* Page Content */}
            <div className="px-4 py-2">
                {description && (
                    <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
                        {description}
                    </p>
                )}
                {children}
            </div>
        </div>
    );
}
