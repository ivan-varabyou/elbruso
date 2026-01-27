import * as d3 from 'd3';
import {
  ChartDimensions,
  ChartTheme,
  DEFAULT_THEME,
  DEFAULT_DIMENSIONS,
  AnimationConfig,
  DEFAULT_ANIMATION,
} from '../../types/visualization';

/**
 * Merge default dimensions with user-provided dimensions
 */
export function mergeDimensions(
  userDimensions?: Partial<ChartDimensions>
): ChartDimensions {
  return {
    ...DEFAULT_DIMENSIONS,
    ...userDimensions,
    margin: {
      ...DEFAULT_DIMENSIONS.margin,
      ...userDimensions?.margin,
    },
  };
}

/**
 * Merge default theme with user-provided theme
 */
export function mergeTheme(userTheme?: Partial<ChartTheme>): ChartTheme {
  return {
    ...DEFAULT_THEME,
    ...userTheme,
  };
}

/**
 * Merge default animation config with user-provided config
 */
export function mergeAnimation(
  userAnimation?: Partial<AnimationConfig>
): AnimationConfig {
  return {
    ...DEFAULT_ANIMATION,
    ...userAnimation,
  };
}

/**
 * Calculate inner dimensions (accounting for margins)
 */
export function getInnerDimensions(dimensions: ChartDimensions) {
  return {
    width: dimensions.width - dimensions.margin.left - dimensions.margin.right,
    height: dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
  };
}

/**
 * Format number with appropriate suffix (K, M, B)
 */
export function formatNumber(value: number): string {
  if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toFixed(0);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(1)}%`;
}

/**
 * Generate color scale from theme
 */
export function createColorScale(
  theme: ChartTheme,
  count: number
): d3.ScaleOrdinal<string, string> {
  const colors = [
    theme.primaryColor,
    theme.secondaryColor,
    theme.successColor,
    theme.warningColor,
    theme.errorColor,
  ];
  return d3.scaleOrdinal<string>().range(colors);
}

/**
 * Create responsive SVG with viewBox
 */
export function createResponsiveSVG(
  container: SVGSVGElement,
  dimensions: ChartDimensions
): d3.Selection<SVGSVGElement, unknown, null, undefined> {
  return d3
    .select(container)
    .attr('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
}

/**
 * Add grid lines to chart
 */
export function addGridLines(
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  xScale: d3.AxisScale<any>,
  yScale: d3.AxisScale<any>,
  innerWidth: number,
  innerHeight: number,
  theme: ChartTheme
) {
  // Horizontal grid lines
  svg
    .append('g')
    .attr('class', 'grid grid-horizontal')
    .call(
      d3
        .axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat(() => '')
    )
    .style('stroke', theme.gridColor)
    .style('stroke-opacity', 0.1)
    .style('stroke-dasharray', '2,2');

  // Vertical grid lines
  svg
    .append('g')
    .attr('class', 'grid grid-vertical')
    .attr('transform', `translate(0,${innerHeight})`)
    .call(
      d3
        .axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickFormat(() => '')
    )
    .style('stroke', theme.gridColor)
    .style('stroke-opacity', 0.1)
    .style('stroke-dasharray', '2,2');
}

/**
 * Create tooltip element
 */
export function createTooltip(className?: string): d3.Selection<HTMLDivElement, unknown, HTMLElement, any> {
  return d3
    .select('body')
    .append('div')
    .attr('class', `chart-tooltip ${className || ''}`)
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('background-color', 'rgba(0, 0, 0, 0.8)')
    .style('color', 'white')
    .style('padding', '8px 12px')
    .style('border-radius', '4px')
    .style('font-size', '12px')
    .style('pointer-events', 'none')
    .style('z-index', '9999');
}

/**
 * Show tooltip at position
 */
export function showTooltip(
  tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>,
  content: string,
  event: MouseEvent
) {
  tooltip
    .html(content)
    .style('visibility', 'visible')
    .style('left', `${event.pageX + 10}px`)
    .style('top', `${event.pageY - 10}px`);
}

/**
 * Hide tooltip
 */
export function hideTooltip(
  tooltip: d3.Selection<HTMLDivElement, unknown, HTMLElement, any>
) {
  tooltip.style('visibility', 'hidden');
}

/**
 * Get D3 curve function by name
 */
export function getCurveFunction(curveName?: string): d3.CurveFactory {
  switch (curveName) {
    case 'linear':
      return d3.curveLinear;
    case 'cardinal':
      return d3.curveCardinal;
    case 'monotone':
      return d3.curveMonotoneX;
    case 'step':
      return d3.curveStep;
    default:
      return d3.curveCardinal;
  }
}
