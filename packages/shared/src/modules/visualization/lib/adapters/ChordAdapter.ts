export interface ChordConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class ChordAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: ChordConfig<T>) {}
  init() {}
  update(config: ChordConfig<T>) {}
  destroy() {}
}
