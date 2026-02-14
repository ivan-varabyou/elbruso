import { LucideIcon, Plus } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "@frontend/ui/primitives";

interface PageLayoutProps {
  title: string;
  icon: LucideIcon;
  children?: ReactNode;
  description?: string;
  actions?: ReactNode;
  onAddClick?: () => void;
}

export function ProfilePageLayout({
  title,
  icon: Icon,
  children,
  description,
  actions,
  onAddClick,
}: PageLayoutProps) {
  return (
    <div className="h-full">
      <div className="border-b border-zinc-100 px-4 py-1">
        <div className="flex h-9 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
              <Icon className="h-4 w-4" />
            </div>
            <h1 className="text-lx font-medium text-zinc-900 tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {onAddClick && (
              <Button variant="solid" size="sm" onPress={onAddClick}>
                <Plus className="h-4 w-4" />
                Добавить
              </Button>
            )}
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        {description && (
          <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
