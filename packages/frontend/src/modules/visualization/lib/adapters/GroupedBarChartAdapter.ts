export interface GroupedBarChartConfig<T = unknown> {
  series?: T[];
  dimensions?: { width: number; height: number };
  orientation?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showValues?: boolean;
  showLegend?: boolean;
  colors?: string[];
  animation?: boolean;
}
export class GroupedBarChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: GroupedBarChartConfig<T>) {}
  init() {}
  update(config: GroupedBarChartConfig<T>) {}
  destroy() {}
}
