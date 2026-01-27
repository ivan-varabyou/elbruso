import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { ForceDirectedGraphConfig, GraphNode, GraphLink } from '../../types/visualization';

/**
 * Force-Directed Graph Adapter
 * Network visualization with physics-based layout
 */
export class ForceDirectedGraphAdapter extends BaseChartAdapter<ForceDirectedGraphConfig> {
    private simulation: d3.Simulation<GraphNode, GraphLink> | null = null;

    protected render(): void {
        if (!this.g || !this.config.nodes.length) return;

        const { width, height } = this.getInnerDimensions();
        const {
            nodes,
            links,
            chargeStrength = -300,
            linkDistance = 100,
            showLabels = true,
            enableDrag = true
        } = this.config;

        // Clear previous content
        this.g.selectAll('*').remove();

        // Stop previous simulation
        if (this.simulation) {
            this.simulation.stop();
        }

        // Create copies of data to avoid mutation
        const nodesCopy = nodes.map(n => ({ ...n }));
        const linksCopy = links.map(l => ({ ...l }));

        // Create force simulation
        this.simulation = d3.forceSimulation(nodesCopy as any) as any;
        this.simulation!
            .force('link', d3.forceLink(linksCopy as any)
                .id((d: any) => d.id)
                .distance(linkDistance))
            .force('charge', d3.forceManyBody().strength(chargeStrength))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius((d: any) => (d.size || 5) + 5));

        // Color scale for groups
        const groups = Array.from(new Set(nodesCopy.map(n => n.group).filter((g): g is string => g !== undefined)));
        const color = d3.scaleOrdinal()
            .domain(groups)
            .range(d3.schemeCategory10);

        // Draw links
        const link = this.g.append('g')
            .selectAll('line')
            .data(linksCopy)
            .join('line')
            .attr('stroke', d => d.color || '#999')
            .attr('stroke-opacity', 0.6)
            .attr('stroke-width', d => Math.sqrt(d.value || 1));

        // Draw nodes
        const node = this.g.append('g')
            .selectAll('circle')
            .data(nodesCopy)
            .join('circle')
            .attr('r', d => d.size || 5)
            .attr('fill', d => d.color || (d.group ? color(d.group) as string : this.theme.primaryColor))
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('cursor', enableDrag ? 'grab' : 'pointer');

        // Add labels
        let labels: any = null;
        if (showLabels) {
            labels = this.g.append('g')
                .selectAll('text')
                .data(nodesCopy)
                .join('text')
                .text(d => d.name)
                .attr('font-size', '10px')
                .attr('fill', this.theme.textColor)
                .attr('text-anchor', 'middle')
                .attr('dy', -10)
                .attr('pointer-events', 'none');
        }

        // Add drag behavior
        if (enableDrag) {
            const drag = d3.drag<SVGCircleElement, GraphNode>()
                .on('start', (event, d: any) => {
                    if (!event.active && this.simulation) this.simulation.alphaTarget(0.3).restart();
                    d.fx = d.x;
                    d.fy = d.y;
                    d3.select(event.sourceEvent.target).style('cursor', 'grabbing');
                })
                .on('drag', (event, d: any) => {
                    d.fx = event.x;
                    d.fy = event.y;
                })
                .on('end', (event, d: any) => {
                    if (!event.active && this.simulation) this.simulation.alphaTarget(0);
                    d.fx = null;
                    d.fy = null;
                    d3.select(event.sourceEvent.target).style('cursor', 'grab');
                });

            node.call(drag as any);
        }

        // Add interactions
        const self = this;
        node
            .on('mouseenter', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', (d.size || 5) * 1.5);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${d.name}</strong><br/>
              ${d.group ? `Group: ${d.group}<br/>` : ''}
              Connections: ${linksCopy.filter(l => l.source === d.id || l.target === d.id).length}
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
            .on('mouseleave', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', d.size || 5);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });

        // Update positions on each tick
        if (this.simulation) {
            this.simulation.on('tick', () => {
                link
                    .attr('x1', (d: any) => d.source.x)
                    .attr('y1', (d: any) => d.source.y)
                    .attr('x2', (d: any) => d.target.x)
                    .attr('y2', (d: any) => d.target.y);

                node
                    .attr('cx', (d: any) => d.x)
                    .attr('cy', (d: any) => d.y);

                if (labels) {
                    labels
                        .attr('x', (d: any) => d.x)
                        .attr('y', (d: any) => d.y);
                }
            });
        }
    }

    public destroy(): void {
        if (this.simulation) {
            this.simulation.stop();
            this.simulation = null;
        }
        super.destroy();
    }
}
