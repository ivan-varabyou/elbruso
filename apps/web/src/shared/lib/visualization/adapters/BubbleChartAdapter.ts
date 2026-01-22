import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { BubbleChartConfig } from '../types';

/**
 * Bubble Chart Adapter
 * Scatter plot with size dimension representing third variable
 */
export class BubbleChartAdapter extends BaseChartAdapter<BubbleChartConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, sizeScale = [5, 40], showLabels = false, showLegend = false } = this.config;

        // Create scales
        const xExtent = d3.extent(data, d => d.x) as [number, number];
        const yExtent = d3.extent(data, d => d.y) as [number, number];
        const sizeExtent = d3.extent(data, d => d.size) as [number, number];

        const xScale = d3.scaleLinear()
            .domain([xExtent[0] * 0.95, xExtent[1] * 1.05])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([yExtent[0] * 0.95, yExtent[1] * 1.05])
            .range([height, 0]);

        const radiusScale = d3.scaleSqrt()
            .domain(sizeExtent)
            .range(sizeScale);

        // Get unique groups for color scale
        const groups = Array.from(new Set(data.map(d => d.group).filter((g): g is string => g !== undefined)));
        const colorScale = d3.scaleOrdinal<string>()
            .domain(groups)
            .range(d3.schemeCategory10);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add axes
        this.g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('fill', this.theme.textColor);

        this.g.append('g')
            .call(d3.axisLeft(yScale))
            .selectAll('text')
            .attr('fill', this.theme.textColor);

        // Add grid
        if (this.config.showGrid !== false) {
            this.g.append('g')
                .attr('class', 'grid')
                .attr('opacity', 0.1)
                .call(
                    d3.axisLeft(yScale)
                        .tickSize(-width)
                        .tickFormat(() => '')
                );

            this.g.append('g')
                .attr('class', 'grid')
                .attr('opacity', 0.1)
                .attr('transform', `translate(0,${height})`)
                .call(
                    d3.axisBottom(xScale)
                        .tickSize(-height)
                        .tickFormat(() => '')
                );
        }

        // Add bubbles
        const self = this;
        const bubbles = this.g.selectAll('.bubble')
            .data(data)
            .join('circle')
            .attr('class', 'bubble')
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('r', 0)
            .attr('fill', d => d.color || (d.group ? colorScale(d.group) as string : this.theme.primaryColor))
            .attr('opacity', 0.6)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer');

        // Animate bubbles
        bubbles.transition()
            .duration(this.animation.duration)
            .delay((d, i) => i * 20)
            .attr('r', d => radiusScale(d.size));

        // Add interactions
        bubbles
            .on('mouseenter', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.9)
                    .attr('stroke-width', 3);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${d.label || 'Bubble'}</strong><br/>
              ${d.group ? `Group: ${d.group}<br/>` : ''}
              X: ${d.x.toFixed(2)}<br/>
              Y: ${d.y.toFixed(2)}<br/>
              Size: ${d.size.toFixed(2)}
            `);
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
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.6)
                    .attr('stroke-width', 2);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });

        // Add labels
        if (showLabels) {
            this.g.selectAll('.label')
                .data(data.filter(d => d.label))
                .join('text')
                .attr('class', 'label')
                .attr('x', d => xScale(d.x))
                .attr('y', d => yScale(d.y))
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '10px')
                .attr('font-weight', 'bold')
                .attr('pointer-events', 'none')
                .attr('opacity', 0)
                .text(d => d.label || '')
                .transition()
                .duration(this.animation.duration)
                .delay(this.animation.duration)
                .attr('opacity', 1);
        }

        // Add legend
        if (showLegend && groups.length > 0) {
            const legend = this.g.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${width - 120}, 0)`);

            groups.forEach((group, i) => {
                const legendRow = legend.append('g')
                    .attr('transform', `translate(0, ${i * 20})`);

                legendRow.append('circle')
                    .attr('r', 6)
                    .attr('fill', colorScale(group) as string)
                    .attr('opacity', 0.6);

                legendRow.append('text')
                    .attr('x', 12)
                    .attr('y', 4)
                    .attr('fill', this.theme.textColor)
                    .attr('font-size', '12px')
                    .text(group || '');
            });
        }

        // Add axis labels
        if (this.config.xAxisLabel) {
            this.g.append('text')
                .attr('x', width / 2)
                .attr('y', height + 35)
                .attr('text-anchor', 'middle')
                .attr('fill', this.theme.textColor)
                .text(this.config.xAxisLabel);
        }

        if (this.config.yAxisLabel) {
            this.g.append('text')
                .attr('transform', 'rotate(-90)')
                .attr('x', -height / 2)
                .attr('y', -40)
                .attr('text-anchor', 'middle')
                .attr('fill', this.theme.textColor)
                .text(this.config.yAxisLabel);
        }
    }
}
