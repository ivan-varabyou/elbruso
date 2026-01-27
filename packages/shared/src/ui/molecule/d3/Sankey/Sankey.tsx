'use client';

import React, { useEffect, useRef } from 'react';
import { SankeyAdapter } from '@/shared/lib/visualization/adapters/SankeyAdapter';
import { SankeyConfig } from '@/shared/lib/visualization/types';

interface SankeyProps extends Omit<SankeyConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const Sankey: React.FC<SankeyProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<SankeyAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: SankeyConfig = {
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 600,
            },
        };

        adapterRef.current = new SankeyAdapter(svgRef.current, chartConfig);
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
