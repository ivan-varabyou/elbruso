export interface SankeyConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class SankeyAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: SankeyConfig<T>) {}
  init() {}
  update(config: SankeyConfig<T>) {}
  destroy() {}
}
