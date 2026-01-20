'use client';

import React, { useEffect, useState } from 'react';
import { DebugProvider, DebugOverlay, DebugConsole, DebugTrigger, PathCopier } from '@elbruso/debug';
import { NextUIProvider } from '@nextui-org/react';

export function AppDebugProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextUIProvider>
      <DebugProvider>
        {children}
        <DebugOverlay />
        <DebugConsole />
        <DebugTrigger />
        <PathCopier />
      </DebugProvider>
    </NextUIProvider>
  );
}
