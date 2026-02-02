// @ts-nocheck
"use client";

import { ReactNode, useEffect } from "react";

interface SourceTrackerProps {
  children: ReactNode;
  fileName?: string;
  lineNumber?: number;
}

export function SourceTracker({ children, fileName, lineNumber }: SourceTrackerProps) {
  useEffect(() => {
    if (fileName && lineNumber) {
      console.log("[SourceTracker]", fileName, lineNumber);
    }
  }, [fileName, lineNumber]);

  return <>{children}</>;
}

export function wrapWithSource(children: ReactNode, fileName: string, lineNumber: number) {
  return (
    <SourceTracker fileName={fileName} lineNumber={lineNumber}>
      {children}
    </SourceTracker>
  );
}
