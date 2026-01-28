"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart as LineChartIcon,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
  Activity,
  Radar,
  Layers,
  BarChart4,
  Waves,
  TrendingDown,
  Sun,
  Target,
} from "lucide-react";
import { LineChart } from "@/shared/ui/molecule/charts/LineChart";
import { BarChart } from "@/shared/ui/molecule/charts/BarChart";
import { PieChart } from "@/shared/ui/molecule/charts/PieChart";
import { AreaChart } from "@/shared/ui/molecule/d3/AreaChart";
import { Histogram } from "@/shared/ui/molecule/d3/Histogram";
import { RadarChart } from "@/shared/ui/molecule/d3/statistical/RadarChart";
import { GroupedBarChart } from "@/shared/ui/molecule/d3/GroupedBarChart";
import { StackedBarChart } from "@/shared/ui/molecule/d3/StackedBarChart";
import { StreamGraph } from "@/shared/ui/molecule/d3/StreamGraph";
import { RadialBarChart } from "@/shared/ui/molecule/d3/RadialBarChart";
import { DEMO_DATA } from "@/shared/lib/visualization";
import { Dictionary } from "@/shared/types";
import { useI18n } from "@/shared/lib/i18n";
import {
  LineChartConfig,
  BarChartConfig,
  PieChartConfig,
  AreaChartConfig,
  ScatterChartConfig,
} from "@/shared/lib/visualization";

const demoData = {
  line: [
    { label: "Jan", value: 30 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 35 },
    { label: "Apr", value: 55 },
    { label: "May", value: 48 },
    { label: "Jun", value: 65 },
  ],
  bar: [
    { label: "Q1", value: 120 },
    { label: "Q2", value: 150 },
    { label: "Q3", value: 180 },
    { label: "Q4", value: 200 },
  ],
  pie: [
    { label: "Category A", value: 30 },
    { label: "Category B", value: 25 },
    { label: "Category C", value: 45 },
  ],
};

interface ChartTab {
  id: string;
  name: string;
  icon: any;
  description: string;
}

export const ChartsShowcase = () => {
  const dictionary = useI18n() as Dictionary;
  const tabs: ChartTab[] = [
    {
      id: "line",
      name: "Line Chart",
      icon: LineChartIcon,
      description: "Track performance trends over time with multi-series support",
    },
    {
      id: "bar",
      name: "Bar Chart",
      icon: BarChart3,
      description: "Compare metrics across categories with vertical or horizontal bars",
    },
    {
      id: "grouped-bar",
      name: "Grouped Bar",
      icon: BarChart4,
      description: "Compare multiple series side-by-side across categories",
    },
    {
      id: "stacked-bar",
      name: "Stacked Bar",
      icon: Layers,
      description: "Show cumulative values stacked in bars",
    },
    {
      id: "pie",
      name: "Pie Chart",
      icon: PieChartIcon,
      description: "Visualize proportions and distributions with interactive slices",
    },
    {
      id: "radial-bar",
      name: "Radial Bar",
      icon: Target,
      description: "Circular bar chart for performance metrics",
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className="py-96 bg-gradient-to-b from-white to-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-64">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[32px] md:text-[48px] font-bold text-elbruso-text mb-24"
          >
            Powerful Data Visualization
          </motion.h2>
          <p className="text-elbruso-text-muted max-w-2xl mx-auto text-lg">
            Interactive charts and graphs built with D3.js for comprehensive sports analytics
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2.5 px-6 py-3.5 rounded-full border transition-all duration-300 ${
                  isActive
                    ? "bg-primary-blue border-primary-blue text-white shadow-xl shadow-primary-blue/20 translate-y-[-2px]"
                    : "bg-white border-elbruso-border text-elbruso-text hover:border-primary-blue/40"
                }`}
              >
                <Icon size={18} className={isActive ? "text-white" : "text-primary-blue"} />
                <span className="font-bold text-[14px]">{tab.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeChartTab"
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-primary-blue"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Chart Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="card-premium bg-white p-12 rounded-lg shadow-premium"
          >
            <div className="mb-32">
              <h3 className="text-2xl font-bold text-elbruso-text mb-2">{currentTab.name}</h3>
              <p className="text-elbruso-text-muted">{currentTab.description}</p>
            </div>

            <div className="flex justify-center items-center min-h-[400px]">
              {activeTab === "line" && (
                <LineChart
                  series={DEMO_DATA.lineChart}
                  xAxisLabel="Month"
                  yAxisLabel="Performance Score"
                  showGrid={true}
                  showLegend={true}
                  curve="cardinal"
                  className="w-full max-w-4xl"
                />
              )}
              {activeTab === "bar" && (
                <BarChart
                  data={DEMO_DATA.barChart}
                  orientation="vertical"
                  xAxisLabel="Metric"
                  yAxisLabel="Count"
                  showValues={true}
                  className="w-full max-w-3xl"
                />
              )}
              {activeTab === "pie" && (
                <PieChart
                  data={DEMO_DATA.pieChart}
                  innerRadius={60}
                  showLabels={true}
                  showPercentages={true}
                  className="w-full max-w-2xl"
                />
              )}
              {activeTab === "area" && (
                <AreaChart
                  series={DEMO_DATA.areaChart}
                  xAxisLabel="Time"
                  yAxisLabel="Intensity"
                  showGrid={true}
                  className="w-full max-w-4xl"
                />
              )}
              {activeTab === "grouped-bar" && (
                <GroupedBarChart
                  series={DEMO_DATA.groupedBarChart}
                  orientation="vertical"
                  xAxisLabel="Quarter"
                  yAxisLabel="Performance"
                  showValues={true}
                  showLegend={true}
                  className="w-full max-w-4xl"
                />
              )}
              {activeTab === "stacked-bar" && (
                <StackedBarChart
                  categories={DEMO_DATA.stackedBarChart.categories}
                  series={DEMO_DATA.stackedBarChart.series}
                  orientation="vertical"
                  xAxisLabel="Day of Week"
                  yAxisLabel="Training Hours"
                  showLegend={true}
                  className="w-full max-w-4xl"
                />
              )}
              {activeTab === "stream" && (
                <StreamGraph
                  series={DEMO_DATA.streamGraph}
                  xAxisLabel="Time Period"
                  yAxisLabel="Activity Level"
                  offset="wiggle"
                  className="w-full max-w-4xl"
                />
              )}
              {activeTab === "radial-bar" && (
                <RadialBarChart
                  data={DEMO_DATA.radialBarChart}
                  showLabels={true}
                  showValues={true}
                  className="w-full max-w-2xl"
                />
              )}
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-primary-blue font-bold mb-1">Interactive</div>
                <div className="text-sm text-elbruso-text-muted">
                  Hover and click for detailed information
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-primary-blue font-bold mb-1">Responsive</div>
                <div className="text-sm text-elbruso-text-muted">
                  Adapts to any screen size automatically
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-primary-blue font-bold mb-1">Animated</div>
                <div className="text-sm text-elbruso-text-muted">
                  Smooth transitions and engaging effects
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
