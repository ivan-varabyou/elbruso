"use client";

import {
  LineChartAdapter,
  LineChartConfig,
} from "@elbruso/modules/visualization/lib/adapters/LineChartAdapter";
import React, { useEffect, useRef } from "react";

interface LineChartProps extends Omit<LineChartConfig, "dimensions"> {
  width?: number;
  height?: number;
  className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({ width, height, className, ...config }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const adapterRef = useRef<LineChartAdapter | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartConfig: LineChartConfig = {
      ...config,
      dimensions: {
        width: width || 600,
        height: height || 400,
      },
    };

    adapterRef.current = new LineChartAdapter(svgRef.current, chartConfig);
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
