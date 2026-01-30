import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { GeoHeatMapConfig } from '@/shared/visualization';

/**
 * Geographic Heatmap Adapter
 * Density visualization on geographic map
 */
export class GeoHeatMapAdapter extends BaseChartAdapter<GeoHeatMapConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const {
            data,
            geoJson,
            geoJsonUrl,
            projection = 'mercator',
            radius = 20,
            intensity = 1,
            showMap = true
        } = this.config;

        // Clear previous content
        this.g.selectAll('*').remove();

        // Create projection
        let proj: d3.GeoProjection;

        switch (projection) {
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
            proj.scale(width / (2 * Math.PI)).translate([width / 2, height / 2]);
        }

        // Draw background map if enabled and GeoJSON provided
        if (showMap && geoJson) {
            const path = d3.geoPath().projection(proj);

            this.g.selectAll('.land')
                .data(geoJson.features)
                .join('path')
                .attr('class', 'land')
                .attr('d', path as any)
                .attr('fill', '#f0f0f0')
                .attr('stroke', '#ccc')
                .attr('stroke-width', 0.5);
        }

        // Create canvas for heatmap (more efficient for density)
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');

        if (!context) return;

        // Create radial gradient for each point
        const maxValue = d3.max(data, d => d.value) || 1;

        data.forEach(d => {
            const coords = proj([d.longitude, d.latitude]);
            if (!coords) return;

            const [x, y] = coords;
            const normalizedValue = d.value / maxValue;
            const gradient = context.createRadialGradient(x, y, 0, x, y, radius);

            gradient.addColorStop(0, `rgba(255, 0, 0, ${normalizedValue * intensity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(255, 0, 0, ${normalizedValue * intensity * 0.4})`);
            gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

            context.fillStyle = gradient;
            context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        });

        // Convert canvas to image and add to SVG
        const image = this.g.append('image')
            .attr('width', width)
            .attr('height', height)
            .attr('href', canvas.toDataURL())
            .attr('opacity', 0);

        // Animate heatmap
        image.transition()
            .duration(this.animation.duration)
            .attr('opacity', 0.7);

        // Add invisible circles for interactions
        const self = this;
        this.g.selectAll('.heat-point')
            .data(data)
            .join('circle')
            .attr('class', 'heat-point')
            .attr('cx', d => {
                const coords = proj([d.longitude, d.latitude]);
                return coords ? coords[0] : 0;
            })
            .attr('cy', d => {
                const coords = proj([d.longitude, d.latitude]);
                return coords ? coords[1] : 0;
            })
            .attr('r', radius)
            .attr('fill', 'transparent')
            .style('cursor', 'pointer')
            .on('mouseenter', function (event, d) {
                d3.select(this)
                    .attr('fill', 'rgba(255, 255, 255, 0.2)')
                    .attr('stroke', self.theme.primaryColor)
                    .attr('stroke-width', 2);

                if (self.tooltip) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${d.name}</strong><br/>
              Intensity: ${d.value.toFixed(2)}<br/>
              Location: ${d.latitude.toFixed(2)}°, ${d.longitude.toFixed(2)}°
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
                    .attr('fill', 'transparent')
                    .attr('stroke', 'none');

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });
    }
}
