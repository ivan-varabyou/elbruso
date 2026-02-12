// @ts-nocheck
"use client";

console.log("[DevTools] Module loaded");

import { ReactNode, useEffect, useRef,useState } from "react";

interface SourceInfo {
  fileName: string;
  lineNumber: number;
  callFileName?: string;
  callLineNumber?: number;
}

interface ElementInfo {
  url: string;
  path: string;
  pathLine: number;
  callPath?: string;
  callPathLine: number;
  class: string | null;
  x: number;
  y: number;
  text?: string;
}

interface Selection {
  id: string;
  rect: DOMRect;
  info: ElementInfo;
  color: string;
  target: HTMLElement;
}

function getSyntheticPath(element: HTMLElement): string {
  const path: string[] = [];
  let current: HTMLElement | null = element;
  while (current && current !== document.body.parentElement) {
    path.unshift(current.tagName.toLowerCase());
    current = current.parentElement;
  }
  return path.join(" > ");
}

function findDataSource(
  element: HTMLElement,
  drillDepth: number = 0,
): { info: SourceInfo; target: HTMLElement } | null {
  let current: HTMLElement | null = element;
  const matches: { info: SourceInfo; target: HTMLElement }[] = [];

  while (current) {
    const dataPath = current.getAttribute("data-path");
    const dataCallPath = current.getAttribute("data-call-path");
    const dataSourceAttr = current.getAttribute("data-source");

    let info: SourceInfo | null = null;

    if (dataPath && dataPath !== "unknown") {
      const [fileName, lineStr] = dataPath.split(":");
      const lineNumber = parseInt(lineStr, 10);
      if (fileName && !isNaN(lineNumber)) {
        info = { fileName, lineNumber };
      }
    }

    if (!info && dataSourceAttr && dataSourceAttr !== "unknown") {
      try {
        const decoded = decodeURIComponent(dataSourceAttr);
        // Handle potential double encoding or plain JSON
        const sourceData = JSON.parse(
          decoded.startsWith("{") ? decoded : decodeURIComponent(decoded),
        );
        if (sourceData.fileName && sourceData.lineNumber) {
          info = { fileName: sourceData.fileName, lineNumber: sourceData.lineNumber };
        }
      } catch {}
    }

    if (info) {
      // 1. Explicit call path (passed via props)
      let callFinder: HTMLElement | null = current;
      while (callFinder && !info.callFileName) {
        const cp = callFinder.getAttribute("data-call-path");
        if (cp && cp !== "unknown") {
          const [f, l] = cp.split(":");
          info.callFileName = f;
          info.callLineNumber = parseInt(l, 10);
        }
        callFinder = callFinder.parentElement;
      }

      // 2. Inferred call path (parent component origin)
      if (!info.callFileName) {
        let parentFinder: HTMLElement | null = current.parentElement;
        while (parentFinder && !info.callFileName) {
          const pp = parentFinder.getAttribute("data-path");
          if (pp && pp !== "unknown") {
            const [pf, pl] = pp.split(":");
            if (pf !== info.fileName) {
              info.callFileName = pf;
              info.callLineNumber = parseInt(pl, 10);
            }
          }
          parentFinder = parentFinder.parentElement;
        }
      }
      matches.push({ info, target: current });
    } else if (dataCallPath && dataCallPath !== "unknown") {
      const [f, l] = dataCallPath.split(":");
      matches.push({ info: { fileName: f, lineNumber: parseInt(l, 10) }, target: current });
    }

    current = current.parentElement;
  }

  if (matches.length === 0) return null;
  return matches[Math.min(drillDepth, matches.length - 1)];
}

const COLORS = [
  "#007bff",
  "#ff6b00",
  "#28a745",
  "#dc3545",
  "#6f42c1",
  "#e83e8c",
  "#20c997",
  "#fd7e14",
];

