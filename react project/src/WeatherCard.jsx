import { useState } from "react";

const API_KEY =  "756f70e17f937b83b9f5292e34691b90";

export default function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "City not found");
      }

      setWeather(data);
      setCity(""); 
    } catch (err) {
      console.error("Weather API Error:", err);
      setError(err.message || "Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="weather-dashboard">
      <h2 className="header-txt">Weather Panel</h2>
      
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter city name (e.g., Cairo, London)"
          className="input-city"
          disabled={loading}
        />
        <button
          onClick={fetchWeather}
          className="btn btn-search"
          disabled={loading || !city.trim()}
        >
          
        Search
        </button>
      </div>

      {loading && (
        <div className="loading">
          Searching for weather data...
        </div>
      )}

      {error && (
        <div className="error error-msg">
          ⚠️ {error}
        </div>
      )}

      {weather && (
  <div className="weather-info">
    <div className="weather-name">
      {weather.name}, {weather.sys.country}
    </div>

    <div className="weather-main">
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
        alt={weather.weather[0].description}
      />
      <div className="temp">{Math.round(weather.main.temp)}°C</div>
      <div className="feels-like">Feels like {Math.round(weather.main.feels_like)}°C</div>
    </div>

    <div className="weather-details">
      
      <div className="detail-box"><div>💧 Humidity</div> {weather.main.humidity}%</div>
      <div className="detail-box"><div>💨 Wind</div> {weather.wind.speed} m/s</div>
      <div className="detail-box"><div>🌡️ Max</div> {Math.round(weather.main.temp_max)}°C</div>
      <div className="detail-box"><div>❄️ Min</div> {Math.round(weather.main.temp_min)}°C</div>
    </div>
  </div>
)}

    </div>
  );
}