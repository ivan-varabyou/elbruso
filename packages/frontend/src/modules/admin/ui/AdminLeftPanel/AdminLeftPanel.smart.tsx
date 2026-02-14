"use client";

import { useEffect, useRef, useState } from "react";
import { GripVertical, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@frontend/modules/admin/auth";
import { AdminMenu } from "../Menu";
import { adminMenu } from "../Menu/admin.menu";

interface LeftPanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const MIN_WIDTH = 180;
const MAX_WIDTH = 400;
const COLLAPSE_THRESHOLD = 100;

export function AdminLeftPanel({ isCollapsed, onToggle }: LeftPanelProps) {
  const pathname = usePathname();
  const { user, logout } = useAdminAuth();
  const [width, setWidth] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = e.clientX;
      if (newWidth < COLLAPSE_THRESHOLD) {
        if (!isCollapsed) onToggle();
      } else if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setWidth(newWidth);
        if (isCollapsed) onToggle();
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, isCollapsed, onToggle]);

  return (
    <>
      <aside
        ref={panelRef}
        className="flex flex-col bg-white border-r border-zinc-200/60 relative"
        style={{
          width: isCollapsed ? "40px" : `${width}px`,
          transition: isResizing ? "none" : "width 0.2s",
        }}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/20 active:bg-blue-500/30 group z-10"
          onMouseDown={() => setIsResizing(true)}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <GripVertical className="h-4 w-4 text-zinc-400" />
          </div>
        </div>

        <div className="flex h-[45px] items-center justify-between px-3 border-b border-zinc-100">
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 px-0.5">
              <div className="flex h-[22px] w-[22px] items-center justify-center rounded bg-zinc-900 text-[11px] font-bold text-white">
                E
              </div>
              <span className="text-[14px] font-semibold text-zinc-900">Elbruso Admin</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100 transition-colors"
            aria-label={isCollapsed ? "Развернуть" : "Свернуть"}
          >
            {isCollapsed ? (
              <span className="text-zinc-500">{">"}</span>
            ) : (
              <span className="text-zinc-500">{"<"}</span>
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-1.5 py-1.5">
          <AdminMenu items={adminMenu} isCollapsed={isCollapsed} />
        </div>

        <div className="border-t border-zinc-100 px-1.5 py-1.5">
          {!isCollapsed ? (
            <div className="flex items-center gap-1.5 rounded px-2 py-2 hover:bg-zinc-50 transition-colors cursor-pointer">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-medium text-zinc-700">
                {user?.name?.substring(0, 1).toUpperCase() ||
                  user?.email?.substring(0, 1).toUpperCase() ||
                  "A"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-zinc-900 truncate">
                  {user?.name || user?.email || "Admin"}
                </div>
                {user?.role && (
                  <div className="flex items-center gap-1 text-[10px] text-zinc-500">
                    <span className="font-black uppercase tracking-wider">
                      {user.role.toLowerCase().replace("_", " ")}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={logout}
                className="flex h-5 w-5 items-center justify-center rounded hover:bg-zinc-100 transition-colors"
                title="Выйти"
              >
                <LogOut className="h-3 w-3 text-zinc-500" />
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-zinc-100 transition-colors mx-auto"
              title="Выйти"
            >
              <LogOut className="h-4 w-4 text-zinc-500" />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
