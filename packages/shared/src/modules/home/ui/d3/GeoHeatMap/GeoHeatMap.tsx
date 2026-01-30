'use client';

import React, { useEffect, useRef } from 'react';
import { GeoHeatMapAdapter } from '@/shared/lib/visualization/adapters/GeoHeatMapAdapter';
import { GeoHeatMapConfig } from '@/shared/lib/visualization';

interface GeoHeatMapProps extends Omit<GeoHeatMapConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const GeoHeatMap: React.FC<GeoHeatMapProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<GeoHeatMapAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: GeoHeatMapConfig = {
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 600,
            },
        };

        adapterRef.current = new GeoHeatMapAdapter(svgRef.current, chartConfig);
        adapterRef.current.init();

        return () => {
            adapterRef.current?.destroy();
        };
    }, []);

    useEffect(() => {
        if (!adapterRef.current) return;

        adapterRef.current.update({
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 600,
            },
        });
    }, [config, width, height]);

    return <svg ref={svgRef} className={className} />;
};
