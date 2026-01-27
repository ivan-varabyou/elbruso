import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { ChordConfig } from '../types';

/**
 * Chord Diagram Adapter
 * Circular relationship visualization showing flows between entities
 */
export class ChordAdapter extends BaseChartAdapter<ChordConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.matrix.length) return;

        const { width, height } = this.getInnerDimensions();
        const { data, innerRadius, outerRadius, showLabels = true } = this.config;

        const size = Math.min(width, height);
        const calculatedOuterRadius = outerRadius || size / 2 - 40;
        const calculatedInnerRadius = innerRadius || calculatedOuterRadius - 20;

        // Clear previous content
        this.g.selectAll('*').remove();

        // Center the visualization
        const centerG = this.g.append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        // Create chord layout
        const chord = d3.chord()
            .padAngle(0.05)
            .sortSubgroups(d3.descending);

        const chords = chord(data.matrix);

        // Color scale
        const colors = data.colors || d3.schemeCategory10;
        const color = d3.scaleOrdinal()
            .domain(d3.range(data.labels.length).map(String))
            .range(colors);

        // Create arc generator for groups
        const arc = d3.arc()
            .innerRadius(calculatedInnerRadius)
            .outerRadius(calculatedOuterRadius);

        // Create ribbon generator for chords
        const ribbon = d3.ribbon()
            .radius(calculatedInnerRadius);

        // Draw groups (outer arcs)
        const group = centerG.append('g')
            .selectAll('g')
            .data(chords.groups)
            .join('g');

        group.append('path')
            .attr('fill', d => color(String(d.index)) as string)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .attr('d', arc as any)
            .attr('opacity', 0)
            .transition()
            .duration(this.animation.duration)
            .delay((d, i) => i * 50)
            .attr('opacity', 0.8);

        // Add labels
        if (showLabels) {
            group.append('text')
                .each((d: any) => { d.angle = (d.startAngle + d.endAngle) / 2; })
                .attr('dy', '0.35em')
                .attr('transform', (d: any) => `
          rotate(${(d.angle * 180 / Math.PI - 90)})
          translate(${calculatedOuterRadius + 10})
          ${d.angle > Math.PI ? 'rotate(180)' : ''}
        `)
                .attr('text-anchor', (d: any) => d.angle > Math.PI ? 'end' : 'start')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '12px')
                .text((d: any) => data.labels[d.index])
                .attr('opacity', 0)
                .transition()
                .duration(this.animation.duration)
                .delay((d, i) => i * 50 + this.animation.duration / 2)
                .attr('opacity', 1);
        }

        // Draw chords (ribbons)
        const self = this;
        const ribbons = centerG.append('g')
            .selectAll('path')
            .data(chords)
            .join('path')
            .attr('d', ribbon as any)
            .attr('fill', d => color(String(d.source.index)) as string)
            .attr('opacity', 0)
            .style('cursor', 'pointer');

        // Animate ribbons
        ribbons.transition()
            .duration(this.animation.duration)
            .delay((d, i) => i * 20 + this.animation.duration)
            .attr('opacity', 0.6);

        // Add interactions
        ribbons
            .on('mouseenter', function (event, d: any) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.9);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${data.labels[d.source.index]} → ${data.labels[d.target.index]}</strong><br/>
              Value: ${d.source.value.toFixed(2)}
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
                    .attr('opacity', 0.6);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });

        group.select('path')
            .on('mouseenter', function (event, d: any) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 1);

                if (self.tooltip) {
                    const total = d3.sum(data.matrix[d.index]);
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${data.labels[d.index]}</strong><br/>
              Total: ${total.toFixed(2)}
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
                    .attr('opacity', 0.8);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });
    }
}
