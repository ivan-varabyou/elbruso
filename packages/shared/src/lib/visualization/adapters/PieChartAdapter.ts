import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { PieChartConfig } from '@/shared/types/visualization';
import { showTooltip, hideTooltip, formatNumber, formatPercentage } from '../utils';

/**
 * Pie/Donut chart adapter using D3
 */
export class PieChartAdapter extends BaseChartAdapter<PieChartConfig> {
  protected render(): void {
    if (!this.g) return;

    const { width, height } = this.getInnerDimensions();
    const { data, innerRadius = 0, outerRadius, showLabels, showPercentages } = this.config;

    // Clear previous render
    this.g.selectAll('*').remove();

    // Calculate radius
    const radius = Math.min(width, height) / 2;
    const calculatedOuterRadius = outerRadius || radius * 0.8;
    const calculatedInnerRadius = innerRadius;

    // Center the chart
    const centerX = width / 2;
    const centerY = height / 2;

    // Create pie layout
    const pie = d3.pie<any>().value(d => d.value).sort(null);

    // Create arc generator
    const arc = d3
      .arc<any>()
      .innerRadius(calculatedInnerRadius)
      .outerRadius(calculatedOuterRadius);

    // Create arc for labels (slightly outside)
    const labelArc = d3
      .arc<any>()
      .innerRadius(calculatedOuterRadius * 1.1)
      .outerRadius(calculatedOuterRadius * 1.1);

    // Create group for the chart
    const chartGroup = this.g
      .append('g')
      .attr('transform', `translate(${centerX},${centerY})`);

    // Calculate total for percentages
    const total = d3.sum(data, d => d.value);

    // Create color scale
    const colorScale = d3
      .scaleOrdinal<string>()
      .domain(data.map(d => d.label))
      .range(
        data.map(
          (d, i) =>
            d.color ||
            [
              this.theme.primaryColor,
              this.theme.secondaryColor,
              this.theme.successColor,
              this.theme.warningColor,
              this.theme.errorColor,
            ][i % 5]
        )
      );

    // Render slices
    const slices = chartGroup
      .selectAll('.slice')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'slice');

    slices
      .append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.label))
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        if (this.tooltip) {
          const content = this.config.tooltip?.formatter
            ? this.config.tooltip.formatter(d.data)
            : `${d.data.label}<br/>${formatNumber(d.data.value)}<br/>${formatPercentage(d.data.value, total)}`;
          showTooltip(this.tooltip, content, event);
        }
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1.05)');
      })
      .on('mouseout', (event) => {
        if (this.tooltip) {
          hideTooltip(this.tooltip);
        }
        d3.select(event.currentTarget)
          .transition()
          .duration(200)
          .attr('transform', 'scale(1)');
      });

    // Animate slices
    if (this.animation.enabled) {
      slices
        .selectAll('path')
        .transition()
        .duration(this.animation.duration)
        .attrTween('d', function (d: any) {
          const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
          return function (t: number) {
            return arc(interpolate(t)) || '';
          };
        });
    }

    // Add labels if enabled
    if (showLabels) {
      slices
        .append('text')
        .attr('transform', d => `translate(${labelArc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .style('fill', this.theme.textColor)
        .style('font-family', this.theme.fontFamily)
        .style('font-size', '11px')
        .style('font-weight', 'bold')
        .text(d => {
          if (showPercentages) {
            return `${d.data.label} (${formatPercentage(d.data.value, total)})`;
          }
          return d.data.label;
        });
    }

    // Add center label for donut charts
    if (calculatedInnerRadius > 0) {
      chartGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.5em')
        .style('fill', this.theme.textColor)
        .style('font-family', this.theme.fontFamily)
        .style('font-size', '24px')
        .style('font-weight', 'bold')
        .text(formatNumber(total));

      chartGroup
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .style('fill', this.theme.textColor)
        .style('font-family', this.theme.fontFamily)
        .style('font-size', '12px')
        .text('Total');
    }
  }
}
