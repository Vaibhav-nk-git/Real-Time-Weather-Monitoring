//src/components/Chart.tsx
'use client'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

interface ChartProps {
  data: { city: string; temperatures: number[] };
}

export default function WeatherChart({ data }: ChartProps) {
  const chartData = {
    labels: data.temperatures.map((_, index) => `Update ${index + 1}`), // Placeholder for time series
    datasets: [
      {
        label: data.city,
        data: data.temperatures,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  return <Line data={chartData} />;
}
