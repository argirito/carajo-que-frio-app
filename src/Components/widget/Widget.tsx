import axios from 'axios'
import { useEffect, useState } from 'react'
import { getAmadeusCities } from '../../api/GetAmadeusCities'

function Widget({ lat, lon }: { lat: string; lon: string }) {
  useEffect(() => {
    if (lat !== '') {
      // ubicacion actual de la persona o ver si no tiene favorito
    }
  })

  useEffect(() => {
    clima('40.4167', '-3.7033')
  }, [])

  const clima = async (lat: string, lon: string) => {
    const res = await axios({
      url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=c5b5acc1e079fe482a6e9804d2ff18da`,
      // url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c5b5acc1e079fe482a6e9804d2ff18da`,
      method: 'GET'
    })

    console.log(res.data)

    const resHourly = await axios({
      url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`,
      method: 'GET'
    })

    console.log(resHourly.data)
  }

  return <div className="widget-container"></div>
}

export default Widget
