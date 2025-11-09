import { useState } from "react";
import "./App.css";
import speed from "./assets/speed.png";
import direction from "./assets/direction.png";
import wind from "./assets/wind.png";
import feeling from "./assets/feeling.png";

function WeatherApp() {
  const APIKEY = "eb3c88cf69e595751d0eae9e1cefd0b9";
  const [data, setData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);

  async function getWeather() {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`;
      const response = await fetch(url);
      const weatherData = await response.json();
      setData(weatherData);
      console.log(weatherData);
    } catch (err) {
      console.error("Could not fetch weather ", err);
      setError(err.message);
    }
  }

  function getWeatherEmoji(main) {
    switch (main) {
      case "Clear": return "☀️";
      case "Clouds": return "☁️";
      case "Rain": return "🌧️";
      case "Snow": return "❄️";
      case "Thunderstorm": return "⛈️";
      case "Drizzle": return "🌦️";
      case "Mist":
      case "Fog":
      case "Haze": return "🌫️";
      default: return "❓";
    }
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen   text-white py-10 px-4">


      <div className="flex flex-col sm:flex-row items-center justify-center mb-10 w-full max-w-md gap-4">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter a city"
          className="flex-1 px-5 py-3 border-none outline-none rounded-l-full sm:rounded-l-full sz bg-white/20 text-white placeholder-white/80 text-[16px] backdrop-blur-sm w-full"
        />
        <button
          onClick={getWeather}
          className="px-5 py-3 border-none rounded-tr-[50px] rounded-br-[50px] sm:rounded-tr-[50px] sm:rounded-br-[50px] bg-white/50 hover:bg-white/60 text-white font-bold text-[16px] 
          cursor-pointer transition-colors duration-300 ease-in-out backdrop-blur-[5px] shadow-[0_4px_10px_rgba(0,0,0,0.3)] w-full sm:w-auto"
        >
          Get Weather
        </button>
      </div>


      {data && data.weather && (
        <>
          <h1 className="text-center font-bold text-[2rem] mb-4 ml-10">
            {data.name} {getWeatherEmoji(data.weather[0].main)}
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 text-center w-full max-w-lg p-5 gap-25 mb-3 
          rounded-2xl bg-white/20 backdrop-blur-[10px]
           shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
            <p className="text-[1.2rem] sm:text-[1.5rem]">🌡️ Temp: {(data.main.temp - 273.15).toFixed(1)}°C</p>
            <p className="text-[1.2rem] sm:text-[1.5rem]">
              <img src={feeling} alt="" className="inline w-5 sm:w-[25px] h-5 sm:h-[25px] mr-2" />
              Feels like: {(data.main.feels_like - 273.15).toFixed(1)}°C
            </p>
            <p className="text-[1.2rem] sm:text-[1.5rem]">🌥️ {data.weather[0].description}</p>
            <p className="text-[1.2rem] sm:text-[1.5rem]">🏳️ Country: {data.sys.country}</p>
            <p className="text-[1.2rem] sm:text-[1.5rem]">
              <img src={wind} alt="" className="inline w-5 sm:w-[25px] h-5 sm:h-[25px] mr-2" />
              Wind: {data.wind.speed} km/h
            </p>
            <p className="text-[1.2rem] sm:text-[1.5rem]">
              <img src={direction} alt="" className="inline w-5 sm:w-[25px] h-5 sm:h-[25px] mr-2" />
              {data.wind.deg}° deg
            </p>
            <p className="text-[1.2rem] sm:text-[1.5rem]">
              <img src={speed} alt="" className="inline w-5 sm:w-[25px] h-5 sm:h-[25px] mr-2" />
              Pressure: {data.main.pressure} hPa
            </p>
            <p className="text-[1.2rem] sm:text-[1.5rem]">
              💧 Humidity: {data.main.humidity}%
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default WeatherApp;
