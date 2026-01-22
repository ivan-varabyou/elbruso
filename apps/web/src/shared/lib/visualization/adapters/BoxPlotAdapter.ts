import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { BoxPlotConfig } from '../types';

/**
 * Box Plot Adapter
 * Statistical distribution visualization with quartiles
 */
export class BoxPlotAdapter extends BaseChartAdapter<BoxPlotConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, showOutliers = true, showMean = true, orientation = 'vertical' } = this.config;

        // Calculate statistics for each category
        const stats = data.map(d => {
            const sorted = d.values.slice().sort((a, b) => a - b);
            const q1 = d3.quantile(sorted, 0.25) || 0;
            const median = d3.quantile(sorted, 0.5) || 0;
            const q3 = d3.quantile(sorted, 0.75) || 0;
            const iqr = q3 - q1;
            const min = Math.max(d3.min(sorted) || 0, q1 - 1.5 * iqr);
            const max = Math.min(d3.max(sorted) || 0, q3 + 1.5 * iqr);
            const mean = d3.mean(sorted) || 0;
            const outliers = sorted.filter(v => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);

            return { category: d.category, q1, median, q3, min, max, mean, outliers, color: d.color };
        });

        const isVertical = orientation === 'vertical';

        // Create scales
        const categoryScale = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([0, isVertical ? width : height])
            .padding(0.3);

        const allValues = data.flatMap(d => d.values);
        const valueExtent = d3.extent(allValues) as [number, number];
        const valueScale = d3.scaleLinear()
            .domain([valueExtent[0] * 0.95, valueExtent[1] * 1.05])
            .range(isVertical ? [height, 0] : [0, width]);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add axes
        if (isVertical) {
            this.g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(categoryScale))
                .selectAll('text')
                .attr('fill', this.theme.textColor);

            this.g.append('g')
                .call(d3.axisLeft(valueScale))
                .selectAll('text')
                .attr('fill', this.theme.textColor);
        } else {
            this.g.append('g')
                .call(d3.axisLeft(categoryScale))
                .selectAll('text')
                .attr('fill', this.theme.textColor);

            this.g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(valueScale))
                .selectAll('text')
                .attr('fill', this.theme.textColor);
        }

        const boxWidth = categoryScale.bandwidth();

        // Draw box plots
        stats.forEach((stat, i) => {
            const center = (categoryScale(stat.category) || 0) + boxWidth / 2;
            const color = stat.color || this.theme.primaryColor;

            const boxGroup = this.g!.append('g')
                .attr('class', 'box-plot');

            if (isVertical) {
                // Vertical whiskers
                boxGroup.append('line')
                    .attr('x1', center)
                    .attr('x2', center)
                    .attr('y1', valueScale(stat.min))
                    .attr('y2', valueScale(stat.q1))
                    .attr('stroke', color)
                    .attr('stroke-width', 2)
                    .attr('opacity', 0)
                    .transition()
                    .duration(this.animation.duration)
                    .delay(i * 100)
                    .attr('opacity', 1);

                boxGroup.append('line')
                    .attr('x1', center)
                    .attr('x2', center)
                    .attr('y1', valueScale(stat.q3))
                    .attr('y2', valueScale(stat.max))
                    .attr('stroke', color)
                    .attr('stroke-width', 2)
                    .attr('opacity', 0)
                    .transition()
                    .duration(this.animation.duration)
                    .delay(i * 100)
                    .attr('opacity', 1);

                // Whisker caps
                [stat.min, stat.max].forEach(value => {
                    boxGroup.append('line')
                        .attr('x1', center - boxWidth / 4)
                        .attr('x2', center + boxWidth / 4)
                        .attr('y1', valueScale(value))
                        .attr('y2', valueScale(value))
                        .attr('stroke', color)
                        .attr('stroke-width', 2)
                        .attr('opacity', 0)
                        .transition()
                        .duration(this.animation.duration)
                        .delay(i * 100)
                        .attr('opacity', 1);
                });

                // Box
                boxGroup.append('rect')
                    .attr('x', center - boxWidth / 2)
                    .attr('y', valueScale(stat.q3))
                    .attr('width', boxWidth)
                    .attr('height', 0)
                    .attr('fill', color)
                    .attr('opacity', 0.6)
                    .attr('stroke', color)
                    .attr('stroke-width', 2)
                    .transition()
                    .duration(this.animation.duration)
                    .delay(i * 100)
                    .attr('height', valueScale(stat.q1) - valueScale(stat.q3));

                // Median line
                boxGroup.append('line')
                    .attr('x1', center - boxWidth / 2)
                    .attr('x2', center + boxWidth / 2)
                    .attr('y1', valueScale(stat.median))
                    .attr('y2', valueScale(stat.median))
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 3)
                    .attr('opacity', 0)
                    .transition()
                    .duration(this.animation.duration)
                    .delay(i * 100 + this.animation.duration / 2)
                    .attr('opacity', 1);

                // Mean marker
                if (showMean) {
                    boxGroup.append('circle')
                        .attr('cx', center)
                        .attr('cy', valueScale(stat.mean))
                        .attr('r', 0)
                        .attr('fill', '#fff')
                        .attr('stroke', color)
                        .attr('stroke-width', 2)
                        .transition()
                        .duration(this.animation.duration)
                        .delay(i * 100 + this.animation.duration / 2)
                        .attr('r', 4);
                }
            }

            // Outliers
            if (showOutliers) {
                stat.outliers.forEach(outlier => {
                    boxGroup.append('circle')
                        .attr('cx', isVertical ? center : valueScale(outlier))
                        .attr('cy', isVertical ? valueScale(outlier) : center)
                        .attr('r', 0)
                        .attr('fill', color)
                        .attr('opacity', 0.5)
                        .transition()
                        .duration(this.animation.duration)
                        .delay(i * 100 + this.animation.duration)
                        .attr('r', 3);
                });
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
