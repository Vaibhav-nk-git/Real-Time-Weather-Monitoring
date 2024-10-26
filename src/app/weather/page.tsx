//src/app/weather/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { fetchWeather } from '@/lib/api';
import { kelvinToCelsius, kelvinToFahrenheit } from '@/utils/conversions';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ModeToggle } from '@/components/ToggleBtn';
import AlertNotification from '@/components/AlertNotification'; // Import the alert component
import Chart from '@/components/Chart'; // Import the chart component
import { generateWeatherAlert } from '@/utils/alerts';
// import  sendEmailAlert  from '@/lib/email'; // Import sendEmailAlert

interface WeatherData {
  city: string;
  main: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  timestamp: string;
}

interface DailySummary {
  city: string;
  averageTemperature: number;
  maximumTemperature: number;
  minimumTemperature: number;
  dominantCondition: string;
}

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [alerts, setAlerts] = useState<string[]>([]); // State for alerts
  const [temperatureHistory, setTemperatureHistory] = useState<{ [key: string]: number[] }>({});
  const [dailySummaries, setDailySummaries] = useState<DailySummary[]>([]); // State for daily summaries
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

  const fetchWeatherData = async () => {
    try {
      const allWeatherData: WeatherData[] = [];
      const dailySummaryData: { [key: string]: WeatherData[] } = {};
      const alertMessages: string[] = [];

  
      for (const city of cities) {
        const data = await fetchWeather(city);  // Fetch the weather data
        const { main, weather, dt, wind } = data;  // Extract required properties
  
        const weatherInfo: WeatherData = {
          city,
          main: weather[0].main,
          temperature: kelvinToCelsius(main.temp),
          feels_like: kelvinToCelsius(main.feels_like),
          humidity: main.humidity,            // Add humidity here
          wind_speed: wind.speed,              // Add wind speed here
          timestamp: new Date(dt * 1000).toLocaleString(),
        };
  
        allWeatherData.push(weatherInfo);
  
        // Aggregate data for daily summaries
        if (!dailySummaryData[city]) {
          dailySummaryData[city] = [];
        }
        dailySummaryData[city].push(weatherInfo);
  
        // Track temperature history
        setTemperatureHistory(prev => ({
          ...prev,
          [city]: [...(prev[city] || []), kelvinToCelsius(main.temp)],
        }));
  
        // Example alert logic
        const alert = generateWeatherAlert(weatherInfo.temperature);
        if (alert) {
          alertMessages.push(`Alert for ${city}: ${alert}`);
          setAlerts((prev) => [...prev, `Alert for ${city}: ${alert}`]);
          

        }
      }
  
      // Calculate daily summaries
      const summaries: DailySummary[] = Object.entries(dailySummaryData).map(([city, dailyData]) => {
        const averageTemp = dailyData.reduce((acc, data) => acc + data.temperature, 0) / dailyData.length;
        const maxTemp = Math.max(...dailyData.map(data => data.temperature));
        const minTemp = Math.min(...dailyData.map(data => data.temperature));
        const dominantCondition = dailyData[0].main; // Placeholder for dominant condition
  
        return {
          city,
          averageTemperature: averageTemp,
          maximumTemperature: maxTemp,
          minimumTemperature: minTemp,
          dominantCondition,
        };
      });
  
      setDailySummaries(summaries);
      setWeatherData(allWeatherData);
      setLoading(false);
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false); // Ensure loading is also set to false on error
    }
  };

  useEffect(() => {
    fetchWeatherData(); // Initial data fetch
    const intervalId = setInterval(fetchWeatherData, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  if (loading) return <p className='flex justify-center items-center'>Loading...</p>; // Show loading message while fetching data

  return (
    <div>
      <h3 className='text-5xl text-semibold flex justify-center mt-7 mb-5'>Weather Monitoring</h3>
      <div className='flex justify-center mb-8'>
      <ModeToggle />
      </div>
      
      <br />
      
      {/* Carousel Section */}
      <div className='flex justify-center items-center mx-9 mb-7  px-16'>
        <Carousel>
        <CarouselContent>
          {weatherData.map((data) => (
              <CarouselItem key={data.city}>
                <h2 className='text-2xl font-semibold'>{data.city}</h2>
                <p>Temperature: {data.temperature.toFixed(2)} °C / {kelvinToFahrenheit(data.temperature).toFixed(2)} °F</p>
                <p>Main: {data.main}</p>
                <p>Feels Like: {data.feels_like.toFixed(2)} °C</p>
                <p>Humidity: {data.humidity}%</p>         {/* Display Humidity */}
                <p>Wind Speed: {data.wind_speed} m/s</p> {/* Display Wind Speed */}
                <p>Last Updated: {data.timestamp}</p>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
  
      {/* Alerts Section */}
      <div className='flex items-center justify-center'>
        <AlertNotification weatherData={weatherData} temperatureThreshold={25} /> 
      </div>
      
      {/* Daily Summaries Section */}
      <div className='flex justify-center text-bold text-4xl  pt-7'>DAILY WEATHER SUMMARY</div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8'>
        {dailySummaries.map((summary) => (
          <div key={summary.city} className='bg-white dark:bg-pink-600 shadow-lg rounded-lg p-6'>
            <h4 className='text-xl font-bold mb-4'>{summary.city} Daily Summary</h4>
            <p>Average Temperature: {summary.averageTemperature.toFixed(2)} °C</p>
            <p>Maximum Temperature: {summary.maximumTemperature.toFixed(2)} °C</p>
            <p>Minimum Temperature: {summary.minimumTemperature.toFixed(2)} °C</p>
            <p>Dominant Condition: {summary.dominantCondition}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8'>
        {Object.entries(temperatureHistory).map(([city, temperatures]) => (
          <div key={city} className='bg-slate-200 dark:bg-slate-700 shadow-lg rounded-lg p-6'>
            <h4 className='text-xl font-bold mb-4'>{city} Temperature Trends</h4>
            <Chart data={{ city, temperatures }} />
          </div>
        ))}
      </div>
    </div>
  );
}
