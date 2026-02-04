import { cn } from "@elbruso/lib";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "coral" | "dark";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading, children, ...props }, ref) => {
    const variants = {
      primary: "btn-primary text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700",
      coral: "btn-coral",
      dark: "btn-primary",
      outline: "btn-outline",
      ghost: "h-[44px] px-6 text-gray-600 hover:bg-gray-50 active:bg-gray-100",
    };

    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={cn(
          "h-[44px] px-6 inline-flex items-center justify-center whitespace-nowrap rounded-8 text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elbruso-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
          variants[variant],
          className,
        )}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit">
            <svg
              className="animate-spin h-5 w-5 text-current"
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
        <span className={cn(loading && "opacity-0")}>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
