import * as d3 from "d3";
import { BaseChartAdapter } from "./BaseChartAdapter";
import { StackedBarChartConfig, StackedBarChartSeries } from "../../../types/visualization";

interface StackedDataPoint {
  category: string;
  [key: string]: string | number;
}

export class StackedBarChartAdapter extends BaseChartAdapter<StackedBarChartConfig> {
  protected render(): void {
    if (!this.g || !this.config.series || !this.config.series.length) return;

    const { width, height } = this.getInnerDimensions();
    const { series, categories, orientation = "vertical", showValues = false } = this.config;

    const stackData: StackedDataPoint[] = categories.map((category: string, i: number) => {
      const obj: StackedDataPoint = { category };
      series.forEach((s: StackedBarChartSeries) => {
        obj[s.id] = s.values[i] ?? 0;
      });
      return obj;
    });

    const stack = d3.stack<StackedDataPoint>().keys(series.map((s: StackedBarChartSeries) => s.id));

    const stackedData = stack(stackData);

    const isVertical = orientation === "vertical";

    const xScale = d3.scaleBand<string>().domain(categories).range([0, width]).padding(0.2);

    const maxValue =
      d3.max(stackedData[stackedData.length - 1] ?? [], (d: readonly number[]) => d[1]) ?? 0;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue * 1.1])
      .range([height, 0]);

    this.g.selectAll("*").remove();

    if (isVertical) {
      this.g
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("fill", this.theme.textColor);

      this.g
        .append("g")
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .attr("fill", this.theme.textColor);
    }

    if (this.config.showGrid !== false) {
      this.g
        .append("g")
        .attr("class", "grid")
        .attr("opacity", 0.1)
        .call(
          d3
            .axisLeft(yScale)
            .tickSize(-width)
            .tickFormat(() => ""),
        );
    }

    stackedData.forEach((seriesData: readonly number[][], seriesIndex: number) => {
      const seriesConfig = series[seriesIndex];
      const color = seriesConfig.color || this.theme.primaryColor;

      this.g!.selectAll(`.bar-${seriesConfig.id}`)
        .data(seriesData)
        .join("rect")
        .attr("class", `bar-${seriesConfig.id}`)
        .attr("x", (_d: readonly number[], i: number) => xScale(stackData[i].category) ?? 0)
        .attr("y", height)
        .attr("width", xScale.bandwidth())
        .attr("height", 0)
        .attr("fill", color)
        .attr("rx", seriesIndex === stackedData.length - 1 ? 4 : 0)
        .transition()
        .duration(this.animation.duration)
        .delay(seriesIndex * 100)
        .attr("y", (d: readonly number[]) => yScale(d[1]))
        .attr("height", (d: readonly number[]) => yScale(d[0]) - yScale(d[1]));
    });

    if (this.config.showLegend !== false) {
      const legend = this.g
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 120}, 0)`);

      series.forEach((seriesData: StackedBarChartSeries, i: number) => {
        const legendRow = legend.append("g").attr("transform", `translate(0, ${i * 20})`);

        legendRow
          .append("rect")
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", seriesData.color || this.theme.primaryColor)
          .attr("rx", 2);

        legendRow
          .append("text")
          .attr("x", 18)
          .attr("y", 10)
          .attr("fill", this.theme.textColor)
          .attr("font-size", "12px")
          .text(seriesData.name);
      });
    }

    if (this.config.xAxisLabel) {
      this.g
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 35)
        .attr("text-anchor", "middle")
        .attr("fill", this.theme.textColor)
        .text(this.config.xAxisLabel);
    }

    if (this.config.yAxisLabel) {
      this.g
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .attr("fill", this.theme.textColor)
        .text(this.config.yAxisLabel);
    }
  }
}
