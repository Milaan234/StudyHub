import './App.css';
import { useEffect, useState } from 'react'
import Title from './Title';
import WeatherForm from './WeatherForm';
import DisplayWeatherData from './DisplayWeatherData';
import NavBar from './NavBar';
import Questions from './Questions';

function App() {

  const [weatherData, setWeatherData] = useState(()=>{
    const weatherData = JSON.parse(localStorage.getItem("weatherData"));
    if(weatherData) return weatherData;
    return null;
  })

  const [location, setLocation] = useState("questions");

  return (
    <>
      <NavBar setLocation={setLocation}/>
      {location==="account" && <Title />}
      {location==="home" && <WeatherForm setWeatherData={setWeatherData} />}
      {location==="home" && <DisplayWeatherData weatherData={weatherData} />}
      {location==="questions" && <Questions />}
    </>
  )
}

export default App
