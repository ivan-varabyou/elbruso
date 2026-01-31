import * as d3 from "d3";
import { BaseChartAdapter } from "./BaseChartAdapter";
import { StreamGraphConfig, StreamGraphSeries } from "../../../types/visualization";

interface StreamStackDataPoint {
  x: number;
  [key: string]: number | string;
}

export class StreamGraphAdapter extends BaseChartAdapter<StreamGraphConfig> {
  protected render(): void {
    if (!this.g || !this.config.series || !this.config.series.length) return;

    const { width, height } = this.getInnerDimensions();
    const { series, offset = "wiggle", order = "insideOut" } = this.config;

    const allXValues: number[] = Array.from(
      new Set<number>(
        series.flatMap((s: StreamGraphSeries) =>
          s.data.map((d: { x: number | Date; y: number }) => Number(d.x)),
        ),
      ),
    ).sort((a: number, b: number) => a - b);

    const stackData: StreamStackDataPoint[] = allXValues.map((x: number) => {
      const obj: StreamStackDataPoint = { x };
      series.forEach((s: StreamGraphSeries) => {
        const point = s.data.find((d: { x: number | Date; y: number }) => Number(d.x) === x);
        obj[s.id] = point ? point.y : 0;
      });
      return obj;
    });

    const stack = d3
      .stack<StreamStackDataPoint>()
      .keys(series.map((s: StreamGraphSeries) => s.id))
      .offset(
        offset === "wiggle"
          ? d3.stackOffsetWiggle
          : offset === "silhouette"
            ? d3.stackOffsetSilhouette
            : offset === "expand"
              ? d3.stackOffsetExpand
              : d3.stackOffsetNone,
      )
      .order(
        order === "insideOut"
          ? d3.stackOrderInsideOut
          : order === "ascending"
            ? d3.stackOrderAscending
            : order === "descending"
              ? d3.stackOrderDescending
              : d3.stackOrderNone,
      );

    const stackedData = stack(stackData);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(allXValues) as [number, number])
      .range([0, width]);

    const allYValues: number[] = [];
    stackedData.forEach((layer) => {
      layer.forEach((d) => {
        allYValues.push(d[0], d[1]);
      });
    });
    const yExtent = d3.extent(allYValues) as [number, number];
    const yScale = d3.scaleLinear().domain(yExtent).range([height, 0]);

    this.g.selectAll("*").remove();

    stackedData.forEach((seriesData, seriesIndex: number) => {
      const seriesConfig = series[seriesIndex];
      const color = seriesConfig.color || this.theme.primaryColor;

      const path = this.g!.append("path")
        .datum(seriesData)
        .attr("fill", color)
        .attr("opacity", 0.8)
        .attr(
          "d",
          d3
            .area<number[]>()
            .x((_d: number[], i: number) => xScale(stackData[i].x))
            .y0((d: number[]) => yScale(d[0]))
            .y1((d: number[]) => yScale(d[1]))
            .curve(d3.curveBasis),
        );

      const totalLength = (path.node() as SVGPathElement).getTotalLength();
      path
        .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(this.animation.duration)
        .delay(seriesIndex * 50)
        .attr("stroke-dashoffset", 0)
        .on("end", function (this: SVGPathElement) {
          d3.select(this).attr("stroke-dasharray", "none");
        });

      path
        .on("mouseenter", function (this: SVGPathElement) {
          d3.select(this).transition().duration(200).attr("opacity", 1);
        })
        .on("mouseleave", function (this: SVGPathElement) {
          d3.select(this).transition().duration(200).attr("opacity", 0.8);
        });
    });

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
