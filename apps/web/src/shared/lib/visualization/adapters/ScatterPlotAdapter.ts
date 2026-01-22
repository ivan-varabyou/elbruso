import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { ScatterChartConfig } from '../types';

/**
 * Scatter Plot Adapter
 * X/Y point distribution with optional trend line
 */
export class ScatterPlotAdapter extends BaseChartAdapter<ScatterChartConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, showTrendLine = false, sizeScale = [4, 12] } = this.config;

        // Create scales
        const xExtent = d3.extent(data, d => d.x) as [number, number];
        const yExtent = d3.extent(data, d => d.y) as [number, number];

        const xScale = d3.scaleLinear()
            .domain([xExtent[0] * 0.95, xExtent[1] * 1.05])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([yExtent[0] * 0.95, yExtent[1] * 1.05])
            .range([height, 0]);

        const sizeExtent = d3.extent(data, d => d.size || 5) as [number, number];
        const radiusScale = d3.scaleSqrt()
            .domain(sizeExtent)
            .range(sizeScale);

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

        // Add trend line
        if (showTrendLine) {
            const xMean = d3.mean(data, d => d.x) || 0;
            const yMean = d3.mean(data, d => d.y) || 0;

            let numerator = 0;
            let denominator = 0;

            data.forEach(d => {
                numerator += (d.x - xMean) * (d.y - yMean);
                denominator += (d.x - xMean) ** 2;
            });

            const slope = numerator / denominator;
            const intercept = yMean - slope * xMean;

            const trendLine = this.g.append('line')
                .attr('x1', xScale(xExtent[0]))
                .attr('y1', yScale(slope * xExtent[0] + intercept))
                .attr('x2', xScale(xExtent[1]))
                .attr('y2', yScale(slope * xExtent[1] + intercept))
                .attr('stroke', this.theme.errorColor)
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '5,5')
                .attr('opacity', 0);

            trendLine.transition()
                .duration(this.animation.duration)
                .delay(this.animation.duration)
                .attr('opacity', 0.6);
        }

        // Add points
        const self = this;
        const points = this.g.selectAll('.point')
            .data(data)
            .join('circle')
            .attr('class', 'point')
            .attr('cx', d => xScale(d.x))
            .attr('cy', d => yScale(d.y))
            .attr('r', 0)
            .attr('fill', d => d.color || this.theme.primaryColor)
            .attr('opacity', 0.7)
            .style('cursor', 'pointer');

        // Animate points
        points.transition()
            .duration(this.animation.duration)
            .delay((d, i) => i * 10)
            .attr('r', d => radiusScale(d.size || 5));

        // Add interactions
        points
            .on('mouseenter', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', radiusScale(d.size || 5) * 1.5)
                    .attr('opacity', 1);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${d.label || 'Point'}</strong><br/>
              X: ${d.x.toFixed(2)}<br/>
              Y: ${d.y.toFixed(2)}
              ${d.size ? `<br/>Size: ${d.size.toFixed(2)}` : ''}
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
            .on('mouseleave', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', radiusScale(d.size || 5))
                    .attr('opacity', 0.7);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });

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
