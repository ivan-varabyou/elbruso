import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { CorrelationMatrixConfig } from '../types';

/**
 * Correlation Matrix Adapter
 * Statistical correlation visualization with color-coded cells
 */
export class CorrelationMatrixAdapter extends BaseChartAdapter<CorrelationMatrixConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, labels, showValues = true, cellSize } = this.config;

        const n = data.length;

        // Calculate cell dimensions
        const calculatedCellSize = cellSize || Math.min(width / n, height / n);

        // Create scales
        const scale = d3.scaleBand()
            .domain(d3.range(n).map(String))
            .range([0, n * calculatedCellSize])
            .padding(0.05);

        // Color scale for correlation (-1 to 1)
        const color = d3.scaleSequential()
            .domain([-1, 1])
            .interpolator(d3.interpolateRdBu);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Flatten matrix data
        const flatData: Array<{ row: number; col: number; value: number }> = [];
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                flatData.push({ row: i, col: j, value: data[i][j] });
            }
        }

        // Add cells
        const cells = this.g.selectAll('.cell')
            .data(flatData)
            .join('rect')
            .attr('class', 'cell')
            .attr('x', d => scale(String(d.col)) || 0)
            .attr('y', d => scale(String(d.row)) || 0)
            .attr('width', scale.bandwidth())
            .attr('height', scale.bandwidth())
            .attr('fill', '#f0f0f0')
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .attr('rx', 2);

        // Animate cells
        cells.transition()
            .duration(this.animation.duration)
            .delay((d, i) => i * 3)
            .attr('fill', d => color(d.value));

        // Add value labels
        if (showValues) {
            this.g.selectAll('.value-label')
                .data(flatData)
                .join('text')
                .attr('class', 'value-label')
                .attr('x', d => (scale(String(d.col)) || 0) + scale.bandwidth() / 2)
                .attr('y', d => (scale(String(d.row)) || 0) + scale.bandwidth() / 2)
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('fill', d => Math.abs(d.value) > 0.5 ? '#fff' : '#000')
                .attr('font-size', '10px')
                .attr('font-weight', 'bold')
                .attr('opacity', 0)
                .text(d => d.value.toFixed(2))
                .transition()
                .duration(this.animation.duration)
                .delay((d, i) => i * 3 + this.animation.duration / 2)
                .attr('opacity', 1);
        }

        // Add row labels
        this.g.selectAll('.row-label')
            .data(labels)
            .join('text')
            .attr('class', 'row-label')
            .attr('x', -5)
            .attr('y', (d, i) => (scale(String(i)) || 0) + scale.bandwidth() / 2)
            .attr('text-anchor', 'end')
            .attr('dy', '0.35em')
            .attr('fill', this.theme.textColor)
            .attr('font-size', '12px')
            .text(d => d);

        // Add column labels
        this.g.selectAll('.column-label')
            .data(labels)
            .join('text')
            .attr('class', 'column-label')
            .attr('x', (d, i) => (scale(String(i)) || 0) + scale.bandwidth() / 2)
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
                    .attr('stroke-width', 4)
                    .attr('stroke', self.theme.primaryColor);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${labels[d.row]} × ${labels[d.col]}</strong><br/>
              Correlation: ${d.value.toFixed(3)}
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
                    .attr('stroke-width', 2)
                    .attr('stroke', '#fff');

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });
    }
}
