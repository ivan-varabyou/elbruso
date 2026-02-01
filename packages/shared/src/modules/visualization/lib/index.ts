// Visualization adapters and types
// Re-export from ui components

export type { AreaChartConfig } from "./adapters/AreaChartAdapter";
export type { BarChartConfig } from "./adapters/BarChartAdapter";
export type { BoxPlotConfig } from "./adapters/BoxPlotAdapter";
export type { BubbleChartConfig } from "./adapters/BubbleChartAdapter";
export type { BubbleMapConfig } from "./adapters/BubbleMapAdapter";
export type { CalendarHeatmapConfig } from "./adapters/CalendarHeatmapAdapter";
export type { CandlestickConfig } from "./adapters/CandlestickAdapter";
export type { ChordConfig } from "./adapters/ChordAdapter";
export type { ChoroplethMapConfig } from "./adapters/ChoroplethMapAdapter";
export type { CorrelationMatrixConfig } from "./adapters/CorrelationMatrixAdapter";
export type { ForceDirectedGraphConfig } from "./adapters/ForceDirectedGraphAdapter";
export type { GanttConfig } from "./adapters/GanttAdapter";
export type { GeoHeatMapConfig } from "./adapters/GeoHeatMapAdapter";
export type { GroupedBarChartConfig } from "./adapters/GroupedBarChartAdapter";
export type { HeatmapConfig } from "./adapters/HeatmapAdapter";
export type { HistogramConfig } from "./adapters/HistogramAdapter";
export type { LineChartConfig } from "./adapters/LineChartAdapter";
export type { ParallelCoordinatesConfig } from "./adapters/ParallelCoordinatesAdapter";
export type { PieChartConfig } from "./adapters/PieChartAdapter";
export type { RadarChartConfig } from "./adapters/RadarChartAdapter";
export type { RadialBarChartConfig } from "./adapters/RadialBarChartAdapter";
export type { RidgelinePlotConfig } from "./adapters/RidgelinePlotAdapter";
export type { SankeyConfig } from "./adapters/SankeyAdapter";
export type { ScatterChartConfig } from "./adapters/ScatterPlotAdapter";
export type { StackedBarChartConfig } from "./adapters/StackedBarChartAdapter";
export type { StreamGraphConfig } from "./adapters/StreamGraphAdapter";
export type { SunburstConfig } from "./adapters/SunburstAdapter";
export type { ViolinPlotConfig } from "./adapters/ViolinPlotAdapter";
export type { WaterfallChartConfig } from "./adapters/WaterfallChartAdapter";

export const DEMO_DATA = {
  lineChart: [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 35 },
    { label: "Apr", value: 55 },
    { label: "May", value: 48 },
    { label: "Jun", value: 65 },
  ],
  barChart: [
    { label: "Q1", value: 120 },
    { label: "Q2", value: 150 },
    { label: "Q3", value: 180 },
    { label: "Q4", value: 200 },
  ],
  pieChart: [
    { label: "Category A", value: 30 },
    { label: "Category B", value: 25 },
    { label: "Category C", value: 45 },
  ],
  areaChart: [
    { label: "Mon", value: 30 },
    { label: "Tue", value: 45 },
    { label: "Wed", value: 35 },
    { label: "Thu", value: 55 },
    { label: "Fri", value: 48 },
    { label: "Sat", value: 65 },
    { label: "Sun", value: 72 },
  ],
  groupedBarChart: [
    { label: "Q1", teamA: 120, teamB: 100 },
    { label: "Q2", teamA: 150, teamB: 130 },
    { label: "Q3", teamA: 180, teamB: 160 },
    { label: "Q4", teamA: 200, teamB: 190 },
  ],
  stackedBarChart: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [
      { name: "Training", data: [2, 3, 2, 4, 3, 2, 1] },
      { name: "Games", data: [1, 0, 2, 1, 1, 3, 0] },
      { name: "Rest", data: [4, 4, 3, 2, 3, 2, 6] },
    ],
  },
  streamGraph: [
    { label: "Week 1", value: 30, value2: 45, value3: 35 },
    { label: "Week 2", value: 45, value2: 55, value3: 48 },
    { label: "Week 3", value: 35, value2: 40, value3: 52 },
    { label: "Week 4", value: 55, value2: 60, value3: 45 },
    { label: "Week 5", value: 48, value2: 50, value3: 58 },
    { label: "Week 6", value: 65, value2: 70, value3: 62 },
  ],
  radialBarChart: [
    { label: "Speed", value: 75 },
    { label: "Strength", value: 60 },
    { label: "Endurance", value: 85 },
    { label: "Flexibility", value: 45 },
  ],
};
