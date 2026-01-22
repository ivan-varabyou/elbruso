"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface LiveRegionsChartProps {
  className?: string;
  enabledCharts?: ChartType[];
  interval?: number; // milliseconds between chart changes
}

// Красивая цветовая палитра
const colorPalette = {
  vibrant: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"],
  gradient1: ["#667eea", "#764ba2"],
  gradient2: ["#f093fb", "#f5576c"],
  gradient3: ["#4facfe", "#00f2fe"],
  gradient4: ["#43e97b", "#38f9d7"],
  gradient5: ["#fa709a", "#fee140"],
};

// Все доступные типы диаграмм
const ALL_CHART_TYPES = ['line', 'bar', 'grouped', 'stacked', 'pie'] as const;
type ChartType = typeof ALL_CHART_TYPES[number];

// Конфигурация по умолчанию - все диаграммы включены
const DEFAULT_ENABLED_CHARTS: ChartType[] = [...ALL_CHART_TYPES];

// Экспорт типов для использования в других компонентах
export type { ChartType };
export { ALL_CHART_TYPES };

/**
 * Примеры использования:
 * 
 * // Показать все диаграммы (по умолчанию)
 * <LiveSportsChart />
 * 
 * // Показать только определенные типы диаграмм
 * <LiveSportsChart enabledCharts={['line', 'bar', 'pie']} />
 * 
 * // Изменить скорость переключения (в миллисекундах)
 * <LiveSportsChart interval={5000} />
 * 
 * // Комбинация настроек
 * <LiveSportsChart 
 *   enabledCharts={['bar', 'grouped', 'stacked', 'pie']} 
 *   interval={4000}
 *   className="my-custom-class"
 * />
 */

// Данные по регионам России для разных типов диаграмм

const lineData = [
  { year: "2020", value: 65 },
  { year: "2021", value: 72 },
  { year: "2022", value: 78 },
  { year: "2023", value: 85 },
  { year: "2024", value: 92 },
];

const barData = [
  { name: "Москва", value: 95 },
  { name: "Санкт-Петербург", value: 82 },
  { name: "Татарстан", value: 75 },
  { name: "Свердловская обл.", value: 68 },
  { name: "Краснодарский край", value: 72 },
];

const groupedData = [
  { region: "Москва", team: 85, individual: 90, water: 75 },
  { region: "Санкт-Петербург", individual: 80, team: 70, water: 85 },
  { region: "Татарстан", team: 75, individual: 72, water: 65 },
  { region: "Краснодарский край", team: 70, individual: 68, water: 80 },
];

const stackedData = [
  { region: "Москва", beginner: 30, intermediate: 45, advanced: 35 },
  { region: "Санкт-Петербург", beginner: 35, intermediate: 40, advanced: 30 },
  { region: "Татарстан", beginner: 40, intermediate: 35, advanced: 25 },
  { region: "Свердловская обл.", beginner: 38, intermediate: 38, advanced: 22 },
];

const pieData = [
  { name: "ЦФО", value: 35 },
  { name: "СЗФО", value: 20 },
  { name: "ЮФО", value: 15 },
  { name: "ПФО", value: 18 },
  { name: "УФО", value: 12 },
];

const areaData = [
  { year: "2020", value: 450 },
  { year: "2021", value: 520 },
  { year: "2022", value: 580 },
  { year: "2023", value: 650 },
  { year: "2024", value: 720 },
];

const streamData = [
  { year: 2020, football: 120, basketball: 80, hockey: 95 },
  { year: 2021, football: 135, basketball: 90, hockey: 105 },
  { year: 2022, football: 145, basketball: 100, hockey: 110 },
  { year: 2023, football: 160, basketball: 115, hockey: 120 },
  { year: 2024, football: 175, basketball: 125, hockey: 130 },
];

const waterfallData = [
  { name: "Начальный бюджет", value: 1000, type: "start" },
  { name: "Москва +", value: 250, type: "positive" },
  { name: "СПб +", value: 180, type: "positive" },
  { name: "Расходы -", value: -120, type: "negative" },
  { name: "Татарстан +", value: 150, type: "positive" },
  { name: "Итого", value: 1460, type: "end" },
];

