"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";

interface LogoV2Props {
  className?: string;
  size?: number;
}

export const LogoV2 = ({ className, size = 32 }: LogoV2Props) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 hover:scale-110"
      >
        {/* Secondary Peak (Smaller) */}
        <path d="M6 24L12 14L16 24H6Z" fill="#1A73E8" fillOpacity="0.3" />

        {/* Main Peak (Elbrus) + Growth Trend Line */}
        <path
          d="M10 26L18 10L22 18L28 6M28 6H24M28 6V10"
          stroke="#1A73E8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Base line for stability */}
        <path
          d="M4 26H20"
          stroke="#1A73E8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.2"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-[20px] font-black text-elbruso-text tracking-tighter uppercase">
          Elbruso
        </span>
        <span className="text-[10px] font-bold text-primary-blue tracking-[0.2em] uppercase ml-[2px]">
          Analytics
        </span>
      </div>
    </div>
  );
};
