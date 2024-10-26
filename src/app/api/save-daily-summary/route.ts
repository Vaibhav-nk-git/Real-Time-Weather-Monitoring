// src/app/api/save-daily-summary/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const {
    city,
    averageTemperature,
    maximumTemperature,
    minimumTemperature,
    dominantCondition,
    averageHumidity, // Ensure you include this in the request body
    averageWindSpeed, // Ensure you include this in the request body
  } = await request.json();

  try {
    const dailySummary = await prisma.dailyWeatherSummary.create({
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

    return NextResponse.json(dailySummary);
  } catch (error) {
    console.error('Error saving daily summary:', error);
    return NextResponse.json({ error: 'Failed to save daily summary' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

