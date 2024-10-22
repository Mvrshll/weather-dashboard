import React from 'react';

function WeatherCard({ weather, darkMode }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold mb-4 text-white text-shadow">{weather.name}</h2>
      <div className="flex items-center justify-center mb-4">
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="mr-4 w-20 h-20"
        />
        <span className="text-5xl text-white text-shadow">{Math.round(weather.main.temp)}°C</span>
      </div>
      <p className="text-xl mb-2 text-gray-200 text-shadow">{weather.weather[0].description}</p>
      <p className="mb-2 text-gray-200 text-shadow">Humidity: {weather.main.humidity}%</p>
      <p className="mb-2 text-gray-200 text-shadow">Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
}

export default WeatherCard;