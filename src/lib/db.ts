// src/lib/db.ts

// src/lib/db.ts
// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function saveWeatherData(city: string, weatherData: any) {
  const { main, temp, feels_like, humidity, wind_speed, dt } = weatherData; // Ensure these fields exist in your weatherData
  return await prisma.weatherData.create({
    data: {
      city,
      main,
      temp,
      feels_like,
      humidity, // Include humidity
      wind_speed, // Include wind_speed
      timestamp: dt, // Ensure timestamp is a Date object
    },
  });
}

export async function getWeatherDataForToday(city: string) {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  return await prisma.weatherData.findMany({
    where: {
      city,
      timestamp: {
        gte: Math.floor(startOfDay.getTime() / 1000),
      },
    },
  });
}

export const saveDailySummary = async (city: string, averageTemperature: number, maximumTemperature: number, minimumTemperature: number, dominantCondition: string, averageHumidity: number, averageWindSpeed: number) => {
  await prisma.dailyWeatherSummary.create({
    data: {
      city,
      date: new Date(),
      averageTemperature,
      maximumTemperature,
      minimumTemperature,
      dominantCondition,
      humidity: averageHumidity, // Include average humidity
      windSpeed: averageWindSpeed, // Include average wind speed
    },
  });
};
