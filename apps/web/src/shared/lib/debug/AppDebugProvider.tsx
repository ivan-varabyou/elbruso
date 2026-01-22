"use client";

import React from 'react';
import { DebugProvider, DebugOverlay, DebugTrigger } from '@elbruso/debug';

interface AppDebugProviderProps {
    children: React.ReactNode;
}

export const AppDebugProvider: React.FC<AppDebugProviderProps> = ({ children }) => {
    return (
        <DebugProvider>
            {children}
            <DebugOverlay />
            <DebugTrigger />
        </DebugProvider>
    );
};