const histogramData = [
  ...Array(15).fill(0).map(() => Math.random() * 20 + 10),
  ...Array(25).fill(0).map(() => Math.random() * 15 + 25),
  ...Array(10).fill(0).map(() => Math.random() * 10 + 35),
];

const radarData = [
  { axis: "Стадионы", value: 90 },
  { axis: "Бассейны", value: 85 },
  { axis: "Спортзалы", value: 95 },
  { axis: "Ледовые арены", value: 80 },
  { axis: "Теннисные корты", value: 75 },
  { axis: "Легкая атлетика", value: 88 },
];

const sunburstData = {
  name: "Россия",
  children: [
    {
      name: "ЦФО",
      children: [
        { name: "Москва", value: 450 },
        { name: "Московская обл.", value: 280 },
      ],
    },
    {
      name: "СЗФО",
      children: [
        { name: "Санкт-Петербург", value: 320 },
        { name: "Ленинградская обл.", value: 150 },
      ],
    },
    {
      name: "ПФО",
      children: [
        { name: "Татарстан", value: 250 },
        { name: "Башкортостан", value: 180 },
      ],
    },
  ],
};

const radialBarData = [
  { name: "Q1 Москва", value: 85 },
  { name: "Q2 СПб", value: 78 },
  { name: "Q3 Татарстан", value: 72 },
  { name: "Q4 Краснодар", value: 80 },
];

