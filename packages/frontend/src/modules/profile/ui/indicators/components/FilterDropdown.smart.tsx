"use client";

import { cn } from "@frontend/lib";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Checkbox,
} from "@frontend/ui/primitives";
import { ChevronDown } from "lucide-react";
import { Key, useState } from "react";

interface Option {
  value: string;
  label: string;
  icon?: React.ElementType;
}

interface FilterDropdownProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  label: string;
  icon: React.ElementType;
}

export function FilterDropdown({
  options,
  selected,
  onChange,
  label,
  icon: Icon,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  console.log("[FilterDropdown] Render", { isOpen, selectedCount: selected.length });

  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    console.log("[FilterDropdown] Selection changed", {
      value,
      action: selected.includes(value) ? "removed" : "added",
      newSelected,
    });

    onChange(newSelected);
  };

  const allSelected = selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = () => {
    const newSelected = allSelected ? [] : options.map((o) => o.value);
    console.log("[FilterDropdown] Toggle all", { allSelected, newSelected });
    onChange(newSelected);
  };

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
      <DropdownTrigger>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all",
            isOpen || selected.length > 0
              ? "bg-white border-default-400 text-default-foreground shadow-sm"
              : "bg-white border-default-200 text-default-600 hover:border-default-300",
          )}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
          {selected.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 bg-default-100 text-default-700 rounded text-[10px] font-bold">
              {selected.length}
            </span>
          )}
          <ChevronDown
            className={cn("ml-1 h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")}
          />
        </button>
      </DropdownTrigger>

      <DropdownMenu
        items={[
          {
            key: "select-all",
            value: "select-all",
            label: "Выбрать все",
            onClick: toggleAll,
            isSelected: allSelected,
            isIndeterminate: someSelected,
          },
          ...options.map((option) => ({
            key: option.value,
            value: option.value,
            label: option.label,
            icon: option.icon,
            onClick: () => toggleOption(option.value),
            isSelected: selected.includes(option.value),
          })),
        ]}
        onAction={(key: Key) => {
          const allItems = [
            { key: "select-all", onClick: toggleAll },
            ...options.map((o) => ({ key: o.value, onClick: () => toggleOption(o.value) })),
          ];
          const item = allItems.find((i) => i.key === key);
          if (item?.onClick) item.onClick();
        }}
        className="w-56"
      >
        {(item: Record<string, unknown>) => (
          <DropdownItem
            key={item.key as string}
            className={cn(
              item.key !== "select-all" && options.length > 0 && item.key !== options[0]?.value
                ? "mt-1 pt-1 border-t border-default-200"
                : "",
            )}
            startContent={
              "isSelected" in item ? (
                <Checkbox
                  isSelected={item.isSelected as boolean}
                  isIndeterminate={item.isIndeterminate as boolean}
                />
              ) : null
            }
          >
            {item.label as string}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
