//src/components/WeatherSummary.tsx
"use client"

import React from 'react';

interface WeatherSummaryProps {
  city: string;
  temperature: number;
  description: string;
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ city, temperature, description }) => {
  return (
    <div>
      <h2>{city}</h2>
      <p>{temperature.toFixed(1)}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default WeatherSummary;
