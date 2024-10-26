
# Real-Time Weather Monitoring System

## Description
The Real-Time Weather Monitoring System is a data processing application that monitors weather conditions across multiple cities. It provides summarized insights, including temperature trends and daily weather summaries, utilizing the OpenWeatherMap API for data retrieval and PostgreSQL for data storage. This system is designed to deliver real-time alerts based on temperature thresholds and visualize historical weather data.

## Requirements
- Node.js (v18+)
- Docker and Docker Compose
- OpenWeatherMap API key
- pnpm package manager

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-github/repo-name.git
cd repo-name
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```makefile
OPENWEATHER_API_KEY=your_api_key_here
```

### 3. Start the PostgreSQL Database with Docker
Navigate to the `docker` directory and start the database using Docker Compose:
```bash
cd docker
docker-compose up -d
```

### 4. Install Dependencies
Navigate back to the root directory and install the project dependencies:
```bash
cd ..
pnpm install
```

### 5. Run the Application
Start the application in development mode:
```bash
pnpm dev
```

### 6. Access the Application
Open your browser and go to [http://localhost:3000/weather](http://localhost:3000/weather) to access the weather monitoring system.

## Build Instructions
To prepare the application for production, run the following command:
```bash
pnpm build
```

## Design Choices
- **Architecture**: The application is structured using a Next.js framework for the frontend and a PostgreSQL database for storing weather data. The backend fetches real-time weather data from the OpenWeatherMap API.
- **State Management**: The application uses React hooks for managing state and fetching data.
- **Alert System**: The system generates alerts when the temperature exceeds a certain threshold, providing users with timely notifications.
