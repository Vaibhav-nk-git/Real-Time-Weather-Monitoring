-- CreateTable
CREATE TABLE "DailyWeatherSummary" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "averageTemperature" DOUBLE PRECISION NOT NULL,
    "maximumTemperature" DOUBLE PRECISION NOT NULL,
    "minimumTemperature" DOUBLE PRECISION NOT NULL,
    "dominantCondition" TEXT NOT NULL,

    CONSTRAINT "DailyWeatherSummary_pkey" PRIMARY KEY ("id")
);
