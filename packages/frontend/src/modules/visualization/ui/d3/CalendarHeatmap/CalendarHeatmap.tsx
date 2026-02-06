'use client';

import { CalendarHeatmapConfig } from '@frontend/modules/visualization/lib';
import { CalendarHeatmapAdapter } from '@frontend/modules/visualization/lib/adapters/CalendarHeatmapAdapter';
import React, { useEffect, useRef } from 'react';

interface CalendarHeatmapProps extends Omit<CalendarHeatmapConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const CalendarHeatmap: React.FC<CalendarHeatmapProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<CalendarHeatmapAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: CalendarHeatmapConfig = {
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 200,
            },
        };

        adapterRef.current = new CalendarHeatmapAdapter(svgRef.current, chartConfig);
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
                height: height || 200,
            },
        });
    }, [config, width, height]);

    return <svg ref={svgRef} className={className} />;
};
