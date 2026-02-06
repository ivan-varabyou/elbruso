/**
 * Core types for D3.js visualization service
 */

import type { GeoJSON as GeoJSONType } from "geojson";

export interface ChartDimensions {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export interface ChartTheme {
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  errorColor: string;
  warningColor: string;
  textColor: string;
  backgroundColor: string;
  gridColor: string;
  fontFamily: string;
}

export interface TooltipConfig {
  enabled: boolean;
  formatter?: (data: unknown) => string;
  className?: string;
}

export interface AnimationConfig {
  enabled: boolean;
  duration: number;
  easing?: string;
}

export interface BaseChartConfig {
  dimensions?: Partial<ChartDimensions>;
  theme?: Partial<ChartTheme>;
  tooltip?: TooltipConfig;
  animation?: AnimationConfig;
  responsive?: boolean;
  className?: string;
}

// Line Chart
export interface LineChartDataPoint {
  x: number | Date;
  y: number;
}

export interface LineChartSeries {
  id: string;
  name: string;
  data: LineChartDataPoint[];
  color?: string;
  showArea?: boolean;
}

export interface LineChartConfig extends BaseChartConfig {
  series: LineChartSeries[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  showLegend?: boolean;
  curve?: "linear" | "cardinal" | "monotone" | "step";
}

// Bar Chart
export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartConfig extends BaseChartConfig {
  data: BarChartDataPoint[];
  orientation?: "vertical" | "horizontal";
  mode?: "grouped" | "stacked";
  xAxisLabel?: string;
  yAxisLabel?: string;
  showValues?: boolean;
}

// Pie Chart
export interface PieChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartConfig extends BaseChartConfig {
  data: PieChartDataPoint[];
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
  showPercentages?: boolean;
}

// Area Chart
export interface AreaChartDataPoint {
  x: number | Date;
  y: number;
}

export interface AreaChartSeries {
  id: string;
  name: string;
  data: AreaChartDataPoint[];
  color?: string;
}

export interface AreaChartConfig extends BaseChartConfig {
  series: AreaChartSeries[];
  stacked?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
}

// Scatter Chart
export interface ScatterChartDataPoint {
  x: number;
  y: number;
  size?: number;
  label?: string;
  color?: string;
}

export interface ScatterChartConfig extends BaseChartConfig {
  data: ScatterChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showTrendLine?: boolean;
  sizeScale?: [number, number];
  showGrid?: boolean;
}

// Heatmap
export interface HeatmapDataPoint {
  row: string;
  column: string;
  value: number;
}

export interface HeatmapConfig extends BaseChartConfig {
  data: HeatmapDataPoint[];
  colorScale?: string[];
  showValues?: boolean;
  cellSize?: number;
}

// Geographic Map
export interface GeoMapDataPoint {
  id: string;
  name: string;
  value: number;
  coordinates?: [number, number];
}

export interface GeoMapConfig extends BaseChartConfig {
  data: GeoMapDataPoint[];
  geoJsonUrl?: string;
  colorScale?: string[];
  projection?: "mercator" | "albersUsa" | "equalEarth";
  showLabels?: boolean;
}

// Grouped Bar Chart
export interface GroupedBarChartSeries {
  id: string;
  name: string;
  data: BarChartDataPoint[];
  color?: string;
}

export interface GroupedBarChartConfig extends BaseChartConfig {
  series: GroupedBarChartSeries[];
  orientation?: "vertical" | "horizontal";
  xAxisLabel?: string;
  yAxisLabel?: string;
  showValues?: boolean;
  showLegend?: boolean;
  groupSpacing?: number;
  showGrid?: boolean;
}

// Stacked Bar Chart
export interface StackedBarChartSeries {
  id: string;
  name: string;
  values: number[];
  color?: string;
}

export interface StackedBarChartConfig extends BaseChartConfig {
  categories: string[];
  series: StackedBarChartSeries[];
  orientation?: "vertical" | "horizontal";
  xAxisLabel?: string;
  yAxisLabel?: string;
  showValues?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
}

// Stream Graph
export interface StreamGraphSeries {
  id: string;
  name: string;
  data: { x: number | Date; y: number }[];
  color?: string;
}

export interface StreamGraphConfig extends BaseChartConfig {
  series: StreamGraphSeries[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  offset?: "wiggle" | "silhouette" | "expand";
  order?: "none" | "ascending" | "descending" | "insideOut";
}

// Waterfall Chart
export interface WaterfallDataPoint {
  label: string;
  value: number;
  type?: "increase" | "decrease" | "total";
  color?: string;
}

export interface WaterfallChartConfig extends BaseChartConfig {
  data: WaterfallDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showConnectors?: boolean;
  showValues?: boolean;
}

// Sunburst
export interface HierarchicalNode {
  name: string;
  value?: number;
  children?: HierarchicalNode[];
  color?: string;
}

export interface SunburstConfig extends BaseChartConfig {
  data: HierarchicalNode;
  showLabels?: boolean;
  enableZoom?: boolean;
  colorScheme?: string[];
}

// Radial Bar Chart
export interface RadialBarDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface RadialBarChartConfig extends BaseChartConfig {
  data: RadialBarDataPoint[];
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  showLabels?: boolean;
  showValues?: boolean;
}

// Bubble Chart (extends Scatter with size)
export interface BubbleChartDataPoint {
  x: number;
  y: number;
  size: number;
  label?: string;
  color?: string;
  group?: string;
}

export interface BubbleChartConfig extends BaseChartConfig {
  data: BubbleChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  sizeScale?: [number, number];
  showLabels?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
}

// Box Plot
export interface BoxPlotDataPoint {
  category: string;
  values: number[];
  color?: string;
}

export interface BoxPlotConfig extends BaseChartConfig {
  data: BoxPlotDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showOutliers?: boolean;
  showMean?: boolean;
  orientation?: "vertical" | "horizontal";
}

// Violin Plot
export interface ViolinPlotDataPoint {
  category: string;
  values: number[];
  color?: string;
}

export interface ViolinPlotConfig extends BaseChartConfig {
  data: ViolinPlotDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showBox?: boolean;
  bandwidth?: number;
  orientation?: "vertical" | "horizontal";
}

// Ridgeline Plot
export interface RidgelineSeries {
  id: string;
  name: string;
  values: number[];
  color?: string;
}

export interface RidgelinePlotConfig extends BaseChartConfig {
  series: RidgelineSeries[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  overlap?: number;
  bandwidth?: number;
}

// Parallel Coordinates
export interface ParallelCoordinatesDataPoint {
  [key: string]: number | string;
}

export interface ParallelCoordinatesAxis {
  key: string;
  label: string;
  domain?: [number, number];
  type?: "linear" | "categorical";
}

export interface ParallelCoordinatesConfig extends BaseChartConfig {
  data: ParallelCoordinatesDataPoint[];
  axes: ParallelCoordinatesAxis[];
  colorBy?: string;
  showBrush?: boolean;
}

// Calendar Heatmap
export interface CalendarHeatmapDataPoint {
  date: Date | string;
  value: number;
}

export interface CalendarHeatmapConfig extends BaseChartConfig {
  data: CalendarHeatmapDataPoint[];
  colorScale?: string[];
  cellSize?: number;
  showMonthLabels?: boolean;
  showWeekdayLabels?: boolean;
}

// Correlation Matrix
export interface CorrelationMatrixConfig extends BaseChartConfig {
  data: number[][];
  labels: string[];
  colorScale?: string[];
  showValues?: boolean;
  cellSize?: number;
}

// Candlestick Chart
export interface CandlestickDataPoint {
  date: Date | string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandlestickConfig extends BaseChartConfig {
  data: CandlestickDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  showVolume?: boolean;
  upColor?: string;
  downColor?: string;
  showGrid?: boolean;
}

// Gantt Chart
export interface GanttTask {
  id: string;
  name: string;
  start: Date | string;
  end: Date | string;
  progress?: number;
  dependencies?: string[];
  color?: string;
  group?: string;
}

export interface GanttConfig extends BaseChartConfig {
  tasks: GanttTask[];
  showToday?: boolean;
  showProgress?: boolean;
  showDependencies?: boolean;
  barHeight?: number;
}

// Sankey Diagram
export interface SankeyNode {
  id: string;
  name: string;
  color?: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

export interface SankeyConfig extends BaseChartConfig {
  nodes: SankeyNode[];
  links: SankeyLink[];
  nodeWidth?: number;
  nodePadding?: number;
  showValues?: boolean;
}

// Chord Diagram
export interface ChordData {
  matrix: number[][];
  labels: string[];
  colors?: string[];
}

export interface ChordConfig extends BaseChartConfig {
  data: ChordData;
  innerRadius?: number;
  outerRadius?: number;
  showLabels?: boolean;
}

// Force-Directed Graph
export interface GraphNode {
  id: string;
  name: string;
  group?: string;
  size?: number;
  color?: string;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value?: number;
  color?: string;
}

export interface ForceDirectedGraphConfig extends BaseChartConfig {
  nodes: GraphNode[];
  links: GraphLink[];
  chargeStrength?: number;
  linkDistance?: number;
  showLabels?: boolean;
  enableDrag?: boolean;
}

// Choropleth Map (Universal geographic visualization)
export interface ChoroplethDataPoint {
  id: string;
  name: string;
  value: number;
  color?: string;
}

export interface ChoroplethMapConfig extends BaseChartConfig {
  data: ChoroplethDataPoint[];
  geoJsonUrl?: string;
  geoJson?: GeoJSONType;
  projection?: "mercator" | "albersUsa" | "albers" | "equalEarth" | "naturalEarth";
  colorScale?: string[];
  showLabels?: boolean;
  showTooltip?: boolean;
  idProperty?: string;
}

// Bubble Map (Geographic points with size)
export interface BubbleMapDataPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  value: number;
  color?: string;
}

export interface BubbleMapConfig extends BaseChartConfig {
  data: BubbleMapDataPoint[];
  geoJsonUrl?: string;
  geoJson?: GeoJSON.GeoJSON;
  projection?: "mercator" | "albersUsa" | "albers" | "equalEarth" | "naturalEarth";
  sizeScale?: [number, number];
  showLabels?: boolean;
}

// Geographic Heatmap (Density visualization on map)
export interface GeoHeatMapDataPoint {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  value: number;
}

export interface GeoHeatMapConfig extends BaseChartConfig {
  data: GeoHeatMapDataPoint[];
  geoJsonUrl?: string;
  geoJson?: GeoJSON.GeoJSON;
  projection?: "mercator" | "albersUsa" | "albers" | "equalEarth" | "naturalEarth";
  radius?: number;
  intensity?: number;
  showMap?: boolean;
}

// Default theme based on Elbruso design system
export const DEFAULT_THEME: ChartTheme = {
  primaryColor: "#1A73E8",
  secondaryColor: "#4285F4",
  successColor: "#34A853",
  errorColor: "#EA4335",
  warningColor: "#FBBC05",
  textColor: "#424242",
  backgroundColor: "#FFFFFF",
  gridColor: "#E0E0E0",
  fontFamily: "Inter, sans-serif",
};

export const DEFAULT_DIMENSIONS: ChartDimensions = {
  width: 600,
  height: 400,
  margin: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 50,
  },
};

export const DEFAULT_ANIMATION: AnimationConfig = {
  enabled: true,
  duration: 500,
  easing: "cubic-in-out",
};
