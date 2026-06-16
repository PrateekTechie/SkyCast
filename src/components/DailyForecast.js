import React from 'react';

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

const DailyForecast = ({ daily, unit, theme }) => {
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const allTemps = daily.flatMap(d => [d.tempMin, d.tempMax]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const range = globalMax - globalMin || 1;

  const getDayLabel = (dt, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    return new Date(dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="daily-section">
      <h3 className="section-title">📅 5-Day Forecast</h3>
      <div className="daily-list">
        {daily.map((day, i) => {
          const minLeft = ((day.tempMin - globalMin) / range) * 60;
          const barWidth = ((day.tempMax - day.tempMin) / range) * 60;
          return (
            <div key={day.dt} className={`daily-row ${i === 0 ? 'daily-today' : ''}`}>
              <div className="daily-day">{getDayLabel(day.dt, i)}</div>
              <div className="daily-emoji">{getWeatherEmoji(day.weather[0].icon)}</div>
              <div className="daily-desc">{day.weather[0].main}</div>
              {day.pop > 0.1 && (
                <div className="daily-pop">💧{Math.round(day.pop * 100)}%</div>
              )}
              <div className="daily-temps">
                <span className="temp-low">{Math.round(day.tempMin)}{unitSymbol}</span>
                <div className="temp-bar-track">
                  <div className="temp-bar-fill" style={{
                    left: `${minLeft}%`,
                    width: `${barWidth}%`,
                    background: `linear-gradient(90deg, #38bdf8, ${theme.accent})`
                  }} />
                </div>
                <span className="temp-high">{Math.round(day.tempMax)}{unitSymbol}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
