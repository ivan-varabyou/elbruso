import React, { forwardRef,SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, helperText, className = '', children, ...props }, ref) => {
        const hasError = !!error;

        return (
            <div className="input-wrapper">
                {label && (
                    <label className="input-label" htmlFor={props.id}>
                        {label}
                    </label>
                )}

                <div className="input-container">
                    <select
                        ref={ref}
                        className={`input ${hasError ? 'input-error' : ''} ${className}`}
                        aria-invalid={hasError}
                        aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
                        {...props}
                    >
                        {children}
                    </select>
                </div>

                {error && (
                    <p className="input-error-text" id={`${props.id}-error`} role="alert">
                        {error}
                    </p>
                )}

                {!error && helperText && (
                    <p className="input-helper-text" id={`${props.id}-helper`}>
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
