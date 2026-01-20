'use client';

import React, { useEffect, useRef } from 'react';
import { RadarChartAdapter, RadarChartConfig } from '@/shared/lib/visualization/adapters/RadarChartAdapter';

interface RadarChartProps extends Omit<RadarChartConfig, 'dimensions'> {
  width?: number;
  height?: number;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  width,
  height,
  className,
  ...config
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const adapterRef = useRef<RadarChartAdapter | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartConfig: RadarChartConfig = {
      ...config,
      dimensions: {
        width: width || 400,
        height: height || 400,
      },
    };

    adapterRef.current = new RadarChartAdapter(svgRef.current, chartConfig);
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
        width: width || 400,
        height: height || 400,
      },
    });
  }, [config, width, height]);

  return <svg ref={svgRef} className={className} />;
};
