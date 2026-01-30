'use client';

import React, { useEffect, useRef } from 'react';
import { HistogramAdapter } from '@/shared/lib/visualization/adapters/HistogramAdapter';
import { BarChartConfig } from '@/shared/lib/visualization';

interface HistogramProps extends Omit<BarChartConfig, 'dimensions'> {
  width?: number;
  height?: number;
  className?: string;
}

export const Histogram: React.FC<HistogramProps> = ({
  width,
  height,
  className,
  ...config
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const adapterRef = useRef<HistogramAdapter | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartConfig: BarChartConfig = {
      ...config,
      dimensions: {
        width: width || 600,
        height: height || 400,
      },
    };

    adapterRef.current = new HistogramAdapter(svgRef.current, chartConfig);
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
