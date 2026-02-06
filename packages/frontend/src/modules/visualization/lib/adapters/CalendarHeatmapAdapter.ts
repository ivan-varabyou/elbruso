export interface CalendarHeatmapConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class CalendarHeatmapAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: CalendarHeatmapConfig<T>) {}
  init() {}
  update(config: CalendarHeatmapConfig<T>) {}
  destroy() {}
}
