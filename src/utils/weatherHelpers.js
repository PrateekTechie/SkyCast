// Weather condition to gradient/icon mapping
export const getWeatherTheme = (condition, isDay) => {
  const c = condition?.toLowerCase() || '';
  
  if (c.includes('thunder') || c.includes('storm')) {
    return {
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #2d1b69 100%)',
      accent: '#a855f7',
      accentGlow: 'rgba(168, 85, 247, 0.3)',
      emoji: '⛈️',
      mood: 'stormy'
    };
  }
  if (c.includes('snow') || c.includes('blizzard') || c.includes('sleet')) {
    return {
      gradient: 'linear-gradient(135deg, #e8f4fd 0%, #c3defe 40%, #a8c8e8 100%)',
      accent: '#3b82f6',
      accentGlow: 'rgba(59, 130, 246, 0.3)',
      emoji: '❄️',
      mood: 'snowy'
    };
  }
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) {
    return {
      gradient: 'linear-gradient(135deg, #1e3a5f 0%, #2d5986 40%, #1a2f4a 100%)',
      accent: '#38bdf8',
      accentGlow: 'rgba(56, 189, 248, 0.3)',
      emoji: '🌧️',
      mood: 'rainy'
    };
  }
  if (c.includes('fog') || c.includes('mist') || c.includes('haze') || c.includes('smoke')) {
    return {
      gradient: 'linear-gradient(135deg, #4a5568 0%, #718096 40%, #a0aec0 100%)',
      accent: '#e2e8f0',
      accentGlow: 'rgba(226, 232, 240, 0.3)',
      emoji: '🌫️',
      mood: 'foggy'
    };
  }
  if (c.includes('cloud') || c.includes('overcast')) {
    return isDay
      ? {
          gradient: 'linear-gradient(135deg, #4a7fa5 0%, #6b9fc2 40%, #4a7fa5 100%)',
          accent: '#fed7aa',
          accentGlow: 'rgba(254, 215, 170, 0.3)',
          emoji: '☁️',
          mood: 'cloudy'
        }
      : {
          gradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d3561 40%, #1a1a2e 100%)',
          accent: '#94a3b8',
          accentGlow: 'rgba(148, 163, 184, 0.3)',
          emoji: '☁️',
          mood: 'cloudy-night'
        };
  }
  if (c.includes('sunny') || c.includes('clear')) {
    return isDay
      ? {
          gradient: 'linear-gradient(135deg, #0a2463 0%, #1e5fa8 40%, #ff6b35 100%)',
          accent: '#fbbf24',
          accentGlow: 'rgba(251, 191, 36, 0.4)',
          emoji: '☀️',
          mood: 'sunny'
        }
      : {
          gradient: 'linear-gradient(135deg, #0a0e1a 0%, #0d1b3e 40%, #1a2744 100%)',
          accent: '#818cf8',
          accentGlow: 'rgba(129, 140, 248, 0.3)',
          emoji: '🌙',
          mood: 'clear-night'
        };
  }
  // Default
  return {
    gradient: isDay
      ? 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #7c3aed 100%)'
      : 'linear-gradient(135deg, #0a0e1a 0%, #1a1f35 50%, #0d1b3e 100%)',
    accent: '#00D4FF',
    accentGlow: 'rgba(0, 212, 255, 0.3)',
    emoji: isDay ? '🌤️' : '🌙',
    mood: 'default'
  };
};

export const getWindDirection = (degrees) => {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(degrees / 22.5) % 16];
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const formatDay = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
};

export const getUVLabel = (uvi) => {
  if (uvi <= 2) return { label: 'Low', color: '#4ade80' };
  if (uvi <= 5) return { label: 'Moderate', color: '#fbbf24' };
  if (uvi <= 7) return { label: 'High', color: '#f97316' };
  if (uvi <= 10) return { label: 'Very High', color: '#ef4444' };
  return { label: 'Extreme', color: '#a855f7' };
};

export const getAQILabel = (aqi) => {
  const labels = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
  const colors = ['', '#4ade80', '#a3e635', '#fbbf24', '#f97316', '#ef4444'];
  return { label: labels[aqi] || 'N/A', color: colors[aqi] || '#94a3b8' };
};
