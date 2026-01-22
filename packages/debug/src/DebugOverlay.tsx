"use client";

import React, { useEffect, useState } from 'react';
import { useDebug, ElementInfo } from './DebugContext';

const HIGHLIGHT_COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA07A',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E2',
];

export const DebugOverlay: React.FC = () => {
  const { isDebugMode, isActive, copiedElements, addElement } = useDebug();
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isGroupMode, setIsGroupMode] = useState(false);

  useEffect(() => {
    if (!isDebugMode || !isActive) {
      setHoveredElement(null);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute('data-file-path')) {
        setHoveredElement(target);
      } else {
        setHoveredElement(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!isActive) return;

      const target = e.target as HTMLElement;
      const filePathAttr = target.getAttribute('data-file-path');

      if (filePathAttr) {
        e.preventDefault();
        e.stopPropagation();

        // Parse filepath:line format
        const lastColonIndex = filePathAttr.lastIndexOf(':');
        let filePath = filePathAttr;
        let lineNumber: number | null = null;

        if (lastColonIndex !== -1) {
          const potentialLine = filePathAttr.substring(lastColonIndex + 1);
          const parsedLine = parseInt(potentialLine, 10);
          if (!isNaN(parsedLine)) {
            filePath = filePathAttr.substring(0, lastColonIndex);
            lineNumber = parsedLine;
          }
        }

        const domPath = getDomPath(target);
        const className = target.className || '';
        const urlPath = window.location.pathname;
        const text = target.innerText?.substring(0, 100) || '';
        const color = HIGHLIGHT_COLORS[copiedElements.length % HIGHLIGHT_COLORS.length];

        // Internal element with all data for tracking
        const internalElement = {
          filePath,
          lineNumber,
          domPath,
          className,
          urlPath,
          text,
          color,
        };

        // Clean element for clipboard (without domPath and color)
        const cleanElement: ElementInfo = {
          filePath,
          lineNumber,
          className,
          urlPath,
          text,
        };

        // Копируем в буфер обмена
        if (isGroupMode) {
          addElement(internalElement);
        } else {
          navigator.clipboard.writeText(JSON.stringify(cleanElement, null, 2));
          console.log('📋 Copied to clipboard:', cleanElement);
        }

        // Подсвечиваем элемент
        target.style.outline = `3px solid ${color}`;
        target.style.outlineOffset = '2px';
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey) {
        setIsGroupMode(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!e.ctrlKey || !e.shiftKey) {
        if (isGroupMode && copiedElements.length > 0) {
          // Convert to clean elements for clipboard
          const cleanElements: ElementInfo[] = copiedElements.map(el => ({
            filePath: el.filePath,
            lineNumber: el.lineNumber,
            className: el.className,
            urlPath: el.urlPath,
            text: el.text,
          }));
          // Копируем массив в буфер
          navigator.clipboard.writeText(JSON.stringify(cleanElements, null, 2));
          console.log('📋 Copied group to clipboard:', cleanElements);
        }
        setIsGroupMode(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isDebugMode, isActive, isGroupMode, copiedElements, addElement]);

  if (!isDebugMode || !isActive) return null;

  return (
    <>
      {/* Подсветка наведенного элемента */}
      {hoveredElement && (
        <div
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            border: '2px dashed #1A73E8',
            backgroundColor: 'rgba(26, 115, 232, 0.1)',
            zIndex: 999999,
            ...getElementPosition(hoveredElement),
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-24px',
              left: '0',
              backgroundColor: '#1A73E8',
              color: 'white',
              padding: '2px 8px',
              fontSize: '11px',
              fontFamily: 'monospace',
              borderRadius: '3px',
              whiteSpace: 'nowrap',
            }}
          >
            {hoveredElement.getAttribute('data-file-path')}
          </div>
        </div>
      )}

      {/* Индикатор режима */}
      <div
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          backgroundColor: isGroupMode ? '#4ECDC4' : '#1A73E8',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 999999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        {isGroupMode ? `🎯 Group Mode (${copiedElements.length})` : '🐛 Debug Mode Active'}
        <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.9 }}>
          {isGroupMode ? 'Ctrl+Shift to add, release to copy' : 'Ctrl to activate, click to copy'}
        </div>
      </div>
    </>
  );
};

function getDomPath(element: HTMLElement): string {
  const path: string[] = [];
  let current: HTMLElement | null = element;

  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();

    if (current.id) {
      selector += `#${current.id}`;
      path.unshift(selector);
      break;
    } else if (current.className) {
      const classes = current.className.split(' ').filter(c => c).join('.');
      if (classes) {
        selector += `.${classes}`;
      }
    }

    // Добавляем nth-child если нужно
    const parent = current.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      const index = siblings.indexOf(current);
      if (siblings.length > 1) {
        selector += `:nth-child(${index + 1})`;
      }
    }

    path.unshift(selector);
    current = current.parentElement;
  }

  return path.join(' > ');
}

function getElementPosition(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  // For fixed positioning, use rect coordinates directly (no scroll offset needed)
  return {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
  };
}
