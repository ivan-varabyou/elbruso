export interface BubbleChartConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class BubbleChartAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: BubbleChartConfig<T>) {}
  init() {}
  update(config: BubbleChartConfig<T>) {}
  destroy() {}
}
