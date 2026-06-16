import React, { useState } from 'react';
import './App.css';
import useWeather from './hooks/useWeather';
import { getWeatherTheme } from './utils/weatherHelpers';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherMap from './components/WeatherMap';
import ErrorCard from './components/ErrorCard';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const {
    weather, airQuality, loading, error,
    city, unit, setUnit, recentSearches,
    searchCity, fetchByGeolocation,
    get5DayForecast, getHourlyForecast
  } = useWeather();

  const [activeTab, setActiveTab] = useState('forecast');

  const isDay = weather
    ? (Date.now() / 1000 > weather.sys.sunrise && Date.now() / 1000 < weather.sys.sunset)
    : true;

  const theme = weather
    ? getWeatherTheme(weather.weather[0].description, isDay)
    : { gradient: 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 50%, #0d1b3e 100%)', accent: '#00D4FF', accentGlow: 'rgba(0,212,255,0.3)', emoji: '🌍', mood: 'default' };

  const daily = get5DayForecast();
  const hourly = getHourlyForecast();

  return (
    <div className="app" style={{ '--accent': theme.accent, '--accent-glow': theme.accentGlow, '--bg': theme.gradient }}>
      {/* Animated Background */}
      <div className="bg-layer" style={{ background: theme.gradient }} />
      <div className="bg-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`,
            opacity: Math.random() * 0.4 + 0.1,
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
          }} />
        ))}
      </div>

      <div className="app-content">
        {/* Header */}
        <header className="app-header">
          <div className="logo">
            <span className="logo-icon">🌤</span>
            <span className="logo-text">SkyCast</span>
          </div>
          <SearchBar
            onSearch={searchCity}
            onGeolocate={fetchByGeolocation}
            recentSearches={recentSearches}
            loading={loading}
          />
          <button
            className="unit-toggle"
            onClick={() => setUnit(u => u === 'metric' ? 'imperial' : 'metric')}
            style={{ borderColor: theme.accent, color: theme.accent }}
          >
            {unit === 'metric' ? '°C / Switch to °F' : '°F / Switch to °C'}
          </button>
        </header>

        {/* Main Content */}
        {loading && !weather && <LoadingScreen />}

        {error && !loading && (
          <div className="error-wrapper">
            <ErrorCard error={error} onRetry={fetchByGeolocation} />
          </div>
        )}

        {weather && (
          <main className="main-content">
            {/* City Header */}
            <div className="city-header">
              <div className="city-info">
                <h1 className="city-name">
                  <span className="pin-icon">📍</span>{city}
                </h1>
                <p className="city-date">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  &nbsp;· {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </div>
              {loading && (
                <div className="update-indicator">
                  <div className="spinner-small" style={{ borderTopColor: theme.accent }} />
                  <span>Updating...</span>
                </div>
              )}
            </div>

            {/* Current Weather */}
            <CurrentWeather weather={weather} airQuality={airQuality} unit={unit} theme={theme} />

            {/* Tabs */}
            <div className="tabs">
              {[
                { id: 'forecast', label: '📊 Forecast' },
                { id: 'map', label: '🗺️ Map' },
              ].map(tab => (
                <button key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'tab-active' : ''}`}
                  style={activeTab === tab.id ? { borderBottomColor: theme.accent, color: theme.accent } : {}}
                  onClick={() => setActiveTab(tab.id)}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Panels */}
            {activeTab === 'forecast' && (
              <div className="forecast-panel">
                {hourly.length > 0 && <HourlyForecast hourly={hourly} unit={unit} theme={theme} />}
                {daily.length > 0 && <DailyForecast daily={daily} unit={unit} theme={theme} />}
              </div>
            )}

            {activeTab === 'map' && (
              <WeatherMap lat={weather.coord.lat} lon={weather.coord.lon} theme={theme} />
            )}
          </main>
        )}

        {/* No data state */}
        {!weather && !loading && !error && (
          <div className="welcome-state">
            <div className="welcome-emoji">🌍</div>
            <h2>Welcome to SkyCast</h2>
            <p>Search for any city or allow location access to get started.</p>
          </div>
        )}

        <footer className="app-footer">
          <span>Powered by OpenWeatherMap API · Built with React ⚛️</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
