export interface WaterfallChartConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class WaterfallChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: WaterfallChartConfig<T>) {}
  init() {}
  update(config: WaterfallChartConfig<T>) {}
  destroy() {}
}
