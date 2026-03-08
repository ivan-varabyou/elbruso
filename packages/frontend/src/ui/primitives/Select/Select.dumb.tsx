import { cn } from "@frontend/lib";
import React, { forwardRef, SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, className = "", children, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-sm font-medium text-zinc-700" htmlFor={props.id}>
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <select
            ref={ref}
            className={cn(
              "w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900",
              "focus:border-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-300",
              "placeholder:text-zinc-400",
              "disabled:bg-zinc-50 disabled:text-zinc-400 disabled:cursor-not-allowed",
              hasError && "border-red-500 focus:border-red-500 focus:ring-red-200",
              className,
            )}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
            }
            {...props}
          >
            {children}
          </select>
        </div>

        {error && (
          <p className="text-sm text-red-600" id={`${props.id}-error`} role="alert">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-sm text-zinc-500" id={`${props.id}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
