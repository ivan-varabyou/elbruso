/**
 * Generate demo data for visualization showcase
 */

import {
  LineChartSeries,
  BarChartDataPoint,
  PieChartDataPoint,
  AreaChartSeries,
  ScatterChartDataPoint,
} from '../../types/visualization';

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
 * Generate grouped bar chart demo data - Team comparison
 */
export function generateGroupedBarChartData() {
  return [
    {
      id: 'team-a',
      name: 'Team A',
      data: [
        { label: 'Q1', value: 45 },
        { label: 'Q2', value: 52 },
        { label: 'Q3', value: 48 },
        { label: 'Q4', value: 61 },
      ],
      color: '#1A73E8',
    },
    {
      id: 'team-b',
      name: 'Team B',
      data: [
        { label: 'Q1', value: 38 },
        { label: 'Q2', value: 45 },
        { label: 'Q3', value: 55 },
        { label: 'Q4', value: 58 },
      ],
      color: '#34A853',
    },
    {
      id: 'team-c',
      name: 'Team C',
      data: [
        { label: 'Q1', value: 42 },
        { label: 'Q2', value: 48 },
        { label: 'Q3', value: 51 },
        { label: 'Q4', value: 54 },
      ],
      color: '#FBBC05',
    },
  ];
}

/**
 * Generate stacked bar chart demo data - Training hours
 */
export function generateStackedBarChartData() {
  return {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      {
        id: 'cardio',
        name: 'Cardio',
        values: [2, 3, 2.5, 3, 2, 4, 3],
        color: '#1A73E8',
      },
      {
        id: 'strength',
        name: 'Strength',
        values: [1.5, 2, 2, 1.5, 2.5, 2, 1],
        color: '#34A853',
      },
      {
        id: 'flexibility',
        name: 'Flexibility',
        values: [1, 1, 1.5, 1, 1, 1.5, 2],
        color: '#FBBC05',
      },
    ],
  };
}

/**
 * Generate stream graph demo data - Activity over time
 */
export function generateStreamGraphData() {
  return [
    {
      id: 'running',
      name: 'Running',
      data: Array.from({ length: 20 }, (_, i) => ({
        x: i,
        y: 20 + Math.sin(i * 0.5) * 10 + Math.random() * 5,
      })),
      color: '#1A73E8',
    },
    {
      id: 'cycling',
      name: 'Cycling',
      data: Array.from({ length: 20 }, (_, i) => ({
        x: i,
        y: 15 + Math.cos(i * 0.4) * 8 + Math.random() * 4,
      })),
      color: '#34A853',
    },
    {
      id: 'swimming',
      name: 'Swimming',
      data: Array.from({ length: 20 }, (_, i) => ({
        x: i,
        y: 12 + Math.sin(i * 0.3) * 6 + Math.random() * 3,
      })),
      color: '#FBBC05',
    },
  ];
}

/**
 * Generate waterfall chart demo data - Budget analysis
 */
export function generateWaterfallData() {
  return [
    { label: 'Starting Budget', value: 100, type: 'total' as const },
    { label: 'Equipment', value: -15, type: 'decrease' as const },
    { label: 'Salaries', value: -35, type: 'decrease' as const },
    { label: 'Sponsorship', value: 25, type: 'increase' as const },
    { label: 'Merchandise', value: 18, type: 'increase' as const },
    { label: 'Travel', value: -12, type: 'decrease' as const },
    { label: 'Final Budget', value: 81, type: 'total' as const },
  ];
}

/**
 * Generate sunburst demo data - Sports hierarchy
 */
export function generateSunburstData() {
  return {
    name: 'Sports',
    children: [
      {
        name: 'Team Sports',
        children: [
          { name: 'Football', value: 450 },
          { name: 'Basketball', value: 320 },
          { name: 'Volleyball', value: 180 },
        ],
      },
      {
        name: 'Individual Sports',
        children: [
          { name: 'Tennis', value: 280 },
          { name: 'Swimming', value: 240 },
          { name: 'Athletics', value: 380 },
        ],
      },
      {
        name: 'Combat Sports',
        children: [
          { name: 'Boxing', value: 150 },
          { name: 'Judo', value: 120 },
          { name: 'Wrestling', value: 110 },
        ],
      },
    ],
  };
}

