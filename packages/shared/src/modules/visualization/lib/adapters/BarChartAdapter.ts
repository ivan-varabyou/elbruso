// Placeholder for BarChartAdapter - to be implemented
export interface BarChartConfig<T = unknown> {
  data?: T[];
  xKey?: keyof T;
  yKey?: keyof T;
  dimensions?: {
    width: number;
    height: number;
  };
  colors?: string[];
  animation?: boolean;
}

export class BarChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: BarChartConfig<T>) {}
  init() {}
  update(config: BarChartConfig<T>) {}
  destroy() {}
}
