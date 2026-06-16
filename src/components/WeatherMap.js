import React, { useState } from 'react';

const LAYERS = [
  { id: 'temp_new', label: '🌡️ Temp', color: '#ef4444' },
  { id: 'precipitation_new', label: '🌧️ Rain', color: '#38bdf8' },
  { id: 'clouds_new', label: '☁️ Clouds', color: '#94a3b8' },
  { id: 'wind_new', label: '💨 Wind', color: '#a855f7' },
  { id: 'pressure_new', label: '📊 Pressure', color: '#fbbf24' },
];

const WeatherMap = ({ lat, lon, theme }) => {
  const [activeLayer, setActiveLayer] = useState('temp_new');
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'YOUR_API_KEY_HERE';
  const zoom = 5;
  const tileX = Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
  const tileY = Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
  const mapUrl = `https://tile.openstreetmap.org/${zoom}/${tileX}/${tileY}.png`;
  const weatherTileUrl = `https://tile.openweathermap.org/map/${activeLayer}/${zoom}/${tileX}/${tileY}.png?appid=${API_KEY}`;

  return (
    <div className="map-section">
      <h3 className="section-title">🗺️ Weather Map</h3>
      <div className="map-layer-btns">
        {LAYERS.map(l => (
          <button key={l.id}
            className={`layer-btn ${activeLayer === l.id ? 'active' : ''}`}
            style={activeLayer === l.id ? { borderColor: l.color, color: l.color, background: `${l.color}22` } : {}}
            onClick={() => setActiveLayer(l.id)}>
            {l.label}
          </button>
        ))}
      </div>
      <div className="map-container">
        <img src={mapUrl} alt="Map base" className="map-tile map-base" onError={e => e.target.style.display='none'} />
        <img src={weatherTileUrl} alt="Weather overlay" className="map-tile map-overlay" onError={e => e.target.style.display='none'} />
        <div className="map-pin" title={`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`}>
          <div className="pin-dot" style={{ background: theme.accent }} />
          <div className="pin-pulse" style={{ borderColor: theme.accent }} />
        </div>
        <div className="map-coords">
          {lat.toFixed(2)}°N, {lon.toFixed(2)}°E
        </div>
      </div>
    </div>
  );
};

export default WeatherMap;
