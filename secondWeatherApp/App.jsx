import { useEffect, useState } from 'react'
import Title from './Title';
import WeatherForm from './WeatherForm';
import DisplayWeatherData from './DisplayWeatherData';

function App() {

  const [weatherData, setWeatherData] = useState(()=>{
    const weatherData = JSON.parse(localStorage.getItem("weatherData"));
    if(weatherData) return weatherData;
    return null;
  })

  return (
    <>
      <Title />
      <WeatherForm setWeatherData={setWeatherData} />
      <DisplayWeatherData weatherData={weatherData} />
    </>
  )
}

export default App
