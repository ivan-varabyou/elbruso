export interface StreamGraphConfig<T = unknown> {
  series?: T[];
  dimensions?: { width: number; height: number };
  xAxisLabel?: string;
  yAxisLabel?: string;
  offset?: string;
  colors?: string[];
  animation?: boolean;
}
export class StreamGraphAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: StreamGraphConfig<T>) {}
  init() {}
  update(config: StreamGraphConfig<T>) {}
  destroy() {}
}
