import { cn } from "@frontend/lib";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "subtle";
  size?: "sm" | "md";
  active?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = "ghost", size = "md", active, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-md transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400",
          "disabled:pointer-events-none disabled:opacity-50",

          // Variant styles
          variant === "ghost" &&
            (active
              ? "hover:bg-gray-100 active:bg-gray-200 bg-gray-100"
              : "hover:bg-gray-100 active:bg-gray-200"),
          variant === "subtle" &&
            (active
              ? "hover:bg-gray-50 active:bg-gray-100 bg-gray-50"
              : "hover:bg-gray-50 active:bg-gray-100"),

          // Size styles
          size === "sm" && "h-7 w-7 text-sm",
          size === "md" && "h-8 w-8",

          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
