import React, { useState, useEffect } from 'react';
import './main.css';
import search from '../assets/search.png';
import cloud from '../assets/cloud.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';
import rain from '../assets/rain.png';
import snow from '../assets/snow.png';
import drizzle from '../assets/drizzle.png';
import clear from '../assets/clear.png';

export const Main = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: '64%',
    windSpeed: '10 km/h',
    temperatureCelsius: '17',
    temperatureFahrenheit: '62.6',
    location: 'Nakuru',
  });

  const [wicon, setWicon] = useState(cloud);
  const [greeting, setGreeting] = useState('');

  const apiKey = '5bbd65a70808c71bf1c0f1e14db11d87';

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning!');
      } else if (hour >= 12 && hour < 18) {
        setGreeting('Good afternoon!');
      } else {
        setGreeting('Good evening!');
      }
    };
    getGreeting();
  }, []);

  const searchWeather = async () => {
    const searchInput = document.getElementById('searchInput');

    if (!searchInput.value) {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const result = await response.json();

      setWeatherData({
        humidity: result.main.humidity + '%',
        windSpeed: result.wind.speed + ' km/h',
        temperatureCelsius: result.main.temp,
        temperatureFahrenheit: convertToFahrenheit(result.main.temp),
        location: result.name,
      });

      if (result.weather && result.weather.length > 0) {
        const iconCode = result.weather[0].icon;
        setWeatherIcon(iconCode);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const convertToFahrenheit = (celsius) => {
    return (celsius * 9 / 5 + 32).toFixed(1);
  };

  const setWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        setWicon(clear);
        break;
      case '02d':
      case '02n':
        setWicon(cloud);
        break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        setWicon(drizzle);
        break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        setWicon(rain);
        break;
      case '13d':
      case '13n':
        setWicon(snow);
        break;
      default:
        setWicon(cloud);
        break;
    }
  };

  return (
    <div className="container">
      <div className="greeting">{greeting}</div>
      <div className="t-bar">
        <input type="text" id="searchInput" placeholder="search" />
        <div className="search" onClick={searchWeather}>
          <img src={search} alt="" />
        </div>
      </div>

      <div className="main">
        <img src={wicon} alt="" />
      </div>

      <div className="weather_2">
        {weatherData.temperatureCelsius}°C / {weatherData.temperatureFahrenheit}°F
      </div>
      <div className="location">{weatherData.location}</div>
      <div className="data-wrapper">
        <div className="element">
          <img src={humidityIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcon} alt="" className="icon" />
          <div className="data">
            <div className="wind">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
