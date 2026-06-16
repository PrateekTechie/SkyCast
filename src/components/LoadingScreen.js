import React from 'react';

const FACTS = [
  "Lightning strikes the Earth about 100 times every second ⚡",
  "A hurricane releases energy equivalent to 10 atomic bombs per second 🌀",
  "The highest recorded temperature was 56.7°C in Death Valley 🌡️",
  "Raindrops fall at about 9 m/s 🌧️",
  "Snowflakes can take up to an hour to fall from cloud to ground ❄️",
];

const LoadingScreen = () => {
  const fact = FACTS[Math.floor(Math.random() * FACTS.length)];
  return (
    <div className="loading-screen">
      <div className="loading-orb">
        <div className="orb-ring ring1" />
        <div className="orb-ring ring2" />
        <div className="orb-ring ring3" />
        <div className="orb-core">🌍</div>
      </div>
      <p className="loading-text">Fetching weather data...</p>
      <div className="loading-dots">
        <span /><span /><span />
      </div>
      <div className="weather-fact">
        <span className="fact-label">Did you know?</span>
        <p>{fact}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
