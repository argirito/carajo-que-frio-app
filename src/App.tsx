import './App.scss'

import { useState } from 'react'
import { connect } from 'react-redux'
import CitiesColumn from './Components/CitiesColumn/CitiesColumn'
import Widget, { isNight } from './Components/widget/Widget'
import WidgetDescription from './Components/widget/WidgetDescription'
import WidgetHour from './Components/widget/WidgetHourly'
import WidgetForecast from './Components/widget/WidgetForecast'
import { typeBackground } from './utils/Utils'

type HourlyData = { code: number[]; hour: Date[]; temp: number[] }

function App(state: any) {
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [hourly, setHourly] = useState<any>()
  const [cities, setCities] = useState<any[]>([])

  return (
    <div className="App">
      <div
        className="App-body-container"
        style={{
          backgroundImage: `url(${typeBackground(
            hourly?.code[0] ?? 0,
            hourly?.date ?? new Date(),
            hourly?.country ?? 'ES'
          )})`
          // 'url(https://img.freepik.com/foto-gratis/gotas-lluvia-ventana_1339-7321.jpg?w=2000&t=st=1666988402~exp=1666989002~hmac=c13fda53e6c1055bebd235b5dc8330f1a4eb09aa493f4fdcfacb1084cb9be413)'
          // 'url(https://img.freepik.com/foto-gratis/lluvia-fuera-ventanas-villa_1321-908.jpg?w=2000&t=st=1666987282~exp=1666987882~hmac=ca54619c2b1d7c78a25d5fd0520ff08a2e3a40cbad6326616734721e6bcce631)'
          // 'url(https://pikwizard.com/photos/sky-clouds-cloud--e64049d0bcbd344f58218af50c4aac56-m.jpg)'
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
            <Widget title="Previsión por horas (48h)">
              <WidgetHour hourly={hourly} />
            </Widget>
            <Widget title="Previsión por días (7 días)">
              <WidgetForecast hourly={hourly} />
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
