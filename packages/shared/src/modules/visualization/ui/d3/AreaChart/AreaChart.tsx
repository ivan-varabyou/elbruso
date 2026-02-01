"use client";

import {
  AreaChartAdapter,
  AreaChartConfig,
} from "@elbruso/modules/visualization/lib/adapters/AreaChartAdapter";
import React, { useEffect, useRef } from "react";

interface AreaChartProps extends Omit<AreaChartConfig, "dimensions"> {
  width?: number;
  height?: number;
  className?: string;
}

export const AreaChart: React.FC<AreaChartProps> = ({ width, height, className, ...config }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const adapterRef = useRef<AreaChartAdapter | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartConfig: AreaChartConfig = {
      ...config,
      dimensions: {
        width: width || 600,
        height: height || 400,
      },
    };

    adapterRef.current = new AreaChartAdapter(svgRef.current, chartConfig);
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
