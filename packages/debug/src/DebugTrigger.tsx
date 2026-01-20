'use client';

import React from 'react';
import { useDebug } from './DebugContext';
import { Button } from '@nextui-org/react';
import { Bug } from 'lucide-react';

export const DebugTrigger = () => {
  const { isConsoleVisible, setIsConsoleVisible, isDebugMode } = useDebug();
  
  const isDev = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1'
  );

  if (!isDebugMode && !isDev) return null;
  if (isConsoleVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[51]">
      <Button
        isIconOnly
        radius="full"
        className="w-12 h-12 bg-black border border-gray-800 text-green-400 shadow-2xl hover:scale-110 transition-transform"
        onPress={() => setIsConsoleVisible(true)}
      >
        <Bug size={32} />
      </Button>
    </div>
  );
};
