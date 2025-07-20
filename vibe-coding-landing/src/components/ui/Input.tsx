import React from 'react'
import { cn } from '@/lib/utils'
import { InputProps } from '@/types/components'

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  disabled = false,
  required = false,
  id,
  name,
  className,
  onBlur,
  ...props
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          'w-full px-4 py-3 text-base font-medium transition-all duration-200',
          'border border-gray-300 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent',
          'placeholder:text-gray-400',
          'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
} 