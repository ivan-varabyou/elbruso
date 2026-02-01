export interface PathInfo {
  file: string;
  fileLine: number;
  callFile: string | null;
  callFileLine: number | null;
}

export interface PluginOptions {
  enabled?: boolean;
  verbose?: boolean;
}

export interface TransformResult {
  code: string;
  map?: string;
}

export interface ConsoleEntry {
  id: string;
  type: "info" | "action" | "error";
  message: string;
  timestamp: number;
  data?: Record<string, unknown>;
}

export interface DebugState {
  isEnabled: boolean;
  isInspecting: boolean;
  selectedElements: ElementInfo[];
  logs: ConsoleEntry[];
}

export interface ElementInfo {
  element: HTMLElement;
  path: PathInfo | null;
  domPath: string;
  className: string;
  text: string;
}
