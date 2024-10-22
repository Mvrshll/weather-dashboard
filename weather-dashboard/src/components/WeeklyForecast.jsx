import React from 'react';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

function WeeklyForecast({ forecast, darkMode }) {
  const dailyForecast = forecast.list.filter((item, index) => index % 8 === 0);

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear': return <WiDaySunny className="w-10 h-10 text-yellow-400" />;
      case 'clouds': return <WiCloudy className="w-10 h-10 text-gray-400" />;
      case 'rain': return <WiRain className="w-10 h-10 text-blue-400" />;
      case 'snow': return <WiSnow className="w-10 h-10 text-white" />;
      case 'thunderstorm': return <WiThunderstorm className="w-10 h-10 text-yellow-600" />;
      case 'mist': case 'fog': case 'haze': return <WiFog className="w-10 h-10 text-gray-300" />;
      default: return <WiDaySunny className="w-10 h-10 text-yellow-400" />;
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4 text-white text-shadow text-center uppercase">7-Day Forecast</h3>
      <div className="flex flex-wrap justify-between">
        {dailyForecast.map((day, index) => (
          <div key={index} className="text-center mb-4 w-[calc(25%-0.5rem)] p-2 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
            <p className="text-gray-200 text-shadow uppercase font-semibold">
              {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>
            <div className="flex justify-center">
              {getWeatherIcon(day.weather[0].main)}
            </div>
            <p className="text-white text-shadow uppercase">{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyForecast;