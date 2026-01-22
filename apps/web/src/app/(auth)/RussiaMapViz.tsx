'use client';

import React, { useState, useEffect } from 'react';
import { BubbleMap } from '@/shared/ui/d3/geographic/BubbleMap/BubbleMap';
import { BubbleMapDataPoint } from '@/shared/lib/visualization/types';

// Precise Russia GeoJSON URL
const RUSSIA_GEOJSON_URL = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/russia.geojson';

const russianCities = [
    { id: '1', name: 'Москва', latitude: 55.7558, longitude: 37.6173, value: 95.8, year: 2020 },
    { id: '2', name: 'Санкт-Петербург', latitude: 59.9343, longitude: 30.3351, value: 88.2, year: 2020 },
    { id: '3', name: 'Казань', latitude: 55.8304, longitude: 49.0661, value: 85.5, year: 2021 },
    { id: '4', name: 'Екатеринбург', latitude: 56.8389, longitude: 60.6057, value: 82.1, year: 2021 },
    { id: '5', name: 'Новосибирск', latitude: 55.0084, longitude: 82.9346, value: 78.4, year: 2022 },
    { id: '6', name: 'Нижний Новгород', latitude: 56.3269, longitude: 44.0059, value: 75.9, year: 2022 },
    { id: '7', name: 'Челябинск', latitude: 55.1644, longitude: 61.4368, value: 72.3, year: 2023 },
    { id: '8', name: 'Самара', latitude: 53.2029, longitude: 50.1508, value: 70.0, year: 2023 },
    { id: '9', name: 'Омск', latitude: 54.9885, longitude: 73.3682, value: 68.7, year: 2024 },
    { id: '10', name: 'Ростов-на-Дону', latitude: 47.2357, longitude: 39.7015, value: 80.2, year: 2024 },
    { id: '11', name: 'Уфа', latitude: 54.7351, longitude: 55.9587, value: 65.4, year: 2025 },
    { id: '12', name: 'Красноярск', latitude: 56.0153, longitude: 92.8932, value: 63.8, year: 2025 },
    { id: '13', name: 'Владивосток', latitude: 43.1198, longitude: 131.8869, value: 61.2, year: 2025 },
    { id: '14', name: 'Калининград', latitude: 54.7104, longitude: 20.4522, value: 67.5, year: 2024 },
    { id: '15', name: 'Краснодар', latitude: 45.0393, longitude: 38.9872, value: 74.1, year: 2023 },
];

export const RussiaMapViz = () => {
    const [visibleData, setVisibleData] = useState<BubbleMapDataPoint[]>([]);
    const [currentYear, setCurrentYear] = useState(2020);

    useEffect(() => {
        const years = Array.from(new Set(russianCities.map(c => c.year))).sort();
        let yearIndex = 0;

        const interval = setInterval(() => {
            const year = years[yearIndex];
            setCurrentYear(year);

            const filteredData = russianCities
                .filter(city => city.year <= year)
                .map(({ year: _, ...city }) => city);

            setVisibleData(filteredData);

            yearIndex++;
            if (yearIndex >= years.length) {
                // Loop with a pause
                setTimeout(() => { yearIndex = 0; }, 5000);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="russia-map-viz-wrapper">
            <div className="russia-map-card">
                <div className="map-glass-header">
                    <div className="header-text">
                        <h3 className="premium-title">Региональный Охват Platform</h3>
                        <p className="premium-subtitle">Динамика развития BI-системы в России</p>
                    </div>
                    <div className="year-badge">
                        <span className="year-label">Год</span>
                        <span className="year-value">{currentYear}</span>
                    </div>
                </div>

                <div className="map-content-area">
                    <BubbleMap
                        data={visibleData}
                        geoJsonUrl={RUSSIA_GEOJSON_URL}
                        width={900}
                        height={500}
                        projection="mercator"
                        showLabels={true}
                        sizeScale={[6, 30]}
                        animation={{ enabled: true, duration: 1200 }}
                        theme={{
                            primaryColor: '#4F7CFF',
                            textColor: '#FFFFFF',
                            backgroundColor: 'transparent'
                        }}
                        className="d3-map-svg"
                    />
                </div>

                <div className="map-footer-stats">
                    <div className="stat-pill">
                        <div className="pill-dot" />
                        <span className="pill-text">Активных Филий: {visibleData.length}</span>
                    </div>
                    <div className="stat-pill success">
                        <span className="pill-icon">↗</span>
                        <span className="pill-text">Рост: +{((visibleData.length / russianCities.length) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="stat-pill pulse">
                        <div className="pill-dot pulse-anim" />
                        <span className="pill-text">Live Monitoring</span>
                    </div>
                </div>
            </div>

            {/* Decorative background gradients */}
            <div className="map-bg-glow glow-1" />
            <div className="map-bg-glow glow-2" />
        </div>
    );
};
