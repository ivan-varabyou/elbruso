'use client';

import { RadialBarChartConfig } from '@elbruso/modules/visualization/lib';
import { RadialBarChartAdapter } from '@elbruso/modules/visualization/lib/adapters/RadialBarChartAdapter';
import React, { useEffect, useRef } from 'react';

interface RadialBarChartProps extends Omit<RadialBarChartConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const RadialBarChart: React.FC<RadialBarChartProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<RadialBarChartAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: RadialBarChartConfig = {
            ...config,
            dimensions: {
                width: width || 500,
                height: height || 500,
            },
        };

        adapterRef.current = new RadialBarChartAdapter(svgRef.current, chartConfig);
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
                width: width || 500,
                height: height || 500,
            },
        });
    }, [config, width, height]);

    return <svg ref={svgRef} className={className} />;
};
