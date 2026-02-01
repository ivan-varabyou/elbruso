'use client';

import { useState } from 'react';

import { LeftPanel } from './LeftPanel';
import { RightPanel } from './RightPanel';

interface ProfileLayoutProps {
    children: React.ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
    const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false);
    const [isRightPanelCollapsed, setIsRightPanelCollapsed] = useState(true);

    return (
        <div className="flex h-screen overflow-hidden bg-zinc-50">
            {/* Left Panel */}
            <LeftPanel
                isCollapsed={isLeftPanelCollapsed}
                onToggle={() => setIsLeftPanelCollapsed(!isLeftPanelCollapsed)}
            />

            {/* Central Area */}
            <main className="flex-1 overflow-auto bg-white">
                <div className="h-full">{children}</div>
            </main>

            {/* Right Panel (AI Assistant) */}
            <RightPanel
                isCollapsed={isRightPanelCollapsed}
                onToggle={() => setIsRightPanelCollapsed(!isRightPanelCollapsed)}
            />
        </div>
    );
}