/**
 * Generate radial bar chart demo data - Performance metrics
 */
export function generateRadialBarData() {
  return [
    { label: 'Speed', value: 85, color: '#1A73E8' },
    { label: 'Strength', value: 72, color: '#34A853' },
    { label: 'Endurance', value: 90, color: '#FBBC05' },
    { label: 'Agility', value: 78, color: '#EA4335' },
    { label: 'Technique', value: 88, color: '#4285F4' },
    { label: 'Mental', value: 82, color: '#9334E6' },
  ];
}

/**
 * Generate bubble chart demo data - Player performance analysis
 */
export function generateBubbleChartData() {
  return Array.from({ length: 25 }, (_, i) => ({
    x: 50 + Math.random() * 50,
    y: 50 + Math.random() * 50,
    size: 10 + Math.random() * 40,
    label: `Player ${i + 1}`,
    group: ['Forwards', 'Midfielders', 'Defenders'][Math.floor(Math.random() * 3)],
  }));
}

/**
 * Generate box plot demo data - Team statistics
 */
export function generateBoxPlotData() {
  const generateValues = (mean: number, count: number) =>
    Array.from({ length: count }, () => mean + (Math.random() - 0.5) * 30);

  return [
    { category: 'Team A', values: generateValues(75, 50), color: '#1A73E8' },
    { category: 'Team B', values: generateValues(68, 50), color: '#34A853' },
    { category: 'Team C', values: generateValues(82, 50), color: '#FBBC05' },
    { category: 'Team D', values: generateValues(71, 50), color: '#EA4335' },
  ];
}

/**
 * Generate violin plot demo data - Performance distribution
 */
export function generateViolinPlotData() {
  const generateValues = (mean: number, std: number, count: number) =>
    Array.from({ length: count }, () => mean + (Math.random() - 0.5) * std * 2);

  return [
    { category: 'Sprint', values: generateValues(80, 15, 100), color: '#1A73E8' },
    { category: 'Endurance', values: generateValues(70, 20, 100), color: '#34A853' },
    { category: 'Strength', values: generateValues(75, 18, 100), color: '#FBBC05' },
  ];
}

/**
 * Generate ridgeline plot demo data - Score distributions over seasons
 */
export function generateRidgelineData() {
  const generateSeasonValues = (base: number) =>
    Array.from({ length: 100 }, () => base + (Math.random() - 0.5) * 40);

  return [
    { id: '2020', name: '2020 Season', values: generateSeasonValues(60), color: '#1A73E8' },
    { id: '2021', name: '2021 Season', values: generateSeasonValues(65), color: '#34A853' },
    { id: '2022', name: '2022 Season', values: generateSeasonValues(70), color: '#FBBC05' },
    { id: '2023', name: '2023 Season', values: generateSeasonValues(75), color: '#EA4335' },
    { id: '2024', name: '2024 Season', values: generateSeasonValues(80), color: '#9334E6' },
  ];
}

/**
 * Generate parallel coordinates demo data - Multi-dimensional player stats
 */
export function generateParallelCoordinatesData() {
  return Array.from({ length: 30 }, (_, i) => ({
    player: `Player ${i + 1}`,
    speed: 50 + Math.random() * 50,
    strength: 50 + Math.random() * 50,
    stamina: 50 + Math.random() * 50,
    technique: 50 + Math.random() * 50,
    tactics: 50 + Math.random() * 50,
    position: ['Forward', 'Midfielder', 'Defender'][Math.floor(Math.random() * 3)],
  }));
}

/**
 * Generate heatmap demo data - Performance matrix
 */
export function generateHeatmapData() {
  const rows = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
  const columns = ['Q1', 'Q2', 'Q3', 'Q4'];
  const data = [];

  for (const row of rows) {
    for (const column of columns) {
      data.push({
        row,
        column,
        value: 50 + Math.random() * 50,
      });
    }
  }

  return data;
}

/**
 * Generate calendar heatmap demo data - Daily activity
 */
