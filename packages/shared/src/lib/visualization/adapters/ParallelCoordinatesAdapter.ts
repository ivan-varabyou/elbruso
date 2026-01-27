import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { ParallelCoordinatesConfig } from '../types';

/**
 * Parallel Coordinates Adapter
 * Multi-dimensional data comparison
 */
export class ParallelCoordinatesAdapter extends BaseChartAdapter<ParallelCoordinatesConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length || !this.config.axes.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, axes, colorBy } = this.config;

        // Create x scale for axes
        const xScale = d3.scalePoint()
            .domain(axes.map(a => a.key))
            .range([0, width])
            .padding(0.1);

        // Create y scales for each axis
        const yScales: Record<string, d3.ScaleLinear<number, number>> = {};

        axes.forEach(axis => {
            if (axis.domain) {
                yScales[axis.key] = d3.scaleLinear()
                    .domain(axis.domain)
                    .range([height, 0]);
            } else {
                const extent = d3.extent(data, d => Number(d[axis.key])) as [number, number];
                yScales[axis.key] = d3.scaleLinear()
                    .domain(extent)
                    .range([height, 0]);
            }
        });

        // Color scale
        let colorScale: d3.ScaleOrdinal<string, string> | null = null;
        if (colorBy) {
            const colorDomain = Array.from(new Set(data.map(d => String(d[colorBy]))));
            colorScale = d3.scaleOrdinal<string>()
                .domain(colorDomain)
                .range(d3.schemeCategory10 as string[]);
        }

        // Clear previous content
        this.g.selectAll('*').remove();

        // Line generator
        const line = (d: any) => {
            return d3.line()(
                axes.map(axis => [
                    xScale(axis.key) || 0,
                    yScales[axis.key](Number(d[axis.key]))
                ]) as [number, number][]
            );
        };

        // Draw lines
        const lines = this.g.selectAll('.data-line')
            .data(data)
            .join('path')
            .attr('class', 'data-line')
            .attr('d', line)
            .attr('fill', 'none')
            .attr('stroke', d => {
                if (colorScale && colorBy) {
                    return colorScale(String(d[colorBy])) as string;
                }
                return this.theme.primaryColor;
            })
            .attr('stroke-width', 1.5)
            .attr('opacity', 0.3)
            .style('cursor', 'pointer');

        // Add interactions
        const self = this;
        lines
            .on('mouseenter', function (event, d) {
                d3.select(this)
                    .attr('stroke-width', 3)
                    .attr('opacity', 1)
                    .raise();

                if (self.tooltip) {
                    const content = axes.map(axis =>
                        `<strong>${axis.label}:</strong> ${d[axis.key]}`
                    ).join('<br/>');

                    self.tooltip
                        .style('opacity', 1)
                        .html(content);
                }
            })
            .on('mousemove', function (event) {
                if (self.tooltip) {
                    self.tooltip
                        .style('left', `${event.pageX + 10}px`)
                        .style('top', `${event.pageY - 10}px`);
                }
            })
            .on('mouseleave', function () {
                d3.select(this)
                    .attr('stroke-width', 1.5)
                    .attr('opacity', 0.3);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });

        // Draw axes
        axes.forEach(axis => {
            const axisX = xScale(axis.key) || 0;

            // Axis line
            this.g!.append('line')
                .attr('x1', axisX)
                .attr('x2', axisX)
                .attr('y1', 0)
                .attr('y2', height)
                .attr('stroke', this.theme.gridColor)
                .attr('stroke-width', 2);

            // Axis scale
            this.g!.append('g')
                .attr('transform', `translate(${axisX},0)`)
                .call(d3.axisLeft(yScales[axis.key]).ticks(5))
                .selectAll('text')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '10px');

            // Axis label
            this.g!.append('text')
                .attr('x', axisX)
                .attr('y', -10)
                .attr('text-anchor', 'middle')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '12px')
                .attr('font-weight', 'bold')
                .text(axis.label);
        });
    }
}
