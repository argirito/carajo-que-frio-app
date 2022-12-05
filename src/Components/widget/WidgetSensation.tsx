import { HourlyData } from '../../App'
import './WidgetSensation.scss'

function WidgetSensation({ hourly }: { hourly: HourlyData }) {
  return (
    <div className="widget-sensation">
      {hourly.sensation !== undefined ? (
        <div className="app-sensation-weather">{hourly.sensation}º</div>
      ) : (
        <div className="widget-error-text">Ha ocurrido un error</div>
      )}
    </div>
  )
}

export default WidgetSensation
