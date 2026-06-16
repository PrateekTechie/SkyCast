import React, { useRef } from 'react';

const getWeatherEmoji = (icon) => {
  const map = {
    '01d': '☀️', '01n': '🌙', '02d': '⛅', '02n': '🌥️',
    '03d': '☁️', '03n': '☁️', '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️', '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️', '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
  };
  return map[icon] || '🌤️';
};

const HourlyForecast = ({ hourly, unit, theme }) => {
  const scrollRef = useRef(null);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  const formatHour = (dt) => {
    const date = new Date(dt * 1000);
    const now = new Date();
    if (date.getHours() === now.getHours() && date.getDate() === now.getDate()) return 'Now';
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  const temps = hourly.map(h => h.main.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = maxTemp - minTemp || 1;

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="hourly-section">
      <div className="section-header">
        <h3 className="section-title">⏱ 24-Hour Forecast</h3>
        <div className="scroll-btns">
          <button className="scroll-btn" onClick={() => scroll(-1)}>‹</button>
          <button className="scroll-btn" onClick={() => scroll(1)}>›</button>
        </div>
      </div>
      <div className="hourly-scroll" ref={scrollRef}>
        {hourly.map((item, i) => {
          const heightPercent = ((item.main.temp - minTemp) / range) * 60 + 20;
          const isNow = i === 0;
          return (
            <div key={item.dt} className={`hourly-card ${isNow ? 'hourly-now' : ''}`}
              style={isNow ? { background: `linear-gradient(180deg, ${theme.accentGlow}, transparent)`, borderColor: theme.accent } : {}}>
              <div className="hour-time" style={isNow ? { color: theme.accent } : {}}>{formatHour(item.dt)}</div>
              <div className="hour-emoji">{getWeatherEmoji(item.weather[0].icon)}</div>
              <div className="hour-bar-container">
                <div className="hour-bar" style={{ height: `${heightPercent}%`, background: isNow ? theme.accent : 'rgba(255,255,255,0.3)' }} />
              </div>
              <div className="hour-temp" style={isNow ? { color: theme.accent } : {}}>{Math.round(item.main.temp)}{unitSymbol}</div>
              {item.pop > 0.1 && (
                <div className="hour-pop">💧{Math.round(item.pop * 100)}%</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
