'use client';

import React, { useEffect, useRef } from 'react';
import { ChoroplethMapAdapter } from '@/shared/lib/visualization/adapters/ChoroplethMapAdapter';
import { ChoroplethMapConfig } from '@/shared/lib/visualization';

interface ChoroplethMapProps extends Omit<ChoroplethMapConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const ChoroplethMap: React.FC<ChoroplethMapProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<ChoroplethMapAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: ChoroplethMapConfig = {
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 600,
            },
        };

        adapterRef.current = new ChoroplethMapAdapter(svgRef.current, chartConfig);
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
                height: height || 600,
            },
        });
    }, [config, width, height]);

    return <svg ref={svgRef} className={className} />;
};
