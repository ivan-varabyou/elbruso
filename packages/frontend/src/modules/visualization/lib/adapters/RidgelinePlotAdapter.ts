export interface RidgelinePlotConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class RidgelinePlotAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: RidgelinePlotConfig<T>) {}
  init() {}
  update(config: RidgelinePlotConfig<T>) {}
  destroy() {}
}
