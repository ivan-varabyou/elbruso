'use client';

import React, { useEffect, useRef } from 'react';
import { GroupedBarChartAdapter } from '@/shared/lib/visualization/adapters/GroupedBarChartAdapter';
import { GroupedBarChartConfig } from '@/shared/lib/visualization/types';

interface GroupedBarChartProps extends Omit<GroupedBarChartConfig, 'dimensions'> {
    width?: number;
    height?: number;
    className?: string;
}

export const GroupedBarChart: React.FC<GroupedBarChartProps> = ({
    width,
    height,
    className,
    ...config
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const adapterRef = useRef<GroupedBarChartAdapter | null>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const chartConfig: GroupedBarChartConfig = {
            ...config,
            dimensions: {
                width: width || 600,
                height: height || 400,
            },
        };

        adapterRef.current = new GroupedBarChartAdapter(svgRef.current, chartConfig);
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
