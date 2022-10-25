import './WidgetHour.scss'

import { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'

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

export const typeWeather = (code: number) => {
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
  if ([60, 61, 62, 63, 80, 81, 82].indexOf(code) > -1) {
    return 'h_rain'
  }
  if ([95, 96, 99].indexOf(code) > -1) {
    return 'h_storm'
  }
  console.log(code)
  return 'ERR'
}

function WidgetHour({ hourly }: { hourly: any }) {
  const [hours, setHours] = useState<hourItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // console.log(hourly)

  useEffect(() => {
    if (hourly?.temp && hourly.temp.length > 0) {
      const h: any[] = []
      const date = new Date()
      const actualHour = date.getHours()

      // h.push({
      //   temp: hourly.temp[actualHour],
      //   hour: 'Ahora',
      //   code: hourly.code[actualHour]
      // })

      for (let i = 0; i < 48; i++) {
        // for (let i = actualHour + 1; i < 35; i++) {
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

  document.onwheel = customScrollFunction

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
    <div className="widget-hour" id="scrl1">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="inner-widget-hour">
            {hours.slice(0, 24).map((item: any, index: number) => (
              <div key={index} className="widget-hour-item">
                <div className="widget-hour-text">{getHour(item.hour)} </div>
                <img
                  className="widget-hour-icon"
                  src={require(`../../Images/${typeWeather(item.code)}.png`)}
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
                  src={require(`../../Images/${typeWeather(item.code)}.png`)}
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
