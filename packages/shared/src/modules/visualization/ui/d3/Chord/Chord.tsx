'use client';

import { ChordConfig } from '@elbruso/modules/visualization/lib';
import { ChordAdapter } from '@elbruso/modules/visualization/lib/adapters/ChordAdapter';
import React, { useEffect, useRef } from 'react';

interface ChordProps extends Omit<ChordConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const Chord: React.FC<ChordProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<ChordAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: ChordConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 600,
            },
        };

        adapterRef.current = new ChordAdapter(svgRef.current, chartConfig);
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
