/**
 * Generate demo data for visualization showcase
 */

import {
  LineChartSeries,
  BarChartDataPoint,
  PieChartDataPoint,
  AreaChartSeries,
  ScatterChartDataPoint,
} from './types';

/**
 * Generate line chart demo data - Sports performance metrics
 */
export function generateLineChartData(): LineChartSeries[] {
  return [
    {
      id: 'team-a',
      name: 'Team A Performance',
      data: Array.from({ length: 12 }, (_, i) => ({
        x: i + 1,
        y: 65 + Math.random() * 20 + i * 1.5,
      })),
      color: '#1A73E8',
      showArea: true,
    },
    {
      id: 'team-b',
      name: 'Team B Performance',
      data: Array.from({ length: 12 }, (_, i) => ({
        x: i + 1,
        y: 60 + Math.random() * 25 + i * 1.2,
      })),
      color: '#34A853',
      showArea: false,
    },
  ];
}

/**
 * Generate bar chart demo data - Team statistics
 */
export function generateBarChartData(): BarChartDataPoint[] {
  return [
    { label: 'Goals', value: 45, color: '#1A73E8' },
    { label: 'Assists', value: 32, color: '#34A853' },
    { label: 'Saves', value: 28, color: '#FBBC05' },
    { label: 'Tackles', value: 52, color: '#EA4335' },
    { label: 'Passes', value: 78, color: '#4285F4' },
  ];
}

/**
 * Generate pie chart demo data - Player position distribution
 */
export function generatePieChartData(): PieChartDataPoint[] {
  return [
    { label: 'Forwards', value: 25, color: '#1A73E8' },
    { label: 'Midfielders', value: 35, color: '#34A853' },
    { label: 'Defenders', value: 30, color: '#FBBC05' },
    { label: 'Goalkeepers', value: 10, color: '#EA4335' },
  ];
}

/**
 * Generate area chart demo data - Training intensity over time
 */
export function generateAreaChartData(): AreaChartSeries[] {
  return [
    {
      id: 'cardio',
      name: 'Cardio',
      data: Array.from({ length: 10 }, (_, i) => ({
        x: i,
        y: 30 + Math.random() * 15,
      })),
      color: '#1A73E8',
    },
    {
      id: 'strength',
      name: 'Strength',
      data: Array.from({ length: 10 }, (_, i) => ({
        x: i,
        y: 25 + Math.random() * 12,
      })),
      color: '#34A853',
    },
    {
      id: 'flexibility',
      name: 'Flexibility',
      data: Array.from({ length: 10 }, (_, i) => ({
        x: i,
        y: 20 + Math.random() * 10,
      })),
      color: '#FBBC05',
    },
  ];
}

/**
 * Generate scatter chart demo data - Player performance metrics
 */
export function generateScatterChartData(): ScatterChartDataPoint[] {
  return Array.from({ length: 30 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 5 + Math.random() * 15,
    label: `Player ${i + 1}`,
    color: ['#1A73E8', '#34A853', '#FBBC05', '#EA4335'][Math.floor(Math.random() * 4)],
  }));
}

/**
 * Generate radar chart demo data - Player skills profile
 */
export function generateRadarChartData() {
  return [
    {
      id: 'player-1',
      name: 'Player A',
      data: [
        { axis: 'Speed', value: 85 },
        { axis: 'Strength', value: 72 },
        { axis: 'Stamina', value: 90 },
        { axis: 'Technique', value: 78 },
        { axis: 'Tactics', value: 82 },
        { axis: 'Mentality', value: 88 },
      ],
      color: '#1A73E8',
    },
    {
      id: 'player-2',
      name: 'Player B',
      data: [
        { axis: 'Speed', value: 78 },
        { axis: 'Strength', value: 88 },
        { axis: 'Stamina', value: 75 },
        { axis: 'Technique', value: 92 },
        { axis: 'Tactics', value: 85 },
        { axis: 'Mentality', value: 80 },
      ],
      color: '#34A853',
    },
  ];
}

/**
 * Generate realistic sports analytics data
 */
export const DEMO_DATA = {
  lineChart: generateLineChartData(),
  barChart: generateBarChartData(),
  pieChart: generatePieChartData(),
  areaChart: generateAreaChartData(),
  scatterChart: generateScatterChartData(),
  radarChart: generateRadarChartData(),
};
