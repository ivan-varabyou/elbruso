'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ActionRegistry } from './action-registry';
import { uiEvents } from './ui-events';

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'request' | 'response' | 'error' | 'info' | 'action' | 'navigation';
  method?: string;
  url?: string;
  status?: number;
  data?: any;
  message?: string;
}

export interface DebugFilters {
  api: boolean;
  actions: boolean;
  navigation: boolean;
  errors: boolean;
  info: boolean;
}

interface DebugContextType {
  isDebugMode: boolean;
  toggleDebugMode: () => void;
  logs: LogEntry[];
  addLog: (entry: Omit<LogEntry, 'id' | 'timestamp'>) => void;
  clearLogs: () => void;
  isInspecting: boolean;
  highlightedElement: HTMLElement | null;
  selectedElement: HTMLElement | null;
  isGroupSelectionMode: boolean;
  selectedGroup: { element: HTMLElement; x: number; y: number }[];
  isScreenshotMode: boolean;
  screenshotSelection: { startX: number; startY: number; endX: number; endY: number } | null;
  filters: DebugFilters;
  setFilters: (filters: DebugFilters | ((prev: DebugFilters) => DebugFilters)) => void;
  isConsoleVisible: boolean;
  setIsConsoleVisible: (visible: boolean | ((prev: boolean) => boolean)) => void;
  setIsInspecting: (inspecting: boolean) => void;
  setHighlightedElement: (el: HTMLElement | null) => void;
  setSelectedElement: (el: HTMLElement | null) => void;
  setIsGroupSelectionMode: (mode: boolean) => void;
  setSelectedGroup: (group: { element: HTMLElement; x: number; y: number }[] | ((prev: any) => any)) => void;
  setIsScreenshotMode: (mode: boolean) => void;
  setScreenshotSelection: (selection: { startX: number; startY: number; endX: number; endY: number } | null | ((prev: any) => any)) => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export const useDebug = () => {
  const context = useContext(DebugContext);
  if (!context) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
};

export const DebugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDebugMode, setIsDebugMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('debug_mode');
      return saved === 'true';
    } catch (e) {
      console.error('Failed to load debug mode', e);
    }
    return false;
  });
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem('debug_logs');
      if (saved) {
        return JSON.parse(saved, (key, value) => {
          if (key === 'timestamp') return new Date(value);
          return value;
        });
      }
    } catch (e) {
      console.error('Failed to load logs', e);
    }
    return [];
  });
  
  // Inspection State
  const [isInspecting, setIsInspecting] = useState(false);
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null);
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  // Group Selection State
  const [isGroupSelectionMode, setIsGroupSelectionMode] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{ element: HTMLElement; x: number; y: number }[]>([]);

  // Screenshot Mode State
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);
  const [screenshotSelection, setScreenshotSelection] = useState<{ startX: number; startY: number; endX: number; endY: number } | null>(null);

  // Filters State
  const [filters, setFiltersState] = useState<DebugFilters>(() => {
    if (typeof window === 'undefined') return { api: true, actions: true, navigation: true, errors: true, info: true };
    try {
      const saved = localStorage.getItem('debug_filters');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load filters', e);
    }
    return { api: true, actions: true, navigation: true, errors: true, info: true };
  });

  const [isConsoleVisible, setIsConsoleVisible] = useState(true);

  const setFilters = useCallback((value: DebugFilters | ((prev: DebugFilters) => DebugFilters)) => {
    setFiltersState(prev => {
      const newFilters = typeof value === 'function' ? value(prev) : value;
      try {
        localStorage.setItem('debug_filters', JSON.stringify(newFilters));
      } catch (e) {
        console.error('Failed to save filters', e);
      }
      return newFilters;
    });
  }, []);

  const toggleDebugMode = useCallback(() => {
    setIsDebugMode(prev => {
      const newValue = !prev;
      try {
        localStorage.setItem('debug_mode', String(newValue));
      } catch (e) {
        console.error('Failed to save debug mode', e);
      }
      return newValue;
    });
  }, []);

  const addLog = useCallback((entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
    const newLog: LogEntry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    
    setLogs(prev => {
      const nextLogs = [newLog, ...prev].slice(0, 100); // Limit to 100 logs
      try {
        localStorage.setItem('debug_logs', JSON.stringify(nextLogs));
      } catch (e) {
        console.error('Failed to save logs', e);
      }
      return nextLogs;
    });
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
    localStorage.removeItem('debug_logs');
  }, []);

  // Subscribe to global UI events
  useEffect(() => {
    const unsubscribe = uiEvents.on('log-action', ({ action, details }: { action: string, details: any }) => {
      addLog({
        type: 'action',
        message: `Action: ${action}`,
        data: {
          action,
          details,
          timestamp: new Date()
        }
      });
    });
    return unsubscribe;
  }, [addLog]);


  return (
    <DebugContext.Provider value={{ 
      isDebugMode, 
      toggleDebugMode, 
      logs, 
      addLog, 
      clearLogs,
      isInspecting,
      highlightedElement,
      selectedElement,
      isGroupSelectionMode,
      selectedGroup,
      isScreenshotMode,
      screenshotSelection,
      filters,
      setFilters,
      isConsoleVisible,
      setIsConsoleVisible,
      setIsInspecting,
      setHighlightedElement,
      setSelectedElement,
      setIsGroupSelectionMode,
      setSelectedGroup,
      setIsScreenshotMode,
      setScreenshotSelection
    }}>
      {children}
    </DebugContext.Provider>
  );
};
