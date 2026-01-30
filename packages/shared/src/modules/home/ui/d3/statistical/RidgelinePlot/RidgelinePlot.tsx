'use client';

import React, { useEffect, useRef } from 'react';
import { RidgelinePlotAdapter } from '@/shared/lib/visualization/adapters/RidgelinePlotAdapter';
import { RidgelinePlotConfig } from '@/shared/lib/visualization';

interface RidgelinePlotProps extends Omit<RidgelinePlotConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const RidgelinePlot: React.FC<RidgelinePlotProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<RidgelinePlotAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: RidgelinePlotConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new RidgelinePlotAdapter(svgRef.current, chartConfig);
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
