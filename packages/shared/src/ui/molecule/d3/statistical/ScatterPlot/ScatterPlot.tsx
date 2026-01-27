'use client';

import React, { useEffect, useRef } from 'react';
import { ScatterPlotAdapter } from '@/shared/lib/visualization/adapters/ScatterPlotAdapter';
import { ScatterChartConfig } from '@/shared/lib/visualization';

interface ScatterPlotProps extends Omit<ScatterChartConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<ScatterPlotAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: ScatterChartConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new ScatterPlotAdapter(svgRef.current, chartConfig);
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
