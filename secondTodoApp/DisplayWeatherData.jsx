import { useEffect, useState } from 'react'

function DisplayWeatherData({weatherData}) {

    function getTemp() {
        if(weatherData) {
            return weatherData.current.temp_f;
        }
        return "";
    }

  return (
    <>
      <h2>Temp_F: {getTemp()}</h2>
    </>
  )
}

export default DisplayWeatherData
