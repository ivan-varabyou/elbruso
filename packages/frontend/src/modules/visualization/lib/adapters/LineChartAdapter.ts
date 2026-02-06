export interface LineChartConfig<T = unknown> {
  data?: T[];
  xKey?: keyof T;
  yKey?: keyof T;
  dimensions?: {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
  };
  colors?: string[];
  animation?: boolean;
  series?: T[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  curve?: string;
  theme?: { primaryColor?: string };
  showArea?: boolean;
}

export class LineChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: LineChartConfig<T>) {}
  init() {}
  update(config: LineChartConfig<T>) {}
  destroy() {}
}
