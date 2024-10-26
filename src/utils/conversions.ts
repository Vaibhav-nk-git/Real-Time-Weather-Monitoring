//src/utils/conversions.ts
export function kelvinToCelsius(temp: number): number {
    return temp - 273.15;
  }
  
  export function kelvinToFahrenheit(temp: number): number {
    return (temp - 273.15) * 9/5 + 32;
  }
  