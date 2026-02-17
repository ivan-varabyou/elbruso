"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { MenuItem } from "./admin.menu";

interface AdminMenuProps {
  items: MenuItem[];
  isCollapsed: boolean;
}

export function AdminMenu({ items, isCollapsed }: AdminMenuProps) {
  return (
    <div className="space-y-px">
      {items.map((item) => (
        <AdminMenuItem key={item.label} item={item} isCollapsed={isCollapsed} depth={0} />
      ))}
    </div>
  );
}

function AdminMenuItem({
  item,
  isCollapsed,
  depth = 0,
}: {
  item: MenuItem;
  isCollapsed: boolean;
  depth?: number;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const isChildActive = (children: MenuItem[]): boolean => {
    return children.some((child) => {
      if (pathname === child.href) return true;
      if (child.children) return isChildActive(child.children);
      return false;
    });
  };

  const active = pathname === item.href || (hasChildren && isChildActive(item.children!));
  const showOpen = isOpen || active;

  const Icon = item.icon;

  if (hasChildren) {
    return (
      <div className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full items-center gap-1.5 rounded px-1.5 py-1.5 transition-colors ${
            active
              ? "text-zinc-900 font-medium"
              : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
          } ${isCollapsed ? "justify-center" : ""} ${depth > 0 ? "text-[12px] py-1" : "text-[13px]"}`}
        >
          <Icon className={`${depth > 0 ? "h-3.5 w-3.5" : "h-4 w-4"} flex-shrink-0`} />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.label}</span>
              <ChevronRight
                className={`h-3 w-3 text-zinc-400 transition-transform duration-200 ${
                  showOpen ? "rotate-90" : ""
                }`}
              />
            </>
          )}
        </button>

        {!isCollapsed && showOpen && (
          <div
            className={`${depth === 0 ? "ml-3 border-l border-zinc-200 pl-2" : "ml-2 border-l border-zinc-100 pl-1"} space-y-px mt-px`}
          >
            {item.children!.map((child) => (
              <AdminMenuItem
                key={child.label + child.href}
                item={child}
                isCollapsed={isCollapsed}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link href={item.href}>
      <div
        className={`flex items-center gap-1.5 rounded px-1.5 py-1.5 transition-colors ${
          pathname === item.href
            ? "bg-zinc-100 text-zinc-900 font-medium"
            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
        } ${isCollapsed ? "justify-center" : ""} ${depth > 0 ? "text-[12px] py-1" : "text-[13px]"}`}
      >
        <Icon className={`${depth > 0 ? "h-3.5 w-3.5" : "h-4 w-4"} flex-shrink-0`} />
        {!isCollapsed && <span>{item.label}</span>}
      </div>
    </Link>
  );
}
