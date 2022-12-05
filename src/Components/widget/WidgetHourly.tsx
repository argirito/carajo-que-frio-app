import './WidgetHour.scss'

import { useEffect, useState } from 'react'
import { HourlyData } from '../../App'
import { ActualHourCountry, isNight } from '../../utils/Utils'
import Loader from '../Loader/Loader'

type hourItem = {
  temp: number
  hour: Date
  code: number
}

export const getHour = (text: string | Date) => {
  if (text === 'Ahora') return 'Ahora'
  else {
    const date = new Date(text)
    return date.getHours()
  }
}

const typeWeatherHourly = (
  code: number,
  date?: Date,
  forecast: boolean = false
) => {
  let d = new Date()

  if (date) {
    d = new Date(date)
  }

  if ([0, 1].indexOf(code) > -1) {
    if (forecast) {
      return 'h_sun'
    }
    return isNight(d) ? 'h_moon' : 'h_sun'
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
  if ([51, 53, 55, 60, 61, 62, 63, 80, 81, 82].indexOf(code) > -1) {
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

function WidgetHour({ hourly }: { hourly: HourlyData }) {
  const [hours, setHours] = useState<hourItem[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [actualHour, setActualHour] = useState(0)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!hourly) {
      setError(true)
    } else {
      setError(false)
    }
  }, [hourly])

  useEffect(() => {
    if (hourly?.temp && hourly.temp.length > 0 && hourly.code && hourly.date) {
      const h: hourItem[] = []

      const hour = ActualHourCountry(hourly.country)

      setActualHour(hour)

      for (let i = 0; i < 48; i++) {
        h.push({
          temp: hourly.temp[i],
          hour: hourly.hour[i],
          code: hourly.code[i]
        })
      }
      setHours(h)
      setIsLoading(false)
    }
  }, [hourly])

  function customScrollFunction(event: any) {
    let deltaY = event.deltaY
    let deltaYSign = Math.sign(deltaY)

    if (deltaYSign === -1) {
      document.getElementById('scrl1').scrollBy({
        top: 0,
        left: -169,
        behavior: 'auto'
      })
    } else {
      document.getElementById('scrl1').scrollBy({
        top: 0,
        left: 169,
        behavior: 'auto'
      })
    }
  }

  return (
    <div className="widget-hour" id="scrl1" onWheel={customScrollFunction}>
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
              <div className="inner-widget-hour">
                {hours
                  .slice(actualHour, 24)
                  .map((item: hourItem, index: number) => (
                    <div key={index} className="widget-hour-item">
                      <div className="widget-hour-text">
                        {index === 0 ? 'Ahora' : getHour(item.hour)}{' '}
                      </div>
                      <img
                        className="widget-hour-icon"
                        src={require(`../../Images/${typeWeatherHourly(
                          item.code,
                          item.hour
                        )}.png`)}
                        alt=""
                      />
                      <div className="widget-hour-temp">
                        {Math.trunc(item.temp)}º{' '}
                      </div>
                    </div>
                  ))}
                <div className="widget-hour-separator"></div>
                {hours.slice(0, 24).map((item: hourItem, index: number) => (
                  <div key={index} className="widget-hour-item">
                    <div className="widget-hour-text">
                      {getHour(item.hour)}{' '}
                    </div>
                    <img
                      className="widget-hour-icon"
                      src={require(`../../Images/${typeWeatherHourly(
                        item.code
                      )}.png`)}
                      alt=""
                    />
                    <div className="widget-hour-temp">
                      {Math.trunc(item.temp)}º{' '}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default WidgetHour
