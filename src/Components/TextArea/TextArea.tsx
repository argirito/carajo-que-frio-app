import './TextArea.scss'

import clsx from 'clsx'
import Label from '../Label/Label'
import InputError from '../Input/InputError'
import { TypeInputError } from '../../types/InputTypes'
import { TypeLabel } from '../../types/UITypes'

function TextArea({
  labelProps,
  textareaProps,
  className,
  error
}: {
  labelProps?: TypeLabel
  textareaProps: any
  className?: string
  error?: TypeInputError
}) {
  return (
    <div className={clsx('text-area', className)}>
      <Label labelProps={{ ...labelProps }} label={labelProps?.label || ''} />
      <textarea {...textareaProps} type="text" />
      <InputError visible={error?.visible}>{error?.message}</InputError>
    </div>
  )
}

export default TextArea
