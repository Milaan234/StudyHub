import { useEffect, useState } from 'react'
import Title from './Title';

function WeatherForm({setWeatherData}) {

    const [city, setCity] = useState(()=>{
        const city = localStorage.getItem("city");
        if(city) return city;
        return "";
    })

    const [newCity, setNewCity] = useState("");

    function updateCity() {
        localStorage.setItem("city", newCity);
        setCity(newCity);
        getAPIDetails();
    }

    async function getAPIDetails() {
        const API_KEY = "bd9ad7f0eb22499da0e183624252109";
        const CITY = localStorage.getItem("city");

        try {
            const APIData = await fetch (
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=yes`
            )
            if(APIData) {
                const cleanedData = await APIData.json();
                localStorage.setItem("weatherData", JSON.stringify(cleanedData));
                setWeatherData(cleanedData);
            }
        } catch(e) {
            console.log("Error: ", e);
        }
    }

  return (
    <>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <h2>Weather Form:</h2>
        <h2>Enter City:</h2>
        <input type="text" placeholder={city} onChange={(e)=>{setNewCity(e.target.value)}}></input>
        <button onClick={updateCity}>Update City</button>
      </form>
    </>
  )
}

export default WeatherForm
