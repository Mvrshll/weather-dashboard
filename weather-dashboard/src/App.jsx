import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';
import WeeklyForecast from './components/WeeklyForecast';
import ThemeToggle from './components/ThemeToggle';
import BorderBeam from './components/BorderBeam';

const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(savedSearches);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    setDarkMode(savedTheme === 'true');
    
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Unable to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
      fetchForecast(data.name);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      fetchForecast(city);
      setError(null);
      updateRecentSearches(city);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Unable to fetch forecast');
      }
      const data = await response.json();
      setForecast(data);
    } catch (err) {
      console.error('Error fetching forecast:', err);
    }
  };

  const updateRecentSearches = (city) => {
    const updatedSearches = [city, ...recentSearches.filter(s => s !== city)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const getWeatherBackground = () => {
    if (!weather) return 'weather-clear';
    const condition = weather.weather[0].main.toLowerCase();
    switch (condition) {
      case 'clear': return 'weather-clear';
      case 'clouds': return 'weather-clouds';
      case 'rain': return 'weather-rain';
      case 'snow': return 'weather-snow';
      case 'thunderstorm': return 'weather-thunderstorm';
      case 'mist': case 'fog': case 'haze': return 'weather-mist';
      default: return 'weather-clear';
    }
  };

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden weather-bg ${getWeatherBackground()} ${darkMode ? 'dark' : ''}`}>
      <div className="weather-content relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        <BorderBeam className="glass p-8 rounded-lg shadow-lg max-w-md w-full fade-in mb-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-white uppercase">Weather Dashboard</h1>
          <SearchBar onSearch={fetchWeather} recentSearches={recentSearches} />
          {error && <ErrorMessage message={error} />}
          {weather && <WeatherCard weather={weather} darkMode={darkMode} />}
        </BorderBeam>
        {forecast && (
          <BorderBeam className="glass p-6 rounded-lg shadow-lg max-w-3xl w-full fade-in">
            <WeeklyForecast forecast={forecast} darkMode={darkMode} />
          </BorderBeam>
        )}
      </div>
    </div>
  );
}

export default App;