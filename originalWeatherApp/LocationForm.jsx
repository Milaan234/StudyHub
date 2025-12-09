import { useEffect, useState } from 'react'
import DisplayData from './DisplayData';


function LocationForm({updateWeatherData}) {

    const [city, updateCity] = useState('');

    async function buttonClick() {
        const API_KEY = 'bd9ad7f0eb22499da0e183624252109';
        const CITY = city;
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=yes`
            );
            const convertedWeatherData = await response.json();
            updateWeatherData(convertedWeatherData);
        } catch(error) {
            console.log("Error: ", error);
        }
    }

  return (
    <>
      <div id="locationFormDiv">
        <form onSubmit={(e) => {e.preventDefault()}} id="locationForm">
            <h2>Enter Location:</h2>
            <input type="text" onChange={(e)=>updateCity(e.target.value)}></input>
            <button id="searchButton" onClick={buttonClick}>Search</button>
        </form>
      </div>
    </>
  )
}

export default LocationForm
