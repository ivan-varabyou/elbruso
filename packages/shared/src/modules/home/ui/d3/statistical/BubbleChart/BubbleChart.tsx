'use client';

import React, { useEffect, useRef } from 'react';
import { BubbleChartAdapter } from '@/shared/lib/visualization/adapters/BubbleChartAdapter';
import { BubbleChartConfig } from '@/shared/lib/visualization';

interface BubbleChartProps extends Omit<BubbleChartConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const BubbleChart: React.FC<BubbleChartProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<BubbleChartAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: BubbleChartConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new BubbleChartAdapter(svgRef.current, chartConfig);
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
