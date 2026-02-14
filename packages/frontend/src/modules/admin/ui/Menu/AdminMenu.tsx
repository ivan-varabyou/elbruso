"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminMenuProps {
  items: Array<{
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }>;
  isCollapsed: boolean;
}

export function AdminMenu({ items, isCollapsed }: AdminMenuProps) {
  const pathname = usePathname();

  return (
    <div className="space-y-px">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={`flex items-center gap-1.5 rounded px-1.5 py-1.5 text-[13px] transition-colors ${
                isActive
                  ? "bg-zinc-100 text-zinc-900 font-medium"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
              } ${isCollapsed ? "justify-center" : ""}`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
