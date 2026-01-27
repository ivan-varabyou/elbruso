'use client';

import React, { useEffect, useRef } from 'react';
import { CalendarHeatmapAdapter } from '@/shared/lib/visualization/adapters/CalendarHeatmapAdapter';
import { CalendarHeatmapConfig } from '@/shared/lib/visualization';

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
