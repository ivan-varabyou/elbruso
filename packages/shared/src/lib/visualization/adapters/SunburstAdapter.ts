import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { SunburstConfig, HierarchicalNode } from '@/shared/visualization';

// Extended interface for partition nodes with layout properties
interface PartitionNode extends d3.HierarchyNode<HierarchicalNode> {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
    current?: { x0: number; x1: number; y0: number; y1: number };
}

/**
 * Sunburst Adapter
 * Hierarchical radial partition visualization
 */
export class SunburstAdapter extends BaseChartAdapter<SunburstConfig> {
    protected render(): void {
        if (!this.g || !this.config.data) return;

        const { width, height } = this.getInnerDimensions();
        const { data, showLabels = true, enableZoom = true, colorScheme } = this.config;

        const radius = Math.min(width, height) / 2;

        // Clear previous content
        this.g.selectAll('*').remove();

        // Center the visualization
        const centerG = this.g.append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        // Create hierarchy
        const root = d3.hierarchy(data)
            .sum(d => d.value || 0)
            .sort((a, b) => (b.value || 0) - (a.value || 0));

        // Create partition layout
        const partition = d3.partition<HierarchicalNode>()
            .size([2 * Math.PI, radius]);

        partition(root);

        // Cast root to PartitionNode for type safety
        const partitionRoot = root as unknown as PartitionNode;

        // Create arc generator
        const arc = d3.arc<PartitionNode>()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .innerRadius(d => d.y0)
            .outerRadius(d => d.y1);

        // Color scale
        const color = d3.scaleOrdinal()
            .domain(partitionRoot.descendants().map(d => d.data.name))
            .range(colorScheme || d3.schemeCategory10);

        // Add arcs
        const paths = centerG.selectAll('path')
            .data(partitionRoot.descendants().filter(d => d.depth > 0) as PartitionNode[])
            .join('path')
            .attr('fill', d => d.data.color || (color(d.data.name) as string))
            .attr('fill-opacity', 0.8)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .attr('d', arc)
            .style('cursor', enableZoom ? 'pointer' : 'default');

        // Add labels
        if (showLabels) {
            centerG.selectAll('text')
                .data(partitionRoot.descendants().filter(d => d.depth > 0 && d.x1 - d.x0 > 0.1) as PartitionNode[])
                .join('text')
                .attr('transform', d => {
                    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
                    const y = (d.y0 + d.y1) / 2;
                    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
                })
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .attr('fill', '#fff')
                .attr('font-size', '10px')
                .attr('font-weight', 'bold')
                .attr('pointer-events', 'none')
                .text(d => d.data.name);
        }

        // Add zoom interaction
        if (enableZoom) {
            paths.on('click', (event, clicked) => {
                event.stopPropagation();

                // Determine if we're zooming in or out
                const focus = clicked === partitionRoot ? partitionRoot : clicked;

                // Update partition
                partitionRoot.each((d: any) => {
                    const pNode = d as PartitionNode;
                    const pFocus = focus as PartitionNode;
                    const target = {
                        x0: Math.max(0, Math.min(1, (pNode.x0 - pFocus.x0) / (pFocus.x1 - pFocus.x0))) * 2 * Math.PI,
                        x1: Math.max(0, Math.min(1, (pNode.x1 - pFocus.x0) / (pFocus.x1 - pFocus.x0))) * 2 * Math.PI,
                        y0: Math.max(0, pNode.y0 - pFocus.y0),
                        y1: Math.max(0, pNode.y1 - pFocus.y0),
                    };
                    pNode.current = target;
                });

                // Transition arcs
                paths.transition()
                    .duration(750)
                    .tween('data', (d: any) => {
                        const pNode = d as PartitionNode;
                        const i = d3.interpolate(pNode.current || pNode, pNode.current!);
                        return (t: number) => {
                            pNode.current = i(t);
                        };
                    })
                    .attrTween('d', (d: any) => () => arc((d as PartitionNode).current as any) || '');
            });

            // Click on center to zoom out
            centerG.append('circle')
                .attr('r', radius)
                .attr('fill', 'none')
                .attr('pointer-events', 'all')
                .style('cursor', 'pointer')
                .on('click', () => {
                    // Trigger click on root to zoom out
                    paths.filter((d: any) => d === partitionRoot).dispatch('click');
                });
        }

        // Add hover effects
        const self = this;
        paths
            .on('mouseenter', function (this: d3.BaseType | SVGPathElement, event: any, d: any) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('fill-opacity', 1);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`<strong>${d.data.name}</strong><br/>Value: ${d.value}`);
                }
            })
            .on('mousemove', function (event: any) {
                if (self.tooltip) {
                    self.tooltip
                        .style('left', `${event.pageX + 10}px`)
                        .style('top', `${event.pageY - 10}px`);
                }
            })
            .on('mouseleave', function (this: d3.BaseType | SVGPathElement) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('fill-opacity', 0.8);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });
    }
}
