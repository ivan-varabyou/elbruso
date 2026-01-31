export type { AreaChartConfig, AreaChartDataPoint, AreaChartSeries } from "../types/visualization";

export type {
  GroupedBarChartConfig,
  GroupedBarChartSeries,
  BarChartDataPoint,
} from "../types/visualization";

export type { StackedBarChartConfig, StackedBarChartSeries } from "../types/visualization";

export type { StreamGraphConfig, StreamGraphSeries } from "../types/visualization";

export type { RadialBarChartConfig, RadialBarDataPoint } from "../types/visualization";

export type HistogramDataPoint = {
  bin: string;
  count: number;
  start: number;
  end: number;
};

export type HistogramConfig = {
  data: HistogramDataPoint[];
  binCount?: number;
  minValue?: number;
  maxValue?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showValues?: boolean;
};

export type RadarChartDataPoint = {
  axis: string;
  value: number;
};

export type RadarChartSeries = {
  id: string;
  name: string;
  data: RadarChartDataPoint[];
  color?: string;
};

export type RadarChartConfig = {
  series: RadarChartSeries[];
  levels?: number;
  maxValue?: number;
  showAxes?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
};

export { AreaChart } from "../modules/home/ui/d3/AreaChart";
export { Histogram } from "../modules/home/ui/d3/Histogram";
export { StreamGraph } from "../modules/home/ui/d3/StreamGraph";
export { RadialBarChart } from "../modules/home/ui/d3/RadialBarChart";
export { GroupedBarChart } from "../modules/home/ui/d3/GroupedBarChart";
export { StackedBarChart } from "../modules/home/ui/d3/StackedBarChart";
export { RadarChart } from "../modules/home/ui/d3/statistical/RadarChart";
