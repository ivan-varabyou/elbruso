"use client";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Option {
  value: string;
  label: string;
  icon?: React.ElementType;
}

interface FilterDropdownDumbProps {
  options: Option[];
  selected: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  label: string;
  icon: React.ElementType;
}

export function FilterDropdownDumb({
  options,
  selected,
  isOpen,
  onToggle,
  onSelect,
  label,
  icon: Icon,
}: FilterDropdownDumbProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onToggle]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={onToggle}
        className={`
          flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all
          ${
            isOpen || selected.length > 0
              ? "bg-white border-default-400 text-default-foreground shadow-sm"
              : "bg-white border-default-200 text-default-600 hover:border-default-300"
          }
        `}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
        {selected.length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 bg-default-100 text-default-700 rounded text-[10px] font-bold">
            {selected.length}
          </span>
        )}
        <ChevronDown
          className={`ml-1 h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-default-200 z-50 p-1">
          {options.map((option) => {
            const isSelected = selected.includes(option.value);
            const OptionIcon = option.icon;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  console.log("[FilterDropdown] Option selected", {
                    value: option.value,
                    label: option.label,
                  });
                }}
                className={`
                  flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors
                  ${isSelected ? "bg-default-100 text-default-foreground" : "text-default-600 hover:bg-default-50"}
                `}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`
                      flex h-4 w-4 items-center justify-center rounded border transition-all
                      ${isSelected ? "bg-default-400 border-default-400" : "border-default-300"}
                    `}
                  >
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
