"use client";

import React from 'react';
import { useDebug } from './DebugContext';

export const DebugTrigger: React.FC = () => {
  const { isActive, isDebugMode, toggleDebugMode } = useDebug();

  // Показываем только в dev режиме
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <button
      onClick={toggleDebugMode}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: isDebugMode ? '#5cd843ff' : '#9E9E9E',
        color: 'white',
        fontSize: '28px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 999998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        transform: isDebugMode ? 'scale(1.1)' : 'scale(1)',
        visibility: isActive ? 'visible' : 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = isDebugMode ? 'scale(1.1)' : 'scale(1)';
      }}
      title={isDebugMode ? 'Debug Mode: ON (Click to disable)' : 'Debug Mode: OFF (Click to enable)'}
    >
      🐞
    </button>
  );
};
