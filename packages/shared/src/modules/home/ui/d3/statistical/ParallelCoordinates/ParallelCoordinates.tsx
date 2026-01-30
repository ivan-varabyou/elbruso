'use client';

import React, { useEffect, useRef } from 'react';
import { ParallelCoordinatesAdapter } from '@/shared/lib/visualization/adapters/ParallelCoordinatesAdapter';
import { ParallelCoordinatesConfig } from '@/shared/lib/visualization';

interface ParallelCoordinatesProps extends Omit<ParallelCoordinatesConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const ParallelCoordinates: React.FC<ParallelCoordinatesProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<ParallelCoordinatesAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: ParallelCoordinatesConfig = {
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 400,
            },
        };

        adapterRef.current = new ParallelCoordinatesAdapter(svgRef.current, chartConfig);
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
