"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DebugContextType {
  isDebugMode: boolean;
  toggleDebugMode: () => void;
  isActive: boolean;
  copiedElements: InternalElementInfo[];
  addElement: (element: any) => void;
  clearElements: () => void;
}


export interface ElementInfo {
  filePath: string;
  lineNumber: number | null;
  className: string;
  urlPath: string;
  text: string;
}

interface InternalElementInfo extends ElementInfo {
  domPath: string;
  color: string;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export const useDebug = () => {
  const context = useContext(DebugContext);
  if (!context) {
    throw new Error('useDebug must be used within DebugProvider');
  }
  return context;
};

interface DebugProviderProps {
  children: ReactNode;
}

export const DebugProvider: React.FC<DebugProviderProps> = ({ children }) => {
  const [isDebugMode, setIsDebugMode] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [copiedElements, setCopiedElements] = useState<InternalElementInfo[]>([]);

  useEffect(() => {
    // Загрузка состояния из localStorage
    const saved = localStorage.getItem('elbruso-debug-mode');
    if (saved === 'true') {
      setIsDebugMode(true);
    }
  }, []);

  const toggleDebugMode = () => {
    const newState = !isDebugMode;
    setIsDebugMode(newState);
    localStorage.setItem('elbruso-debug-mode', String(newState));
    if (!newState) {
      setIsActive(false);
      setCopiedElements([]);
    }
  };

  const addElement = (element: any) => {
    setCopiedElements(prev => [...prev, element]);
  };


  const clearElements = () => {
    setCopiedElements([]);
  };

  useEffect(() => {
    if (!isDebugMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Control') {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(true);
      }
      if (e.key === 'Escape') {
        setIsActive(false);
        setCopiedElements([]);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Control' && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(false);
      }
      if (e.key === 'Shift' && !e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isDebugMode]);

  return (
    <DebugContext.Provider
      value={{
        isDebugMode,
        toggleDebugMode,
        isActive,
        copiedElements,
        addElement,
        clearElements,
      }}
    >
      {children}
    </DebugContext.Provider>
  );
};
