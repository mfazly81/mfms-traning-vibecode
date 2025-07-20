import React from 'react'
import { cn } from '@/lib/utils'
import { CardProps } from '@/types/components'

export const Card: React.FC<CardProps> = ({
  children,
  className,
  shadow = 'md',
  padding = 'md',
  ...props
}) => {
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200',
        shadowClasses[shadow],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 