export function generateCalendarHeatmapData() {
  const data = [];
  const startDate = new Date(2024, 0, 1);
  const endDate = new Date(2024, 11, 31);

  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    data.push({
      date: new Date(currentDate),
      value: Math.random() * 100,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}

/**
 * Generate correlation matrix demo data
 */
export function generateCorrelationMatrixData() {
  const labels = ['Speed', 'Strength', 'Stamina', 'Technique', 'Tactics'];
  const n = labels.length;
  const data: number[][] = [];

  for (let i = 0; i < n; i++) {
    data[i] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) {
        data[i][j] = 1;
      } else {
        data[i][j] = (Math.random() - 0.5) * 2;
      }
    }
  }

  return { data, labels };
}

/**
 * Generate candlestick demo data - Stock prices
 */
export function generateCandlestickData() {
  const data = [];
  let price = 100;

  for (let i = 0; i < 30; i++) {
    const open = price;
    const change = (Math.random() - 0.5) * 10;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 5;
    const low = Math.min(open, close) - Math.random() * 5;

    const date = new Date(2024, 0, i + 1);

    data.push({ date, open, high, low, close });
    price = close;
  }

  return data;
}

/**
 * Generate Gantt chart demo data - Project timeline
 */
export function generateGanttData() {
  const startDate = new Date(2024, 0, 1);

  return [
    {
      id: '1',
      name: 'Planning Phase',
      start: new Date(2024, 0, 1),
      end: new Date(2024, 0, 15),
      progress: 100,
      color: '#1A73E8',
    },
    {
      id: '2',
      name: 'Design Phase',
      start: new Date(2024, 0, 10),
      end: new Date(2024, 1, 1),
      progress: 80,
      color: '#34A853',
    },
    {
      id: '3',
      name: 'Development',
      start: new Date(2024, 0, 25),
      end: new Date(2024, 2, 15),
      progress: 45,
      color: '#FBBC05',
    },
    {
      id: '4',
      name: 'Testing',
      start: new Date(2024, 2, 1),
      end: new Date(2024, 2, 25),
      progress: 20,
      color: '#EA4335',
    },
    {
      id: '5',
      name: 'Deployment',
      start: new Date(2024, 2, 20),
      end: new Date(2024, 3, 5),
      progress: 0,
      color: '#9334E6',
    },
  ];
}

/**
 * Generate Sankey diagram demo data - Energy flow
 */
export function generateSankeyData() {
  return {
    nodes: [
      { id: 'source1', name: 'Training' },
      { id: 'source2', name: 'Matches' },
      { id: 'mid1', name: 'Physical' },
      { id: 'mid2', name: 'Technical' },
      { id: 'mid3', name: 'Tactical' },
      { id: 'target1', name: 'Performance' },
      { id: 'target2', name: 'Results' },
    ],
    links: [
      { source: 'source1', target: 'mid1', value: 50 },
      { source: 'source1', target: 'mid2', value: 30 },
      { source: 'source1', target: 'mid3', value: 20 },
      { source: 'source2', target: 'mid1', value: 20 },
      { source: 'source2', target: 'mid2', value: 40 },
      { source: 'source2', target: 'mid3', value: 40 },
      { source: 'mid1', target: 'target1', value: 70 },
      { source: 'mid2', target: 'target1', value: 50 },
      { source: 'mid3', target: 'target2', value: 60 },
    ],
  };
}

/**
 * Generate Chord diagram demo data - Team interactions
 */
export function generateChordData() {
  const labels = ['Defense', 'Midfield', 'Attack', 'Goalkeeper'];
  const matrix = [
    [0, 25, 15, 10],
    [25, 0, 30, 5],
    [15, 30, 0, 8],
    [10, 5, 8, 0],
  ];

  return { matrix, labels };
}

/**
 * Generate Force-Directed Graph demo data - Player network
 */
