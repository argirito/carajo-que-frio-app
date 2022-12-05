import { HourlyData } from '../../App'
import './WidgetWind.scss'

function WidgetWind({ hourly }: { hourly: HourlyData }) {
  return (
    <div className="widget-wind">
      {hourly.wind !== undefined ? (
        <div className="app-wind-weather-container">
          <div className="app-wind-weather">{hourly.wind}</div>
          <div className="app-wind-weather-text">km/h</div>
        </div>
      ) : (
        <div className="widget-error-text">Ha ocurrido un error</div>
      )}
    </div>
  )
}

export default WidgetWind
