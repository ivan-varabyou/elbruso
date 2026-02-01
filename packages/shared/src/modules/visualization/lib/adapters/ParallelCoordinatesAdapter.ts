export interface ParallelCoordinatesConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class ParallelCoordinatesAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: ParallelCoordinatesConfig<T>) {}
  init() {}
  update(config: ParallelCoordinatesConfig<T>) {}
  destroy() {}
}
