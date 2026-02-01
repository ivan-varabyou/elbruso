export interface CorrelationMatrixConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class CorrelationMatrixAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: CorrelationMatrixConfig<T>) {}
  init() {}
  update(config: CorrelationMatrixConfig<T>) {}
  destroy() {}
}
