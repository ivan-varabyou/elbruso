'use client';

import { BubbleMapConfig } from '@elbruso/modules/visualization/lib';
import { BubbleMapAdapter } from '@elbruso/modules/visualization/lib/adapters/BubbleMapAdapter';
import React, { useEffect, useRef } from 'react';

interface BubbleMapProps extends Omit<BubbleMapConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const BubbleMap: React.FC<BubbleMapProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<BubbleMapAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: BubbleMapConfig = {
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 600,
            },
        };

        adapterRef.current = new BubbleMapAdapter(svgRef.current, chartConfig);
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
