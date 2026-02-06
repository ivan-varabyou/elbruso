export interface PieChartConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  innerRadius?: number;
  showLabels?: boolean;
  showPercentages?: boolean;
  colors?: string[];
  animation?: boolean;
}

export class PieChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: PieChartConfig<T>) {}
  init() {}
  update(config: PieChartConfig<T>) {}
  destroy() {}
}
