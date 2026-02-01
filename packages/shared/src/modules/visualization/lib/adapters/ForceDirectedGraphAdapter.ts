export interface ForceDirectedGraphConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class ForceDirectedGraphAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: ForceDirectedGraphConfig<T>) {}
  init() {}
  update(config: ForceDirectedGraphConfig<T>) {}
  destroy() {}
}
