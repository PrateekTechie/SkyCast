import React from 'react';
import { getWindDirection } from '../utils/weatherHelpers';

const CurrentWeather = ({ weather, airQuality, unit, theme }) => {
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'km/h' : 'mph';
  const windSpeed = unit === 'metric'
    ? (weather.wind.speed * 3.6).toFixed(1)
    : weather.wind.speed.toFixed(1);

  const aqi = airQuality?.list?.[0]?.main?.aqi;
  const aqiLabels = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  const aqiColors = ['', '#4ade80', '#a3e635', '#fbbf24', '#f97316', '#ef4444'];

  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  const now = Date.now() / 1000;
  const dayLength = weather.sys.sunset - weather.sys.sunrise;
  const elapsed = now - weather.sys.sunrise;
  const sunProgress = Math.max(0, Math.min(100, (elapsed / dayLength) * 100));

  const isDay = now > weather.sys.sunrise && now < weather.sys.sunset;

  return (
    <div className="current-weather">
      {/* Main Temperature Display */}
      <div className="temp-display">
        <div className="weather-emoji-large">{theme.emoji}</div>
        <div className="temp-number">
          {Math.round(weather.main.temp)}<span className="temp-unit">{unitSymbol}</span>
        </div>
        <div className="weather-desc">{weather.weather[0].description}</div>
        <div className="feels-like">
          Feels like {Math.round(weather.main.feels_like)}{unitSymbol} · 
          H:{Math.round(weather.main.temp_max)}{unitSymbol} L:{Math.round(weather.main.temp_min)}{unitSymbol}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💧</div>
          <div className="stat-value">{weather.main.humidity}%</div>
          <div className="stat-label">Humidity</div>
          <div className="stat-bar">
            <div className="stat-bar-fill" style={{ width: `${weather.main.humidity}%`, background: '#38bdf8' }} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💨</div>
          <div className="stat-value">{windSpeed}</div>
          <div className="stat-label">Wind {speedUnit} {getWindDirection(weather.wind.deg)}</div>
          <div className="wind-compass">
            <div className="compass-ring">
              <div className="compass-needle" style={{ transform: `rotate(${weather.wind.deg}deg)` }} />
              <span className="compass-n">N</span>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👁️</div>
          <div className="stat-value">{(weather.visibility / 1000).toFixed(1)}</div>
          <div className="stat-label">Visibility km</div>
          <div className="stat-bar">
            <div className="stat-bar-fill" style={{ width: `${Math.min(100, (weather.visibility / 10000) * 100)}%`, background: '#a855f7' }} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🌡️</div>
          <div className="stat-value">{weather.main.pressure}</div>
          <div className="stat-label">Pressure hPa</div>
          <div className="pressure-gauge">
            <svg viewBox="0 0 100 60" width="80">
              <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" strokeLinecap="round"/>
              <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke={theme.accent} strokeWidth="8" strokeLinecap="round"
                strokeDasharray="125" strokeDashoffset={125 - (((weather.main.pressure - 970) / 80) * 125)} />
            </svg>
          </div>
        </div>
        {aqi && (
          <div className="stat-card">
            <div className="stat-icon">🍃</div>
            <div className="stat-value" style={{ color: aqiColors[aqi] }}>{aqiLabels[aqi]}</div>
            <div className="stat-label">Air Quality</div>
            <div className="aqi-dots">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="aqi-dot" style={{ background: i <= aqi ? aqiColors[aqi] : 'rgba(255,255,255,0.15)' }} />
              ))}
            </div>
          </div>
        )}
        <div className="stat-card">
          <div className="stat-icon">☁️</div>
          <div className="stat-value">{weather.clouds.all}%</div>
          <div className="stat-label">Cloud Cover</div>
          <div className="stat-bar">
            <div className="stat-bar-fill" style={{ width: `${weather.clouds.all}%`, background: '#94a3b8' }} />
          </div>
        </div>
      </div>

      {/* Sun Arc */}
      <div className="sun-card">
        <div className="sun-times">
          <div className="sun-time"><span>🌅</span><span>{sunrise}</span><span className="sun-label">Sunrise</span></div>
          <div className="sun-arc-container">
            <svg viewBox="0 0 200 80" width="100%">
              <path d="M20 70 Q100 10 180 70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 3"/>
              <path d="M20 70 Q100 10 180 70" fill="none" stroke={theme.accent} strokeWidth="2.5"
                strokeDasharray={`${sunProgress * 2} 200`}/>
              <circle r="8" fill={isDay ? '#fbbf24' : '#818cf8'}
                style={{
                  offsetPath: 'path("M20 70 Q100 10 180 70")',
                  offsetDistance: `${sunProgress}%`,
                  animation: 'none'
                }}
              />
              <line x1="0" x2="200" y1="70" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
            </svg>
          </div>
          <div className="sun-time"><span>🌇</span><span>{sunset}</span><span className="sun-label">Sunset</span></div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
