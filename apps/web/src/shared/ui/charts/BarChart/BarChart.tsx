'use client';

import React, { useEffect, useRef } from 'react';
import { BarChartAdapter } from '@/shared/lib/visualization/adapters/BarChartAdapter';
import { BarChartConfig } from '@/shared/lib/visualization/types';

interface BarChartProps extends Omit<BarChartConfig, 'dimensions'> {
  width?: number;
  height?: number;
  className?: string;
}

export const BarChart: React.FC<BarChartProps> = ({
  width,
  height,
  className,
  ...config
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const adapterRef = useRef<BarChartAdapter | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartConfig: BarChartConfig = {
      ...config,
      dimensions: {
        width: width || 600,
        height: height || 400,
      },
    };

    adapterRef.current = new BarChartAdapter(svgRef.current, chartConfig);
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
