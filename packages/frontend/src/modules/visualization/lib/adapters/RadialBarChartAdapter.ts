export interface RadialBarChartConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  showLabels?: boolean;
  showValues?: boolean;
  colors?: string[];
  animation?: boolean;
}
export class RadialBarChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: RadialBarChartConfig<T>) {}
  init() {}
  update(config: RadialBarChartConfig<T>) {}
  destroy() {}
}
