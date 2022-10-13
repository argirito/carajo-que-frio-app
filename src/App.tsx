import './App.css'

import { useState } from 'react'
import { connect } from 'react-redux'
import { getAmadeusCities } from './api/GetAmadeusCities'
import Button from './Components/Button/Button'
import Input from './Components/Input/Input'

const region = new Intl.DisplayNames(['en'], { type: 'region' })

function App(state: any) {
  const [input, setInput] = useState('')
  const [cities, setCities] = useState<any[]>([])

  const searchCities = async (text: string) => {
    getAmadeusCities(text).then((data: any) => setCities(data))
  }

  return (
    <div className="App">
      {/* <div className="">
        <h2>{state.state}</h2>
        <h2>{state.state}</h2>
        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={() => store.dispatch({ type: 'RESET' })}>reset</button>
      </div> */}
      <div className="input-container">
        <Input
          className="input-cities"
          inputProps={{
            value: input,
            onChange: (event: any) => setInput(event.currentTarget.value)
          }}
        />
        <Button className="button-cities" onClick={() => searchCities(input)}>
          Ok
        </Button>
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
