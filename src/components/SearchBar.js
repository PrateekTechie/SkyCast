import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, onGeolocate, recentSearches, loading }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowDropdown(false);
    }
  };

  const handleRecentClick = (city) => {
    setQuery(city);
    onSearch(city);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-wrapper" ref={dropdownRef}>
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search city, region..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className="search-input"
          autoComplete="off"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? (
            <div className="spinner-small" />
          ) : (
            <span>Search</span>
          )}
        </button>
        <button
          type="button"
          className="geo-btn"
          onClick={onGeolocate}
          title="Use my location"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="3,11 22,2 13,21 11,13 3,11"/>
          </svg>
        </button>
      </form>
      {showDropdown && recentSearches.length > 0 && (
        <div className="search-dropdown">
          <p className="dropdown-label">Recent Searches</p>
          {recentSearches.map((city, i) => (
            <button key={i} className="dropdown-item" onClick={() => handleRecentClick(city)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
