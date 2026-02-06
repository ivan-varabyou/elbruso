export interface RadarChartConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
  series?: T;
  maxValue?: number;
  levels?: number;
  showAxes?: boolean;
  showLegend?: boolean;
}
export class RadarChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: RadarChartConfig<T>) {}
  init() {}
  update(config: RadarChartConfig<T>) {}
  destroy() {}
}
