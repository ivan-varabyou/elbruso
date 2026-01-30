'use client';

import React, { useEffect, useRef } from 'react';
import { HeatmapAdapter } from '@/shared/lib/visualization/adapters/HeatmapAdapter';
import { HeatmapConfig } from '@/shared/lib/visualization';

interface HeatmapProps extends Omit<HeatmapConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const Heatmap: React.FC<HeatmapProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<HeatmapAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: HeatmapConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new HeatmapAdapter(svgRef.current, chartConfig);
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
                width: width || 600,
                height: height || 400,
            },
        });
    }, [config, width, height]);

    return <svg ref={svgRef} className={className} />;
};
