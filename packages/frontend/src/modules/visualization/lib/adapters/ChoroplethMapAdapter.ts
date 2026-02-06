export interface ChoroplethMapConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class ChoroplethMapAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: ChoroplethMapConfig<T>) {}
  init() {}
  update(config: ChoroplethMapConfig<T>) {}
  destroy() {}
}
