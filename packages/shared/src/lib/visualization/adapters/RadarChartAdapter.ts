import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { BaseChartConfig } from '@/shared/types/visualization';

export interface RadarChartDataPoint {
  axis: string;
  value: number;
}

export interface RadarChartSeries {
  id: string;
  name: string;
  data: RadarChartDataPoint[];
  color?: string;
}

export interface RadarChartConfig extends BaseChartConfig {
  series: RadarChartSeries[];
  maxValue?: number;
  levels?: number;
  showAxes?: boolean;
  showLegend?: boolean;
}

/**
 * Radar/Spider chart adapter
 */
export class RadarChartAdapter extends BaseChartAdapter<RadarChartConfig> {
  protected render(): void {
    if (!this.g) return;

    const { width, height } = this.getInnerDimensions();
    const { series, maxValue, levels = 5, showAxes = true } = this.config;

    // Clear previous render
    this.g.selectAll('*').remove();

    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;

    // Get all axes
    const allAxes = series[0]?.data.map(d => d.axis) || [];
    const total = allAxes.length;
    const angleSlice = (Math.PI * 2) / total;

    // Calculate max value
    const dataMax = maxValue || d3.max(series.flatMap(s => s.data), d => d.value) || 100;

    // Create radial scale
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, dataMax]);

    // Center the chart
    const chartGroup = this.g
      .append('g')
      .attr('transform', `translate(${centerX},${centerY})`);

    // Draw circular grid
    for (let i = 0; i < levels; i++) {
      const levelFactor = radius * ((i + 1) / levels);

      chartGroup
        .selectAll(`.level-${i}`)
        .data(allAxes)
        .enter()
        .append('line')
        .attr('x1', (d, j) => levelFactor * Math.cos(angleSlice * j - Math.PI / 2))
        .attr('y1', (d, j) => levelFactor * Math.sin(angleSlice * j - Math.PI / 2))
        .attr('x2', (d, j) => levelFactor * Math.cos(angleSlice * (j + 1) - Math.PI / 2))
        .attr('y2', (d, j) => levelFactor * Math.sin(angleSlice * (j + 1) - Math.PI / 2))
        .attr('stroke', this.theme.gridColor)
        .attr('stroke-width', 1)
        .attr('fill', 'none');
    }

    // Draw axes
    if (showAxes) {
      const axis = chartGroup.selectAll('.axis').data(allAxes).enter().append('g').attr('class', 'axis');

      axis
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', (d, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y2', (d, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
        .attr('stroke', this.theme.gridColor)
        .attr('stroke-width', 1);

      axis
        .append('text')
        .attr('x', (d, i) => (radius + 20) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y', (d, i) => (radius + 20) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .style('font-size', '11px')
        .style('fill', this.theme.textColor)
        .style('font-family', this.theme.fontFamily)
        .text(d => d);
    }

    // Draw data
    series.forEach((s, index) => {
      const color = s.color || [this.theme.primaryColor, this.theme.secondaryColor, this.theme.successColor][index % 3];

      const radarLine = d3
        .lineRadial<RadarChartDataPoint>()
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice)
        .curve(d3.curveLinearClosed);

      chartGroup
        .append('path')
        .datum(s.data)
        .attr('d', radarLine)
        .attr('fill', color)
        .attr('fill-opacity', 0.2)
        .attr('stroke', color)
        .attr('stroke-width', 2);

      // Add points
      chartGroup
        .selectAll(`.point-${s.id}`)
        .data(s.data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr('r', 4)
        .attr('fill', color)
        .attr('stroke', 'white')
        .attr('stroke-width', 2);
    });
  }
}
