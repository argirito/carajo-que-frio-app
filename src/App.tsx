import './App.scss'

import { useState } from 'react'
import { connect } from 'react-redux'
import CitiesColumn from './Components/CitiesColumn/CitiesColumn'
import Widget from './Components/widget/Widget'
import WidgetDescription from './Components/widget/WidgetDescription'
import WidgetHour from './Components/widget/WidgetHourly'
// import cloud from './Images/cloud.gif'

function App(state: any) {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [hourly, setHourly] = useState({})
  const [cities, setCities] = useState<any[]>([])

  return (
    <div className="App">
      <div
        className="App-body-container"
        style={{
          backgroundImage:
            'url(https://pikwizard.com/photos/sky-clouds-cloud--e64049d0bcbd344f58218af50c4aac56-m.jpg)'
        }}
      >
        {/* <div className="">
        <h2>{state.state}</h2>
        <h2>{state.state}</h2>
        <button onClick={() => store.dispatch({ type: 'INCREMENT' })}>+</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={() => store.dispatch({ type: 'RESET' })}>reset</button>
      </div> */}
        <div className="App-body">
          <div className="app-first-column">
            <CitiesColumn
              onSelectCity={(lat: number, lon: number) => {
                setLat(lat)
                setLon(lon)
              }}
            />
          </div>
          <div className="app-second-column">
            <Widget>
              <WidgetDescription
                lat={lat}
                lon={lon}
                onGetHourly={(data: any) => setHourly(data)}
              />
            </Widget>
            <Widget>
              <WidgetHour hourly={hourly} />
            </Widget>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (store: any) => ({
  state: store
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)
