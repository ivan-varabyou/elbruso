'use client';

import { GanttConfig } from '@frontend/modules/visualization/lib';
import { GanttAdapter } from '@frontend/modules/visualization/lib/adapters/GanttAdapter';
import React, { useEffect, useRef } from 'react';

interface GanttProps extends Omit<GanttConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const Gantt: React.FC<GanttProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<GanttAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: GanttConfig = {
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 400,
            },
        };

        adapterRef.current = new GanttAdapter(svgRef.current, chartConfig);
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
                height: height || 400,
            },
        });
    }, [config, width, height]);

    return <svg ref={svgRef} className={className} />;
};
