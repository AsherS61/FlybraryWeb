'use client'
import { useState } from 'react'
import { Description, Field, Input, Label, Textarea } from '@headlessui/react'
import Button from '../ui/Button'
import clsx from 'clsx'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

export default function TextField({
  id,
  type = 'text',
  value,
  defaultValue,
  onChange,
  onBlur,
  label,
  description,
  placeholder,
  required,
  disabled,
  multiline = false,
  full = false,
  className,
} : TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    if (onChange && !disabled) {
      onChange(event.target.value)
    }
  }

  const handleBlur = ( event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    if (onBlur && !disabled) {
      onBlur(event)
    }
  }

  const inputClasses = clsx(
    full && multiline ? 'h-full' : 'h-10',
    'w-full px-3 py-2',
    'text-gray-900 placeholder:text-gray-400',
    'rounded-md border border-gray-200',
    'shadow-sm transition-all duration-200',
    'outline-none',
    disabled ? 'cursor-not-allowed bg-gray-100' : 'cursor-text bg-white'
  )

  const InputComponent = multiline ? Textarea : Input

  return (
    <Field
      id={`textfield-${id}`}
      className={clsx(
        'flex w-full flex-col gap-y-2',
        full && multiline ? 'h-full' : '',
        className
      )}>
      {label && (
        <Label
          id={`textfield-label-${id}`}
          className={clsx('text-gray-900', disabled && 'text-gray-600')}
          htmlFor={`textfield-input-${id}`}>
          {label} {required && <span className="text-red-600">*</span>}
        </Label>
      )}
      <div className="flex items-center justify-center gap-2">
        <InputComponent
          id={`textfield-input-${id}`}
          {...(!multiline && { type: type === 'password' && showPassword ? 'text' : type })}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className={inputClasses}
        />
        {type === 'password' && !multiline && (
          <Button
            id={`eye-button-${id}`}
            variant="text"
            onClick={() => setShowPassword((prev) => !prev)}
            className="aspect-square h-fit"
            wFit>
            {showPassword ? (
              <EyeIcon className="aspect-square h-4 w-4 text-main-1" />
            ) : (
              <EyeSlashIcon className="aspect-square h-4 w-4 text-main-1" />
            )}
          </Button>
        )}
      </div>
      {description && (
        <Description
          id={`textfield-description-${id}`}
          className={clsx('text-sm', 'text-gray-600', 'transition-all duration-200')}>
          {description}
        </Description>
      )}
    </Field>
  )
}

interface TextFieldProps {
  id?: string
  type?: string
  value?: any
  defaultValue?: any
  onChange?: Function
  onBlur?: Function
  label?: React.ReactNode
  description?: React.ReactNode
  placeholder?: string
  required?: boolean
  disabled?: boolean
  multiline?: boolean
  full?: boolean
  className?: string
}