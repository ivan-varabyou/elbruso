"use client";

import React, { useState } from 'react';
import { useDebug } from './DebugContext';

export const DebugConsole: React.FC = () => {
  const { isDebugMode, copiedElements, clearElements } = useDebug();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isDebugMode || copiedElements.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: isExpanded ? '0' : '-300px',
        left: '0',
        right: '0',
        height: '350px',
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        zIndex: 999997,
        transition: 'bottom 0.3s ease',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: '#252526',
          borderBottom: '1px solid #3e3e42',
          cursor: 'pointer',
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>🐛</span>
          <span style={{ fontWeight: 'bold' }}>Debug Console</span>
          <span style={{
            backgroundColor: '#4ECDC4',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {copiedElements.length}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              clearElements();
            }}
            style={{
              padding: '4px 12px',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            Clear
          </button>
          <span style={{ fontSize: '18px' }}>
            {isExpanded ? '▼' : '▲'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          height: 'calc(100% - 49px)',
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        {copiedElements.map((element, index) => (
          <div
            key={index}
            style={{
              marginBottom: '12px',
              padding: '12px',
              backgroundColor: '#2d2d30',
              borderRadius: '4px',
              borderLeft: `4px solid ${element.color}`,
              fontSize: '12px',
              fontFamily: 'monospace',
            }}
          >
            <div style={{ marginBottom: '8px', color: '#4EC9B0' }}>
              <strong>Element #{index + 1}</strong>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ color: '#9CDCFE' }}>filePath:</span>{' '}
              <span style={{ color: '#CE9178' }}>
                "{element.filePath}{element.lineNumber ? `:${element.lineNumber}` : ''}"
              </span>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ color: '#9CDCFE' }}>urlPath:</span>{' '}
              <span style={{ color: '#CE9178' }}>"{element.urlPath}"</span>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ color: '#9CDCFE' }}>className:</span>{' '}
              <span style={{ color: '#CE9178' }}>"{element.className}"</span>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ color: '#9CDCFE' }}>domPath:</span>{' '}
              <span style={{ color: '#CE9178', wordBreak: 'break-all' }}>
                "{element.domPath}"
              </span>
            </div>
            <div>
              <span style={{ color: '#9CDCFE' }}>text:</span>{' '}
              <span style={{ color: '#CE9178' }}>
                "{element.text.substring(0, 50)}{element.text.length > 50 ? '...' : ''}"
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
