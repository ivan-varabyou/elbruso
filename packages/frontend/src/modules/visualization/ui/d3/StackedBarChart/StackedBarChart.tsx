'use client';

import { StackedBarChartConfig } from '@frontend/modules/visualization/lib';
import { StackedBarChartAdapter } from '@frontend/modules/visualization/lib/adapters/StackedBarChartAdapter';
import React, { useEffect, useRef } from 'react';

interface StackedBarChartProps extends Omit<StackedBarChartConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<StackedBarChartAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: StackedBarChartConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new StackedBarChartAdapter(svgRef.current, chartConfig);
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
