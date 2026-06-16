import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'YOUR_API_KEY_HERE';
console.log("API KEY:", API_KEY);
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric'); // metric | imperial
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('recentSearches')) || [];
    } catch { return []; }
  });

  const fetchWeatherByCoords = useCallback(async (lat, lon, cityName = '') => {
    setLoading(true);
    setError(null);
    try {
      const [weatherRes, forecastRes, aqRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather`, {
          params: { lat, lon, appid: API_KEY, units: unit }
        }),
        axios.get(`${BASE_URL}/forecast`, {
          params: { lat, lon, appid: API_KEY, units: unit, cnt: 40 }
        }),
        axios.get(`${BASE_URL}/air_pollution`, {
          params: { lat, lon, appid: API_KEY }
        })
      ]);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
      setAirQuality(aqRes.data);

      const name = cityName || weatherRes.data.name;
      setCity(name);

      // Save to recent
      setRecentSearches(prev => {
        const updated = [name, ...prev.filter(c => c.toLowerCase() !== name.toLowerCase())].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
        console.log("ERROR OBJECT:", err);
  console.log("ERROR RESPONSE:", err.response);
  console.log("ERROR DATA:", err.response?.data);
      if (err.response?.status === 401) {
        setError('Invalid API key. Please check your OpenWeatherMap API key.');
      } else if (err.response?.status === 404) {
        setError('City not found. Please try another location.');
      } else if (err.code === 'ERR_NETWORK') {
        setError('Network error. Please check your internet connection.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [unit]);

  const searchCity = useCallback(async (cityQuery) => {
    if (!cityQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const geoRes = await axios.get(`${GEO_URL}/direct`, {
        params: { q: cityQuery, limit: 1, appid: API_KEY }
      });
      if (!geoRes.data.length) {
        setError('City not found. Please check the spelling and try again.');
        setLoading(false);
        return;
      }
      const { lat, lon, name, country } = geoRes.data[0];
      await fetchWeatherByCoords(lat, lon, `${name}, ${country}`);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid API key. Please add a valid OpenWeatherMap API key.');
      } else {
        setError('Failed to find city. Please try again.');
      }
      setLoading(false);
    }
  }, [fetchWeatherByCoords]);

  const fetchByGeolocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchWeatherByCoords(coords.latitude, coords.longitude),
      () => {
        setError('Location access denied. Please search for a city manually.');
        setLoading(false);
      }
    );
  }, [fetchWeatherByCoords]);

  // Re-fetch when unit changes
  useEffect(() => {
    if (weather) {
      fetchWeatherByCoords(weather.coord.lat, weather.coord.lon, city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  // Auto-detect location on first load
  useEffect(() => {
    fetchByGeolocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get5DayForecast = () => {
    if (!forecast) return [];
    const daily = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!daily[date]) daily[date] = [];
      daily[date].push(item);
    });
    return Object.values(daily).slice(0, 5).map(dayItems => {
      const temps = dayItems.map(d => d.main.temp);
      return {
        ...dayItems[Math.floor(dayItems.length / 2)],
        tempMin: Math.min(...temps),
        tempMax: Math.max(...temps),
        items: dayItems
      };
    });
  };

  const getHourlyForecast = () => {
    if (!forecast) return [];
    return forecast.list.slice(0, 8);
  };

  return {
    weather, forecast, airQuality, loading, error,
    city, unit, setUnit, recentSearches,
    searchCity, fetchByGeolocation,
    get5DayForecast, getHourlyForecast
  };
};

export default useWeather;
