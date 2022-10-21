import './WidgetDescription.scss'

import axios from 'axios'
import { useState, useEffect } from 'react'
import Loader from '../Loader/Loader'

function DescriptionType(text: string) {
  if (text === 'Clear') {
    return 'Despejadito para ti.'
  }
  if (text === 'Rain') {
    return 'Lluvia pa refrescar el ambiente.'
  }
  if (text === 'Clouds') {
    return 'Un poco nublado no te voy a mentir.'
  }
  if (text === 'Snow') {
    return 'Nievee.'
  }

  return text
}

function WidgetDescription({
  lat,
  lon,
  onGetHourly
}: {
  lat: number
  lon: number
  onGetHourly: (data: any) => void
}) {
  const [description, setDescription] = useState('')
  const [cityName, setCityName] = useState('')
  const [minTemp, setMinTemp] = useState(0)
  const [maxTemp, setMaxTemp] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (lat !== 0) {
      // ubicacion actual de la persona o ver si no tiene favorito
      clima(lat, lon)
    } else {
      clima(lat, lon)

      let allowGeo = false
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        allowGeo = true
        clima(lat, long)
      })

      if (!allowGeo) {
        clima(40.4167, -3.7033)
      }
    }
  }, [lat])

  const clima = async (lat: number, lon: number) => {
    try {
      setIsLoading(true)
      const res = await axios({
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=c5b5acc1e079fe482a6e9804d2ff18da`,
        method: 'GET'
      })

      const { city, list } = res.data

      console.log(res.data)

      setCityName(city.name === 'Sol' ? 'Madrid' : city.name)
      setDescription(list[0].weather[0].main)

      const resHourly = await axios({
        url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode`,
        method: 'GET'
      })

      const { hourly } = resHourly.data
      console.log(hourly)

      onGetHourly({
        temp: hourly.temperature_2m.slice(0, 48),
        hour: hourly.time.slice(0, 48),
        code: hourly.weathercode.slice(0, 48)
      })

      setMinTemp(Math.min(...hourly.temperature_2m.slice(0, 24)))
      setMaxTemp(Math.max(...hourly.temperature_2m.slice(0, 24)))
    } catch (error: any) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="widget-description">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="widget-info">
            <div className="widget-info-city">{cityName}</div>
            <div className="widget-info-description">
              {DescriptionType(description)}
            </div>
            <div className="widget-info-temp-container">
              <div className="widget-info-temp">Min {minTemp}º</div>
              <div className="widget-info-temp">Max {maxTemp}º</div>
            </div>
          </div>
          {/* <img
      className="widget-gif"
      // src={require(`../../Images/sun.gif`)}
      src={require(`../../Images/${ImageWeatherType(description)}.gif`)}
      alt=""
    /> */}
        </>
      )}
    </div>
  )
}

export default WidgetDescription
