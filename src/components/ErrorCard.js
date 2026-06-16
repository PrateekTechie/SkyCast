import React from 'react';

const ErrorCard = ({ error, onRetry }) => (
  <div className="error-card">
    <div className="error-icon">⚠️</div>
    <h3 className="error-title">Something went wrong</h3>
    <p className="error-msg">{error}</p>
    <div className="error-actions">
      <button className="retry-btn" onClick={onRetry}>Try Again</button>
      {error.includes('API key') && (
        <a
          href="https://openweathermap.org/api"
          target="_blank"
          rel="noreferrer"
          className="api-link"
        >
          Get Free API Key →
        </a>
      )}
    </div>
    {error.includes('API key') && (
      <div className="api-instructions">
        <p>📋 Setup Instructions:</p>
        <ol>
          <li>Sign up at <strong>openweathermap.org</strong></li>
          <li>Copy your free API key</li>
          <li>Create <code>.env</code> in project root</li>
          <li>Add: <code>REACT_APP_WEATHER_API_KEY=your_key_here</code></li>
          <li>Restart the dev server</li>
        </ol>
      </div>
    )}
  </div>
);

export default ErrorCard;
