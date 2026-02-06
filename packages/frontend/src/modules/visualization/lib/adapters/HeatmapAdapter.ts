export interface HeatmapConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class HeatmapAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: HeatmapConfig<T>) {}
  init() {}
  update(config: HeatmapConfig<T>) {}
  destroy() {}
}