export function generateForceDirectedGraphData() {
  const nodes = [
    { id: '1', name: 'Captain', group: 'Defense', size: 10 },
    { id: '2', name: 'Defender 1', group: 'Defense', size: 7 },
    { id: '3', name: 'Defender 2', group: 'Defense', size: 7 },
    { id: '4', name: 'Midfielder 1', group: 'Midfield', size: 8 },
    { id: '5', name: 'Midfielder 2', group: 'Midfield', size: 8 },
    { id: '6', name: 'Midfielder 3', group: 'Midfield', size: 8 },
    { id: '7', name: 'Forward 1', group: 'Attack', size: 9 },
    { id: '8', name: 'Forward 2', group: 'Attack', size: 9 },
    { id: '9', name: 'Goalkeeper', group: 'Defense', size: 6 },
  ];

  const links = [
    { source: '1', target: '2', value: 5 },
    { source: '1', target: '3', value: 5 },
    { source: '1', target: '9', value: 3 },
    { source: '2', target: '4', value: 4 },
    { source: '3', target: '5', value: 4 },
    { source: '4', target: '5', value: 6 },
    { source: '4', target: '6', value: 6 },
    { source: '5', target: '6', value: 6 },
    { source: '4', target: '7', value: 5 },
    { source: '5', target: '8', value: 5 },
    { source: '6', target: '7', value: 4 },
    { source: '6', target: '8', value: 4 },
    { source: '7', target: '8', value: 3 },
  ];

  return { nodes, links };
}

/**
 * Generate Choropleth Map demo data - Regional performance
 * Note: Requires GeoJSON file for actual rendering
 */
export function generateChoroplethMapData() {
  return [
    { id: 'RU-MOW', name: 'Moscow', value: 95 },
    { id: 'RU-SPE', name: 'Saint Petersburg', value: 88 },
    { id: 'RU-KDA', name: 'Krasnodar', value: 75 },
    { id: 'RU-SVE', name: 'Sverdlovsk', value: 82 },
    { id: 'RU-ROS', name: 'Rostov', value: 70 },
  ];
}

/**
 * Generate Bubble Map demo data - City performance
 */
export function generateBubbleMapData() {
  return [
    { id: '1', name: 'Moscow', latitude: 55.7558, longitude: 37.6173, value: 95 },
    { id: '2', name: 'Saint Petersburg', latitude: 59.9343, longitude: 30.3351, value: 88 },
    { id: '3', name: 'Kazan', latitude: 55.8304, longitude: 49.0661, value: 75 },
    { id: '4', name: 'Sochi', latitude: 43.6028, longitude: 39.7342, value: 70 },
    { id: '5', name: 'Yekaterinburg', latitude: 56.8389, longitude: 60.6057, value: 82 },
  ];
}

/**
 * Generate Geographic Heatmap demo data - Activity density
 */
export function generateGeoHeatMapData() {
  const data: Array<{ id: string; name: string; latitude: number; longitude: number; value: number }> = [];
  const cities = [
    { name: 'Moscow', lat: 55.7558, lon: 37.6173 },
    { name: 'Saint Petersburg', lat: 59.9343, lon: 30.3351 },
    { name: 'Kazan', lat: 55.8304, lon: 49.0661 },
    { name: 'Sochi', lat: 43.6028, lon: 39.7342 },
    { name: 'Yekaterinburg', lat: 56.8389, lon: 60.6057 },
  ];

  cities.forEach((city, i) => {
    // Add multiple points around each city for density effect
    for (let j = 0; j < 10; j++) {
      data.push({
        id: `${i}-${j}`,
        name: city.name,
        latitude: city.lat + (Math.random() - 0.5) * 2,
        longitude: city.lon + (Math.random() - 0.5) * 2,
        value: 50 + Math.random() * 50,
      });
    }
  });

  return data;
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
  groupedBarChart: generateGroupedBarChartData(),
  stackedBarChart: generateStackedBarChartData(),
  streamGraph: generateStreamGraphData(),
  waterfallChart: generateWaterfallData(),
  sunburst: generateSunburstData(),
  radialBarChart: generateRadialBarData(),
  bubbleChart: generateBubbleChartData(),
  boxPlot: generateBoxPlotData(),
  violinPlot: generateViolinPlotData(),
  ridgeline: generateRidgelineData(),
  parallelCoordinates: generateParallelCoordinatesData(),
  heatmap: generateHeatmapData(),
  calendarHeatmap: generateCalendarHeatmapData(),
  correlationMatrix: generateCorrelationMatrixData(),
  candlestick: generateCandlestickData(),
  gantt: generateGanttData(),
  sankey: generateSankeyData(),
  chord: generateChordData(),
  forceDirectedGraph: generateForceDirectedGraphData(),
  choroplethMap: generateChoroplethMapData(),
  bubbleMap: generateBubbleMapData(),
  geoHeatMap: generateGeoHeatMapData(),
};
