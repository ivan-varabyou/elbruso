import * as d3 from "d3";
import { BaseChartAdapter } from "./BaseChartAdapter";
import { AreaChartConfig, AreaChartDataPoint } from "@/shared/visualization";
import { addGridLines, formatNumber } from "../utils";

/**
 * Area chart adapter using D3
 * Supports single and multi-series stacked areas
 */
export class AreaChartAdapter extends BaseChartAdapter<AreaChartConfig> {
  protected render(): void {
    if (!this.g) return;

    const { width, height } = this.getInnerDimensions();
    const { series, showGrid, stacked = false } = this.config;

    // Clear previous render
    this.g.selectAll("*").remove();

    // Prepare data
    const allData: AreaChartDataPoint[] = series.flatMap((s) => s.data);

    // Create scales
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allData, (d: AreaChartDataPoint) => d.x as number) as [number, number])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(allData, (d: AreaChartDataPoint) => d.y) || 100])
      .nice()
      .range([height, 0]);

    // Add grid if enabled
    if (showGrid) {
      addGridLines(this.g, xScale, yScale, width, height, this.theme);
    }

    // Create area generator
    const areaGenerator = d3
      .area<AreaChartDataPoint>()
      .x((d) => xScale(d.x as number))
      .y0(() => height)
      .y1((d) => yScale(d.y))
      .curve(d3.curveCardinal);

    // Render each series
    series.forEach((s, index: number) => {
      const color = s.color || this.theme.primaryColor;

      // Create gradient for area fill
      const gradientId = `area-gradient-${s.id}`;
      const defs = this.svg!.select("defs").empty()
        ? this.svg!.append("defs")
        : this.svg!.select("defs");

      const gradient = defs
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.6);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0.1);

      // Render area
      const path = this.g!.append("path")
        .datum(s.data)
        .attr("class", `area area-${s.id}`)
        .attr("fill", `url(#${gradientId})`)
        .attr("d", areaGenerator);

      // Animate area drawing
      if (this.animation.enabled) {
        path.attr("opacity", 0).transition().duration(this.animation.duration).attr("opacity", 1);
      }

      // Add line on top of area
      const lineGenerator = d3
        .line<AreaChartDataPoint>()
        .x((d) => xScale(d.x as number))
        .y((d) => yScale(d.y))
        .curve(d3.curveCardinal);

      this.g!.append("path")
        .datum(s.data)
        .attr("class", `line line-${s.id}`)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", lineGenerator);
    });

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat((d: d3.NumberValue) => formatNumber(d.valueOf()));

    this.g
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .style("color", this.theme.textColor)
      .style("font-family", this.theme.fontFamily);

    this.g
      .append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      .style("color", this.theme.textColor)
      .style("font-family", this.theme.fontFamily);

    // Add axis labels
    if (this.config.xAxisLabel) {
      this.g
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + 35)
        .attr("text-anchor", "middle")
        .style("fill", this.theme.textColor)
        .style("font-family", this.theme.fontFamily)
        .style("font-size", "12px")
        .text(this.config.xAxisLabel);
    }

    if (this.config.yAxisLabel) {
      this.g
        .append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .style("fill", this.theme.textColor)
        .style("font-family", this.theme.fontFamily)
        .style("font-size", "12px")
        .text(this.config.yAxisLabel);
    }
  }
}
