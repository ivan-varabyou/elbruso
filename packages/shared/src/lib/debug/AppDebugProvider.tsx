"use client";

import React from "react";
import { DebugProvider, DebugOverlay, DebugTrigger } from "@elbruso/debug";

interface AppDebugProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppDebugProvider: React.FC<AppDebugProviderProps> = ({ children }: any) => {
  return (
    <DebugProvider>
      {children}
      <DebugOverlay />
      <DebugTrigger />
    </DebugProvider>
  );
};
