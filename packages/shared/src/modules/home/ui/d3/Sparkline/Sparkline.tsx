'use client';

import React, { useEffect, useRef } from 'react';
import { LineChartAdapter } from '@/shared/lib/visualization/adapters/LineChartAdapter';
import { LineChartConfig } from '@/shared/lib/visualization';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

/**
 * Sparkline - minimal inline chart for showing trends
 */
export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 100,
  height = 30,
  color,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const adapterRef = useRef<LineChartAdapter | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartConfig: LineChartConfig = {
      series: [
        {
          id: 'sparkline',
          name: '',
          data: data.map((y, x) => ({ x, y })),
          color: color,
          showArea: true,
        },
      ],
      showGrid: false,
      showLegend: false,
      dimensions: {
        width,
        height,
        margin: { top: 2, right: 2, bottom: 2, left: 2 },
      },
      theme: color ? { primaryColor: color } : undefined,
    };

    adapterRef.current = new LineChartAdapter(svgRef.current, chartConfig);
    adapterRef.current.init();

    return () => {
      adapterRef.current?.destroy();
    };
  }, [data, width, height, color]);

  return <svg ref={svgRef} className={className} />;
};
