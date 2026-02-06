export interface HistogramConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class HistogramAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: HistogramConfig<T>) {}
  init() {}
  update(config: HistogramConfig<T>) {}
  destroy() {}
}
