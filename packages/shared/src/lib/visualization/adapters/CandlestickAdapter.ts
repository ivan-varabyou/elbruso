import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { CandlestickConfig } from '../../types/visualization';

/**
 * Candlestick Chart Adapter
 * Financial OHLC (Open-High-Low-Close) visualization
 */
export class CandlestickAdapter extends BaseChartAdapter<CandlestickConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, upColor = '#34A853', downColor = '#EA4335' } = this.config;

        // Parse dates
        const parsedData = data.map(d => ({
            date: typeof d.date === 'string' ? new Date(d.date) : d.date,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
        }));

        // Create scales
        const xScale = d3.scaleBand()
            .domain(parsedData.map((d, i) => String(i)))
            .range([0, width])
            .padding(0.3);

        const allValues = parsedData.flatMap(d => [d.open, d.high, d.low, d.close]);
        const yExtent = d3.extent(allValues) as [number, number];
        const yScale = d3.scaleLinear()
            .domain([yExtent[0] * 0.98, yExtent[1] * 1.02])
            .range([height, 0]);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add axes
        const xAxis = d3.axisBottom(xScale)
            .tickFormat((d, i) => {
                const date = parsedData[i].date;
                return d3.timeFormat('%m/%d')(date);
            });

        this.g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)
            .selectAll('text')
            .attr('fill', this.theme.textColor)
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

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
        }

        const candleWidth = xScale.bandwidth();

        // Draw candlesticks
        parsedData.forEach((d, i) => {
            const x = xScale(String(i)) || 0;
            const isUp = d.close >= d.open;
            const color = isUp ? upColor : downColor;

            // High-Low line (wick)
            this.g!.append('line')
                .attr('x1', x + candleWidth / 2)
                .attr('x2', x + candleWidth / 2)
                .attr('y1', yScale(d.high))
                .attr('y2', yScale(d.low))
                .attr('stroke', color)
                .attr('stroke-width', 1)
                .attr('opacity', 0)
                .transition()
                .duration(this.animation.duration)
                .delay(i * 20)
                .attr('opacity', 1);

            // Open-Close body
            const bodyHeight = Math.abs(yScale(d.open) - yScale(d.close));
            const bodyY = Math.min(yScale(d.open), yScale(d.close));

            this.g!.append('rect')
                .attr('x', x)
                .attr('y', bodyY)
                .attr('width', candleWidth)
                .attr('height', Math.max(bodyHeight, 1))
                .attr('fill', isUp ? color : color)
                .attr('stroke', color)
                .attr('stroke-width', 1)
                .attr('opacity', isUp ? 0.8 : 1)
                .attr('rx', 2)
                .style('cursor', 'pointer')
                .on('mouseenter', (event) => {
                    if (this.tooltip) {
                        this.tooltip
                            .style('opacity', 1)
                            .html(`
                <strong>${d3.timeFormat('%Y-%m-%d')(d.date)}</strong><br/>
                Open: ${d.open.toFixed(2)}<br/>
                High: ${d.high.toFixed(2)}<br/>
                Low: ${d.low.toFixed(2)}<br/>
                Close: ${d.close.toFixed(2)}<br/>
                Change: ${((d.close - d.open) / d.open * 100).toFixed(2)}%
              `);
                    }
                })
                .on('mousemove', (event) => {
                    if (this.tooltip) {
                        this.tooltip
                            .style('left', `${event.pageX + 10}px`)
                            .style('top', `${event.pageY - 10}px`);
                    }
                })
                .on('mouseleave', () => {
                    if (this.tooltip) {
                        this.tooltip.style('opacity', 0);
                    }
                })
                .transition()
                .duration(this.animation.duration)
                .delay(i * 20)
                .attr('height', Math.max(bodyHeight, 1));
        });

        // Add axis labels
        if (this.config.xAxisLabel) {
            this.g.append('text')
                .attr('x', width / 2)
                .attr('y', height + 50)
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
