'use client';

import React, { useEffect, useRef } from 'react';
import { StackedBarChartAdapter } from '@/shared/lib/visualization/adapters/StackedBarChartAdapter';
import { StackedBarChartConfig } from '@/shared/lib/visualization/types';

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
