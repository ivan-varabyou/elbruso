import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { ViolinPlotConfig } from '../types';

/**
 * Violin Plot Adapter
 * Distribution density visualization (simplified version)
 */
export class ViolinPlotAdapter extends BaseChartAdapter<ViolinPlotConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, showBox = true, orientation = 'vertical' } = this.config;

        const isVertical = orientation === 'vertical';

        // Create scales
        const categoryScale = d3.scaleBand()
            .domain(data.map(d => d.category))
            .range([0, isVertical ? width : height])
            .padding(0.2);

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
        }

        const violinWidth = categoryScale.bandwidth();

        // Draw violins (simplified as mirrored density curves)
        data.forEach((d, i) => {
            const center = (categoryScale(d.category) || 0) + violinWidth / 2;
            const color = d.color || this.theme.primaryColor;

            // Create histogram bins for density estimation
            const bins = d3.bin()
                .domain(valueScale.domain() as [number, number])
                .thresholds(20)(d.values);

            const maxBinLength = d3.max(bins, b => b.length) || 1;
            const widthScale = d3.scaleLinear()
                .domain([0, maxBinLength])
                .range([0, violinWidth / 2]);

            // Create area generator
            const areaGenerator = d3.area<d3.Bin<number, number>>()
                .x0(bin => center - widthScale(bin.length))
                .x1(bin => center + widthScale(bin.length))
                .y(bin => valueScale((bin.x0! + bin.x1!) / 2))
                .curve(d3.curveBasis);

            // Draw violin shape
            this.g!.append('path')
                .datum(bins)
                .attr('d', areaGenerator)
                .attr('fill', color)
                .attr('opacity', 0.5)
                .attr('stroke', color)
                .attr('stroke-width', 1)
                .transition()
                .duration(this.animation.duration)
                .delay(i * 100)
                .attr('opacity', 0.7);

            // Add box plot overlay if enabled
            if (showBox) {
                const sorted = d.values.slice().sort((a, b) => a - b);
                const q1 = d3.quantile(sorted, 0.25) || 0;
                const median = d3.quantile(sorted, 0.5) || 0;
                const q3 = d3.quantile(sorted, 0.75) || 0;

                this.g!.append('rect')
                    .attr('x', center - 5)
                    .attr('y', valueScale(q3))
                    .attr('width', 10)
                    .attr('height', valueScale(q1) - valueScale(q3))
                    .attr('fill', '#fff')
                    .attr('stroke', color)
                    .attr('stroke-width', 2)
                    .attr('opacity', 0)
                    .transition()
                    .duration(this.animation.duration)
                    .delay(i * 100 + this.animation.duration / 2)
                    .attr('opacity', 0.8);

                this.g!.append('line')
                    .attr('x1', center - 5)
                    .attr('x2', center + 5)
                    .attr('y1', valueScale(median))
                    .attr('y2', valueScale(median))
                    .attr('stroke', color)
                    .attr('stroke-width', 3)
                    .attr('opacity', 0)
                    .transition()
                    .duration(this.animation.duration)
                    .delay(i * 100 + this.animation.duration / 2)
                    .attr('opacity', 1);
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
