import './WidgetForecast.scss'

import { useEffect, useState } from 'react'
import { HourlyData } from '../../App'
import Loader from '../Loader/Loader'

const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

type DayForeCast = {
  day: string
  code: number
  minTemp: number
  maxTemp: number
  country: string
}

const typeWeatherForecast = (code: number, date?: Date) => {
  if ([0, 1].indexOf(code) > -1) {
    return 'h_sun'
  }
  if (code === 2) {
    return 'h_cloud-sun'
  }
  if (code === 3) {
    return 'h_cloud'
  }
  if ([45, 48].indexOf(code) > -1) {
    return 'h_fog'
  }
  if ([51, 53, 55, 60, 61, 62, 63, 66, 67, 80, 81, 82].indexOf(code) > -1) {
    return 'h_rain'
  }
  if ([71, 73, 75, 77].indexOf(code) > -1) {
    return 'h_snow'
  }
  if ([95, 96, 99].indexOf(code) > -1) {
    return 'h_storm'
  }
  return 'ERR'
}

const DayInfo = (
  array: HourlyData,
  firstIndex: number,
  lastIndex: number,
  isToday?: boolean
): DayForeCast => {
  const date = new Date(array.hour[firstIndex])
  const minTemp = Math.min(...array.temp.slice(firstIndex, lastIndex))
  const maxTemp = Math.max(...array.temp.slice(firstIndex, lastIndex))
  const codeSlice = array.code.slice(firstIndex, lastIndex)
  const code = codeSlice[codeSlice.length / 2]

  return {
    day: isToday ? 'Hoy' : dias[date.getDay()],
    code,
    minTemp,
    maxTemp,
    country: array.country
  }
}

function WidgetForecast({ hourly }: { hourly: HourlyData }) {
  const [hours, setHours] = useState<DayForeCast[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(true)

  useEffect(() => {
    if (!hourly) {
      setError(true)
    } else {
      setError(false)
    }
  }, [hourly])

  useEffect(() => {
    setIsLoading(true)
    if (hourly?.temp && hourly.temp.length > 0) {
      setIsLoading(false)
      const h = [
        DayInfo(hourly, 0, 24, true),
        DayInfo(hourly, 24, 48),
        DayInfo(hourly, 48, 72),
        DayInfo(hourly, 72, 96),
        DayInfo(hourly, 96, 120),
        DayInfo(hourly, 120, 144),
        DayInfo(hourly, 144, 168)
      ]

      setHours(h)
    }
  }, [hourly])

  return (
    <div className="widget-forecast-container">
      {error ? (
        <div className="widget-error-text">
          Ha ocurrido un error, mis disculpas
        </div>
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="inner-widget-forecast">
              {hours.map((item: DayForeCast, index: number) => (
                <div key={index} className="widget-forecast-item">
                  <div className="widget-forecast-text">{item.day} </div>
                  <img
                    className="widget-forecast-icon"
                    src={require(`../../Images/${typeWeatherForecast(
                      item.code,
                      null
                    )}.png`)}
                    alt=""
                  />
                  <div className="widget-forecast-temp">
                    {Math.trunc(item.minTemp)}º{' '}
                  </div>{' '}
                  <div
                    className={`widget-forecast-temp-separator ${typeWeatherForecast(
                      item.code
                    )}`}
                  ></div>
                  <div className="widget-forecast-temp">
                    {Math.trunc(item.maxTemp)}º{' '}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default WidgetForecast
