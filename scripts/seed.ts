// // seed.ts
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   await prisma.weatherData.createMany({
//     data: [
//       {
//         city: 'Delhi',
//         temp: 35.0,
//         feels_like: 36.5,
//         main: 'Clear',
//         humidity: 40,         // Added humidity
//         wind_speed: 5,       // Added wind speed
//         timestamp: Math.floor(new Date().getTime() / 1000),
//       },
//       {
//         city: 'Mumbai',
//         temp: 32.0,
//         feels_like: 34.0,
//         main: 'Cloudy',
//         humidity: 60,         // Added humidity
//         wind_speed: 3,       // Added wind speed
//         timestamp: Math.floor(new Date().getTime() / 1000),
//       },
//     ],
//   });

//   console.log('Database seeded!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