export const LiveSportsChart = ({
  className,
  enabledCharts = DEFAULT_ENABLED_CHARTS,
  interval = 3500
}: LiveRegionsChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [currentChartType, setCurrentChartType] = useState<ChartType>(enabledCharts[0] || 'line');
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const chartInterval = setInterval(() => {
      setTicks(t => t + 1);
      setCurrentChartType((prevType) => {
        const currentIndex = enabledCharts.indexOf(prevType);
        const nextIndex = (currentIndex + 1) % enabledCharts.length;
        return enabledCharts[nextIndex];
      });
    }, interval);
    return () => clearInterval(chartInterval);
  }, [enabledCharts, interval]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 40, right: 20, bottom: 40, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMid meet");
    svg.selectAll("*").remove();

    // Названия диаграмм на русском
    const chartTitles: Record<ChartType, string> = {
      line: 'Линейный график',
      bar: 'Гистограмма',
      grouped: 'Группированная гистограмма',
      stacked: 'Стековая гистограмма',
      pie: 'Круговая диаграмма',
    };

    // Заголовок диаграммы
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-family", "Inter, sans-serif")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .attr("fill", "#1A73E8")
      .text(chartTitles[currentChartType]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    // Gradients
    const defs = svg.append("defs");

    // Gradient 1: Purple to Blue
    const grad1 = defs.append("linearGradient").attr("id", "grad1").attr("x1", "0%").attr("x2", "100%");
    grad1.append("stop").attr("offset", "0%").attr("stop-color", colorPalette.gradient1[0]);
    grad1.append("stop").attr("offset", "100%").attr("stop-color", colorPalette.gradient1[1]);

    // Gradient 2: Pink to Red
    const grad2 = defs.append("linearGradient").attr("id", "grad2").attr("x1", "0%").attr("x2", "100%");
    grad2.append("stop").attr("offset", "0%").attr("stop-color", colorPalette.gradient2[0]);
    grad2.append("stop").attr("offset", "100%").attr("stop-color", colorPalette.gradient2[1]);

    // Gradient 3: Blue to Cyan
    const grad3 = defs.append("linearGradient").attr("id", "grad3").attr("x1", "0%").attr("x2", "100%");
    grad3.append("stop").attr("offset", "0%").attr("stop-color", colorPalette.gradient3[0]);
    grad3.append("stop").attr("offset", "100%").attr("stop-color", colorPalette.gradient3[1]);

    // Gradient 4: Green to Cyan
    const grad4 = defs.append("linearGradient").attr("id", "grad4").attr("x1", "0%").attr("x2", "100%");
    grad4.append("stop").attr("offset", "0%").attr("stop-color", colorPalette.gradient4[0]);
    grad4.append("stop").attr("offset", "100%").attr("stop-color", colorPalette.gradient4[1]);

    // Gradient 5: Pink to Yellow
    const grad5 = defs.append("linearGradient").attr("id", "grad5").attr("x1", "0%").attr("x2", "100%");
    grad5.append("stop").attr("offset", "0%").attr("stop-color", colorPalette.gradient5[0]);
    grad5.append("stop").attr("offset", "100%").attr("stop-color", colorPalette.gradient5[1]);

    // Glow filter
    const filter = defs.append("filter").attr("id", "chart-glow").attr("x", "-50%").attr("y", "-50%").attr("width", "200%").attr("height", "200%");
    filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    if (currentChartType === 'line') {
      renderLineChart(g, lineData, innerWidth, innerHeight);
    } else if (currentChartType === 'bar') {
      renderMainBarChart(g, barData, innerWidth, innerHeight);
    } else if (currentChartType === 'grouped') {
      renderGroupedBarChart(g, groupedData, innerWidth, innerHeight);
    } else if (currentChartType === 'stacked') {
      renderStackedBarChart(g, stackedData, innerWidth, innerHeight);
    } else if (currentChartType === 'pie') {
      g.attr("transform", `translate(${width / 2},${height / 2})`);
      renderPieChart(g, pieData, Math.min(innerWidth, innerHeight) / 2);
    }

  }, [currentChartType, ticks]);

  const renderLineChart = (g: any, data: any[], innerWidth: number, innerHeight: number) => {
    const x = d3.scalePoint().domain(data.map(d => d.year)).range([0, innerWidth]).padding(0.5);
    const y = d3.scaleLinear().domain([0, 100]).range([innerHeight, 0]);

    // X axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
      .selectAll("text")
      .style("font-family", "Inter, sans-serif")
      .style("font-size", "10px")
      .attr("fill", "#5F6368");
    g.select(".domain").remove();

    // Y axis
    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth).tickPadding(10))
      .selectAll("text")
      .style("font-family", "Inter, sans-serif")
      .style("font-size", "10px")
      .attr("fill", "#5F6368");
    g.selectAll(".tick line").attr("stroke", "#E8EAED").attr("stroke-dasharray", "2,2");
    g.select(".domain").remove();

    const line = d3.line<any>().x(d => x(d.year)!).y(d => y(d.value)).curve(d3.curveCardinal);

    const path = g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#grad1)")
      .attr("stroke-width", 4)
      .attr("filter", "url(#chart-glow)")
      .attr("d", line);

    const totalLength = path.node().getTotalLength();
    path.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition().duration(1500).attr("stroke-dashoffset", 0);

    g.selectAll("circle").data(data).enter().append("circle")
      .attr("cx", (d: any) => x(d.year)!)
      .attr("cy", (d: any) => y(d.value))
      .attr("r", 0)
      .attr("fill", colorPalette.gradient1[1])
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .transition().duration(800).delay((d: any, i: number) => i * 150 + 500).attr("r", 6);

    // Value labels
    g.selectAll("text.value").data(data).enter().append("text")
      .attr("class", "value")
      .attr("x", (d: any) => x(d.year)!)
      .attr("y", (d: any) => y(d.value) - 12)
      .attr("text-anchor", "middle")
      .style("font-family", "Inter, sans-serif")
      .style("font-size", "11px")
      .style("font-weight", "bold")
      .attr("fill", colorPalette.gradient1[1])
      .text((d: any) => d.value)
      .style("opacity", 0)
      .transition().duration(600).delay((d: any, i: number) => i * 150 + 1000).style("opacity", 1);
  };

  const renderMainBarChart = (g: any, data: any[], innerWidth: number, innerHeight: number) => {
    const x = d3.scaleLinear().domain([0, 100]).range([0, innerWidth]);
    const y = d3.scaleBand().domain(data.map(d => d.name)).range([0, innerHeight]).padding(0.3);

    g.append("g").call(d3.axisLeft(y).tickSize(0).tickPadding(10))
      .selectAll("text").style("font-family", "Inter, sans-serif").style("font-size", "11px").attr("fill", "#5F6368");
    g.select(".domain").remove();

    const gradients = ["url(#grad1)", "url(#grad2)", "url(#grad3)", "url(#grad4)", "url(#grad5)"];

    g.selectAll("rect.bar").data(data).enter().append("rect")
      .attr("y", (d: any) => y(d.name)!)
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("rx", 6)
      .attr("fill", (d: any, i: number) => gradients[i % gradients.length])
      .attr("filter", "url(#chart-glow)")
      .attr("width", 0)
      .transition().duration(1500).ease(d3.easeElasticOut.amplitude(1).period(0.4))
      .attr("width", (d: any) => x(d.value));

    // Value labels
    g.selectAll("text.value").data(data).enter().append("text")
      .attr("class", "value")
      .attr("x", (d: any) => x(d.value) + 8)
      .attr("y", (d: any) => y(d.name)! + y.bandwidth() / 2)
      .attr("dy", ".35em")
      .style("font-family", "Inter, sans-serif")
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .attr("fill", "#5F6368")
      .text(0)
      .transition().duration(1500)
      .tween("text", function (this: SVGTextElement, d: any) {
        const i = d3.interpolate(0, d.value);
        return (t: number) => { d3.select(this).text(Math.round(i(t))); };
      });
  };

  const renderGroupedBarChart = (g: any, data: any[], innerWidth: number, innerHeight: number) => {
    const categories = ["team", "individual", "water"];
    const x0 = d3.scaleBand().domain(data.map(d => d.region)).rangeRound([0, innerWidth]).paddingInner(0.1);
    const x1 = d3.scaleBand().domain(categories).rangeRound([0, x0.bandwidth()]).padding(0.05);
    const y = d3.scaleLinear().domain([0, 100]).rangeRound([innerHeight, 0]);
    const z = d3.scaleOrdinal().domain(categories).range([colorPalette.vibrant[0], colorPalette.vibrant[1], colorPalette.vibrant[2]]);

    g.append("g").attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x0).tickSize(0).tickPadding(10))
      .selectAll("text").style("font-family", "Inter, sans-serif").style("font-size", "9px").attr("fill", "#5F6368");
    g.select(".domain").remove();

    g.append("g").selectAll("g").data(data).enter().append("g")
      .attr("transform", (d: any) => `translate(${x0(d.region)},0)`)
      .selectAll("rect").data((d: any) => categories.map(key => ({ key, value: d[key] })))
      .enter().append("rect")
      .attr("x", (d: any) => x1(d.key)!)
      .attr("y", innerHeight)
      .attr("width", x1.bandwidth())
      .attr("height", 0)
      .attr("fill", (d: any) => z(d.key) as string)
      .attr("rx", 3)
      .transition().duration(1500).ease(d3.easeBackOut)
      .attr("y", (d: any) => y(d.value))
      .attr("height", (d: any) => innerHeight - y(d.value));
  };

  const renderStackedBarChart = (g: any, data: any[], innerWidth: number, innerHeight: number) => {
    const keys = ["beginner", "intermediate", "advanced"];
    const series = d3.stack().keys(keys)(data as any);

    const x = d3.scaleBand().domain(data.map(d => d.region)).rangeRound([0, innerWidth]).paddingInner(0.1);
    const y = d3.scaleLinear().domain([0, 120]).rangeRound([innerHeight, 0]);
    const z = d3.scaleOrdinal().domain(keys).range([colorPalette.vibrant[3], colorPalette.vibrant[4], colorPalette.vibrant[5]]);

    g.append("g").attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
      .selectAll("text").style("font-family", "Inter, sans-serif").style("font-size", "9px").attr("fill", "#5F6368");
    g.select(".domain").remove();

    g.append("g").selectAll("g").data(series).enter().append("g")
      .attr("fill", (d: any) => z(d.key) as string)
      .selectAll("rect").data((d: any) => d).enter().append("rect")
      .attr("x", (d: any) => x(d.data.region)!)
      .attr("y", innerHeight)
      .attr("height", 0)
      .attr("width", x.bandwidth())
      .attr("rx", 3)
      .transition().duration(1500)
      .attr("y", (d: any) => y(d[1]))
      .attr("height", (d: any) => y(d[0]) - y(d[1]));
  };

  const renderPieChart = (g: any, data: any[], radius: number) => {
    const pie = d3.pie<any>().value(d => d.value).sort(null);
    const arc = d3.arc<any>().innerRadius(radius * 0.5).outerRadius(radius * 0.8);
    const color = d3.scaleOrdinal().domain(data.map(d => d.name)).range(colorPalette.vibrant);

    const arcs = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");

    arcs.append("path")
      .attr("fill", (d: any) => color(d.data.name) as string)
      .attr("filter", "url(#chart-glow)")
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .transition().duration(1500)
      .attrTween("d", function (d: any) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t: any) => arc(i(t))!;
      });

    arcs.append("text")
      .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .style("font-family", "Inter, sans-serif")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .attr("fill", "white")
      .text((d: any) => d.data.name)
      .style("opacity", 0)
      .transition().duration(1000).delay(1000).style("opacity", 1);
  };

  const renderAreaChart = (g: any, data: any[], innerWidth: number, innerHeight: number) => {
    const x = d3.scalePoint().domain(data.map(d => d.year)).range([0, innerWidth]).padding(0.1);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value)! * 1.1]).range([innerHeight, 0]);

    const area = d3.area<any>()
      .x(d => x(d.year)!)
      .y0(innerHeight)
      .y1(d => y(d.value))
      .curve(d3.curveCardinal);

    g.append("path")
      .datum(data)
      .attr("fill", "url(#grad4)")
      .attr("opacity", 0.7)
      .attr("d", area)
      .style("opacity", 0)
      .transition().duration(1200).style("opacity", 0.7);

    const line = d3.line<any>().x(d => x(d.year)!).y(d => y(d.value)).curve(d3.curveCardinal);
    g.append("path").datum(data).attr("fill", "none").attr("stroke", colorPalette.gradient4[0]).attr("stroke-width", 3).attr("d", line);
  };

  const renderStreamGraph = (g: any, data: any[], innerWidth: number, innerHeight: number) => {
    const keys = ["football", "basketball", "hockey"];
    const series = d3.stack().keys(keys).offset(d3.stackOffsetWiggle)(data as any);

    const x = d3.scaleLinear().domain(d3.extent(data, d => d.year) as [number, number]).range([0, innerWidth]);
    const y = d3.scaleLinear().domain([d3.min(series, s => d3.min(s, d => d[0]))!, d3.max(series, s => d3.max(s, d => d[1]))!]).range([innerHeight, 0]);
    const color = d3.scaleOrdinal().domain(keys).range([colorPalette.vibrant[6], colorPalette.vibrant[7], colorPalette.vibrant[0]]);

    const area = d3.area<any>().x(d => x(d.data.year)).y0(d => y(d[0])).y1(d => y(d[1])).curve(d3.curveBasis);

    g.selectAll("path").data(series).enter().append("path")
      .attr("fill", (d: any) => color(d.key) as string)
      .attr("d", area)
      .style("opacity", 0)
      .transition().duration(1500).style("opacity", 0.85);
  };

  const renderWaterfallChart = (g: any, data: any[], innerWidth: number, innerHeight: number) => {
    const x = d3.scaleBand().domain(data.map(d => d.name)).range([0, innerWidth]).padding(0.2);
    const y = d3.scaleLinear().domain([0, 1600]).range([innerHeight, 0]);

    let cumulative = 0;
    const processedData = data.map(d => {
      const start = d.type === 'start' || d.type === 'end' ? 0 : cumulative;
      cumulative = d.type === 'start' ? d.value : (d.type === 'end' ? d.value : cumulative + d.value);
      return { ...d, start, end: cumulative };
    });

    g.selectAll("rect").data(processedData).enter().append("rect")
      .attr("x", (d: any) => x(d.name)!)
      .attr("y", (d: any) => y(Math.max(d.start, d.end)))
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", (d: any) =>
        d.type === 'positive' ? colorPalette.vibrant[3] :
          d.type === 'negative' ? colorPalette.vibrant[0] :
            colorPalette.vibrant[1]
      )
      .attr("rx", 4)
      .transition().duration(1500)
      .attr("height", (d: any) => Math.abs(y(d.start) - y(d.end)));
  };

  const renderHistogram = (g: any, data: number[], innerWidth: number, innerHeight: number) => {
    const x = d3.scaleLinear().domain([10, 50]).range([0, innerWidth]);
    const bins = d3.bin().domain(x.domain() as [number, number]).thresholds(8)(data);
    const y = d3.scaleLinear().domain([0, d3.max(bins, d => d.length)!]).range([innerHeight, 0]);

    const colorScale = d3.scaleLinear<string>()
      .domain([0, bins.length - 1])
      .range([colorPalette.gradient5[0], colorPalette.gradient5[1]]);

    g.selectAll("rect").data(bins).enter().append("rect")
      .attr("x", (d: any) => x(d.x0!))
      .attr("y", innerHeight)
      .attr("width", (d: any) => Math.max(0, x(d.x1!) - x(d.x0!) - 1))
      .attr("height", 0)
      .attr("fill", (d: any, i: number) => colorScale(i))
      .attr("rx", 3)
      .transition().duration(1500)
      .attr("y", (d: any) => y(d.length))
      .attr("height", (d: any) => innerHeight - y(d.length));
  };

  const renderRadarChart = (g: any, data: any[], radius: number) => {
    const angleSlice = (Math.PI * 2) / data.length;
    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    [20, 40, 60, 80, 100].forEach(val => {
      g.append("circle")
        .attr("r", rScale(val))
        .attr("fill", "none")
        .attr("stroke", "#E8EAED")
        .attr("stroke-width", 1);
    });

    data.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = rScale(100) * Math.cos(angle);
      const y = rScale(100) * Math.sin(angle);
      g.append("line")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", x).attr("y2", y)
        .attr("stroke", "#E8EAED");
    });

    const radarLine = d3.lineRadial<any>()
      .angle((d, i) => angleSlice * i)
      .radius(d => rScale(d.value))
      .curve(d3.curveLinearClosed);

    g.append("path")
      .datum(data)
      .attr("d", radarLine)
      .attr("fill", colorPalette.vibrant[2])
      .attr("fill-opacity", 0.4)
      .attr("stroke", colorPalette.vibrant[2])
      .attr("stroke-width", 3)
      .attr("filter", "url(#chart-glow)");
  };

  const renderSunburst = (g: any, data: any, radius: number) => {
    const partition = d3.partition().size([2 * Math.PI, radius]);
    const root = d3.hierarchy(data).sum((d: any) => d.value || 0);
    partition(root);

    const arc = d3.arc<any>()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1);

    const color = d3.scaleOrdinal(colorPalette.vibrant);

    g.selectAll("path")
      .data(root.descendants())
      .enter().append("path")
      .attr("d", arc)
      .attr("fill", (d: any, i: number) => color(i.toString()))
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("opacity", 0)
      .transition().duration(1500).attr("opacity", 0.9);
  };

  const renderRadialBar = (g: any, data: any[], radius: number) => {
    const x = d3.scaleBand().domain(data.map(d => d.name)).range([0, 2 * Math.PI]).padding(0.1);
    const y = d3.scaleLinear().domain([0, 100]).range([radius * 0.3, radius]);

    const colorScale = d3.scaleOrdinal().domain(data.map(d => d.name)).range(colorPalette.vibrant);

    const arc = d3.arc<any>()
      .innerRadius(radius * 0.3)
      .outerRadius((d: any) => y(d.value))
      .startAngle((d: any) => x(d.name)!)
      .endAngle((d: any) => x(d.name)! + x.bandwidth());

    g.selectAll("path").data(data).enter().append("path")
      .attr("fill", (d: any) => colorScale(d.name) as string)
      .attr("d", (d: any) => arc({ ...d, value: 0 }))
      .transition().duration(1500)
      .attrTween("d", function (d: any) {
        const i = d3.interpolate(0, d.value);
        return (t: any) => arc({ ...d, value: i(t) });
      });
  };

  return (
    <div className={`p-4 ${className}`}>
      <svg ref={svgRef} className="w-full h-[300px]" />
    </div>
  );
};
