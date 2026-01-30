import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { GroupedBarChartConfig } from '@/shared/visualization';

/**
 * Grouped Bar Chart Adapter
 * Displays multiple bar series side-by-side for comparison
 */
export class GroupedBarChartAdapter extends BaseChartAdapter<GroupedBarChartConfig> {
    protected render(): void {
        if (!this.g || !this.config.series.length) return;

        const { width, height } = this.getInnerDimensions();
        const { series, orientation = 'vertical', showValues = false } = this.config;

        // Extract all unique categories from all series
        const categories = Array.from(
            new Set(series.flatMap(s => s.data.map(d => d.label)))
        );

        // Create scales
        const isVertical = orientation === 'vertical';

        const x0Scale = d3.scaleBand()
            .domain(categories)
            .range([0, width])
            .padding(0.2);

        const x1Scale = d3.scaleBand()
            .domain(series.map(s => s.id))
            .range([0, x0Scale.bandwidth()])
            .padding(0.05);

        const maxValue = d3.max(series.flatMap(s => s.data.map(d => d.value))) || 0;
        const yScale = d3.scaleLinear()
            .domain([0, maxValue * 1.1])
            .range([height, 0]);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add axes
        if (isVertical) {
            this.g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x0Scale))
                .selectAll('text')
                .attr('fill', this.theme.textColor);

            this.g.append('g')
                .call(d3.axisLeft(yScale))
                .selectAll('text')
                .attr('fill', this.theme.textColor);
        }

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
        }

        // Create groups for each category
        const categoryGroups = this.g.selectAll('.category-group')
            .data(categories)
            .join('g')
            .attr('class', 'category-group')
            .attr('transform', d => `translate(${x0Scale(d)},0)`);

        // Add bars for each series
        const self = this;
        series.forEach((seriesData, seriesIndex) => {
            const color = seriesData.color || this.theme.primaryColor;

            categoryGroups.each(function (this: SVGGElement | d3.BaseType, category: string) {
                const group = d3.select(this);
                const dataPoint = seriesData.data.find(d => d.label === category);

                if (!dataPoint) return;

                const bar = group.append('rect')
                    .attr('x', x1Scale(seriesData.id) || 0)
                    .attr('y', height)
                    .attr('width', x1Scale.bandwidth())
                    .attr('height', 0)
                    .attr('fill', dataPoint.color || color)
                    .attr('rx', 4);

                // Animate bars
                bar.transition()
                    .duration(self.animation.duration)
                    .delay(seriesIndex * 100)
                    .attr('y', yScale(dataPoint.value))
                    .attr('height', height - yScale(dataPoint.value));

                // Add value labels
                if (showValues) {
                    group.append('text')
                        .attr('x', (x1Scale(seriesData.id) || 0) + x1Scale.bandwidth() / 2)
                        .attr('y', yScale(dataPoint.value) - 5)
                        .attr('text-anchor', 'middle')
                        .attr('fill', self.theme.textColor)
                        .attr('font-size', '12px')
                        .attr('opacity', 0)
                        .text(dataPoint.value.toFixed(1))
                        .transition()
                        .duration(self.animation.duration)
                        .delay(seriesIndex * 100)
                        .attr('opacity', 1);
                }
            });
        });

        // Add legend
        if (this.config.showLegend !== false) {
            const legend = this.g.append('g')
                .attr('class', 'legend')
                .attr('transform', `translate(${width - 120}, 0)`);

            series.forEach((seriesData, i) => {
                const legendRow = legend.append('g')
                    .attr('transform', `translate(0, ${i * 20})`);

                legendRow.append('rect')
                    .attr('width', 12)
                    .attr('height', 12)
                    .attr('fill', seriesData.color || this.theme.primaryColor)
                    .attr('rx', 2);

                legendRow.append('text')
                    .attr('x', 18)
                    .attr('y', 10)
                    .attr('fill', this.theme.textColor)
                    .attr('font-size', '12px')
                    .text(seriesData.name);
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
