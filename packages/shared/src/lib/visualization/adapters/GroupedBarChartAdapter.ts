import * as d3 from "d3";
import { BaseChartAdapter } from "./BaseChartAdapter";
import { GroupedBarChartConfig, GroupedBarChartSeries } from "../../../types/visualization";

interface GroupedDataPoint {
  label: string;
  value: number;
  color?: string;
}

export class GroupedBarChartAdapter extends BaseChartAdapter<GroupedBarChartConfig> {
  protected render(): void {
    if (!this.g || !this.config.series || !this.config.series.length) return;

    const { width, height } = this.getInnerDimensions();
    const { series, orientation = "vertical", showValues = false } = this.config;

    const categories: string[] = Array.from(
      new Set<string>(
        series.flatMap((s: GroupedBarChartSeries) => s.data.map((d: GroupedDataPoint) => d.label)),
      ),
    );

    const isVertical = orientation === "vertical";

    const x0Scale = d3.scaleBand<string>().domain(categories).range([0, width]).padding(0.2);

    const x1Scale = d3
      .scaleBand<string>()
      .domain(series.map((s: GroupedBarChartSeries) => s.id))
      .range([0, x0Scale.bandwidth()])
      .padding(0.05);

    const maxValue =
      d3.max(
        series.flatMap((s: GroupedBarChartSeries) => s.data.map((d: GroupedDataPoint) => d.value)),
      ) ?? 0;
    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue * 1.1])
      .range([height, 0]);

    this.g.selectAll("*").remove();

    if (isVertical) {
      this.g
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x0Scale))
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

    const categoryGroups = this.g
      .selectAll(".category-group")
      .data(categories)
      .join("g")
      .attr("class", "category-group")
      .attr("transform", (d: string) => `${x0Scale(d) ?? 0},0`);

    const self = this;
    series.forEach((seriesData: GroupedBarChartSeries, seriesIndex: number) => {
      const color = seriesData.color || this.theme.primaryColor;

      categoryGroups.each(function (this: SVGGElement | d3.BaseType, category: string) {
        const group = d3.select(this);
        const dataPoint = seriesData.data.find((d: GroupedDataPoint) => d.label === category);

        if (!dataPoint) return;

        const bar = group
          .append("rect")
          .attr("x", x1Scale(seriesData.id) ?? 0)
          .attr("y", height)
          .attr("width", x1Scale.bandwidth())
          .attr("height", 0)
          .attr("fill", dataPoint.color || color)
          .attr("rx", 4);

        bar
          .transition()
          .duration(self.animation.duration)
          .delay(seriesIndex * 100)
          .attr("y", yScale(dataPoint.value))
          .attr("height", height - yScale(dataPoint.value));

        if (showValues) {
          group
            .append("text")
            .attr("x", (x1Scale(seriesData.id) ?? 0) + x1Scale.bandwidth() / 2)
            .attr("y", yScale(dataPoint.value) - 5)
            .attr("text-anchor", "middle")
            .attr("fill", self.theme.textColor)
            .attr("font-size", "12px")
            .attr("opacity", 0)
            .text(dataPoint.value.toFixed(1))
            .transition()
            .duration(self.animation.duration)
            .delay(seriesIndex * 100)
            .attr("opacity", 1);
        }
      });
    });

    if (this.config.showLegend !== false) {
      const legend = this.g
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width - 120}, 0)`);

      series.forEach((seriesData: GroupedBarChartSeries, i: number) => {
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
