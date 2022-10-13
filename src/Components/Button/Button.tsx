import './Button.scss'

import clsx from "clsx"
import LoaderLineIcon from 'remixicon-react/LoaderLineIcon'

function Button({ 
  className, 
  loading,
  startIcon,
  endIcon,
  children,
  onClick,
  props
}: { 
  className?: string; 
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  props?: any
}) {
  return (
    <div className={clsx("button", className)}>
      <button
      {...props}
        // type="button"
        className={clsx("button", className)}
        onClick={onClick}
      >
        <div className="button__inner">
          {!loading && startIcon}
          {children}
          {loading && <LoaderLineIcon />}
          {!loading && endIcon}
        </div>
      </button>
    </div>
  )
}

export default Button
