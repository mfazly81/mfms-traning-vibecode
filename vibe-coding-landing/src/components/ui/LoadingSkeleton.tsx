import React from 'react'
import { cn } from '@/lib/utils'

export interface LoadingSkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  variant?: 'text' | 'circular' | 'rectangular'
  lines?: number
  animated?: boolean
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  width,
  height,
  variant = 'rectangular',
  lines = 1,
  animated = true
}) => {
  const baseClasses = 'bg-gray-200 rounded'
  const animationClasses = animated ? 'animate-pulse' : ''

  const getVariantClasses = () => {
    switch (variant) {
      case 'circular':
        return 'rounded-full'
      case 'text':
        return 'rounded h-4'
      default:
        return 'rounded'
    }
  }

  const getDefaultDimensions = () => {
    switch (variant) {
      case 'circular':
        return { width: '40px', height: '40px' }
      case 'text':
        return { width: '100%', height: '16px' }
      default:
        return { width: '100%', height: '20px' }
    }
  }

  const defaultDims = getDefaultDimensions()
  const finalWidth = width || defaultDims.width
  const finalHeight = height || defaultDims.height

  if (lines > 1 && variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              baseClasses,
              animationClasses,
              getVariantClasses(),
              className
            )}
            style={{
              width: finalWidth,
              height: finalHeight,
              opacity: 1 - (index * 0.1)
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn(
        baseClasses,
        animationClasses,
        getVariantClasses(),
        className
      )}
      style={{
        width: finalWidth,
        height: finalHeight
      }}
    />
  )
}

// Predefined skeleton components for common use cases
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className
}) => (
  <LoadingSkeleton
    variant="text"
    lines={lines}
    className={className}
  />
)

export const CircularSkeleton: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className
}) => (
  <LoadingSkeleton
    variant="circular"
    width={size}
    height={size}
    className={className}
  />
)

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <LoadingSkeleton variant="text" width="60%" />
    <LoadingSkeleton variant="text" lines={3} />
    <LoadingSkeleton variant="rectangular" width="40%" height="32px" />
  </div>
) 