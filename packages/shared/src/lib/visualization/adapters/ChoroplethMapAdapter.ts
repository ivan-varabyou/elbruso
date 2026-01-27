import * as d3 from 'd3';
import { BaseChartAdapter } from './BaseChartAdapter';
import { ChoroplethMapConfig } from '../../types/visualization';

/**
 * Choropleth Map Adapter
 * Universal geographic visualization with color-coded regions
 * Supports any GeoJSON (Russia regions, countries, etc.)
 */
export class ChoroplethMapAdapter extends BaseChartAdapter<ChoroplethMapConfig> {
    protected render(): void {
        if (!this.g || !this.config.data.length) return;

        const { width, height } = this.getInnerDimensions();
        const {
            data,
            geoJson,
            geoJsonUrl,
            projection = 'mercator',
            colorScale,
            showLabels = false,
            idProperty = 'properties.id'
        } = this.config;

        // Clear previous content
        this.g.selectAll('*').remove();

        // If GeoJSON URL is provided, fetch it
        if (geoJsonUrl && !geoJson) {
            d3.json(geoJsonUrl).then((fetchedGeoJson) => {
                this.renderMap(fetchedGeoJson, data, projection, colorScale, showLabels, idProperty, width, height);
            });
        } else if (geoJson) {
            this.renderMap(geoJson, data, projection, colorScale, showLabels, idProperty, width, height);
        } else {
            // No GeoJSON provided - show message
            this.g.append('text')
                .attr('x', width / 2)
                .attr('y', height / 2)
                .attr('text-anchor', 'middle')
                .attr('fill', this.theme.textColor)
                .text('GeoJSON data required. Provide geoJson or geoJsonUrl in config.');
        }
    }

    private renderMap(
        geoJson: any,
        data: any[],
        projectionType: string,
        colorScale: string[] | undefined,
        showLabels: boolean,
        idProperty: string,
        width: number,
        height: number
    ): void {
        if (!this.g) return;

        // Create projection
        let projection: d3.GeoProjection;

        switch (projectionType) {
            case 'albersUsa':
                projection = d3.geoAlbersUsa();
                break;
            case 'albers':
                projection = d3.geoAlbers();
                break;
            case 'equalEarth':
                projection = d3.geoEqualEarth();
                break;
            case 'naturalEarth':
                projection = d3.geoNaturalEarth1();
                break;
            default:
                projection = d3.geoMercator();
        }

        // Fit projection to bounds
        projection.fitSize([width, height], geoJson);

        // Create path generator
        const path = d3.geoPath().projection(projection);

        // Create data map for quick lookup
        const dataMap = new Map(data.map(d => [d.id, d]));

        // Create color scale
        const values = data.map(d => d.value);
        const colorDomain = d3.extent(values) as [number, number];
        const color = d3.scaleSequential()
            .domain(colorDomain)
            .interpolator(d3.interpolateBlues);

        // Helper function to get value from GeoJSON feature
        const getFeatureId = (feature: any): string => {
            const parts = idProperty.split('.');
            let value = feature;
            for (const part of parts) {
                value = value?.[part];
            }
            return value;
        };

        // Draw regions
        const self = this;
        const regions = this.g.selectAll('path')
            .data(geoJson.features)
            .join('path')
            .attr('d', path as any)
            .attr('fill', (feature: any) => {
                const featureId = getFeatureId(feature);
                const dataPoint = dataMap.get(featureId);
                return dataPoint ? (dataPoint.color || color(dataPoint.value)) : '#e0e0e0';
            })
            .attr('stroke', '#fff')
            .attr('stroke-width', 1)
            .attr('opacity', 0)
            .style('cursor', 'pointer');

        // Animate regions
        regions.transition()
            .duration(this.animation.duration)
            .delay((d, i) => i * 5)
            .attr('opacity', 0.8);

        // Add interactions
        regions
            .on('mouseenter', function (event, feature: any) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('opacity', 1)
                    .attr('stroke-width', 2)
                    .attr('stroke', self.theme.primaryColor);

                const featureId = getFeatureId(feature);
                const dataPoint = dataMap.get(featureId);

                if (self.tooltip && dataPoint) {
                    self.tooltip
                        .style('opacity', 1)
                        .html(`
              <strong>${dataPoint.name}</strong><br/>
              Value: ${dataPoint.value.toFixed(2)}
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
                    .attr('opacity', 0.8)
                    .attr('stroke-width', 1)
                    .attr('stroke', '#fff');

                if (self.tooltip) {
                    self.tooltip.style('opacity', 0);
                }
            });

        // Add labels if enabled
        if (showLabels) {
            this.g.selectAll('.label')
                .data(geoJson.features)
                .join('text')
                .attr('class', 'label')
                .attr('transform', (feature: any) => {
                    const centroid = path.centroid(feature);
                    return `translate(${centroid})`;
                })
                .attr('text-anchor', 'middle')
                .attr('dy', '0.35em')
                .attr('fill', this.theme.textColor)
                .attr('font-size', '10px')
                .attr('pointer-events', 'none')
                .text((feature: any) => {
                    const featureId = getFeatureId(feature);
                    const dataPoint = dataMap.get(featureId);
                    return dataPoint ? dataPoint.name : '';
                })
                .attr('opacity', 0)
                .transition()
                .duration(this.animation.duration)
                .delay(this.animation.duration)
                .attr('opacity', 0.7);
        }
    }
}
