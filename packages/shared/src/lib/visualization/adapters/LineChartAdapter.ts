import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { LineChartConfig } from '@/shared/visualization';
import {
  addGridLines,
  getCurveFunction,
  showTooltip,
  hideTooltip,
  formatNumber,
} from '../utils';

/**
 * Line chart adapter using D3
 */
export class LineChartAdapter extends BaseChartAdapter<LineChartConfig> {
  protected render(): void {
    if (!this.g) return;

    const { width, height } = this.getInnerDimensions();
    const { series, showGrid, curve } = this.config;

    // Clear previous render
    this.g.selectAll('*').remove();

    // Prepare data
    const allData = series.flatMap(s => s.data);
    
    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allData, d => d.x as number) as [number, number])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(allData, d => d.y) || 100])
      .nice()
      .range([height, 0]);

    // Add grid if enabled
    if (showGrid) {
      addGridLines(this.g, xScale, yScale, width, height, this.theme);
    }

    // Create line generator
    const lineGenerator = d3
      .line<any>()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))
      .curve(getCurveFunction(curve));

    // Create area generator for filled areas
    const areaGenerator = d3
      .area<any>()
      .x(d => xScale(d.x))
      .y0(height)
      .y1(d => yScale(d.y))
      .curve(getCurveFunction(curve));

    // Render each series
    series.forEach((s, index) => {
      const color = s.color || this.theme.primaryColor;

      // Render area if enabled
      if (s.showArea) {
        this.g!
          .append('path')
          .datum(s.data)
          .attr('class', `area area-${s.id}`)
          .attr('fill', color)
          .attr('opacity', 0.2)
          .attr('d', areaGenerator);
      }

      // Render line
      const path = this.g!
        .append('path')
        .datum(s.data)
        .attr('class', `line line-${s.id}`)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)
        .attr('d', lineGenerator);

      // Animate line drawing
      if (this.animation.enabled) {
        const totalLength = (path.node() as SVGPathElement).getTotalLength();
        path
          .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
          .attr('stroke-dashoffset', totalLength)
          .transition()
          .duration(this.animation.duration)
          .ease(d3.easeCubicInOut)
          .attr('stroke-dashoffset', 0);
      }

      // Add interactive points
      this.g!
        .selectAll(`.point-${s.id}`)
        .data(s.data)
        .enter()
        .append('circle')
        .attr('class', `point point-${s.id}`)
        .attr('cx', d => xScale(d.x as number))
        .attr('cy', d => yScale(d.y))
        .attr('r', 4)
        .attr('fill', color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', (event, d) => {
          if (this.tooltip) {
            const content = this.config.tooltip?.formatter
              ? this.config.tooltip.formatter(d)
              : `${s.name}<br/>X: ${d.x}<br/>Y: ${formatNumber(d.y)}`;
            showTooltip(this.tooltip, content, event);
          }
        })
        .on('mouseout', () => {
          if (this.tooltip) {
            hideTooltip(this.tooltip);
          }
        });
    });

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => formatNumber(d as number));

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

    // Add axis labels
    if (this.config.xAxisLabel) {
      this.g
        .append('text')
        .attr('class', 'x-axis-label')
        .attr('x', width / 2)
        .attr('y', height + 35)
        .attr('text-anchor', 'middle')
        .style('fill', this.theme.textColor)
        .style('font-family', this.theme.fontFamily)
        .style('font-size', '12px')
        .text(this.config.xAxisLabel);
    }

    if (this.config.yAxisLabel) {
      this.g
        .append('text')
        .attr('class', 'y-axis-label')
        .attr('transform', 'rotate(-90)')
        .attr('x', -height / 2)
        .attr('y', -40)
        .attr('text-anchor', 'middle')
        .style('fill', this.theme.textColor)
        .style('font-family', this.theme.fontFamily)
        .style('font-size', '12px')
        .text(this.config.yAxisLabel);
    }

    // Add legend if enabled
    if (this.config.showLegend && series.length > 1) {
      const legend = this.g
        .append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width - 100}, 0)`);

      series.forEach((s, i) => {
        const legendRow = legend
          .append('g')
          .attr('transform', `translate(0, ${i * 20})`);

        legendRow
          .append('rect')
          .attr('width', 12)
          .attr('height', 12)
          .attr('fill', s.color || this.theme.primaryColor);

        legendRow
          .append('text')
          .attr('x', 18)
          .attr('y', 10)
          .style('fill', this.theme.textColor)
          .style('font-family', this.theme.fontFamily)
          .style('font-size', '11px')
          .text(s.name);
      });
    }
  }
}
