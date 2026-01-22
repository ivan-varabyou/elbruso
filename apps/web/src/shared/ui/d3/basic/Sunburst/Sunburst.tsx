'use client';

import React, { useEffect, useRef } from 'react';
import { SunburstAdapter } from '@/shared/lib/visualization/adapters/SunburstAdapter';
import { SunburstConfig } from '@/shared/lib/visualization/types';

interface SunburstProps extends Omit<SunburstConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const Sunburst: React.FC<SunburstProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<SunburstAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: SunburstConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 600,
            },
        };

        adapterRef.current = new SunburstAdapter(svgRef.current, chartConfig);
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
                height: height || 600,
            },
        });
    }, [config, width, height]);

    return <svg ref={svgRef} className={className} />;
};
