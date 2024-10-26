// src/utils/alerts.ts
export function generateWeatherAlert(temperature: number): string | null {
  if (temperature > 20) {
    return 'High temperature warning: Temperatures above 35°C!';
  } else if (temperature < 0) {
    return 'Cold warning: Temperatures below 0°C!';
  }
  return null;
}

// Function to handle user-defined thresholds
export function checkThresholds(currentTemp: number, thresholds: { max?: number, min?: number }): string | null {
  if (thresholds.max && currentTemp > thresholds.max) {
    return `Alert: Temperature exceeds ${thresholds.max}°C!`;
  }
  if (thresholds.min && currentTemp < thresholds.min) {
    return `Alert: Temperature below ${thresholds.min}°C!`;
  }
  return null;
}
