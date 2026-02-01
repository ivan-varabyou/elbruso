export interface GeoHeatMapConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class GeoHeatMapAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: GeoHeatMapConfig<T>) {}
  init() {}
  update(config: GeoHeatMapConfig<T>) {}
  destroy() {}
}
