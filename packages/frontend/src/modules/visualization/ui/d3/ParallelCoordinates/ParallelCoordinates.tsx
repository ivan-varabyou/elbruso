'use client';

import { ParallelCoordinatesConfig } from '@frontend/modules/visualization/lib';
import { ParallelCoordinatesAdapter } from '@frontend/modules/visualization/lib/adapters/ParallelCoordinatesAdapter';
import React, { useEffect, useRef } from 'react';

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
