import { useEffect, useState } from 'react'

function DisplayData({weatherDetails}) {

  function getTemp() {
    if(weatherDetails !== null) {
      return weatherDetails.current.temp_f;
    } else {
      return "nothing";
    }
  }

  return (
    <>
        <div>
            <h1>Weather Data Fetched:</h1>
            <h2>{getTemp()}</h2>
        </div>
    </>
  )
}

export default DisplayData
