import React, { useState, useEffect, useRef } from 'react';
import { useDebug } from './DebugContext';
import { Card, CardBody, CardHeader, Button, Popover, PopoverTrigger, PopoverContent, Slider, Switch } from '@nextui-org/react';
import { X, Trash2, ChevronDown, ChevronUp, Copy, Bug, Filter, Eye } from 'lucide-react';
import { useContrastDetector } from './ContrastDetector';

export const DebugConsole = () => {
  const { isDebugMode, logs, clearLogs, toggleDebugMode, filters, setFilters, isConsoleVisible, setIsConsoleVisible } = useDebug();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Contrast Detector state
  const [contrastEnabled, setContrastEnabled] = useState(() => {
    return localStorage.getItem('contrast-detector-enabled') === 'true';
  });
  const [contrastThreshold, setContrastThreshold] = useState(() => {
    const saved = localStorage.getItem('contrast-detector-threshold');
    return saved ? parseFloat(saved) : 4.5;
  });
  
  const { issuesCount, getIssuesList } = useContrastDetector({ enabled: contrastEnabled, threshold: contrastThreshold });
  
  const toggleContrast = () => {
    const newState = !contrastEnabled;
    setContrastEnabled(newState);
    localStorage.setItem('contrast-detector-enabled', String(newState));
  };
  
  const handleThresholdChange = (value: number | number[]) => {
    const newThreshold = Array.isArray(value) ? value[0] : value;
    setContrastThreshold(newThreshold);
    localStorage.setItem('contrast-detector-threshold', String(newThreshold));
  };

  // Auto-scroll to top (since new logs are at top)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [logs]);
  
  // Keyboard shortcut to toggle visibility (Ctrl+Shift+D) moved to global or trigger if needed
  // For now let's keep it here but using global state
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsConsoleVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsConsoleVisible]);

  const getFilteredLogs = () => {
    return logs.filter(log => {
      if (log.type === 'request' || log.type === 'response') return filters.api;
      if (log.type === 'action') return filters.actions;
      if (log.type === 'navigation') return filters.navigation;
      if (log.type === 'error') return filters.errors;
      if (log.type === 'info') return filters.info;
      return true;
    });
  };

  const handleCopyAll = () => {
    const filteredLogs = getFilteredLogs();
    const text = filteredLogs.map(log => {
      if (log.type === 'action' && log.data) {
        // Use unified format
        const lines = [
          log.data.url ? `url=${log.data.url}` : null,
          log.data.path ? `path=${log.data.path}` : null,
          log.data.tag ? `type=${log.data.tag.toLowerCase()}` : null,
          log.data.text ? `text="${log.data.text}"` : null,
          log.data.stableId ? `stable-id=${log.data.stableId}` : null,
          log.data.testId ? `test-id=${log.data.testId}` : null,
          log.data.id ? `id=${log.data.id}` : null,
          log.data.x !== undefined ? `x=${Math.round(log.data.x)}` : null,
          log.data.y !== undefined ? `y=${Math.round(log.data.y)}` : null,
          log.data.width !== undefined ? `width=${Math.round(log.data.width)}` : null,
          log.data.height !== undefined ? `height=${Math.round(log.data.height)}` : null
        ].filter(Boolean);
        return lines.join('\n');
      }
      return `[${log.timestamp.toLocaleTimeString()}] ${log.type.toUpperCase()} ${log.method || ''} ${log.url || ''} ${log.status || ''}\n${log.message}\n${log.data ? JSON.stringify(log.data, null, 2) : ''}\n-------------------`;
    }).join('\n\n');
    navigator.clipboard.writeText(text);
  };

  const handleCopyLog = (log: any) => {
    let text = '';
    
    if (log.type === 'action' && log.data) {
      // Use unified format
      const lines = [
        log.data.url ? `url=${log.data.url}` : null,
        log.data.path ? `path=${log.data.path}` : null,
        log.data.tag ? `type=${log.data.tag.toLowerCase()}` : null,
        log.data.text ? `text="${log.data.text}"` : null,
        log.data.stableId ? `stable-id=${log.data.stableId}` : null,
        log.data.testId ? `test-id=${log.data.testId}` : null,
        log.data.id ? `id=${log.data.id}` : null,
        log.data.x !== undefined ? `x=${Math.round(log.data.x)}` : null,
        log.data.y !== undefined ? `y=${Math.round(log.data.y)}` : null,
        log.data.width !== undefined ? `width=${Math.round(log.data.width)}` : null,
        log.data.height !== undefined ? `height=${Math.round(log.data.height)}` : null
      ].filter(Boolean);
      text = lines.join('\n');
    } else {
      // Standard format for other logs
      text = `[${log.timestamp.toLocaleTimeString()}] ${log.type.toUpperCase()} ${log.method || ''} ${log.url || ''} ${log.status || ''}\n${log.message}\n${log.data ? JSON.stringify(log.data, null, 2) : ''}`;
    }

    navigator.clipboard.writeText(text);
    setCopiedId(log.id);
    setTimeout(() => setCopiedId(null), 1000);
  };

  const isDev = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1'
  );
  if (!isDebugMode && !isDev) return null;
  if (!isConsoleVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-[500px] shadow-2xl debug-console transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-10 hover:opacity-100'}`}>
      <Card className="bg-black/90 border border-gray-800 text-green-400 font-mono text-sm">
        <CardHeader className="flex justify-between items-center py-2 px-3 border-b border-gray-800 bg-gray-900/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Bug size={16} />
            </div>
            <Popover placement="bottom-start">
              <PopoverTrigger>
                <button className="flex items-center gap-1.5 text-xs cursor-pointer hover:text-green-300 transition-colors px-2 py-1 rounded hover:bg-gray-800">
                  <Filter size={14} />
                  <span>Filters</span>
                  <ChevronDown size={12} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-gray-900 border border-gray-700 p-3">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-gray-400 mb-2">Log Filters</div>
                  {[
                    { key: 'api', label: 'API', color: 'text-blue-400' },
                    { key: 'actions', label: 'Actions', color: 'text-purple-400' },
                    { key: 'navigation', label: 'Navigation', color: 'text-orange-400' },
                    { key: 'errors', label: 'Errors', color: 'text-red-400' },
                    { key: 'info', label: 'Info', color: 'text-yellow-400' }
                  ].map(({ key, label, color }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-1.5 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={filters[key as keyof typeof filters]}
                        onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.checked }))}
                        className="w-3.5 h-3.5 rounded border-gray-600 bg-gray-800 text-green-500 focus:ring-green-500 focus:ring-offset-0"
                      />
                      <span className={`text-xs font-medium ${color}`}>{label}</span>
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-1">
            <Button isIconOnly size="sm" variant="flat" className="bg-gray-800 hover:bg-gray-700 text-white" onPress={handleCopyAll} title="Copy All Logs">
              <Copy size={14} />
            </Button>
            <Button isIconOnly size="sm" variant="flat" className="bg-gray-800 hover:bg-red-900/50 text-red-400" onPress={clearLogs} title="Clear Logs">
              <Trash2 size={14} />
            </Button>
            <Button isIconOnly size="sm" variant="flat" className="bg-gray-800 hover:bg-gray-700 text-white" onPress={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </Button>
            <Button 
              isIconOnly 
              size="sm" 
              variant="flat" 
              className="bg-gray-800 hover:bg-red-900/50 text-red-400" 
              onPress={() => setIsConsoleVisible(false)}
              title="Hide console (Ctrl+Shift+D to show)"
            >
              <X size={14} />
            </Button>
          </div>
        </CardHeader>
        
        {isExpanded && (
          <CardBody className="p-0">
            <div ref={scrollRef} className="h-[300px] overflow-y-auto p-2 space-y-1">
              {getFilteredLogs().length === 0 && (
                <div className="text-gray-600 text-center py-4 italic">No logs yet...</div>
              )}
              {getFilteredLogs().map(log => (
                <div 
                  key={log.id} 
                  className="p-1 hover:bg-white/5 rounded break-all border-b border-gray-800/50 last:border-0 cursor-pointer relative group"
                  onClick={() => handleCopyLog(log)}
                  title="Click to copy"
                >
                  {copiedId === log.id && (
                    <div className="absolute right-2 top-2 text-black bg-green-400 px-2 py-0.5 rounded text-[10px] font-bold shadow-lg z-10">
                      Copied!
                    </div>
                  )}
                  
                  {/* Action Log: Single-line Layout */}
                  {log.type === 'action' && log.data ? (
                    <div className="flex gap-2 text-xs text-gray-500 mb-0.5 items-center">
                      <span>{log.timestamp.toLocaleTimeString()}</span>
                      <span className="uppercase font-bold text-purple-400">
                        {log.type}
                      </span>
                      <span className="text-gray-300 font-bold">
                        {log.data.stableId ? `#${log.data.stableId}` : (log.data.id ? `#${log.data.id}` : '#unknown')}
                      </span>
                      <span className="text-gray-500">({log.data.x}, {log.data.y})</span>
                    </div>
                  ) : (
                    /* Standard Log Layout */
                    <div className="flex gap-2 text-xs text-gray-500 mb-0.5 items-center">
                      <span>{log.timestamp.toLocaleTimeString()}</span>
                      <span className={`uppercase font-bold ${
                        log.type === 'error' ? 'text-red-500' : 
                        log.type === 'request' ? 'text-blue-400' : 
                        log.type === 'response' ? 'text-green-400' : 
                        log.type === 'navigation' ? 'text-orange-400' : 'text-yellow-400'
                      }`}>
                        {log.type}
                      </span>
                      
                      {log.type === 'navigation' ? (
                        <span className="text-gray-300">
                          {log.url}
                        </span>
                      ) : (
                        <>
                          {log.method && <span>{log.method}</span>}
                          {log.url && <span>{log.url}</span>}
                          {log.status && <span>({log.status})</span>}
                        </>
                      )}
                    </div>
                  )}
                  
                  {/* Hide message/details for action/nav unless expanded or different type */}
                  {log.type !== 'action' && log.type !== 'navigation' && (
                    <div className="pl-4 text-xs opacity-90 whitespace-pre-wrap">
                      {log.message}
                      {log.data && (
                        <div className="mt-1 text-[10px] text-gray-400 overflow-x-auto bg-black/50 p-1 rounded">
                          {typeof log.data === 'string' ? log.data : JSON.stringify(log.data, null, 2)}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        )}
        
        {/* Contrast Detector Settings */}
        <div className="border-t border-gray-800 p-2 bg-gray-900/30">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-gray-400" />
              <span className="text-xs text-gray-400">Contrast</span>
              {contrastEnabled && issuesCount > 0 && (
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded font-bold">
                  {issuesCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-gray-500">{contrastThreshold.toFixed(1)}</span>
                <Slider
                  size="sm"
                  step={0.5}
                  minValue={1}
                  maxValue={7}
                  value={contrastThreshold}
                  onChange={handleThresholdChange}
                  className="w-20"
                  aria-label="Contrast threshold"
                  classNames={{
                    track: 'bg-gray-700',
                    filler: 'bg-green-500',
                    thumb: 'bg-green-400'
                  }}
                />
              </div>
              {contrastEnabled && issuesCount > 0 && (
                <Button
                  size="sm"
                  variant="flat"
                  className="min-w-0 w-6 h-6 p-0"
                  onPress={() => {
                    const issues = getIssuesList();
                    const text = issues.map(issue => `${issue.path}\n  Target: ${issue.target}\n  Issue: ${issue.message}`).join('\n\n');
                    navigator.clipboard.writeText(text);
                    // Show copied feedback
                    const btn = document.activeElement as HTMLElement;
                    if (btn) {
                      const originalText = btn.textContent;
                      btn.textContent = '✓';
                      setTimeout(() => {
                        btn.textContent = originalText || '';
                      }, 1000);
                    }
                  }}
                  title="Copy all contrast issues"
                >
                  <Copy size={12} />
                </Button>
              )}
              <Switch
                size="sm"
                isSelected={contrastEnabled}
                onValueChange={toggleContrast}
                classNames={{
                  wrapper: 'bg-gray-700',
                  thumb: 'bg-gray-300'
                }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
