import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { BarChartConfig } from '../types';
import { showTooltip, hideTooltip, formatNumber } from '../utils';

/**
 * Bar chart adapter using D3
 */
export class BarChartAdapter extends BaseChartAdapter<BarChartConfig> {
  protected render(): void {
    if (!this.g) return;

    const { width, height } = this.getInnerDimensions();
    const { data, orientation = 'vertical', showValues } = this.config;

    // Clear previous render
    this.g.selectAll('*').remove();

    if (orientation === 'vertical') {
      this.renderVerticalBars(width, height, data);
    } else {
      this.renderHorizontalBars(width, height, data);
    }
  }

  private renderVerticalBars(width: number, height: number, data: any[]) {
    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 100])
      .nice()
      .range([height, 0]);

    // Render bars
    this.g!
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label)!)
      .attr('width', xScale.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .attr('fill', d => d.color || this.theme.primaryColor)
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        if (this.tooltip) {
          const content = this.config.tooltip?.formatter
            ? this.config.tooltip.formatter(d)
            : `${d.label}<br/>${formatNumber(d.value)}`;
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
      .attr('y', d => yScale(d.value))
      .attr('height', d => height - yScale(d.value));

    // Add value labels if enabled
    if (this.config.showValues) {
      this.g!
        .selectAll('.value-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value-label')
        .attr('x', d => xScale(d.label)! + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d.value) - 5)
        .attr('text-anchor', 'middle')
        .style('fill', this.theme.textColor)
        .style('font-family', this.theme.fontFamily)
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .text(d => formatNumber(d.value));
    }

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => formatNumber(d as number));

    this.g!
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .style('color', this.theme.textColor)
      .style('font-family', this.theme.fontFamily);

    this.g!
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .style('color', this.theme.textColor)
      .style('font-family', this.theme.fontFamily);
  }

  private renderHorizontalBars(width: number, height: number, data: any[]) {
    // Create scales
    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([0, height])
      .padding(0.2);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 100])
      .nice()
      .range([0, width]);

    // Render bars
    this.g!
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('y', d => yScale(d.label)!)
      .attr('height', yScale.bandwidth())
      .attr('x', 0)
      .attr('width', 0)
      .attr('fill', d => d.color || this.theme.primaryColor)
      .attr('rx', 4)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        if (this.tooltip) {
          const content = this.config.tooltip?.formatter
            ? this.config.tooltip.formatter(d)
            : `${d.label}<br/>${formatNumber(d.value)}`;
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
      .attr('width', d => xScale(d.value));

    // Add value labels if enabled
    if (this.config.showValues) {
      this.g!
        .selectAll('.value-label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'value-label')
        .attr('x', d => xScale(d.value) + 5)
        .attr('y', d => yScale(d.label)! + yScale.bandwidth() / 2 + 4)
        .style('fill', this.theme.textColor)
        .style('font-family', this.theme.fontFamily)
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .text(d => formatNumber(d.value));
    }

    // Add axes
    const xAxis = d3.axisBottom(xScale).tickFormat(d => formatNumber(d as number));
    const yAxis = d3.axisLeft(yScale);

    this.g!
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .style('color', this.theme.textColor)
      .style('font-family', this.theme.fontFamily);

    this.g!
      .append('g')
      .attr('class', 'y-axis')
      .call(yAxis)
      .style('color', this.theme.textColor)
      .style('font-family', this.theme.fontFamily);
  }
}
