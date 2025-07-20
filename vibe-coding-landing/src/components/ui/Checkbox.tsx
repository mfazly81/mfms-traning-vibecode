import React from 'react'
import { cn } from '@/lib/utils'
import { CheckboxProps } from '@/types/components'

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  required = false,
  id,
  name,
  className,
  ...props
}) => {
  const checkboxId = id || name || `checkbox-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={cn('flex items-start', className)}>
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          required={required}
          className={cn(
            'w-4 h-4 text-accent bg-white border-gray-300 rounded',
            'focus:ring-2 focus:ring-accent focus:ring-offset-2',
            'disabled:bg-gray-100 disabled:border-gray-300',
            'cursor-pointer'
          )}
          {...props}
        />
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            'ml-2 text-sm font-medium text-gray-700',
            'cursor-pointer select-none',
            disabled && 'text-gray-400 cursor-not-allowed'
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
    </div>
  )
} 