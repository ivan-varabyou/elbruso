export interface StackedBarChartConfig<T = unknown> {
  categories?: T[];
  series?: T[];
  dimensions?: { width: number; height: number };
  orientation?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showLegend?: boolean;
  colors?: string[];
  animation?: boolean;
}
export class StackedBarChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: StackedBarChartConfig<T>) {}
  init() {}
  update(config: StackedBarChartConfig<T>) {}
  destroy() {}
}
