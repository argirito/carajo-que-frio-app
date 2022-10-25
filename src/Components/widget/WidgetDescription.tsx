import './WidgetDescription.scss'

import axios from 'axios'
import { useState, useEffect } from 'react'
import Loader from '../Loader/Loader'
import { c } from '../../App'

const typeWeather = (code: number) => {
  if ([0, 1].indexOf(code) > -1) {
    return 'Despejadito para ti.'
  }
  if ([2, 3].indexOf(code) > -1) {
    return 'Un poco nublado no te voy a mentir.'
  }
  if ([45, 48].indexOf(code) > -1) {
    return 'Niebla pero no mucha'
  }
  if ([60, 61, 62, 63, 80, 81, 82].indexOf(code) > -1) {
    return 'Lluvia pa refrescar el ambiente.'
  }
  if ([95, 96, 99].indexOf(code) > -1) {
    return 'Una tormenta importante'
  }
  console.log(code)
  return 'ERR'
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
  const [description, setDescription] = useState(0)
  const [cityName, setCityName] = useState('')
  const [minTemp, setMinTemp] = useState(0)
  const [maxTemp, setMaxTemp] = useState(0)
  const [actualTemp, setActualTemp] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (lat !== 0) {
      clima(lat, lon)
    } else {
      clima(40.4167, -3.7033)
    }
  }, [lat, lon])

  const clima = async (lat: number, lon: number) => {
    try {
      setIsLoading(true)
      const res = await axios({
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=c5b5acc1e079fe482a6e9804d2ff18da`,
        method: 'GET'
      })

      const { city, list } = res.data

      // console.log(res.data)

      setCityName(
        city.name === 'Sol'
          ? 'Madrid'
          : city.name.split(' ').slice(0, 2).join(' ')
      )
      setDescription(list[0].weather[0].main)

      const resHourly = await axios({
        url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode`,
        method: 'GET'
      })

      const { hourly } = resHourly.data

      // c(hourly)

      onGetHourly({
        temp: hourly.temperature_2m,
        hour: hourly.time,
        code: hourly.weathercode
      })

      setDescription(hourly.weathercode[0])

      const date = new Date()
      const actualHour = date.getHours()

      setActualTemp(hourly.temperature_2m[actualHour])

      setMinTemp(Math.min(...hourly.temperature_2m.slice(0, 24)))
      setMaxTemp(Math.max(...hourly.temperature_2m.slice(0, 24)))
    } catch (error: any) {
      console.log(error)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return <div className="">Ha ocurrido un error, mis disculpas</div>
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
              {/* {DescriptionType(description)} */}
              {typeWeather(description)}
            </div>
            <div className="widget-info-temp-container">
              <div className="widget-info-temp">Min {minTemp}º</div>
              <div className="widget-info-temp">Max {maxTemp}º</div>
            </div>
          </div>
          <div className="widget-info-actual">{Math.trunc(actualTemp)}º</div>
        </>
      )}
    </div>
  )
}

export default WidgetDescription
