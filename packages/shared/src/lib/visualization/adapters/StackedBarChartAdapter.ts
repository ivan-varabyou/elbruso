import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { StackedBarChartConfig } from '../types';

/**
 * Stacked Bar Chart Adapter
 * Displays bars stacked on top of each other
 */
export class StackedBarChartAdapter extends BaseChartAdapter<StackedBarChartConfig> {
    protected render(): void {
        if (!this.g || !this.config.series.length) return;

        const { width, height } = this.getInnerDimensions();
        const { series, categories, orientation = 'vertical', showValues = false } = this.config;

        // Prepare data for stacking
        const stackData = categories.map((category, i) => {
            const obj: any = { category };
            series.forEach(s => {
                obj[s.id] = s.values[i] || 0;
            });
            return obj;
        });

        // Create stack generator
        const stack = d3.stack()
            .keys(series.map(s => s.id));

        const stackedData = stack(stackData);

        // Create scales
        const isVertical = orientation === 'vertical';

        const xScale = d3.scaleBand()
            .domain(categories)
            .range([0, width])
            .padding(0.2);

        const maxValue = d3.max(stackedData[stackedData.length - 1], d => d[1]) || 0;
        const yScale = d3.scaleLinear()
            .domain([0, maxValue * 1.1])
            .range([height, 0]);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add axes
        if (isVertical) {
            this.g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(xScale))
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

        // Add stacked bars
        stackedData.forEach((seriesData, seriesIndex) => {
            const seriesConfig = series[seriesIndex];
            const color = seriesConfig.color || this.theme.primaryColor;

            this.g!.selectAll(`.bar-${seriesConfig.id}`)
                .data(seriesData)
                .join('rect')
                .attr('class', `bar-${seriesConfig.id}`)
                .attr('x', d => xScale((d.data as any).category) || 0)
                .attr('y', height)
                .attr('width', xScale.bandwidth())
                .attr('height', 0)
                .attr('fill', color)
                .attr('rx', seriesIndex === stackedData.length - 1 ? 4 : 0)
                .transition()
                .duration(this.animation.duration)
                .delay(seriesIndex * 100)
                .attr('y', d => yScale(d[1]))
                .attr('height', d => yScale(d[0]) - yScale(d[1]));
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
