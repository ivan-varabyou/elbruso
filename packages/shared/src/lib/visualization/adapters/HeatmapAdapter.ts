import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { HeatmapConfig } from '@/shared/types/visualization';

/**
 * Heatmap Adapter
 * 2D color-coded matrix visualization
 */
export class HeatmapAdapter extends BaseChartAdapter<HeatmapConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, colorScale, showValues = false, cellSize } = this.config;

        // Extract unique rows and columns
        const rows = Array.from(new Set(data.map(d => d.row)));
        const columns = Array.from(new Set(data.map(d => d.column)));

        // Calculate cell dimensions
        const calculatedCellSize = cellSize || Math.min(
            width / columns.length,
            height / rows.length
        );

        // Create scales
        const xScale = d3.scaleBand()
            .domain(columns)
            .range([0, columns.length * calculatedCellSize])
            .padding(0.05);

        const yScale = d3.scaleBand()
            .domain(rows)
            .range([0, rows.length * calculatedCellSize])
            .padding(0.05);

        const values = data.map(d => d.value);
        const colorDomain = d3.extent(values) as [number, number];

        const color = d3.scaleSequential()
            .domain(colorDomain)
            .interpolator(d3.interpolateBlues);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add cells
        const cells = this.g.selectAll('.cell')
            .data(data)
            .join('rect')
            .attr('class', 'cell')
            .attr('x', d => xScale(d.column) || 0)
            .attr('y', d => yScale(d.row) || 0)
            .attr('width', xScale.bandwidth())
            .attr('height', yScale.bandwidth())
            .attr('fill', '#f0f0f0')
            .attr('stroke', '#fff')
            .attr('stroke-width', 1)
            .attr('rx', 2);

        // Animate cells
        cells.transition()
            .duration(this.animation.duration)
            .delay((d, i) => i * 5)
            .attr('fill', d => color(d.value));

        // Add value labels
        if (showValues) {
            this.g.selectAll('.value-label')
                .data(data)
                .join('text')
                .attr('class', 'value-label')
                .attr('x', d => (xScale(d.column) || 0) + xScale.bandwidth() / 2)
                .attr('y', d => (yScale(d.row) || 0) + yScale.bandwidth() / 2)
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('fill', d => d.value > (colorDomain[0] + colorDomain[1]) / 2 ? '#fff' : '#000')
                .attr('font-size', '10px')
                .attr('font-weight', 'bold')
                .attr('opacity', 0)
                .text(d => d.value.toFixed(1))
                .transition()
                .duration(this.animation.duration)
                .delay((d, i) => i * 5 + this.animation.duration / 2)
                .attr('opacity', 1);
        }

        // Add row labels
        this.g.selectAll('.row-label')
            .data(rows)
            .join('text')
            .attr('class', 'row-label')
            .attr('x', -5)
            .attr('y', d => (yScale(d) || 0) + yScale.bandwidth() / 2)
            .attr('text-anchor', 'end')
            .attr('dy', '0.35em')
            .attr('fill', this.theme.textColor)
            .attr('font-size', '12px')
            .text(d => d);

        // Add column labels
        this.g.selectAll('.column-label')
            .data(columns)
            .join('text')
            .attr('class', 'column-label')
            .attr('x', d => (xScale(d) || 0) + xScale.bandwidth() / 2)
            .attr('y', -5)
            .attr('text-anchor', 'middle')
            .attr('fill', this.theme.textColor)
            .attr('font-size', '12px')
            .text(d => d);

        // Add interactions
        const self = this;
        cells
            .on('mouseenter', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('stroke-width', 3)
                    .attr('stroke', self.theme.primaryColor);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${d.row} × ${d.column}</strong><br/>
              Value: ${d.value.toFixed(2)}
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
                    .attr('stroke-width', 1)
                    .attr('stroke', '#fff');

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });
    }
}
