import React from "react";
import { cn } from "@frontend/lib";
import { ButtonHTMLAttributes, forwardRef, isValidElement, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "coral" | "dark";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary: "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950",
      secondary:
        "bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-100",
      outline:
        "bg-transparent text-zinc-700 border border-zinc-200 hover:bg-zinc-50 active:bg-zinc-100",
      ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100 active:bg-zinc-200",
      coral: "bg-coral-500 text-white hover:bg-coral-600 active:bg-coral-700",
      dark: "bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950",
    };

    const sizes = {
      sm: "h-8 px-3 py-1.5 text-xs gap-1.5",
      md: "h-9 px-3.5 py-2 text-sm gap-2",
      lg: "h-10 px-4 py-2 text-base gap-2",
    };

    const iconSizes = {
      sm: "h-3.5 w-3.5",
      md: "h-4 w-4",
      lg: "h-4 w-4",
    };

    const isIconOnly =
      children &&
      isValidElement(children) &&
      typeof children === "object" &&
      children !== null &&
      "type" in children &&
      (children.type === "svg" ||
        (children.type as React.ComponentType)?.displayName?.includes("Icon") ||
        (children.props as { className?: string })?.className?.includes("h-"));

    const renderIcon = (icon: ReactNode, position: "left" | "right" | "center") => {
      if (!icon) return null;

      if (isValidElement(icon)) {
        const iconElement = icon as React.ReactElement<{ className?: string }>;
        const iconClass = iconElement.props.className || "";
        const newClass = iconClass.includes("h-")
          ? iconClass
          : `${iconClass} ${iconSizes[size]}`.trim();

        return (
          <span
            className={`inline-flex shrink-0 ${position === "center" ? "mr-2" : ""}`}
            data-position={position}
          >
            {newClass !== iconClass
              ? React.cloneElement(iconElement, { className: newClass })
              : icon}
          </span>
        );
      }
      return <span className="inline-flex shrink-0">{icon}</span>;
    };

    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit">
            <svg
              className="animate-spin h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
        <span
          className={cn(
            "inline-flex items-center gap-2",
            loading && "opacity-0",
            isIconOnly ? "gap-0" : "",
          )}
        >
          {leftIcon && renderIcon(leftIcon, "left")}
          {isIconOnly ? renderIcon(children, "center") : <span>{children}</span>}
          {rightIcon && renderIcon(rightIcon, "right")}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";
