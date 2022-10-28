import './Widget.scss'

function ImageWeatherType(text: string) {
  if (text === 'Clear') {
    return isNight() ? 'moon' : 'sun'
  }
  if (text === 'Rain') {
    return 'cloud-rain'
  }
  if (text === 'Snow') {
    return 'cloud-snow'
  }
  if (text === 'Clouds') {
    return 'cloud'
  }
  if (text === '') {
    return 'sun'
  }
}

export const isNight = (d?: Date): boolean => {
  let date = new Date()

  if (d) {
    date = d
  }

  return date.getHours() >= 22 || date.getHours() <= 6
}

function Widget({
  children,
  title
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <div className="widget-container">
      {title && <div className="widget-title">{title}</div>}
      {children}
    </div>
  )
}

export default Widget
