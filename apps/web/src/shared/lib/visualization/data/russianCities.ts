/**
 * Geographic data for visualization
 * Russian cities with coordinates and values for bubble maps and other visualizations
 */

export interface CityDataPoint {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    value: number;
    year: number;
}

export const russianCities: CityDataPoint[] = [
    { id: '1', name: 'Москва', latitude: 55.7558, longitude: 37.6173, value: 95, year: 2020 },
    { id: '2', name: 'Санкт-Петербург', latitude: 59.9343, longitude: 30.3351, value: 88, year: 2020 },
    { id: '3', name: 'Казань', latitude: 55.8304, longitude: 49.0661, value: 85, year: 2021 },
    { id: '4', name: 'Екатеринбург', latitude: 56.8389, longitude: 60.6057, value: 82, year: 2021 },
    { id: '5', name: 'Новосибирск', latitude: 55.0084, longitude: 82.9346, value: 78, year: 2022 },
    { id: '6', name: 'Нижний Новгород', latitude: 56.3269, longitude: 44.0059, value: 75, year: 2022 },
    { id: '7', name: 'Челябинск', latitude: 55.1644, longitude: 61.4368, value: 72, year: 2023 },
    { id: '8', name: 'Самара', latitude: 53.2029, longitude: 50.1508, value: 70, year: 2023 },
    { id: '9', name: 'Омск', latitude: 54.9885, longitude: 73.3682, value: 68, year: 2024 },
    { id: '10', name: 'Ростов-на-Дону', latitude: 47.2357, longitude: 39.7015, value: 80, year: 2024 },
    { id: '11', name: 'Уфа', latitude: 54.7351, longitude: 55.9587, value: 65, year: 2025 },
    { id: '12', name: 'Красноярск', latitude: 56.0153, longitude: 92.8932, value: 63, year: 2025 },
    { id: '13', name: 'Пермь', latitude: 58.0105, longitude: 56.2502, value: 61, year: 2025 },
    { id: '14', name: 'Воронеж', latitude: 51.672, longitude: 39.1843, value: 67, year: 2024 },
    { id: '15', name: 'Волгоград', latitude: 48.708, longitude: 44.5133, value: 59, year: 2023 },
];

// Helper function to get cities by year
export const getCitiesByYear = (year: number) => {
    return russianCities.filter(city => city.year <= year);
};

// Get unique years
export const getUniqueYears = () => {
    return Array.from(new Set(russianCities.map(c => c.year))).sort();
};
