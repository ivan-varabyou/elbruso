import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, leftIcon, rightIcon, className = '', ...props }, ref) => {
        const hasError = !!error;

        return (
            <div className="input-wrapper">
                {label && (
                    <label className="input-label" htmlFor={props.id}>
                        {label}
                    </label>
                )}

                <div className="input-container">
                    {leftIcon && <div className="input-icon-left">{leftIcon}</div>}

                    <input
                        ref={ref}
                        className={`input ${hasError ? 'input-error' : ''} ${leftIcon ? 'input-with-left-icon' : ''} ${rightIcon ? 'input-with-right-icon' : ''} ${className}`}
                        aria-invalid={hasError}
                        aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
                        {...props}
                    />

                    {rightIcon && <div className="input-icon-right">{rightIcon}</div>}
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

Input.displayName = 'Input';
