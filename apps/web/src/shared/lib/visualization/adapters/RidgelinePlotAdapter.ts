import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { RidgelinePlotConfig } from '../types';

/**
 * Ridgeline Plot Adapter
 * Multiple overlapping density distributions (Joy Division style)
 */
export class RidgelinePlotAdapter extends BaseChartAdapter<RidgelinePlotConfig> {
    protected render(): void {
        if (!this.g || !this.config.series.length) return;

        const { width, height } = this.getInnerDimensions();
        const { series, overlap = 0.5 } = this.config;

        // Calculate value extent across all series
        const allValues = series.flatMap(s => s.values);
        const valueExtent = d3.extent(allValues) as [number, number];

        const xScale = d3.scaleLinear()
            .domain(valueExtent)
            .range([0, width]);

        const seriesHeight = height / (series.length * (1 - overlap) + overlap);
        const yOffset = seriesHeight * (1 - overlap);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add x-axis
        this.g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('fill', this.theme.textColor);

        // Draw each series
        series.forEach((s, i) => {
            const yPosition = i * yOffset;
            const color = s.color || this.theme.primaryColor;

            // Create histogram bins
            const bins = d3.bin()
                .domain(xScale.domain() as [number, number])
                .thresholds(30)(s.values);

            const maxBinLength = d3.max(bins, b => b.length) || 1;
            const yScale = d3.scaleLinear()
                .domain([0, maxBinLength])
                .range([0, seriesHeight]);

            // Create area generator
            const areaGenerator = d3.area<d3.Bin<number, number>>()
                .x(bin => xScale((bin.x0! + bin.x1!) / 2))
                .y0(yPosition + seriesHeight)
                .y1(bin => yPosition + seriesHeight - yScale(bin.length))
                .curve(d3.curveBasis);

            // Draw ridgeline
            const path = this.g!.append('path')
                .datum(bins)
                .attr('d', areaGenerator)
                .attr('fill', color)
                .attr('opacity', 0.7)
                .attr('stroke', color)
                .attr('stroke-width', 2);

            // Animate
            const totalLength = (path.node() as SVGPathElement).getTotalLength();
            path
                .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .duration(this.animation.duration)
                .delay(i * 100)
                .attr('stroke-dashoffset', 0)
                .on('end', function () {
                    d3.select(this).attr('stroke-dasharray', 'none');
                });

            // Add label
            this.g!.append('text')
                .attr('x', -10)
                .attr('y', yPosition + seriesHeight / 2)
                .attr('text-anchor', 'end')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '12px')
                .attr('opacity', 0)
                .text(s.name)
                .transition()
                .duration(this.animation.duration)
                .delay(i * 100)
                .attr('opacity', 1);
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
    }
}
