'use client';

import React, { useEffect, useRef } from 'react';
import { CandlestickAdapter } from '@/shared/lib/visualization/adapters/CandlestickAdapter';
import { CandlestickConfig } from '@/shared/lib/visualization/types';

interface CandlestickProps extends Omit<CandlestickConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const Candlestick: React.FC<CandlestickProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<CandlestickAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: CandlestickConfig = {
            ...config,
            dimensions: {
                width: width || 800,
                height: height || 400,
            },
        };

        adapterRef.current = new CandlestickAdapter(svgRef.current, chartConfig);
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
