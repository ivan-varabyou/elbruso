export interface AreaChartConfig<T = unknown> {
  series?: T[];
  dimensions?: { width: number; height: number };
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  colors?: string[];
  animation?: boolean;
}

export class AreaChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: AreaChartConfig<T>) {}
  init() {}
  update(config: AreaChartConfig<T>) {}
  destroy() {}
}
