"use client";

import {
  PieChartAdapter,
  PieChartConfig,
} from "@elbruso/modules/visualization/lib/adapters/PieChartAdapter";
import React, { useEffect, useRef } from "react";

interface PieChartProps extends Omit<PieChartConfig, "dimensions"> {
  width?: number;
  height?: number;
  className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({ width, height, className, ...config }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const adapterRef = useRef<PieChartAdapter | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartConfig: PieChartConfig = {
      ...config,
      dimensions: {
        width: width || 400,
        height: height || 400,
      },
    };

    adapterRef.current = new PieChartAdapter(svgRef.current, chartConfig);
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
