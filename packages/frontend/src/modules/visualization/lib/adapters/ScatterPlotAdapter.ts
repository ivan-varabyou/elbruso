export interface ScatterChartConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class ScatterPlotAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: ScatterChartConfig<T>) {}
  init() {}
  update(config: ScatterChartConfig<T>) {}
  destroy() {}
}
