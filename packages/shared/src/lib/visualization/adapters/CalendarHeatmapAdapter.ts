import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { CalendarHeatmapConfig } from '@/shared/visualization';

/**
 * Calendar Heatmap Adapter
 * GitHub-style contribution calendar
 */
export class CalendarHeatmapAdapter extends BaseChartAdapter<CalendarHeatmapConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, cellSize = 15, showMonthLabels = true, showWeekdayLabels = true } = this.config;

        // Parse dates
        const parsedData = data.map(d => ({
            date: typeof d.date === 'string' ? new Date(d.date) : d.date,
            value: d.value
        }));

        // Get date range
        const dates = parsedData.map(d => d.date);
        const minDate = d3.min(dates) || new Date();
        const maxDate = d3.max(dates) || new Date();

        // Calculate weeks
        const weekDiff = d3.timeWeek.count(minDate, maxDate);
        const cellPadding = 2;

        // Create color scale
        const values = parsedData.map(d => d.value);
        const colorDomain = d3.extent(values) as [number, number];
        const color = d3.scaleSequential()
            .domain(colorDomain)
            .interpolator(d3.interpolateGreens);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Create a map for quick lookup
        const dataMap = new Map(
            parsedData.map(d => [d.date.toDateString(), d.value])
        );

        // Generate all days in range
        const allDays: Date[] = [];
        let currentDate = new Date(minDate);
        while (currentDate <= maxDate) {
            allDays.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Draw cells
        const cells = this.g.selectAll('.day')
            .data(allDays)
            .join('rect')
            .attr('class', 'day')
            .attr('width', cellSize)
            .attr('height', cellSize)
            .attr('x', d => d3.timeWeek.count(minDate, d) * (cellSize + cellPadding))
            .attr('y', d => d.getDay() * (cellSize + cellPadding))
            .attr('fill', '#eee')
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .attr('rx', 2);

        // Animate cells with data
        cells.transition()
            .duration(this.animation.duration)
            .delay((d, i) => i * 2)
            .attr('fill', d => {
                const value = dataMap.get(d.toDateString());
                return value !== undefined ? color(value) : '#eee';
            });

        // Add month labels
        if (showMonthLabels) {
            const months = d3.timeMonths(minDate, maxDate);
            this.g.selectAll('.month-label')
                .data(months)
                .join('text')
                .attr('class', 'month-label')
                .attr('x', d => d3.timeWeek.count(minDate, d) * (cellSize + cellPadding))
                .attr('y', -5)
                .attr('fill', this.theme.textColor)
                .attr('font-size', '10px')
                .text(d => d3.timeFormat('%b')(d));
        }

        // Add weekday labels
        if (showWeekdayLabels) {
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            this.g.selectAll('.weekday-label')
                .data(weekdays)
                .join('text')
                .attr('class', 'weekday-label')
                .attr('x', -5)
                .attr('y', (d, i) => i * (cellSize + cellPadding) + cellSize / 2)
                .attr('text-anchor', 'end')
                .attr('dy', '0.35em')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '10px')
                .text(d => d);
        }

        // Add interactions
        const self = this;
        cells
            .on('mouseenter', function (event, d) {
                const value = dataMap.get(d.toDateString());

                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('stroke-width', 3)
                    .attr('stroke', self.theme.primaryColor);

                if (self.tooltip && value !== undefined) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${d3.timeFormat('%Y-%m-%d')(d)}</strong><br/>
              Value: ${value.toFixed(1)}
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
