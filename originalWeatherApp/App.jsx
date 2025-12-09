import { useEffect, useState } from 'react'
import LocationForm from './LocationForm';
import DisplayData from './DisplayData';

function App() {

  const [weatherData, setWeatherData] = useState(null);

  return (
    <>
      <h1>Welcome to Weather API Web App!</h1>
      <LocationForm updateWeatherData={setWeatherData} />
      <DisplayData weatherDetails={weatherData}/>
    </>
  )
}

export default App
