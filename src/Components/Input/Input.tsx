import './Input.scss'

import clsx from 'clsx'

import { TypeInputError } from '../../types/InputTypes'
import { TypeLabel } from '../../types/UITypes'
import InputError from './InputError'
// import React from 'react'
import CloseLineIcon from 'remixicon-react/CloseLineIcon'
import Label from '../Label/Label'

function Input({
  labelProps,
  inputProps,
  className,
  error,
  onClear
}: {
  labelProps?: TypeLabel
  inputProps: any
  className?: string
  error?: TypeInputError
  onClear?: () => void
}) {
  return (
    <div className={clsx('input', className)}>
      <Label labelProps={{ ...labelProps }} label={labelProps?.label || ''} />
      <input {...inputProps} type="text" />
      {inputProps.value !== '' && (
        <div className="input-clear__container">
          <div className="input-clear" onClick={onClear}>
            <CloseLineIcon />
          </div>
        </div>
      )}
      <InputError visible={error?.visible}>{error?.message}</InputError>
    </div>
  )
}

export default Input
