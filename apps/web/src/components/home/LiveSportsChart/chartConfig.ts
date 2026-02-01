/**
 * Конфигурация диаграмм для LiveSportsChart
 * 
 * Этот файл содержит предустановленные конфигурации для различных сценариев использования
 */

import { ChartType } from './LiveSportsChart';

// Все доступные типы диаграмм
export const ALL_CHARTS: ChartType[] = [
    'line',
    'bar',
    'grouped',
    'stacked',
    'pie',
];

// Только базовые диаграммы
export const BASIC_CHARTS: ChartType[] = [
    'line',
    'bar',
    'pie'
];

// Диаграммы для сравнения
export const COMPARISON_CHARTS: ChartType[] = [
    'bar',
    'grouped',
    'stacked',
];

// Диаграммы для трендов
export const TREND_CHARTS: ChartType[] = [
    'line',
];

// Диаграммы для распределения
export const DISTRIBUTION_CHARTS: ChartType[] = [
    'pie',
];

// Конфигурация для Hero секции (быстрая смена)
export const HERO_CONFIG = {
    charts: [] as ChartType[],
    interval: 3000
};

// Конфигурация для демонстрации (медленная смена)
export const DEMO_CONFIG = {
    charts: ALL_CHARTS,
    interval: 5000
};

// Конфигурация для презентации (только эффектные диаграммы)
export const PRESENTATION_CONFIG = {
    charts: [] as ChartType[],
    interval: 4000
};
