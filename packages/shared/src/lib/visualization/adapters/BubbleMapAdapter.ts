import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { BubbleMapConfig } from '../../types/visualization';

/**
 * Bubble Map Adapter
 * Geographic points with size representing values
 */
export class BubbleMapAdapter extends BaseChartAdapter<BubbleMapConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const {
            data,
            geoJson,
            geoJsonUrl,
            projection = 'mercator',
            sizeScale = [5, 40],
            showLabels = false
        } = this.config;

        // Clear previous content
        this.g.selectAll('*').remove();

        // If GeoJSON URL is provided, fetch it
        if (geoJsonUrl && !geoJson) {
            d3.json(geoJsonUrl).then((fetchedGeoJson) => {
                this.renderChart(fetchedGeoJson, data, projection, sizeScale, showLabels, width, height);
            }).catch(err => {
                console.error('Failed to load GeoJSON:', err);
                this.renderChart(null, data, projection, sizeScale, showLabels, width, height);
            });
        } else {
            this.renderChart(geoJson, data, projection, sizeScale, showLabels, width, height);
        }
    }

    private renderChart(
        geoJson: any,
        data: any[],
        projectionType: string,
        sizeScale: [number, number],
        showLabels: boolean,
        width: number,
        height: number
    ): void {
        if (!this.g) return;

        // Create projection
        let proj: d3.GeoProjection;

        switch (projectionType) {
            case 'albersUsa':
                proj = d3.geoAlbersUsa();
                break;
            case 'albers':
                proj = d3.geoAlbers();
                break;
            case 'equalEarth':
                proj = d3.geoEqualEarth();
                break;
            case 'naturalEarth':
                proj = d3.geoNaturalEarth1();
                break;
            default:
                proj = d3.geoMercator();
        }

        // Fit projection
        if (geoJson) {
            proj.fitSize([width, height], geoJson);
        } else {
            // Default projection for world if no geoJson
            proj.scale(width / (2 * Math.PI)).translate([width / 2, height / 2]);
        }

        // Draw background map if GeoJSON provided
        if (geoJson) {
            const path = d3.geoPath().projection(proj);

            this.g.selectAll('.land')
                .data(geoJson.features)
                .join('path')
                .attr('class', 'land')
                .attr('d', path as any)
                .attr('fill', 'rgba(255, 255, 255, 0.05)')
                .attr('stroke', 'rgba(255, 255, 255, 0.2)')
                .attr('stroke-width', 0.5);
        }

        // Create size scale
        const values = data.map(d => d.value);
        const valueDomain = d3.extent(values) as [number, number];
        const radiusScale = d3.scaleSqrt()
            .domain(valueDomain)
            .range(sizeScale);

        // Draw bubbles
        const self = this;
        const bubbles = this.g.selectAll('.bubble')
            .data(data)
            .join('circle')
            .attr('class', 'bubble')
            .attr('cx', d => {
                const coords = proj([d.longitude, d.latitude]);
                return coords ? coords[0] : 0;
            })
            .attr('cy', d => {
                const coords = proj([d.longitude, d.latitude]);
                return coords ? coords[1] : 0;
            })
            .attr('r', 0)
            .attr('fill', d => d.color || this.theme.primaryColor)
            .attr('opacity', 0.6)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('cursor', 'pointer');

        // Animate bubbles
        bubbles.transition()
            .duration(this.animation.duration)
            .delay((d, i) => i * 20)
            .attr('r', d => radiusScale(d.value));

        // Add labels
        if (showLabels) {
            this.g.selectAll('.label')
                .data(data)
                .join('text')
                .attr('class', 'label')
                .attr('x', d => {
                    const coords = proj([d.longitude, d.latitude]);
                    return coords ? coords[0] : 0;
                })
                .attr('y', d => {
                    const coords = proj([d.longitude, d.latitude]);
                    return coords ? coords[1] - radiusScale(d.value) - 5 : 0;
                })
                .attr('text-anchor', 'middle')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '10px')
                .attr('font-weight', 'bold')
                .attr('pointer-events', 'none')
                .text(d => d.name)
                .attr('opacity', 0)
                .transition()
                .duration(this.animation.duration)
                .delay((d, i) => i * 20 + this.animation.duration / 2)
                .attr('opacity', 1);
        }

        // Add interactions
        bubbles
            .on('mouseenter', function (event, d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', radiusScale(d.value) * 1.3)
                    .attr('opacity', 0.9);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${d.name}</strong><br/>
              Рост: +${d.value.toFixed(1)}%
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
                    .attr('r', radiusScale(d.value))
                    .attr('opacity', 0.6);

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });
    }
}
