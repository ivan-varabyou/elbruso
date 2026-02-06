export interface BubbleMapConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class BubbleMapAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: BubbleMapConfig<T>) {}
  init() {}
  update(config: BubbleMapConfig<T>) {}
  destroy() {}
}
