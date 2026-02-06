"use client";

import {
  PieChartAdapter,
  PieChartConfig,
} from "@frontend/modules/visualization/lib/adapters/PieChartAdapter";
import React, { useEffect, useRef } from "react";

interface DonutChartProps extends Omit<PieChartConfig, "dimensions" | "innerRadius"> {
  width?: number;
  height?: number;
  innerRadius?: number;
  className?: string;
}

/**
 * DonutChart is a specialized PieChart with a default inner radius
 */
export const DonutChart: React.FC<DonutChartProps> = ({
  width,
  height,
  innerRadius = 60,
  className,
  ...config
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const adapterRef = useRef<PieChartAdapter | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartConfig: PieChartConfig = {
      ...config,
      innerRadius,
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
      innerRadius,
      dimensions: {
        width: width || 400,
        height: height || 400,
      },
    });
  }, [config, width, height, innerRadius]);

  return <svg ref={svgRef} className={className} />;
};
