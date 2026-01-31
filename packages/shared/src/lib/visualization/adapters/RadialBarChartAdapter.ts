import * as d3 from "d3";
import { BaseChartAdapter } from "./BaseChartAdapter";
import { RadialBarChartConfig, RadialBarDataPoint } from "../../../types/visualization";

export class RadialBarChartAdapter extends BaseChartAdapter<RadialBarChartConfig> {
  protected render(): void {
    if (!this.g || !this.config.data || !this.config.data.length) return;

    const { width, height } = this.getInnerDimensions();
    const {
      data,
      innerRadius = 60,
      outerRadius = Math.min(width, height) / 2 - 20,
      startAngle = 0,
      endAngle = 2 * Math.PI,
      showLabels = true,
      showValues = true,
    } = this.config;

    this.g.selectAll("*").remove();

    const centerG = this.g.append("g").attr("transform", `translate(${width / 2},${height / 2})`);

    const angleScale = d3
      .scaleBand<string>()
      .domain(data.map((d: RadialBarDataPoint) => d.label))
      .range([startAngle, endAngle])
      .padding(0.1);

    const maxValue = d3.max(data, (d: RadialBarDataPoint) => d.value) ?? 0;
    const radiusScale = d3.scaleLinear().domain([0, maxValue]).range([innerRadius, outerRadius]);

    const arc = d3
      .arc<RadialBarDataPoint>()
      .innerRadius(innerRadius)
      .outerRadius((d: RadialBarDataPoint) => radiusScale(d.value))
      .startAngle((d: RadialBarDataPoint) => angleScale(d.label) ?? 0)
      .endAngle((d: RadialBarDataPoint) => (angleScale(d.label) ?? 0) + angleScale.bandwidth())
      .padAngle(0.02)
      .cornerRadius(4);

    centerG
      .selectAll(".track")
      .data(data)
      .join("path")
      .attr("class", "track")
      .attr("fill", this.theme.gridColor)
      .attr("opacity", 0.2)
      .attr("d", (d: RadialBarDataPoint) => {
        const trackArc = d3
          .arc<RadialBarDataPoint>()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(angleScale(d.label) ?? 0)
          .endAngle((angleScale(d.label) ?? 0) + angleScale.bandwidth())
          .padAngle(0.02)
          .cornerRadius(4);
        return trackArc(d) ?? "";
      });

    const bars = centerG
      .selectAll(".bar")
      .data(data)
      .join("path")
      .attr("class", "bar")
      .attr("fill", (d: RadialBarDataPoint) => d.color || this.theme.primaryColor)
      .attr("opacity", 0)
      .attr("d", arc);

    bars
      .transition()
      .duration(this.animation.duration)
      .delay((_: RadialBarDataPoint, i: number) => i * 50)
      .attr("opacity", 1)
      .attrTween("d", (d: RadialBarDataPoint) => {
        const interpolate = d3.interpolate(0, d.value);
        return (t: number) => {
          const tempData = { ...d, value: interpolate(t) };
          return arc(tempData) ?? "";
        };
      });

    const self = this;
    bars
      .on("mouseenter", (event: PointerEvent, d: RadialBarDataPoint) => {
        d3.select(event.currentTarget as Element)
          .transition()
          .duration(200)
          .attr("opacity", 0.8);

        if (self.tooltip) {
          self.tooltip
            .style("opacity", 1)
            .html(`<strong>${d.label}</strong><br/>Value: ${d.value}`);
        }
      })
      .on("mousemove", (event: PointerEvent) => {
        if (self.tooltip) {
          self.tooltip.style("left", `${event.pageX + 10}px`).style("top", `${event.pageY - 10}px`);
        }
      })
      .on("mouseleave", (event: PointerEvent) => {
        d3.select(event.currentTarget as Element)
          .transition()
          .duration(200)
          .attr("opacity", 1);

        if (self.tooltip) {
          self.tooltip.style("opacity", 0);
        }
      });

    if (showLabels) {
      centerG
        .selectAll(".label")
        .data(data)
        .join("text")
        .attr("class", "label")
        .attr("transform", (d: RadialBarDataPoint) => {
          const angle = (angleScale(d.label) ?? 0) + angleScale.bandwidth() / 2;
          const radius = outerRadius + 20;
          const x = Math.cos(angle - Math.PI / 2) * radius;
          const y = Math.sin(angle - Math.PI / 2) * radius;
          return `translate(${x},${y})`;
        })
        .attr("text-anchor", (d: RadialBarDataPoint) => {
          const angle = (angleScale(d.label) ?? 0) + angleScale.bandwidth() / 2;
          return angle > Math.PI ? "end" : "start";
        })
        .attr("fill", this.theme.textColor)
        .attr("font-size", "12px")
        .attr("opacity", 0)
        .text((d: RadialBarDataPoint) => d.label)
        .transition()
        .duration(this.animation.duration)
        .delay((_: RadialBarDataPoint, i: number) => i * 50)
        .attr("opacity", 1);
    }

    if (showValues) {
      centerG
        .selectAll(".value")
        .data(data)
        .join("text")
        .attr("class", "value")
        .attr("transform", (d: RadialBarDataPoint) => {
          const angle = (angleScale(d.label) ?? 0) + angleScale.bandwidth() / 2;
          const radius = (innerRadius + radiusScale(d.value)) / 2;
          const x = Math.cos(angle - Math.PI / 2) * radius;
          const y = Math.sin(angle - Math.PI / 2) * radius;
          return `translate(${x},${y})`;
        })
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", "11px")
        .attr("font-weight", "bold")
        .attr("opacity", 0)
        .text((d: RadialBarDataPoint) => d.value.toString())
        .transition()
        .duration(this.animation.duration)
        .delay((_: RadialBarDataPoint, i: number) => i * 50 + this.animation.duration / 2)
        .attr("opacity", 1);
    }

    centerG
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", this.theme.textColor)
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text(`Total: ${d3.sum(data, (d: RadialBarDataPoint) => d.value)}`);
  }
}
