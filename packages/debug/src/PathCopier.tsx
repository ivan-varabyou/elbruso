'use client';

import React, { useEffect, useRef } from 'react';
import { useDebug, LogEntry } from './DebugContext';
import { ActionRegistry } from './action-registry';

// Helper function to get element path (breadcrumb)
const getElementPath = (element: HTMLElement): string => {
  const path: string[] = [];
  let current: HTMLElement | null = element;
  let depth = 0;
  const maxDepth = 5;

  while (current && depth < maxDepth) {
    const tag = current.tagName.toLowerCase();
    const id = current.id ? `#${current.id}` : '';
    const stableId = current.getAttribute('data-stable-id') ? `[${current.getAttribute('data-stable-id')}]` : '';
    const classes = current.className ? `.${current.className.split(' ')[0]}` : '';

    let identifier = tag;
    if (stableId) identifier += stableId;
    else if (id) identifier += id;
    else if (classes && !classes.includes('undefined')) identifier += classes;

    path.unshift(identifier);
    current = current.parentElement;
    depth++;
  }

  return path.join(' > ');
};

// Helper to get element file path from common attributes
const getElementFilePath = (element: HTMLElement): string => {
  return element.getAttribute('data-ide') || element.getAttribute('data-file-path') || '';
};

export const PathCopier = () => {
  const {
    isDebugMode,
    addLog,
    isInspecting,
    setIsInspecting,
    highlightedElement,
    setHighlightedElement,
    selectedElement,
    setSelectedElement,
    isGroupSelectionMode,
    setIsGroupSelectionMode,
    selectedGroup,
    setSelectedGroup,
    isScreenshotMode,
    setIsScreenshotMode,
    screenshotSelection,
    setScreenshotSelection,
  } = useDebug();

  // Refs for event listeners to avoid stale closures
  const stateRef = useRef({
    isDebugMode,
    isInspecting,
    highlightedElement,
    selectedElement,
    isGroupSelectionMode,
    selectedGroup,
    isScreenshotMode,
    screenshotSelection,
  });

  useEffect(() => {
    stateRef.current = {
      isDebugMode,
      isInspecting,
      highlightedElement,
      selectedElement,
      isGroupSelectionMode,
      selectedGroup,
      isScreenshotMode,
      screenshotSelection,
    };
  }, [isDebugMode, isInspecting, highlightedElement, selectedElement, isGroupSelectionMode, selectedGroup, isScreenshotMode, screenshotSelection]);

  useEffect(() => {
    const isDev = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1'
    );

    if (!isDebugMode && !isDev) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const { isDebugMode, isGroupSelectionMode } = stateRef.current;
      if (!isDebugMode || e.repeat) return;

      const target = e.target as HTMLElement;
      const isEditable = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (isEditable && !e.ctrlKey && !e.shiftKey) return;

      if (e.key === 'Escape') {
        setIsInspecting(false);
        setIsGroupSelectionMode(false);
        setIsScreenshotMode(false);
        setHighlightedElement(null);
        setSelectedElement(null);
        setSelectedGroup([]);
        setScreenshotSelection(null);
        addLog({ type: 'info', message: 'Debug modes cancelled (Esc)' });
        return;
      }

      if (e.ctrlKey && e.shiftKey && e.key === '/') {
        e.preventDefault();
        setIsScreenshotMode(true);
        setScreenshotSelection(null);
        addLog({ type: 'info', message: 'Screenshot Mode: Click and drag to select area' });
        return;
      }

      if (e.ctrlKey && e.shiftKey && !isGroupSelectionMode) {
        setIsGroupSelectionMode(true);
        setSelectedGroup([]);
        addLog({ type: 'info', message: 'Group Selection Mode: Hold Ctrl+Shift and click elements' });
        return;
      }

      if (e.key === 'Control' && !isEditable) {
        setIsInspecting(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const { isDebugMode, isGroupSelectionMode, selectedGroup, selectedElement } = stateRef.current;
      if (!isDebugMode) return;

      // Group Selection Completion
      if (isGroupSelectionMode && (!e.ctrlKey || !e.shiftKey)) {
        setIsGroupSelectionMode(false);
        if (selectedGroup.length > 0) {
          const copyData = selectedGroup.map(item => {
            const el = item.element;
            const obj: any = {
              url: window.location.href,
              filePath: getElementFilePath(el),
              domPath: getElementPath(el),
              domText: el.textContent?.trim().substring(0, 50) || ''
            };
            const stableId = el.getAttribute('data-stable-id');
            const testId = el.getAttribute('data-testid');
            if (stableId) obj.stableId = stableId;
            if (testId) obj.testId = testId;
            if (el.id) obj.id = el.id;
            return obj;
          });

          const copyText = JSON.stringify(copyData, null, 2);
          navigator.clipboard.writeText(copyText);
          addLog({
            type: 'info',
            message: `📋 Copied info for ${selectedGroup.length} elements`,
            data: copyText
          });
        }
        setSelectedGroup([]);
        setHighlightedElement(null);
        setSelectedElement(null);
        return;
      }

      // Single Element Inspection Completion
      if (e.key === 'Control') {
        setIsInspecting(false);
        setHighlightedElement(null);
        if (selectedElement) {
          const obj: any = {
            url: window.location.href,
            filePath: getElementFilePath(selectedElement),
            domPath: getElementPath(selectedElement),
            domText: selectedElement.textContent?.trim().substring(0, 50) || '',
            tag: selectedElement.tagName.toLowerCase()
          };
          const stableId = selectedElement.getAttribute('data-stable-id');
          const testId = selectedElement.getAttribute('data-testid');
          if (stableId) obj.stableId = stableId;
          if (testId) obj.testId = testId;
          if (selectedElement.id) obj.id = selectedElement.id;

          const copyText = JSON.stringify(obj, null, 2);
          navigator.clipboard.writeText(copyText);
          addLog({
            type: 'info',
            message: `📋 Copied info for <${obj.tag}>`,
            data: copyText
          });
          setSelectedElement(null);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { isScreenshotMode, screenshotSelection, isInspecting } = stateRef.current;

      if (isScreenshotMode && screenshotSelection) {
        setScreenshotSelection((prev: any) => prev ? { ...prev, endX: e.clientX, endY: e.clientY } : null);
        return;
      }

      if (!isInspecting) return;

      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (!target || target.closest('.debug-console') || target.closest('.debug-overlay') || target.closest('.debug-trigger')) {
        setHighlightedElement(null);
        return;
      }
      setHighlightedElement(target);
    };

    const handleClick = (e: MouseEvent) => {
      const { isDebugMode, isGroupSelectionMode, isInspecting, highlightedElement } = stateRef.current;
      if (!isDebugMode) return;

      const target = e.target as HTMLElement;
      if (target.closest('.debug-console') || target.closest('.debug-trigger')) return;

      if (e.ctrlKey || e.metaKey || isGroupSelectionMode || isInspecting) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (isGroupSelectionMode) {
        // Toggle element in group
        const el = target.closest('button, a, [data-testid], [id], [role="button"], [data-stable-id], div, span, section') as HTMLElement || target;
        setSelectedGroup((prev: any[]) => {
          const exists = prev.some(item => item.element === el);
          if (exists) return prev.filter(item => item.element !== el);
          return [...prev, { element: el, x: e.clientX, y: e.clientY }];
        });
        return;
      }

      if (isInspecting && highlightedElement) {
        setSelectedElement(highlightedElement);
        return;
      }

      // Normal click logging
      const meaningful = target.closest('button, a, [data-testid], [id], [role="button"], [data-stable-id], [data-debug-action]') as HTMLElement;
      if (meaningful) {
        const id = meaningful.getAttribute('data-testid') || meaningful.id;
        const stableId = meaningful.getAttribute('data-stable-id');
        const debugAction = (stableId && ActionRegistry.get(stableId)) || (id && ActionRegistry.get(id)) || meaningful.getAttribute('data-debug-action');

        const rect = meaningful.getBoundingClientRect();
        const message = debugAction ? `Action: ${debugAction}` : `Clicked <${meaningful.tagName.toLowerCase()}> ${meaningful.innerText?.substring(0, 20) || ''}`;

        addLog({
          type: 'action',
          message,
          data: {
            id, stableId, action: debugAction,
            tag: meaningful.tagName,
            text: meaningful.textContent?.trim().substring(0, 50),
            filePath: getElementFilePath(meaningful),
            domPath: getElementPath(meaningful),
            url: window.location.href,
            x: e.clientX, y: e.clientY,
            width: rect.width, height: rect.height
          }
        });

        if (e.ctrlKey || e.metaKey) {
          const copyData = {
            url: window.location.href,
            filePath: getElementFilePath(meaningful),
            domPath: getElementPath(meaningful),
            domText: meaningful.textContent?.trim().substring(0, 50) || ''
          };
          navigator.clipboard.writeText(JSON.stringify(copyData, null, 2));
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const { isDebugMode, isScreenshotMode } = stateRef.current;
      if (!isDebugMode || !isScreenshotMode) return;

      const target = e.target as HTMLElement;
      if (target.closest('.debug-console') || target.closest('.debug-trigger')) return;

      e.preventDefault();
      e.stopPropagation();

      setScreenshotSelection({
        startX: e.clientX, startY: e.clientY,
        endX: e.clientX, endY: e.clientY
      });
    };

    const handleMouseUp = async (e: MouseEvent) => {
      const { isScreenshotMode, screenshotSelection } = stateRef.current;
      if (!isScreenshotMode || !screenshotSelection) return;

      setIsScreenshotMode(false);
      const x = Math.min(screenshotSelection.startX, screenshotSelection.endX);
      const y = Math.min(screenshotSelection.startY, screenshotSelection.endY);
      const width = Math.abs(screenshotSelection.endX - screenshotSelection.startX);
      const height = Math.abs(screenshotSelection.endY - screenshotSelection.startY);

      if (width < 10 || height < 10) {
        addLog({ type: 'info', message: 'Screenshot cancelled (too small)' });
      } else {
        try {
          const html2canvas = (await import('html2canvas')).default;
          const canvas = await html2canvas(document.body, {
            x: x + window.scrollX, y: y + window.scrollY,
            width, height, useCORS: true, allowTaint: true
          });
          canvas.toBlob(async (blob) => {
            if (blob) {
              await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
              addLog({ type: 'info', message: `Screenshot copied (${width}x${height})` });
            }
          });
        } catch (err) {
          addLog({ type: 'error', message: 'Screenshot failed', data: err });
        }
      }
      setScreenshotSelection(null);
    };

    const blockEvent = (e: MouseEvent | PointerEvent) => {
      const { isDebugMode, isGroupSelectionMode, isInspecting } = stateRef.current;
      if (!isDebugMode) return;
      const target = e.target as HTMLElement;
      if (target.closest('.debug-console') || target.closest('.debug-trigger')) return;
      if (e.ctrlKey || e.metaKey || isGroupSelectionMode || isInspecting) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick, true);
    window.addEventListener('mousedown', handleMouseDown, true);
    window.addEventListener('mouseup', handleMouseUp, true);
    window.addEventListener('pointerdown', blockEvent, true);
    window.addEventListener('pointerup', blockEvent, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick, true);
      window.removeEventListener('mousedown', handleMouseDown, true);
      window.removeEventListener('mouseup', handleMouseUp, true);
      window.removeEventListener('pointerdown', blockEvent, true);
      window.removeEventListener('pointerup', blockEvent, true);
    };
  }, [isDebugMode, addLog, setIsInspecting, setHighlightedElement, setSelectedElement, setIsGroupSelectionMode, setSelectedGroup, setIsScreenshotMode, setScreenshotSelection]);

  return null;
};
