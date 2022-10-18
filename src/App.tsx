import './App.css'

import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAmadeusCities } from './api/GetAmadeusCities'
import Button from './Components/Button/Button'
import Input from './Components/Input/Input'
import axios from 'axios'
import CitiesColumn from './Components/CitiesColumn/CitiesColumn'
import Widget from './Components/widget/Widget'
// import cloud from './Images/cloud.gif'

const region = new Intl.DisplayNames(['en'], { type: 'region' })

function App(state: any) {
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [cities, setCities] = useState<any[]>([])

  // const searchCities = async (text: string) => {
  //   // getAmadeusCities(text).then((data: any) => {
  //   //   setCities(data)
  //   // })
  //   const lat = '3.43722'
  //   // const lat = data[0].geoCode.latitude
  //   const lon = '-76.5225'
  //   // const lon = data[0].geoCode.longitude
  //   clima(lat, lon)
  // }

  // useEffect(() => {
  //   clima('3.43722', '-76.5225')
  // }, [])

  // const clima = async (lat: string, lon: string) => {
  //   const res = await axios({
  //     url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c5b5acc1e079fe482a6e9804d2ff18da`,
  //     method: 'GET'
  //   })

  //   console.log(res.data)
  // }

  return (
    <div className="App">
      {/* <div className="">
        <h2>{state.state}</h2>
        <h2>{state.state}</h2>
        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={() => store.dispatch({ type: 'RESET' })}>reset</button>
      </div> */}
      <img className="img-cloud" src={require('./Images/cloud.gif')} alt="" />
      <div className="input-container">
        <CitiesColumn
          onSelectCity={(lat: string, lon: string) => {
            setLat(lat)
            setLon(lon)
          }}
        />
        <Widget lat={lat} lon={lon} />
      </div>
      <div className="city-map">
        {cities.map((city: any, index: number) => (
          <div key={index} className="city-item">
            <div className="city-item__text">{city.name}</div>
            <div className="city-item__country">
              - {region.of(city.address.countryCode)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (store: any) => ({
  state: store
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
