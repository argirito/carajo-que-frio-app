import './App.scss'

import { useState } from 'react'
import { connect } from 'react-redux'
import CitiesColumn from './Components/CitiesColumn/CitiesColumn'
import CreditsLabel from './Components/Credits/CreditsLabel'
import Widget, { WidgetSize } from './Components/widget/Widget'
import WidgetDescription from './Components/widget/WidgetDescription'
import WidgetForecast from './Components/widget/WidgetForecast'
import WidgetHour from './Components/widget/WidgetHourly'
import WidgetSensation from './Components/widget/WidgetSensation'
import WidgetWind from './Components/widget/WidgetWind'
import { c, typeBackground } from './utils/Utils'

export type HourlyData = {
  actualHourCode: number
  country: string
  date: string
  sensation: number
  wind: number
  code: number[]
  hour: Date[]
  temp: number[]
}

function App() {
  const [hourly, setHourly] = useState<HourlyData>()
  const [cityDetails, setCityDetails] = useState({
    lat: 0,
    lon: 0,
    city: ''
  })

  return (
    <div className="App">
      <div
        className="App-body-container"
        style={{
          backgroundImage: `url(${typeBackground(
            hourly?.actualHourCode ?? -1,
            hourly?.date ?? new Date(),
            hourly?.country ?? 'ES'
          )})`
        }}
      >
        <div className="App-body">
          <div className="app-first-column">
            <CitiesColumn
              onSelectCity={(lat: number, lon: number, city: string) => {
                setCityDetails({ lat, lon, city })
              }}
            />
          </div>
          <div className="app-second-column">
            <Widget>
              <WidgetDescription
                lat={cityDetails.lat}
                lon={cityDetails.lon}
                cityName={cityDetails.city}
                onGetHourly={setHourly}
              />
            </Widget>
            {hourly && hourly.sensation && (
              <CreditsLabel
                title="OpenWeatherMap"
                link="https://openweathermap.org/"
              />
            )}
            <div className="app-small-widgets">
              {hourly && hourly.sensation !== undefined && (
                <Widget title="Sensación" size={WidgetSize.Small} iconText="🌡">
                  <WidgetSensation hourly={hourly} />
                </Widget>
              )}
              {hourly && hourly.wind && (
                <Widget title="Viento" size={WidgetSize.Small} iconText="🍃">
                  <WidgetWind hourly={hourly} />
                </Widget>
              )}
            </div>
            {hourly && hourly.temp?.length > 0 && (
              <>
                <Widget title="Previsión de hoy y mañana">
                  <WidgetHour hourly={hourly} />
                </Widget>
                <CreditsLabel
                  title="Flaticon"
                  link="https://www.flaticon.com"
                />
              </>
            )}
            {hourly && hourly.temp?.length > 0 && (
              <>
                <Widget title="Previsión por días (7 días)">
                  <WidgetForecast hourly={hourly} />
                </Widget>
                <CreditsLabel title="OpenMeteo" link="https://open-meteo.com" />
              </>
            )}
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
