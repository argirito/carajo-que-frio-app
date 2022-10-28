import './WidgetForecast.scss'

import { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import { getHour, typeWeather } from './WidgetHourly'

const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

type DayForeCast = {
  day: string
  code: number
  minTemp: number
  maxTemp: number
}

const DayInfo = (
  array: any,
  firstIndex: number,
  lastIndex: number,
  isToday?: boolean
): DayForeCast => {
  const date = new Date(array.hour[firstIndex])
  const minTemp = Math.min(...array.temp.slice(firstIndex, lastIndex))
  const maxTemp = Math.max(...array.temp.slice(firstIndex, lastIndex))
  const code = array.code[0]

  return {
    day: isToday ? 'Hoy' : dias[date.getDay()],
    code,
    minTemp,
    maxTemp
  }
}

function WidgetForecast({ hourly }: { hourly: any }) {
  const [hours, setHours] = useState<DayForeCast[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
      {isLoading ? (
        <Loader />
      ) : (
        <div className="inner-widget-forecast">
          {hours.map((item: DayForeCast, index: number) => (
            <div key={index} className="widget-forecast-item">
              <div className="widget-forecast-text">{item.day} </div>
              <img
                className="widget-forecast-icon"
                src={require(`../../Images/${typeWeather(item.code)}.png`)}
                alt=""
              />
              <div className="widget-forecast-temp">
                {Math.trunc(item.minTemp)}º{' '}
              </div>{' '}
              <div
                className={`widget-forecast-temp-separator ${typeWeather(
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
    </div>
  )
}

export default WidgetForecast
