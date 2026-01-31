import * as d3 from "d3";
import { BaseChartAdapter } from "./BaseChartAdapter";
import { BarChartDataPoint, ChartTheme } from "../../../types/visualization";
import { showTooltip, hideTooltip, formatNumber } from "../utils";

interface HistogramConfig {
  data: BarChartDataPoint[];
  dimensions?: {
    width?: number;
    height?: number;
    margin?: { top: number; right: number; bottom: number; left: number };
  };
  theme?: Partial<ChartTheme>;
  animation?: {
    enabled: boolean;
    duration: number;
  };
}

export class HistogramAdapter extends BaseChartAdapter<HistogramConfig> {
  protected render(): void {
    if (!this.g || !this.config.data) return;

    const { width, height } = this.getInnerDimensions();
    const { data } = this.config;

    this.g.selectAll("*").remove();

    const values: number[] = data.map((d: BarChartDataPoint) => d.value);

    const histogram = d3
      .bin<number, number>()
      .domain([d3.min(values) ?? 0, d3.max(values) ?? 100])
      .thresholds(20);

    const bins = histogram(values);

    const xMin = bins[0]?.x0 ?? 0;
    const xMax = bins[bins.length - 1]?.x1 ?? 100;
    const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d: d3.Bin<number, number>) => d.length) ?? 10])
      .nice()
      .range([height, 0]);

    this.g!.selectAll(".bar")
      .data(bins)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: d3.Bin<number, number>) => xScale(d.x0 ?? 0))
      .attr("width", (d: d3.Bin<number, number>) =>
        Math.max(0, xScale(d.x1 ?? 0) - xScale(d.x0 ?? 0) - 1),
      )
      .attr("y", height)
      .attr("height", 0)
      .attr("fill", this.theme.primaryColor)
      .attr("rx", 2)
      .style("cursor", "pointer")
      .on("mouseover", (event: MouseEvent, d: d3.Bin<number, number>) => {
        if (this.tooltip) {
          const content = `Range: ${formatNumber(d.x0 ?? 0)} - ${formatNumber(d.x1 ?? 0)}<br/>Count: ${d.length}`;
          showTooltip(this.tooltip, content, event);
        }
        d3.select(event.currentTarget as Element).attr("opacity", 0.8);
      })
      .on("mouseout", (event: MouseEvent) => {
        if (this.tooltip) {
          hideTooltip(this.tooltip);
        }
        d3.select(event.currentTarget as Element).attr("opacity", 1);
      })
      .transition()
      .duration(this.animation.enabled ? this.animation.duration : 0)
      .attr("y", (d: d3.Bin<number, number>) => yScale(d.length))
      .attr("height", (d: d3.Bin<number, number>) => height - yScale(d.length));

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d: d3.NumberValue) => formatNumber(d.valueOf()));
    const yAxis = d3.axisLeft(yScale);

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
  }
}
