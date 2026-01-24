import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/shared/lib/utils';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'ghost' | 'subtle';
    size?: 'sm' | 'md';
    active?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ className, variant = 'ghost', size = 'md', active, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    // Base styles
                    'inline-flex items-center justify-center rounded-md transition-colors',
                    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400',
                    'disabled:pointer-events-none disabled:opacity-50',
                    
                    // Variant styles
                    variant === 'ghost' && [
                        'hover:bg-gray-100 active:bg-gray-200',
                        active && 'bg-gray-100',
                    ],
                    variant === 'subtle' && [
                        'hover:bg-gray-50 active:bg-gray-100',
                        active && 'bg-gray-50',
                    ],
                    
                    // Size styles
                    size === 'sm' && 'h-7 w-7 text-sm',
                    size === 'md' && 'h-8 w-8',
                    
                    className
                )}
                {...props}
            >
                {children}
            </button>
        );
    }
);

IconButton.displayName = 'IconButton';
