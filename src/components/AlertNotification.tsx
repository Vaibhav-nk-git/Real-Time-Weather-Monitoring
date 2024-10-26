//src/components/AlertNotification.tsx
"use client"

import { useEffect, useState } from 'react';

interface WeatherData {
  city: string;
  main: string;
  temperature: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  timestamp: string;
}

interface AlertProps {
  weatherData: WeatherData[];
  temperatureThreshold: number; // Maintain threshold if needed
}

export default function AlertNotification({ weatherData, temperatureThreshold }: AlertProps) {
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const newAlerts = weatherData
      .filter(data => data.temperature > temperatureThreshold)
      .map(data => `${data.city}: Temperature exceeded ${temperatureThreshold}°C`);

    setAlerts(newAlerts);
  }, [weatherData, temperatureThreshold]);

  return (
    <div>
      {alerts.length > 0 && (
        <div>
          <h2 className='py-5  flex justify-center text-lg uppercase text-bold text-orange-600'>Alerts</h2>
          <ul className='mb-7' >
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
