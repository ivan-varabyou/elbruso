"use client";

import React, { useEffect, useRef } from "react";
import {
  RadarChartAdapter,
  RadarChartConfig,
} from "@/shared/lib/visualization/adapters/RadarChartAdapter";

interface RadarChartProps {
  width?: number;
  height?: number;
  className?: string;
  series: RadarChartConfig["series"];
  maxValue?: RadarChartConfig["maxValue"];
  levels?: RadarChartConfig["levels"];
  showAxes?: RadarChartConfig["showAxes"];
  showLegend?: RadarChartConfig["showLegend"];
}

export const RadarChart: React.FC<RadarChartProps> = ({ width, height, className, ...config }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const adapterRef = useRef<RadarChartAdapter | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartConfig: RadarChartConfig = {
      ...config,
    };

    if (width || height) {
      (
        chartConfig as RadarChartConfig & {
          dimensions?: {
            width: number;
            height: number;
            margin: { top: number; right: number; bottom: number; left: number };
          };
        }
      ).dimensions = {
        width: width || 400,
        height: height || 400,
        margin: { top: 20, right: 20, bottom: 40, left: 50 },
      };
    }

    adapterRef.current = new RadarChartAdapter(svgRef.current, chartConfig);
    adapterRef.current.init();

    return () => {
      adapterRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!adapterRef.current) return;

    adapterRef.current.update(config);
  }, [config]);

  return <svg ref={svgRef} className={className} />;
};
