import './Widget.scss'

export const isNight = (d?: Date): boolean => {
  let date = new Date()

  if (d) {
    date = d
  }
  return date.getHours() >= 21 || date.getHours() <= 6
}

export enum WidgetSize {
  Small = 'small',
  Normal = 'normal'
}

function Widget({
  children,
  title,
  icon,
  iconText,
  size
}: {
  children: React.ReactNode
  title?: string
  icon?: React.ReactNode
  iconText?: string
  size?: WidgetSize
}) {
  return (
    <div
      className={`widget-container ${size === WidgetSize.Small && 'small'} `}
    >
      {title && (
        <div
          className={`widget-title ${size === WidgetSize.Small && 'small'} `}
        >
          {icon && <div className="widget-title-icon">{icon}</div>}
          {iconText && ' ' && (
            <div className="widget-title-icontext">{iconText}</div>
          )}
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

export default Widget
