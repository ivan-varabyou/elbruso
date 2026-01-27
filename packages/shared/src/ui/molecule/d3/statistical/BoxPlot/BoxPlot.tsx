'use client';

import React, { useEffect, useRef } from 'react';
import { BoxPlotAdapter } from '@/shared/lib/visualization/adapters/BoxPlotAdapter';
import { BoxPlotConfig } from '@/shared/lib/visualization';

interface BoxPlotProps extends Omit<BoxPlotConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const BoxPlot: React.FC<BoxPlotProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<BoxPlotAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: BoxPlotConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new BoxPlotAdapter(svgRef.current, chartConfig);
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
