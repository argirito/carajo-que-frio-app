import './WidgetHour.scss'

import { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'

type hourItem = {
  temp: number
  hour: string
  code: number
}

const getHour = (text: string) => {
  return text.split('').slice(11, 13).join('')
}

const typeWeather = (code: number) => {
  if (code === 1) {
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
  if ([60, 61, 62, 80, 81, 82].indexOf(code) > -1) {
    return 'h_rain'
  }
  return 'h_sun'
}

function WidgetHour({ hourly }: { hourly: any }) {
  const [hours, setHours] = useState<hourItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (hourly.temp && hourly.temp.length > 0) {
      const h: any[] = []
      const date = new Date()
      const actualHour = date.getHours()
      const slide = hourly.temp.length - actualHour

      for (let i = actualHour; i < hourly.temp.length; i++) {
        h.push({
          temp: hourly.temp[i],
          // hour: getHour(hourly.hour[i]),
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
        <div className="inner-widget-hour">
          {hours.map((item: any, index: number) => (
            <div key={index} className="widget-hour-item">
              <div className="widget-hour-hour">{getHour(item.hour)} </div>
              <img
                className="widget-hour-icon"
                src={require(`../../Images/${typeWeather(item.code)}.png`)}
                alt=""
              />
              <div className="widget-hour-temp">{item.temp} </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default WidgetHour
