import './Label.scss'
import { LabelHTMLAttributes } from 'react'

function Label({
  label,
  labelProps
}: {
  label: string
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}) {
  return <label {...labelProps}>{label}</label>
}

export default Label
