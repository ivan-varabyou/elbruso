import React from 'react';
import Image from 'next/image';
import { authConfig } from './auth.config';
import './auth-layout.css';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="auth-layout">
            <div className="auth-layout-left">
                <div className="auth-layout-content">{children}</div>
            </div>

            <div className="auth-layout-right">
                <Image
                    src={authConfig.backgrounds.login}
                    alt="Login background"
                    fill
                    priority
                    className="auth-layout-bg-image"
                    style={{ objectFit: 'cover' }}
                />
                {authConfig.gradientOverlay.enabled && (
                    <div className="auth-layout-gradient" />
                )}
            </div>
        </div>
    );
}
