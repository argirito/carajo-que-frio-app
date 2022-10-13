import './Input.scss'

import clsx from 'clsx'

import InputError from './InputError'
import { TypeLabel } from '../../types/UITypes'
import { TypeInputError } from '../../types/InputTypes'
// import React from 'react'
import Label from '../Label/Label'

function Input({
  labelProps,
  inputProps,
  className,
  error
}: {
  labelProps?: TypeLabel
  inputProps: any
  className?: string
  error?: TypeInputError
}) {
  return (
    <div className={clsx('input', className)}>
      <Label labelProps={{ ...labelProps }} label={labelProps?.label || ''} />
      <input {...inputProps} type="text" />
      <InputError visible={error?.visible}>{error?.message}</InputError>
    </div>
  )
}

export default Input
