'use client';

import { useEffect, useState } from 'react';

interface RegionalStat {
    label: string;
    baseValue: number;
    variance: number;
    suffix: string;
    decimals?: number;
    trend?: 'up' | 'down' | 'stable';
}

const regionalStats: RegionalStat[] = [
    {
        label: 'Regions Analyzed',
        baseValue: 85,
        variance: 0,
        suffix: '',
        decimals: 0,
        trend: 'stable'
    },
    {
        label: 'Data Accuracy',
        baseValue: 98.5,
        variance: 0.5,
        suffix: '%',
        decimals: 1,
        trend: 'up'
    },
    {
        label: 'Insights Generated',
        baseValue: 1247,
        variance: 50,
        suffix: '',
        decimals: 0,
        trend: 'up'
    },
    {
        label: 'Performance Score',
        baseValue: 94,
        variance: 3,
        suffix: '/100',
        decimals: 0,
        trend: 'up'
    },
];

export function AuthStats() {
    const [values, setValues] = useState<number[]>(regionalStats.map(s => s.baseValue));

    useEffect(() => {
        const interval = setInterval(() => {
            setValues(regionalStats.map(stat => {
                if (stat.variance === 0) return stat.baseValue;
                const random = Math.random() * 2 - 1; // -1 to 1
                const change = random * stat.variance;
                return stat.baseValue + change;
            }));
        }, 2500); // Update every 2.5 seconds

        return () => clearInterval(interval);
    }, []);

    const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up': return '↗';
            case 'down': return '↘';
            case 'stable': return '→';
            default: return '';
        }
    };

    const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up': return '#4ADE80';
            case 'down': return '#F87171';
            case 'stable': return '#60A5FA';
            default: return '#FFFFFF';
        }
    };

    return (
        <div className="auth-stats">
            <div className="auth-stats-header">
                <h3 className="auth-stats-title">Regional Analytics Platform</h3>
                <p className="auth-stats-subtitle">Real-time insights across regions</p>
            </div>

            <div className="auth-stats-grid">
                {regionalStats.map((stat, index) => (
                    <div key={index} className="auth-stat-item">
                        <div className="auth-stat-trend" style={{ color: getTrendColor(stat.trend) }}>
                            {getTrendIcon(stat.trend)}
                        </div>
                        <div className="auth-stat-value">
                            {values[index].toFixed(stat.decimals || 0)}
                            <span className="auth-stat-suffix">{stat.suffix}</span>
                        </div>
                        <div className="auth-stat-label">{stat.label}</div>
                        <div className="auth-stat-indicator">
                            <div className="auth-stat-pulse" style={{ background: getTrendColor(stat.trend) }}>
                                <div className="auth-stat-pulse-ring" style={{ borderColor: getTrendColor(stat.trend) }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="auth-stats-footer">
                <div className="auth-stats-badge">
                    <span className="auth-stats-badge-icon">📊</span>
                    <span>AI-Powered Analysis</span>
                </div>
                <div className="auth-stats-badge">
                    <span className="auth-stats-badge-icon">🎯</span>
                    <span>Smart Comparisons</span>
                </div>
            </div>
        </div>
    );
}
