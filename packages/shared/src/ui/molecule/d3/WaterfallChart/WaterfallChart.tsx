'use client';

import React, { useEffect, useRef } from 'react';
import { WaterfallChartAdapter } from '@/shared/lib/visualization/adapters/WaterfallChartAdapter';
import { WaterfallChartConfig } from '@/shared/lib/visualization/types';

interface WaterfallChartProps extends Omit<WaterfallChartConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const WaterfallChart: React.FC<WaterfallChartProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<WaterfallChartAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: WaterfallChartConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new WaterfallChartAdapter(svgRef.current, chartConfig);
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
