import './WidgetHour.scss'

import { useEffect, useRef, useState } from 'react'
import { ActualHourCountry, c, countryTimeZone } from '../../utils/Utils'
import Loader from '../Loader/Loader'
import { isNight } from './Widget'

type hourItem = {
  temp: number[]
  hour: string[]
  code: number[]
}

export const getHour = (text: string) => {
  if (text === 'Ahora') return 'Ahora'
  else {
    const date = new Date(text)
    return date.getHours()
  }
}

export const typeWeather = (
  code: number,
  date?: string,
  countryCode?: string
) => {
  let d = new Date()
  let hasCountryCode = false

  if (countryCode && date) {
    const country = countryTimeZone.getCountry(countryCode)
    d = new Date(
      (typeof date === 'string' ? new Date(date) : date).toLocaleString(
        'en-US',
        {
          timeZone: country.timezones[0]
        }
      )
    )
    hasCountryCode = true
  }

  if ([0, 1].indexOf(code) > -1) {
    if (hasCountryCode) {
      c('aaaaaaaa')
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
  if ([60, 61, 62, 63, 80, 81, 82].indexOf(code) > -1) {
    return 'h_rain'
  }
  if ([95, 96, 99].indexOf(code) > -1) {
    return 'h_storm'
  }
  return 'ERR'
}

function WidgetHour({ hourly }: { hourly: any }) {
  const [hours, setHours] = useState<hourItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [actualHour, setActualHour] = useState(0)
  const ref = useRef

  c(hours)

  useEffect(() => {
    if (hourly?.temp && hourly.temp.length > 0 && hourly.code && hourly.date) {
      const h: any[] = []

      const hour = ActualHourCountry(hourly.date, hourly.country)

      setActualHour(hour > 0 ? hour - 1 : hour)

      for (let i = 0; i < 48; i++) {
        h.push({
          temp: hourly.temp[i],
          hour: hourly.hour[i],
          code: hourly.code[i]
        })
      }
      c('ASDFD', h)
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="inner-widget-hour">
            {hours.slice(actualHour, 24).map((item: any, index: number) => (
              <div key={index} className="widget-hour-item">
                <div className="widget-hour-text">
                  {index === 0 ? 'Ahora' : getHour(item.hour)}{' '}
                </div>
                {c(typeWeather(item.code, item.date, item.country))}
                <img
                  className="widget-hour-icon"
                  src={require(`../../Images/${typeWeather(
                    item.code,
                    item.date,
                    item.country
                  )}.png`)}
                  alt=""
                />
                <div className="widget-hour-temp">
                  {Math.trunc(item.temp)}º{' '}
                </div>
              </div>
            ))}
            <div className="widget-hour-separator"></div>
            {hours.slice(0, 24).map((item: any, index: number) => (
              <div key={index} className="widget-hour-item">
                <div className="widget-hour-text">{getHour(item.hour)} </div>
                <img
                  className="widget-hour-icon"
                  src={require(`../../Images/${typeWeather(
                    item.code,
                    item.date,
                    item.country
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
    </div>
  )
}

export default WidgetHour
