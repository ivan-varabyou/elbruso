import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { WaterfallChartConfig } from '@/shared/types/visualization';

/**
 * Waterfall Chart Adapter
 * Shows sequential positive/negative changes with running total
 */
export class WaterfallChartAdapter extends BaseChartAdapter<WaterfallChartConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, showConnectors = true, showValues = true } = this.config;

        // Calculate cumulative positions
        let cumulative = 0;
        const processedData = data.map(d => {
            const start = cumulative;
            const end = d.type === 'total' ? d.value : cumulative + d.value;
            cumulative = d.type === 'total' ? d.value : end;

            return {
                ...d,
                start,
                end,
                value: d.value,
                isPositive: d.value >= 0,
            };
        });

        // Create scales
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.label))
            .range([0, width])
            .padding(0.2);

        const allValues = processedData.flatMap(d => [d.start, d.end]);
        const yExtent = d3.extent(allValues) as [number, number];
        const yScale = d3.scaleLinear()
            .domain([Math.min(yExtent[0], 0), Math.max(yExtent[1], 0) * 1.1])
            .range([height, 0]);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add axes
        this.g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('fill', this.theme.textColor)
            .attr('transform', 'rotate(-45)')
            .attr('text-anchor', 'end');

        this.g.append('g')
            .call(d3.axisLeft(yScale))
            .selectAll('text')
            .attr('fill', this.theme.textColor);

        // Add zero line
        this.g.append('line')
            .attr('x1', 0)
            .attr('x2', width)
            .attr('y1', yScale(0))
            .attr('y2', yScale(0))
            .attr('stroke', this.theme.gridColor)
            .attr('stroke-width', 2);

        // Add bars
        processedData.forEach((d, i) => {
            const x = xScale(d.label) || 0;
            const barWidth = xScale.bandwidth();
            const y = Math.min(yScale(d.start), yScale(d.end));
            const barHeight = Math.abs(yScale(d.start) - yScale(d.end));

            const color = d.type === 'total'
                ? this.theme.textColor
                : d.isPositive
                    ? this.theme.successColor
                    : this.theme.errorColor;

            // Add bar
            const bar = this.g!.append('rect')
                .attr('x', x)
                .attr('y', yScale(0))
                .attr('width', barWidth)
                .attr('height', 0)
                .attr('fill', color)
                .attr('rx', 4);

            bar.transition()
                .duration(this.animation.duration)
                .delay(i * 100)
                .attr('y', y)
                .attr('height', barHeight);

            // Add connector line to next bar
            if (showConnectors && i < processedData.length - 1) {
                const nextX = xScale(processedData[i + 1].label) || 0;

                this.g!.append('line')
                    .attr('x1', x + barWidth)
                    .attr('x2', nextX)
                    .attr('y1', yScale(d.end))
                    .attr('y2', yScale(d.end))
                    .attr('stroke', this.theme.gridColor)
                    .attr('stroke-width', 1)
                    .attr('stroke-dasharray', '4,4')
                    .attr('opacity', 0)
                    .transition()
                    .duration(this.animation.duration)
                    .delay(i * 100 + this.animation.duration / 2)
                    .attr('opacity', 0.5);
            }

            // Add value label
            if (showValues) {
                this.g!.append('text')
                    .attr('x', x + barWidth / 2)
                    .attr('y', y - 5)
                    .attr('text-anchor', 'middle')
                    .attr('fill', this.theme.textColor)
                    .attr('font-size', '12px')
                    .attr('font-weight', 'bold')
                    .attr('opacity', 0)
                    .text(d.value > 0 ? `+${d.value}` : d.value)
                    .transition()
                    .duration(this.animation.duration)
                    .delay(i * 100)
                    .attr('opacity', 1);
            }
        });

        // Add axis labels
        if (this.config.xAxisLabel) {
            this.g.append('text')
                .attr('x', width / 2)
                .attr('y', height + 60)
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
