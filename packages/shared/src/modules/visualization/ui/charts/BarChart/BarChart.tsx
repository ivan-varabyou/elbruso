"use client";

import type { BarChartConfig } from "@elbruso/modules/visualization/lib/adapters/BarChartAdapter";
import React, { useEffect, useRef } from "react";

interface BarChartProps extends Omit<BarChartConfig, "dimensions"> {
  width?: number;
  height?: number;
  className?: string;
  orientation?: "vertical" | "horizontal";
  xAxisLabel?: string;
  yAxisLabel?: string;
  showValues?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({ width, height, className, ...config }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
  }, []);

  return <svg ref={svgRef} className={className} />;
};
