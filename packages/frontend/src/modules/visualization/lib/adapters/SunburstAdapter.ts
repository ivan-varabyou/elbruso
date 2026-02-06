export interface SunburstConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class SunburstAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: SunburstConfig<T>) {}
  init() {}
  update(config: SunburstConfig<T>) {}
  destroy() {}
}
