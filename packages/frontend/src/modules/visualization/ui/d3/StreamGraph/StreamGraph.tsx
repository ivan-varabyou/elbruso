'use client';

import { StreamGraphConfig } from '@frontend/modules/visualization/lib';
import { StreamGraphAdapter } from '@frontend/modules/visualization/lib/adapters/StreamGraphAdapter';
import React, { useEffect, useRef } from 'react';

interface StreamGraphProps extends Omit<StreamGraphConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const StreamGraph: React.FC<StreamGraphProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<StreamGraphAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: StreamGraphConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new StreamGraphAdapter(svgRef.current, chartConfig);
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
