"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface LiveSportsChartProps {
  className?: string;
}

export const LiveSportsChart = ({ className }: LiveSportsChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 150;
    const margin = { top: 10, right: 10, bottom: 20, left: 10 };

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const generateData = () => {
      return Array.from({ length: 20 }, (_, i) => ({
        x: i,
        y: Math.random() * 100,
      }));
    };

    const data = generateData();

    const x = d3.scaleLinear().domain([0, 19]).range([margin.left, width - margin.right]);
    const y = d3.scaleLinear().domain([0, 100]).range([height - margin.bottom, margin.top]);

    const line = d3.line<{ x: number; y: number }>()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .curve(d3.curveCardinal);

    const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#1A73E8")
      .attr("stroke-width", 3)
      .attr("d", line);

    // Area chart for better aesthetics
    const area = d3.area<{ x: number; y: number }>()
      .x(d => x(d.x))
      .y0(y(0))
      .y1(d => y(d.y))
      .curve(d3.curveCardinal);

    const areaPath = svg.append("path")
      .datum(data)
      .attr("fill", "url(#gradient)")
      .attr("opacity", 0.3)
      .attr("d", area);

    // Add gradient
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#1A73E8");

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 0);

    const updateChart = () => {
      data.shift();
      data.push({ x: 19, y: Math.random() * 100 });
      data.forEach((d, i) => d.x = i);

      path.datum(data)
        .transition()
        .duration(800)
        .attr("d", line);

      areaPath.datum(data)
        .transition()
        .duration(800)
        .attr("d", area);
    };

    const interval = setInterval(updateChart, 2000);

    return () => clearInterval(interval);
  }, []);

  return <svg ref={svgRef} className={className} />;
};
