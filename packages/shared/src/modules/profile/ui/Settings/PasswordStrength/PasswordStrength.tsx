'use client';
import './PasswordStrength.css';

import React, { useMemo } from 'react';

export interface PasswordStrengthProps {
    password: string;
}

interface PasswordCriteria {
    label: string;
    test: (password: string) => boolean;
}

const criteria: PasswordCriteria[] = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'One lowercase letter', test: (p) => /[a-z]/.test(p) },
    { label: 'One number', test: (p) => /\d/.test(p) },
    { label: 'One special character', test: (p) => /[@$!%*?&]/.test(p) },
];

export function PasswordStrength({ password }: PasswordStrengthProps) {
    const { strength, passedCriteria, strengthLabel, strengthColor } = useMemo(() => {
        const passed = criteria.filter((c) => c.test(password)).length;
        const total = criteria.length;
        const percentage = (passed / total) * 100;

        let label = 'Weak';
        let color = '#EF4444'; // red

        if (percentage >= 80) {
            label = 'Strong';
            color = '#10B981'; // green
        } else if (percentage >= 60) {
            label = 'Good';
            color = '#F59E0B'; // yellow
        } else if (percentage >= 40) {
            label = 'Fair';
            color = '#F59E0B'; // yellow
        }

        return {
            strength: percentage,
            passedCriteria: passed,
            strengthLabel: label,
            strengthColor: color,
        };
    }, [password]);

    if (!password) return null;

    return (
        <div className="password-strength">
            <div className="password-strength-bar-container">
                <div
                    className="password-strength-bar"
                    style={{
                        width: `${strength}%`,
                        backgroundColor: strengthColor,
                    }}
                />
            </div>

            <div className="password-strength-info">
                <span className="password-strength-label" style={{ color: strengthColor }}>
                    {strengthLabel}
                </span>
                <span className="password-strength-count">
                    {passedCriteria}/{criteria.length} criteria met
                </span>
            </div>

            <ul className="password-criteria-list">
                {criteria.map((criterion, index) => {
                    const passed = criterion.test(password);
                    return (
                        <li
                            key={index}
                            className={`password-criterion ${passed ? 'password-criterion-passed' : ''}`}
                        >
                            <span className="password-criterion-icon">{passed ? '✓' : '○'}</span>
                            <span className="password-criterion-label">{criterion.label}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
