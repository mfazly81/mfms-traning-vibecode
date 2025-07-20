import React from 'react'
import { cn } from '@/lib/utils'

// Heading components with responsive sizing
export interface HeadingProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const H1: React.FC<HeadingProps> = ({ 
  children, 
  className, 
  as: Component = 'h1' 
}) => (
  <Component
    className={cn(
      'font-bold text-gray-900 leading-tight',
      'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
      className
    )}
  >
    {children}
  </Component>
)

export const H2: React.FC<HeadingProps> = ({ 
  children, 
  className, 
  as: Component = 'h2' 
}) => (
  <Component
    className={cn(
      'font-semibold text-gray-900 leading-tight',
      'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
      className
    )}
  >
    {children}
  </Component>
)

export const H3: React.FC<HeadingProps> = ({ 
  children, 
  className, 
  as: Component = 'h3' 
}) => (
  <Component
    className={cn(
      'font-semibold text-gray-900 leading-tight',
      'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
      className
    )}
  >
    {children}
  </Component>
)

export const H4: React.FC<HeadingProps> = ({ 
  children, 
  className, 
  as: Component = 'h4' 
}) => (
  <Component
    className={cn(
      'font-semibold text-gray-900 leading-tight',
      'text-lg sm:text-xl md:text-2xl lg:text-3xl',
      className
    )}
  >
    {children}
  </Component>
)

// Text components with consistent styling
export interface TextProps {
  children: React.ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'default' | 'muted' | 'primary' | 'secondary'
}

export const Text: React.FC<TextProps> = ({ 
  children, 
  className, 
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'default'
}) => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  }

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const colorClasses = {
    default: 'text-gray-900',
    muted: 'text-gray-600',
    primary: 'text-primary',
    secondary: 'text-secondary'
  }

  return (
    <Component
      className={cn(
        'leading-relaxed',
        sizeClasses[size],
        weightClasses[weight],
        colorClasses[color],
        className
      )}
    >
      {children}
    </Component>
  )
}

// Specialized text components
export const Lead: React.FC<TextProps> = (props) => (
  <Text {...props} size="lg" color="muted" />
)

export const Small: React.FC<TextProps> = (props) => (
  <Text {...props} size="sm" color="muted" />
)

export const Muted: React.FC<TextProps> = (props) => (
  <Text {...props} color="muted" />
)

export const Strong: React.FC<TextProps> = (props) => (
  <Text {...props} weight="semibold" />
) 