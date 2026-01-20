/**
 * Core types for D3.js visualization service
 */

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
  formatter?: (data: any) => string;
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
  curve?: 'linear' | 'cardinal' | 'monotone' | 'step';
}

// Bar Chart
export interface BarChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartConfig extends BaseChartConfig {
  data: BarChartDataPoint[];
  orientation?: 'vertical' | 'horizontal';
  mode?: 'grouped' | 'stacked';
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
  projection?: 'mercator' | 'albersUsa' | 'equalEarth';
  showLabels?: boolean;
}

// Default theme based on Elbruso design system
export const DEFAULT_THEME: ChartTheme = {
  primaryColor: '#1A73E8',
  secondaryColor: '#4285F4',
  successColor: '#34A853',
  errorColor: '#EA4335',
  warningColor: '#FBBC05',
  textColor: '#424242',
  backgroundColor: '#FFFFFF',
  gridColor: '#E0E0E0',
  fontFamily: 'Inter, sans-serif',
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
  easing: 'cubic-in-out',
};
