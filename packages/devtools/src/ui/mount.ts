import { getElementPath, getElementText, getPathData } from "./lib/dom";
import { createShadowRoot, injectStyles } from "./lib/shadow-root";
import { generateId } from "./lib/utils";

interface ConsoleEntry {
  id: string;
  type: "info" | "action" | "error";
  message: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

interface DebugState {
  isEnabled: boolean;
  isInspecting: boolean;
  selectedElements: Array<{
    element: HTMLElement;
    path: {
      file: string;
      fileLine: number;
      callFile: string | null;
      callFileLine: number | null;
    } | null;
    domPath: string;
    className: string;
    text: string;
  }>;
  logs: ConsoleEntry[];
}

class DebugStateManager {
  private state: DebugState = {
    isEnabled: false,
    isInspecting: false,
    selectedElements: [],
    logs: [],
  };

  private listeners: Set<(state: DebugState) => void> = new Set();

  getState(): DebugState {
    return { ...this.state };
  }

  setState(partial: Partial<DebugState>): void {
    this.state = { ...this.state, ...partial };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: (state: DebugState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  addLog(type: ConsoleEntry["type"], message: string, data?: Record<string, unknown>): void {
    const entry: ConsoleEntry = {
      id: generateId(),
      type,
      message,
      timestamp: Date.now(),
      data,
    };
    this.setState({ logs: [...this.state.logs, entry] });
  }

  clearLogs(): void {
    this.setState({ logs: [] });
  }
}

export const stateManager = new DebugStateManager();

export function mount(
  container: HTMLElement = document.body,
): { host: HTMLElement; shadow: ShadowRoot } | null {
  if (typeof document === "undefined") return null;

  try {
    const host = document.createElement("div");
    host.className = "devtools-host";
    host.style.cssText = "all: initial; position: fixed; top: 0; left: 0; width: 0; height: 0;";
    container.appendChild(host);

    const shadow = createShadowRoot(host);
    injectStyles(shadow);

    let isEnabled = false;

    stateManager.subscribe((state) => {
      renderConsole(shadow, state);
    });

    renderTrigger(shadow, () => {
      isEnabled = !isEnabled;
      stateManager.setState({ isEnabled });
    });

    return { host, shadow };
  } catch (error) {
    console.error("devtools mount error:", error);
    return null;
  }
}

function renderTrigger(shadow: ShadowRoot, onClick: () => void): void {
  const trigger = document.createElement("button");
  trigger.className = "devtools-trigger";
  trigger.innerHTML = "🔧";
  trigger.title = "DevTools";
  trigger.addEventListener("click", onClick);
  shadow.appendChild(trigger);
}

function renderConsole(shadow: ShadowRoot, state: DebugState): void {
  let consoleEl = shadow.querySelector(".devtools-console") as HTMLElement;

  if (!consoleEl) {
    consoleEl = document.createElement("div");
    consoleEl.className = "devtools-console";
    consoleEl.innerHTML = `
      <div class="devtools-console-header">
        <span class="devtools-console-title">Debug Console</span>
        <button class="devtools-console-close">&times;</button>
      </div>
      <div class="devtools-console-body"></div>
    `;
    shadow.appendChild(consoleEl);

    consoleEl.querySelector(".devtools-console-close")?.addEventListener("click", () => {
      stateManager.setState({ isEnabled: false });
    });
  }

  const body = consoleEl.querySelector(".devtools-console-body") as HTMLElement;
  body.innerHTML = state.logs
    .map(
      (log) => `
    <div class="devtools-log-item ${log.type}">
      <div class="devtools-log-time">${new Date(log.timestamp).toLocaleTimeString()}</div>
      <div>${log.message}</div>
    </div>
  `,
    )
    .join("");

  consoleEl.style.display = state.isEnabled ? "flex" : "none";
  consoleEl.querySelector(".devtools-console-title")!.textContent =
    `Debug Console (${state.logs.length})`;
}

export function getElementInfo(element: HTMLElement) {
  const path = getPathData(element);
  return {
    element,
    path,
    domPath: getElementPath(element),
    className: element.className || "",
    text: getElementText(element),
  };
}

export function copyElementInfo(element: HTMLElement): void {
  const info = getElementInfo(element);
  const data = {
    url: window.location.href,
    path: info.path,
    domPath: info.domPath,
    className: info.className,
    text: info.text,
  };

  navigator.clipboard.writeText(JSON.stringify(data, null, 2));
  stateManager.addLog("action", `Copied info for element`, data);
}
