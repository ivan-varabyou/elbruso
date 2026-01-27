import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { GanttConfig } from '../types';

/**
 * Gantt Chart Adapter
 * Timeline and project planning visualization
 */
export class GanttAdapter extends BaseChartAdapter<GanttConfig> {
    protected render(): void {
        if (!this.g || !this.config.tasks.length) return;

        const { width, height } = this.getInnerDimensions();
        const { tasks, showToday = true, showProgress = true, barHeight = 30 } = this.config;

        // Parse dates
        const parsedTasks = tasks.map(t => ({
            ...t,
            start: typeof t.start === 'string' ? new Date(t.start) : t.start,
            end: typeof t.end === 'string' ? new Date(t.end) : t.end,
        }));

        // Get date range
        const allDates = parsedTasks.flatMap(t => [t.start, t.end]);
        const minDate = d3.min(allDates) || new Date();
        const maxDate = d3.max(allDates) || new Date();

        // Create scales
        const xScale = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([0, width]);

        const yScale = d3.scaleBand()
            .domain(parsedTasks.map(t => t.id))
            .range([0, parsedTasks.length * (barHeight + 10)])
            .padding(0.2);

        // Clear previous content
        this.g.selectAll('*').remove();

        // Add time axis
        this.g.append('g')
            .attr('transform', `translate(0,${parsedTasks.length * (barHeight + 10)})`)
            .call(d3.axisBottom(xScale).ticks(6))
            .selectAll('text')
            .attr('fill', this.theme.textColor);

        // Add grid
        this.g.append('g')
            .attr('class', 'grid')
            .attr('opacity', 0.1)
            .call(
                d3.axisBottom(xScale)
                    .ticks(6)
                    .tickSize(-parsedTasks.length * (barHeight + 10))
                    .tickFormat(() => '')
            );

        // Add today line
        if (showToday) {
            const today = new Date();
            if (today >= minDate && today <= maxDate) {
                this.g.append('line')
                    .attr('x1', xScale(today))
                    .attr('x2', xScale(today))
                    .attr('y1', 0)
                    .attr('y2', parsedTasks.length * (barHeight + 10))
                    .attr('stroke', this.theme.errorColor)
                    .attr('stroke-width', 2)
                    .attr('stroke-dasharray', '5,5')
                    .attr('opacity', 0.6);

                this.g.append('text')
                    .attr('x', xScale(today))
                    .attr('y', -5)
                    .attr('text-anchor', 'middle')
                    .attr('fill', this.theme.errorColor)
                    .attr('font-size', '10px')
                    .attr('font-weight', 'bold')
                    .text('Today');
            }
        }

        // Draw task bars
        const self = this;
        parsedTasks.forEach((task, i) => {
            const y = yScale(task.id) || 0;
            const barWidth = xScale(task.end) - xScale(task.start);
            const color = task.color || this.theme.primaryColor;

            // Background bar
            const bar = this.g!.append('rect')
                .attr('x', xScale(task.start))
                .attr('y', y)
                .attr('width', 0)
                .attr('height', yScale.bandwidth())
                .attr('fill', color)
                .attr('opacity', 0.7)
                .attr('rx', 4)
                .style('cursor', 'pointer');

            // Animate bar
            bar.transition()
                .duration(this.animation.duration)
                .delay(i * 50)
                .attr('width', barWidth);

            // Progress bar
            if (showProgress && task.progress !== undefined) {
                this.g!.append('rect')
                    .attr('x', xScale(task.start))
                    .attr('y', y)
                    .attr('width', 0)
                    .attr('height', yScale.bandwidth())
                    .attr('fill', color)
                    .attr('opacity', 1)
                    .attr('rx', 4)
                    .transition()
                    .duration(this.animation.duration)
                    .delay(i * 50 + this.animation.duration / 2)
                    .attr('width', barWidth * (task.progress / 100));
            }

            // Task label
            this.g!.append('text')
                .attr('x', -5)
                .attr('y', y + yScale.bandwidth() / 2)
                .attr('text-anchor', 'end')
                .attr('dy', '0.35em')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '12px')
                .text(task.name);

            // Add interactions
            bar
                .on('mouseenter', function (event) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1);

                    if (self.tooltip) {
                        const duration = (task.end.getTime() - task.start.getTime()) / (1000 * 60 * 60 * 24);
                        self.tooltip
                            .style('opacity', 1)
                            .html(`
                <strong>${task.name}</strong><br/>
                Start: ${d3.timeFormat('%Y-%m-%d')(task.start)}<br/>
                End: ${d3.timeFormat('%Y-%m-%d')(task.end)}<br/>
                Duration: ${Math.ceil(duration)} days
                ${task.progress !== undefined ? `<br/>Progress: ${task.progress}%` : ''}
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
                        .attr('opacity', 0.7);

                    if (self.tooltip) {
                        self.tooltip.style('opacity', 0);
                    }
                });
        });
    }
}
