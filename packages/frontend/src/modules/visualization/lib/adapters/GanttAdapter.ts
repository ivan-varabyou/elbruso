export interface GanttConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class GanttAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: GanttConfig<T>) {}
  init() {}
  update(config: GanttConfig<T>) {}
  destroy() {}
}
