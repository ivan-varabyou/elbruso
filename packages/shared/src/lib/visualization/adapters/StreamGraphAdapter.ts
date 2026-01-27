import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { StreamGraphConfig } from '@/shared/types/visualization';

/**
 * Stream Graph Adapter
 * Flowing stacked area chart with organic appearance
 */
export class StreamGraphAdapter extends BaseChartAdapter<StreamGraphConfig> {
    protected render(): void {
        if (!this.g || !this.config.series.length) return;

        const { width, height } = this.getInnerDimensions();
        const { series, offset = 'wiggle', order = 'insideOut' } = this.config;

        // Prepare data for stacking
        const allXValues = Array.from(
            new Set(series.flatMap(s => s.data.map(d => Number(d.x))))
        ).sort((a, b) => a - b);

        const stackData = allXValues.map(x => {
            const obj: any = { x };
            series.forEach(s => {
                const point = s.data.find(d => Number(d.x) === x);
                obj[s.id] = point ? point.y : 0;
            });
            return obj;
        });

        // Create stack generator with offset
        const stack = d3.stack()
            .keys(series.map(s => s.id))
            .offset(offset === 'wiggle' ? d3.stackOffsetWiggle :
                offset === 'silhouette' ? d3.stackOffsetSilhouette :
                    offset === 'expand' ? d3.stackOffsetExpand :
                        d3.stackOffsetNone)
            .order(order === 'insideOut' ? d3.stackOrderInsideOut :
                order === 'ascending' ? d3.stackOrderAscending :
                    order === 'descending' ? d3.stackOrderDescending :
                        d3.stackOrderNone);

        const stackedData = stack(stackData);

        // Create scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(allXValues) as [number, number])
            .range([0, width]);

        const yExtent = d3.extent(stackedData.flat().flatMap(d => [d[0], d[1]])) as [number, number];
        const yScale = d3.scaleLinear()
            .domain(yExtent)
            .range([height, 0]);

        // Create area generator
        const area = d3.area<any>()
            .x(d => xScale(d.data.x))
            .y0(d => yScale(d[0]))
            .y1(d => yScale(d[1]))
            .curve(d3.curveBasis);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add areas
        stackedData.forEach((seriesData, seriesIndex) => {
            const seriesConfig = series[seriesIndex];
            const color = seriesConfig.color || this.theme.primaryColor;

            const path = this.g!.append('path')
                .datum(seriesData)
                .attr('fill', color)
                .attr('opacity', 0.8)
                .attr('d', area);

            // Animate path
            const totalLength = (path.node() as SVGPathElement).getTotalLength();
            path
                .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
                .attr('stroke-dashoffset', totalLength)
                .transition()
                .duration(this.animation.duration)
                .delay(seriesIndex * 50)
                .attr('stroke-dashoffset', 0)
                .on('end', function () {
                    d3.select(this).attr('stroke-dasharray', 'none');
                });

            // Add hover effect
            path
                .on('mouseenter', function () {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1);
                })
                .on('mouseleave', function () {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.8);
                });
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
