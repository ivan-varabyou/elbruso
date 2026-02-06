export interface BoxPlotConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class BoxPlotAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: BoxPlotConfig<T>) {}
  init() {}
  update(config: BoxPlotConfig<T>) {}
  destroy() {}
}
