// import './InputError.scss'

function InputError({
  visible,
  children
}: {
  visible?: boolean
  children: any
}) {
  return <>{visible && <div className="input-error">{children}</div>}</>
}

export default InputError
