import { cn } from "@frontend/lib";
import { ReactNode } from "react";

export interface SidebarProps {
  children: ReactNode;
  isCollapsed?: boolean;
  width?: "narrow" | "normal" | "wide";
  className?: string;
}

const widthClasses = {
  narrow: "w-16",
  normal: "w-64",
  wide: "w-80",
};

export function Sidebar({ children, isCollapsed, width = "normal", className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-gray-200 bg-white transition-all duration-200",
        isCollapsed ? widthClasses.narrow : widthClasses[width],
        className,
      )}
    >
      {children}
    </aside>
  );
}

export interface SidebarHeaderProps {
  children: ReactNode;
  className?: string;
}

export function SidebarHeader({ children, className }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-12 items-center justify-between px-3 border-b border-gray-100",
        className,
      )}
    >
      {children}
    </div>
  );
}

export interface SidebarContentProps {
  children: ReactNode;
  className?: string;
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  return <div className={cn("flex-1 overflow-y-auto px-2 py-2", className)}>{children}</div>;
}

export interface SidebarFooterProps {
  children: ReactNode;
  className?: string;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return <div className={cn("border-t border-gray-100 px-2 py-2", className)}>{children}</div>;
}

export interface SidebarSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function SidebarSection({ title, children, className }: SidebarSectionProps) {
  return (
    <div className={cn("mb-4", className)}>
      {title && (
        <div className="mb-1 px-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </div>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

export interface SidebarItemProps {
  icon?: ReactNode;
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function SidebarItem({ icon, children, active, onClick, className }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        "hover:bg-gray-100 active:bg-gray-200",
        active && "bg-gray-100 font-medium",
        className,
      )}
    >
      {icon && <span className="flex-shrink-0 text-gray-600">{icon}</span>}
      <span className="flex-1 truncate text-left">{children}</span>
    </button>
  );
}
