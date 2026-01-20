import * as d3 from 'd3';
import {
  ChartDimensions,
  ChartTheme,
  BaseChartConfig,
  AnimationConfig,
} from '../types';
import {
  mergeDimensions,
  mergeTheme,
  mergeAnimation,
  getInnerDimensions,
  createResponsiveSVG,
  createTooltip,
  hideTooltip,
} from '../utils';

/**
 * Base adapter class for all D3 charts
 * Handles common functionality like SVG setup, responsive behavior, and cleanup
 */
export abstract class BaseChartAdapter<TConfig extends BaseChartConfig> {
  protected svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  protected g: d3.Selection<SVGGElement, unknown, null, undefined> | null = null;
  protected tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any> | null = null;
  protected dimensions: ChartDimensions;
  protected theme: ChartTheme;
  protected animation: AnimationConfig;
  protected config: TConfig;
  protected resizeObserver: ResizeObserver | null = null;

  constructor(protected container: SVGSVGElement, config: TConfig) {
    this.config = config;
    this.dimensions = mergeDimensions(config.dimensions);
    this.theme = mergeTheme(config.theme);
    this.animation = mergeAnimation(config.animation);
  }

  /**
   * Initialize the chart
   */
  public init(): void {
    this.cleanup();
    this.setupSVG();
    this.setupTooltip();
    this.render();
    
    if (this.config.responsive !== false) {
      this.setupResponsive();
    }
  }

  /**
   * Setup SVG element
   */
  protected setupSVG(): void {
    this.svg = createResponsiveSVG(this.container, this.dimensions);
    
    // Create main group with margins
    this.g = this.svg
      .append('g')
      .attr(
        'transform',
        `translate(${this.dimensions.margin.left},${this.dimensions.margin.top})`
      );
  }

  /**
   * Setup tooltip
   */
  protected setupTooltip(): void {
    if (this.config.tooltip?.enabled !== false) {
      this.tooltip = createTooltip(this.config.tooltip?.className);
    }
  }

  /**
   * Setup responsive behavior
   */
  protected setupResponsive(): void {
    const containerElement = this.container.parentElement;
    if (!containerElement) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.handleResize();
    });
    this.resizeObserver.observe(containerElement);
  }

  /**
   * Handle resize event
   */
  protected handleResize(): void {
    // Subclasses can override this for custom resize behavior
    // Default: just re-render
    this.render();
  }

  /**
   * Abstract render method - must be implemented by subclasses
   */
  protected abstract render(): void;

  /**
   * Get inner dimensions (accounting for margins)
   */
  protected getInnerDimensions() {
    return getInnerDimensions(this.dimensions);
  }

  /**
   * Get transition for animations
   */
  protected getTransition(): d3.Transition<any, any, any, any> | d3.Selection<any, any, any, any> {
    if (!this.animation.enabled || !this.svg) {
      return this.svg as any;
    }

    return this.svg
      .transition()
      .duration(this.animation.duration)
      .ease(d3.easeCubicInOut);
  }

  /**
   * Cleanup chart resources
   */
  public cleanup(): void {
    if (this.svg) {
      this.svg.selectAll('*').remove();
    }
    
    if (this.tooltip) {
      hideTooltip(this.tooltip);
      this.tooltip.remove();
      this.tooltip = null;
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  /**
   * Update chart with new config
   */
  public update(config: Partial<TConfig>): void {
    this.config = { ...this.config, ...config };
    this.dimensions = mergeDimensions(config.dimensions);
    this.theme = mergeTheme(config.theme);
    this.animation = mergeAnimation(config.animation);
    this.render();
  }

  /**
   * Destroy chart and cleanup all resources
   */
  public destroy(): void {
    this.cleanup();
  }
}