export function DevTools({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"single" | "multiple">("single");
  const [selections, setSelections] = useState<Selection[]>([]);
  const [hovered, setHovered] = useState<{
    rect: DOMRect;
    info: SourceInfo;
    target: HTMLElement;
  } | null>(null);
  const [isAltPressed, setIsAltPressed] = useState(false);
  const [componentsHighlighted, setComponentsHighlighted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActiveRef = useRef(false);
  const modeRef = useRef<"single" | "multiple">("single");
  const selectionsRef = useRef<Selection[]>([]);
  const componentsHighlightedRef = useRef(false);

  useEffect(() => {
    isActiveRef.current = isActive;
    modeRef.current = mode;
    selectionsRef.current = selections;
    componentsHighlightedRef.current = componentsHighlighted;
  }, [isActive, mode, selections, componentsHighlighted]);

  const toggleComponentsHighlight = () => {
    if (componentsHighlighted) {
      setSelections((prev) => prev.filter((s) => !s.id.startsWith("comp:")));
      setComponentsHighlighted(false);
    } else {
      const allElements = document.querySelectorAll("[data-path]");
      const groups: { [path: string]: HTMLElement[] } = {};

      allElements.forEach((el) => {
        const dataPath = el.getAttribute("data-path");
        if (!dataPath || dataPath === "unknown") return;

        let fileName = "";
        
        if (dataPath.startsWith("{") || dataPath.startsWith("%7B")) {
          try {
            const decoded = dataPath.startsWith("%7B") ? decodeURIComponent(dataPath) : dataPath;
            const json = JSON.parse(decoded);
            fileName = json.file || json.fileName || "";
          } catch {}
        } else {
          fileName = dataPath.split(":")[0] || "";
        }

        if (!fileName.includes("/ui/") && !dataPath.includes("/ui/")) return;
        if (fileName.includes("/devtools/") || dataPath.includes("/devtools/")) return;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        if (!groups[dataPath]) groups[dataPath] = [];
        groups[dataPath].push(el as HTMLElement);
      });

      const newSelections: Selection[] = [];
      Object.entries(groups).forEach(([path, elements], groupIndex) => {
        const color = COLORS[groupIndex % COLORS.length];
        elements.forEach((el, elIndex) => {
          const rect = el.getBoundingClientRect();
          let fileName = "";
          let lineNumber = 0;

          if (path.startsWith("{") || path.startsWith("%7B")) {
            try {
              const decoded = path.startsWith("%7B") ? decodeURIComponent(path) : path;
              const json = JSON.parse(decoded);
              fileName = json.file || json.fileName || "";
              lineNumber = json.fileLine || json.lineNumber || 0;
            } catch {}
          } else {
            const parts = path.split(":");
            fileName = parts[0] || "";
            lineNumber = parseInt(parts[1], 10) || 0;
          }

          newSelections.push({
            id: `comp:${groupIndex}:${elIndex}:${fileName}:${lineNumber}`,
            rect: rect,
            info: {
              url: window.location.href,
              path: "@" + fileName,
              pathLine: lineNumber,
              callPath: undefined,
              callPathLine: 0,
              class: (el as HTMLElement).className || null,
              y: rect.top,
              x: rect.left,
              text: el.textContent?.substring(0, 50).trim() || null,
            },
            color,
            target: el as HTMLElement,
          });
        });
      });

      setSelections(newSelections);
      setComponentsHighlighted(true);
    }
  };

  const deactivate = () => {
    if (isActiveRef.current) {
      if (modeRef.current === "multiple" && selectionsRef.current.length > 0) {
        const data = selectionsRef.current.map((s) => s.info);
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        console.log("[DevTools] Batch result:", data);
      }
      setIsActive(false);
      setSelections([]);
      setHovered(null);
      setIsAltPressed(false);
      setComponentsHighlighted(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsActive(true);
        setMode(e.shiftKey ? "multiple" : "single");
      } else if (e.key === "Shift" && isActiveRef.current) {
        setMode("multiple");
      } else if (e.key === "Alt" && isActiveRef.current) {
        setIsAltPressed(true);
      } else if (e.key === "Escape" && isActiveRef.current) {
        deactivate();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control" && isActiveRef.current) {
        deactivate();
      } else if (e.key === "Alt") {
        setIsAltPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    // BLOCK ALL BROWSER EVENTS
    const blockEvent = (e: Event) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      if (isActiveRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      if (componentsHighlightedRef.current) {
        setHovered(null);
        return;
      }
      const target = e.target as HTMLElement;
      const data = findDataSource(target, isAltPressed ? 1 : 0);
      if (data) {
        setHovered({
          rect: data.target.getBoundingClientRect(),
          info: data.info,
          target: data.target,
        });
      } else {
        setHovered(null);
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      if (componentsHighlightedRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const target = e.target as HTMLElement;
      const data = findDataSource(target, e.altKey ? 1 : 0);
      if (!data) return;

      const { info: source, target: element } = data;
      const rect = element.getBoundingClientRect();
      const elementInfo: ElementInfo = {
        url: window.location.href,
        path: source.fileName,
        pathLine: source.lineNumber,
        callPath: source.callFileName,
        callPathLine: source.callLineNumber || 0,
        test: element.tagName.toLowerCase(),
        class: element.className || null,
        y: e.clientY,
        x: e.clientX,
        text: element.textContent?.substring(0, 50).trim() || null,
      };

      // Select All Similar logic
      if (e.altKey && modeRef.current === "multiple") {
        const isComponent =
          source.fileName.includes("/ui/") || source.fileName.includes("/component");
        if (isComponent) {
          const allFound = Array.from(
            document.querySelectorAll(`[data-path^="${source.fileName}"]`),
          );
          const newSelections = allFound.map((el) => {
            const elRect = el.getBoundingClientRect();
            const s = findDataSource(el);
            return {
              id: `${source.fileName}:${s?.info.lineNumber || 0}-${el.offsetLeft}-${el.offsetTop}`,
              rect: elRect,
              info: {
                ...elementInfo,
                class: el.className || null,
                y: elRect.top,
                x: elRect.left,
                pathLine: s?.info.lineNumber || source.lineNumber,
              },
              color: COLORS[selectionsRef.current.length % COLORS.length],
              target: el as HTMLElement,
            };
          });
          setSelections((prev) => {
            const filtered = prev.filter((p) => p.info.path !== source.fileName);
            return [...filtered, ...newSelections];
          });
          return;
        }
      }

      if (modeRef.current === "single") {
        navigator.clipboard.writeText(JSON.stringify(elementInfo, null, 2));
        console.log("[DevTools] Captured:", elementInfo);
        // NO DEACTIVATE ON CLICK
        const id = "single-hover";
        setSelections([{ id, rect, info: elementInfo, color: COLORS[0], target: element }]);
      } else {
        const id = `${source.fileName}:${source.lineNumber}-${rect.left}-${rect.top}`;
        setSelections((prev) => {
          if (prev.some((s) => s.id === id)) {
            return prev.filter((s) => s.id !== id);
          }
          const color = COLORS[prev.length % COLORS.length];
          return [...prev, { id, rect, info: elementInfo, color, target: element }];
        });
      }
    };

    // Use capture phase to intercept before original listeners
    document.addEventListener("click", handleClick, true);
    document.addEventListener("mousedown", blockEvent, true);
    document.addEventListener("mouseup", blockEvent, true);
    document.addEventListener("submit", blockEvent, true);
    document.addEventListener("mouseover", handleMouseOver, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("mousedown", blockEvent, true);
      document.removeEventListener("mouseup", blockEvent, true);
      document.removeEventListener("submit", blockEvent, true);
      document.removeEventListener("mouseover", handleMouseOver, true);
    };
  }, [isActive, isAltPressed]);

  useEffect(() => {
    if (!isActive || selections.length === 0) return;

    const updatePositions = () => {
      const updates: { id: string; rect: DOMRect }[] = [];

      selections.forEach((s) => {
        if (s.target) {
          updates.push({ id: s.id, rect: s.target.getBoundingClientRect() });
        }
      });

      if (updates.length > 0) {
        setSelections((prev) =>
          prev.map((s) => {
            const update = updates.find((u) => u.id === s.id);
            return update ? { ...s, rect: update.rect } : s;
          }),
        );
      }
    };

    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updatePositions);
    };

    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isActive, selections.length]);

  return (
    <>
      {children}
      {isActive && (
        <div
          ref={containerRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 9999999,
          }}
        >
          {hovered && (
            <div
              style={{
                position: "fixed",
                left: hovered.rect.left,
                top: hovered.rect.top,
                width: hovered.rect.width,
                height: hovered.rect.height,
                border: "2px solid #007bff",
                background: "rgba(0, 123, 255, 0.1)",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: hovered.rect.top < 50 ? 5 : -45,
                  left: -2,
                  background: "rgba(0,123,255,0.9)",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  whiteSpace: "nowrap",
                  zIndex: 10000000,
                }}
              >
            
             
                {hovered.target.getAttribute("data-path") && (
                  <div style={{ fontSize: "9px", opacity: 0.8, marginTop: "2px" }}>
                    {hovered.target.getAttribute("data-path")}
                  </div>
                )}
                {hovered.target.getAttribute("data-call-path") && (
                  <div style={{ fontSize: "9px", opacity: 0.8 }}>
                    {hovered.target.getAttribute("data-call-path")}
                  </div>
                )}
               
                 
                </div>
                
              </div>
          )}
          {selections.map((s) => (
            <div
              key={s.id}
              style={{
                position: "fixed",
                left: s.rect.left,
                top: s.rect.top,
                width: s.rect.width,
                height: s.rect.height,
                border: `2px solid ${s.color}`,
                background: `${s.color}20`,
                boxSizing: "border-box",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: s.rect.top < 50 ? 5 : -40,
                  left: -2,
                  background: s.color,
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontFamily: "monospace",
                  zIndex: 10000000,
                  whiteSpace: "nowrap",
                }}
              >
                <div>
                  <span style={{ fontWeight: "bold" }}>PATH:</span> {s.info.path}:{s.info.pathLine}
                </div>
                {s.info.callPath && (
                  <div>
                    <span style={{ fontWeight: "bold" }}>FROM:</span> {s.info.callPath}:
                    {s.info.callPathLine}
                  </div>
                )}
               
              </div>
            </div>
          ))}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.85)",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "0 0 8px 8px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "monospace",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
              pointerEvents: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: mode === "multiple" ? "#ff6b00" : "#007bff",
                }}
              />
              <span style={{ fontWeight: "bold", letterSpacing: "0.5px" }}>
                {mode === "multiple" ? "MULTIPLE MODE" : "SINGLE MODE"}
              </span>
            </div>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.2)" }} />
            <span>{selections.length > 0 && `Selected: ${selections.length}`}</span>
            <button
              onClick={() => setMode((prev) => (prev === "single" ? "multiple" : "single"))}
              style={{
                background: mode === "multiple" ? "#ff6b00" : "transparent",
                border: "1px solid #ff6b00",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              Множественный выбор
            </button>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.2)" }} />
            <button
              onClick={toggleComponentsHighlight}
              style={{
                background: componentsHighlighted ? "#6f42c1" : "transparent",
                border: "1px solid #6f42c1",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              COMPONENTS 🎨
            </button>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ opacity: 0.7 }}>
              {mode === "single" ? "Нажми Shift для множественного выбора" : "Выберите элементы"}
            </span>
            <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.2)" }} />
            <span style={{ opacity: 0.7 }}>Alt: Drill-up | Escape/Release Ctrl to finish</span>
          </div>
        </div>
      )}
    </>
  );
}
