export interface ViolinPlotConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class ViolinPlotAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: ViolinPlotConfig<T>) {}
  init() {}
  update(config: ViolinPlotConfig<T>) {}
  destroy() {}
}
