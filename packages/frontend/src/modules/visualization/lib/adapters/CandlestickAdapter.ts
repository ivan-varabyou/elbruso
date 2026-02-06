export interface CandlestickConfig<T = unknown> {
  data?: T[];
  dimensions?: { width: number; height: number };
  colors?: string[];
  animation?: boolean;
}
export class CandlestickAdapter<T = unknown> {
  constructor(container: SVGSVGElement, config: CandlestickConfig<T>) {}
  init() {}
  update(config: CandlestickConfig<T>) {}
  destroy() {}
}
