import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyGraph, SankeyNode as D3SankeyNode, SankeyLink as D3SankeyLink } from 'd3-sankey';
import { BaseChartAdapter } from './BaseChartAdapter';
import { SankeyConfig, SankeyNode, SankeyLink } from '@/shared/types/visualization';

/**
 * Sankey Diagram Adapter
 * Flow diagram showing quantities flowing between nodes
 */
export class SankeyAdapter extends BaseChartAdapter<SankeyConfig> {
    protected render(): void {
        if (!this.g || !this.config.nodes.length || !this.config.links.length) return;

        const { width, height } = this.getInnerDimensions();
        const { nodes, links, nodeWidth = 20, nodePadding = 10, showValues = true } = this.config;

        // Clear previous content
        this.g.selectAll('*').remove();

        // Create Sankey layout
        const sankeyLayout = sankey<SankeyNode, SankeyLink>()
            .nodeWidth(nodeWidth)
            .nodePadding(nodePadding)
            .extent([[0, 0], [width, height]]);

        // Prepare data
        const graph: SankeyGraph<SankeyNode, SankeyLink> = {
            nodes: nodes.map(n => ({ ...n })),
            links: links.map(l => ({ ...l }))
        };

        // Compute layout
        sankeyLayout(graph as any);

        // Color scale
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Draw links
        const link = this.g.append('g')
            .selectAll('.link')
            .data(graph.links)
            .join('path')
            .attr('class', 'link')
            .attr('d', sankeyLinkHorizontal() as any)
            .attr('stroke', (d: any) => d.color || color(d.source.name))
            .attr('stroke-width', (d: any) => Math.max(1, d.width))
            .attr('fill', 'none')
            .attr('opacity', 0.5)
            .style('cursor', 'pointer');

        // Animate links
        link.transition()
            .duration(this.animation.duration)
            .attr('opacity', 0.5);

        // Draw nodes
        const node = this.g.append('g')
            .selectAll('.node')
            .data(graph.nodes)
            .join('g')
            .attr('class', 'node');

        node.append('rect')
            .attr('x', (d: any) => d.x0)
            .attr('y', (d: any) => d.y0)
            .attr('height', (d: any) => d.y1 - d.y0)
            .attr('width', (d: any) => d.x1 - d.x0)
            .attr('fill', (d: any) => d.color || color(d.name))
            .attr('opacity', 0.8)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer');

        // Add node labels
        node.append('text')
            .attr('x', (d: any) => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
            .attr('y', (d: any) => (d.y1 + d.y0) / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', (d: any) => d.x0 < width / 2 ? 'start' : 'end')
            .attr('fill', this.theme.textColor)
            .attr('font-size', '12px')
            .text((d: any) => d.name);

        // Add value labels on links
        if (showValues) {
            this.g.append('g')
                .selectAll('.link-label')
                .data(graph.links)
                .join('text')
                .attr('class', 'link-label')
                .attr('x', (d: any) => ((d.source.x1 + d.target.x0) / 2))
                .attr('y', (d: any) => ((d.source.y1 + d.source.y0 + d.target.y1 + d.target.y0) / 4))
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '10px')
                .attr('opacity', 0)
                .text((d: any) => d.value)
                .transition()
                .duration(this.animation.duration)
                .attr('opacity', 0.7);
        }

        // Add interactions
        const self = this;

        link
            .on('mouseenter', function (event, d: any) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.8);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${d.source.name} → ${d.target.name}</strong><br/>
              Flow: ${d.value}
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
                    .attr('opacity', 0.5);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });

        node
            .on('mouseenter', function (event, d: any) {
                d3.select(this).select('rect')
                    .transition()
                    .duration(200)
                    .attr('opacity', 1);

                if (self.tooltip) {
                    const totalValue = d.sourceLinks.reduce((sum: number, l: any) => sum + l.value, 0) ||
                        d.targetLinks.reduce((sum: number, l: any) => sum + l.value, 0);

                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${d.name}</strong><br/>
              Total: ${totalValue}
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
                d3.select(this).select('rect')
                    .transition()
                    .duration(200)
                    .attr('opacity', 0.8);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });
    }
}
