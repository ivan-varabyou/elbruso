'use client';

import { useDebug } from './DebugContext';

export const DebugOverlay = () => {
  const { isInspecting, highlightedElement, selectedElement, isGroupSelectionMode, selectedGroup, isScreenshotMode, screenshotSelection } = useDebug();

  if (!isInspecting && !selectedElement && !isGroupSelectionMode && selectedGroup.length === 0 && !isScreenshotMode) return null;

  const renderBox = (el: HTMLElement, color: string, style: 'solid' | 'dashed', labelPrefix: string = '', index?: number) => {
    const rect = el.getBoundingClientRect();
    const id = el.getAttribute('data-testid') || el.id;
    const stableId = el.getAttribute('data-stable-id');
    
    return (
      <div
        key={`${stableId || ''}-${labelPrefix}-${index ?? ''}`}
        className="fixed pointer-events-none z-[9999] debug-overlay"
        style={{
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          border: `2px ${style} ${color}`,
          backgroundColor: color === '#00ff00' ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
          transition: 'all 0.1s ease-out'
        }}
      >
        <div 
          className="absolute -top-6 left-0 text-white text-xs px-1 rounded whitespace-nowrap font-mono shadow-md z-[10000]"
          style={{ backgroundColor: color }}
        >
          {labelPrefix} {el.tagName.toLowerCase()} 
          {stableId ? ` #${stableId}` : (id ? ` #${id}` : '')}
        </div>
      </div>
    );
  };

  const renderScreenshotSelection = () => {
    if (!screenshotSelection) return null;

    const x = Math.min(screenshotSelection.startX, screenshotSelection.endX);
    const y = Math.min(screenshotSelection.startY, screenshotSelection.endY);
    const width = Math.abs(screenshotSelection.endX - screenshotSelection.startX);
    const height = Math.abs(screenshotSelection.endY - screenshotSelection.startY);

    return (
      <div
        key="screenshot-selection"
        className="fixed pointer-events-none z-[10000]"
        style={{
          top: y,
          left: x,
          width,
          height,
          border: '2px dashed #ff6b6b',
          backgroundColor: 'rgba(255, 107, 107, 0.1)'
        }}
      >
        <div 
          className="absolute -top-6 left-0 text-white text-xs px-2 py-1 rounded font-mono shadow-md"
          style={{ backgroundColor: '#ff6b6b' }}
        >
          📸 {width}x{height}
        </div>
      </div>
    );
  };

  return (
    <>
      {highlightedElement && renderBox(highlightedElement, '#22c55e', 'dashed', 'HIGHLIGHTED')}
      {selectedElement && renderBox(selectedElement, '#ec4899', 'solid', 'SELECTED')}
      {selectedGroup.map((item, i) => renderBox(item.element, '#a855f7', 'solid', `[${i + 1}]`, i))}
      {isScreenshotMode && renderScreenshotSelection()}
    </>
  );
};
