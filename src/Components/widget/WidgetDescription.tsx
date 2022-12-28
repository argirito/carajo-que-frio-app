import './WidgetDescription.scss'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { ActualHourCountry, isFog, isRain, isStorm } from '../../utils/Utils'
import Loader from '../Loader/Loader'

const typeWeatherDescription = (code: number) => {
  if ([0, 1].indexOf(code) > -1) {
    return 'Despejadito para ti.'
  }
  if ([2, 3].indexOf(code) > -1) {
    return 'Un poco nublado no te voy a mentir.'
  }
  if (isFog(code)) {
    return 'Niebla de película de terror'
  }
  if (isRain(code)) {
    return 'Lluvia pa refrescar el ambiente.'
  }
  if (isStorm(code)) {
    return 'Una tormenta importante'
  }
  return 'ERR'
}

function WidgetDescription({
  lat,
  lon,
  cityName,
  onGetHourly
}: {
  lat: number
  lon: number
  cityName: string
  onGetHourly: (data: any) => void
}) {
  const [description, setDescription] = useState(0)
  const [minTemp, setMinTemp] = useState(0)
  const [maxTemp, setMaxTemp] = useState(0)
  const [actualTemp, setActualTemp] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [innerCityName, setInnerCityName] = useState(cityName)

  useEffect(() => {
    if (lat !== 0) {
      clima(lat, lon)
      setError(false)
    } else {
      if (localStorage.getItem('cityDetails')) {
        const storageLat = JSON.parse(localStorage.getItem('cityDetails')).lat
        const storageLon = JSON.parse(localStorage.getItem('cityDetails')).lon
        const storageName = JSON.parse(localStorage.getItem('cityDetails')).name
        setInnerCityName(storageName)
        clima(storageLat, storageLon)
      } else {
        clima(40.4167, -3.7033)
      }
    }
  }, [lat, lon])

  useEffect(() => {
    if (cityName) {
      setInnerCityName(cityName)
    }
  }, [cityName])

  const clima = async (lat: number, lon: number) => {
    try {
      setIsLoading(true)
      const res = await axios({
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=c5b5acc1e079fe482a6e9804d2ff18da`,
        method: 'GET'
      })

      const { city, list } = res.data

      const resHourly = await axios({
        url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode`,
        method: 'GET'
      })

      const { hourly } = resHourly.data

      const actualHourInCountry = ActualHourCountry(city.country)

      const actualHourCode = hourly.weathercode[actualHourInCountry]

      onGetHourly({
        country: city.country,
        date: list[0].dt_txt,
        temp: hourly.temperature_2m,
        hour: hourly.time,
        code: hourly.weathercode,
        actualHourCode,
        sensation: Math.trunc(list[0].main.feels_like),
        wind:
          list[0].wind.speed < 1
            ? list[0].wind.speed
            : Math.trunc(list[0].wind.speed)
      })

      setDescription(actualHourCode)

      const date = new Date()
      const actualHour = date.getHours()

      setActualTemp(hourly.temperature_2m[actualHour])

      setMinTemp(Math.min(...hourly.temperature_2m.slice(0, 24)))
      setMaxTemp(Math.max(...hourly.temperature_2m.slice(0, 24)))
    } catch (error: any) {
      console.log(error)
      setError(true)
      onGetHourly({
        country: null,
        date: '',
        temp: [],
        hour: [],
        code: [],
        actualHourCode: null,
        sensation: null,
        wind: null
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="widget-description">
      {error ? (
        <div className="widget-error-text">
          Ha ocurrido un error, mis disculpas
        </div>
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className="widget-info">
                <div className="widget-info-city">
                  {innerCityName === '' ? 'Madrid' : innerCityName}
                </div>
                <div className="widget-info-description">
                  {typeWeatherDescription(description)}
                </div>
                <div className="widget-info-temp-container">
                  <div className="widget-info-temp">Min {minTemp}º</div>
                  <div className="widget-info-temp">Max {maxTemp}º</div>
                </div>
              </div>
              <div className="widget-info-actual">
                {Math.trunc(actualTemp)}º
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default WidgetDescription
