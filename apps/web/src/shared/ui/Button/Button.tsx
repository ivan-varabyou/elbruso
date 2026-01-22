import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'coral' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'btn-primary text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700',
      coral: 'btn-coral',
      dark: 'btn-primary',
      outline: 'btn-outline',
      ghost: 'h-[44px] px-6 text-gray-600 hover:bg-gray-50 active:bg-gray-100',
    };

    return (
      <button
        ref={ref}
        className={cn(
          className = 'h-[44px] px-6 inline-flex items-center justify-center whitespace-nowrap rounded-8 text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elbruso-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          className
        )}
        {...props}
        onClick={props.onClick}
      />
    );
  }
);

Button.displayName = 'Button';
