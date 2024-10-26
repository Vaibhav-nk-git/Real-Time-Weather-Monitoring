//src/lib/api.ts

import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeather(city: string) {
  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
}
// src/lib/api.ts
export async function fetchWeatherForecast(city: string) {
  const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast'; // Forecast endpoint
  try {
    const response = await axios.get(`${FORECAST_URL}?q=${city}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw new Error('Failed to fetch weather forecast');
  }
}

