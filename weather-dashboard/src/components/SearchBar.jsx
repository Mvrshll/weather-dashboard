import React, { useState } from 'react';

function SearchBar({ onSearch, recentSearches }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white bg-opacity-20 text-white placeholder-gray-300"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Search
          </button>
        </div>
      </form>
      {recentSearches.length > 0 && (
        <div>
          <p className="text-sm mb-2 text-gray-200 text-shadow">Recent searches:</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => onSearch(search)}
                className="px-3 py-1 text-sm bg-white bg-opacity-20 text-white text-shadow rounded hover:bg-opacity-30 transition duration-300"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;