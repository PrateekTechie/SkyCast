<<<<<<< HEAD
# 🌤 SkyCast - Weather Forecast App

SkyCast is a weather forecasting application built with React.js that provides real-time weather information, hourly forecasts, air quality data, and interactive weather maps. The application uses the OpenWeatherMap API to fetch live weather data and presents it through a clean and responsive user interface.

## Features

* Real-time weather updates for any city
* Current temperature, humidity, pressure, visibility, and wind information
* Hourly weather forecast
* 5-day weather forecast
* Air Quality Index (AQI) monitoring
* Interactive weather map with multiple layers
* Automatic location detection using geolocation
* City search functionality
* Recent search history stored in local storage
* Temperature unit conversion (°C and °F)
* Dynamic weather-based themes
* Responsive design for mobile, tablet, and desktop devices
* Error handling for invalid locations, network issues, and location permissions

## Technologies Used

* React.js
* JavaScript (ES6+)
* Axios
* CSS3
* OpenWeatherMap API

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/SkyCast.git
cd SkyCast
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add:

```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
```

You can get a free API key from OpenWeatherMap.

### Start the Development Server

```bash
npm start
```

The application will run at:

```text
http://localhost:3000
```

## Project Structure

```text
src
├── components
│   ├── CurrentWeather.js
│   ├── DailyForecast.js
│   ├── ErrorCard.js
│   ├── HourlyForecast.js
│   ├── LoadingScreen.js
│   ├── SearchBar.js
│   └── WeatherMap.js
│
├── hooks
│   └── useWeather.js
│
├── utils
│   └── weatherHelpers.js
│
├── App.js
├── App.css
└── index.js
```

## API Services

The application uses the following OpenWeatherMap services:

* Current Weather API
* 5-Day Forecast API
* Air Pollution API
* Geocoding API
* Weather Map Tiles API

## Future Improvements

* Weather alerts and notifications
* Favorite locations feature
* Extended weather forecasts
* Dark and light theme toggle
* Historical weather data
* Weather-based activity recommendations

## Author

Prateek Prajapati

Built using React.js and OpenWeatherMap API.
=======