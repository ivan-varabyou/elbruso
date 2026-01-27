import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { BarChartConfig } from '../../types/visualization';
import { showTooltip, hideTooltip, formatNumber } from '../utils';

/**
 * Histogram adapter using D3
 * Displays distribution of continuous data
 */
export class HistogramAdapter extends BaseChartAdapter<BarChartConfig> {
  protected render(): void {
    if (!this.g) return;

    const { width, height } = this.getInnerDimensions();
    const { data } = this.config;

    // Clear previous render
    this.g.selectAll('*').remove();

    // Extract values for histogram
    const values = data.map(d => d.value);

    // Create histogram generator
    const histogram = d3
      .bin()
      .domain([d3.min(values) || 0, d3.max(values) || 100])
      .thresholds(20); // Number of bins

    const bins = histogram(values);

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain([bins[0].x0 || 0, bins[bins.length - 1].x1 || 100])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(bins, d => d.length) || 10])
      .nice()
      .range([height, 0]);

    // Render bars
    this.g!
      .selectAll('.bar')
      .data(bins)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.x0 || 0))
      .attr('width', d => Math.max(0, xScale(d.x1 || 0) - xScale(d.x0 || 0) - 1))
      .attr('y', height)
      .attr('height', 0)
      .attr('fill', this.theme.primaryColor)
      .attr('rx', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        if (this.tooltip) {
          const content = `Range: ${formatNumber(d.x0 || 0)} - ${formatNumber(d.x1 || 0)}<br/>Count: ${d.length}`;
          showTooltip(this.tooltip, content, event);
        }
        d3.select(event.currentTarget).attr('opacity', 0.8);
      })
      .on('mouseout', (event) => {
        if (this.tooltip) {
          hideTooltip(this.tooltip);
        }
        d3.select(event.currentTarget).attr('opacity', 1);
      })
      .transition()
      .duration(this.animation.enabled ? this.animation.duration : 0)
      .attr('y', d => yScale(d.length))
      .attr('height', d => height - yScale(d.length));

    // Add axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d => formatNumber(d as number));
    const yAxis = d3.axisLeft(yScale);

    this.g
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .style('color', this.theme.textColor)
      .style('font-family', this.theme.fontFamily);

    this.g
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .style('color', this.theme.textColor)
      .style('font-family', this.theme.fontFamily);
  }
}
