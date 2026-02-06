'use client';

import { ViolinPlotConfig } from '@frontend/modules/visualization/lib';
import { ViolinPlotAdapter } from '@frontend/modules/visualization/lib/adapters/ViolinPlotAdapter';
import React, { useEffect, useRef } from 'react';

interface ViolinPlotProps extends Omit<ViolinPlotConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const ViolinPlot: React.FC<ViolinPlotProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<ViolinPlotAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: ViolinPlotConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new ViolinPlotAdapter(svgRef.current, chartConfig);
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
