import React, { useRef } from 'react'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import { Button } from '@mui/material'

export default function GeoLocation({ setGeoLocation }) {
  const status = useRef(null)

  function geoFindMe() {
    function success(position) {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      setGeoLocation({ lat, lon })
    }

    function error() {
      status.current.textContent = 'Unable to retrieve your location'
    }

    if (!navigator.geolocation) {
      status.current.textContent = 'Geolocation is not supported by your browser'
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  return (
    <div>
      <Button style={{ marginTop: '20px' }} onClick={() => geoFindMe()} variant="outlined" endIcon={<MyLocationIcon />}>
        Show my location
      </Button>
      <br />
      <p ref={status} id="status"></p>
    </div>
  )
}
