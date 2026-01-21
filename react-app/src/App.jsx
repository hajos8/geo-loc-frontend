import { useState } from 'react'

import './App.css'

function App() {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)

  const handleLatLongClick = async (e) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function success(position) {
        const { latitude, longitude } = position.coords
        const gotDataJson = await fetch('https://geo-loc-backend-5kwt.vercel.app/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude, longitude })
        })
        const gotData = await gotDataJson.json()
        setLatitude(gotData.latitude)
        setLongitude(gotData.longitude)

      }, console.warn)
    }
  }

  return (
    <>
      <h1>Geolocation</h1>
      <div className="card">
        <button onClick={handleLatLongClick}>
          Get Latitude and Longitude
        </button>
      </div>
      <p>
        <ol>
          <li>Latitude: {latitude}</li>
          <li>Longitude: {longitude}</li>
        </ol>
      </p>
    </>
  )
}

export default App
