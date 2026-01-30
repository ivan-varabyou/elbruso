'use client';

import React, { useEffect, useRef } from 'react';
import { ForceDirectedGraphAdapter } from '@/shared/lib/visualization/adapters/ForceDirectedGraphAdapter';
import { ForceDirectedGraphConfig } from '@/shared/lib/visualization';

interface ForceDirectedGraphProps extends Omit<ForceDirectedGraphConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const ForceDirectedGraph: React.FC<ForceDirectedGraphProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<ForceDirectedGraphAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: ForceDirectedGraphConfig = {
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 600,
            },
        };

        adapterRef.current = new ForceDirectedGraphAdapter(svgRef.current, chartConfig);
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
