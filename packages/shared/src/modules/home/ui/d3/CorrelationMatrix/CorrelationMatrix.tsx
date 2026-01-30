'use client';

import React, { useEffect, useRef } from 'react';
import { CorrelationMatrixAdapter } from '@/shared/lib/visualization/adapters/CorrelationMatrixAdapter';
import { CorrelationMatrixConfig } from '@/shared/lib/visualization';

interface CorrelationMatrixProps extends Omit<CorrelationMatrixConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<CorrelationMatrixAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: CorrelationMatrixConfig = {
            ...config,
            dimensions: {
                width: width || 500,
                height: height || 500,
            },
        };

        adapterRef.current = new CorrelationMatrixAdapter(svgRef.current, chartConfig);
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
                width: width || 500,
                height: height || 500,
            },
        });
    }, [config, width, height]);

    return <svg ref={svgRef} className={className} />;
};
