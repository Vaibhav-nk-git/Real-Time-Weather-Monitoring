/*
  Warnings:

  - Added the required column `humidity` to the `DailyWeatherSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `windSpeed` to the `DailyWeatherSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humidity` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wind_speed` to the `WeatherData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyWeatherSummary" ADD COLUMN     "humidity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "windSpeed" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "WeatherData" ADD COLUMN     "humidity" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "wind_speed" DOUBLE PRECISION NOT NULL;
