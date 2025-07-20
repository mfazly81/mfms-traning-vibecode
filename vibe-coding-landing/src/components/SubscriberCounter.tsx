'use client'

import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { useSubscriberCount } from '@/hooks/useSubscriberCount'
import { formatSubscriberMessage } from '@/lib/formatters'

export interface SubscriberCounterProps {
  className?: string
  refreshInterval?: number
  showCard?: boolean
}

export const SubscriberCounter: React.FC<SubscriberCounterProps> = ({
  className,
  refreshInterval = 30000,
  showCard = true
}) => {
  const { count, isLoading, error, lastUpdated } = useSubscriberCount(refreshInterval)
  const [displayCount, setDisplayCount] = useState<number | null>(null)

  // Smooth count updates
  useEffect(() => {
    if (count !== null && !isLoading) {
      // Animate count changes
      const targetCount = count
      const currentCount = displayCount || 0
      
      if (targetCount !== currentCount) {
        const increment = targetCount > currentCount ? 1 : -1
        const step = Math.ceil(Math.abs(targetCount - currentCount) / 20) // 20 steps for smooth animation
        
        const timer = setInterval(() => {
          setDisplayCount(prev => {
            const newCount = (prev || 0) + (increment * step)
            
            if ((increment > 0 && newCount >= targetCount) || 
                (increment < 0 && newCount <= targetCount)) {
              clearInterval(timer)
              return targetCount
            }
            
            return newCount
          })
        }, 50) // Update every 50ms for smooth animation
        
        return () => clearInterval(timer)
      }
    }
  }, [count, isLoading, displayCount])

  // Loading state
  if (isLoading && displayCount === null) {
    const content = (
      <div className="text-center">
        <LoadingSkeleton variant="text" width="80%" height="24px" className="mx-auto mb-2" />
        <LoadingSkeleton variant="text" width="60%" height="16px" className="mx-auto" />
      </div>
    )

    return showCard ? (
      <Card className={className}>
        {content}
      </Card>
    ) : (
      <div className={className}>
        {content}
      </div>
    )
  }

  // Error state
  if (error) {
    const content = (
      <div className="text-center text-gray-600">
        <p className="text-sm">
          Unable to load subscriber count
        </p>
        {lastUpdated && (
          <p className="text-xs text-gray-400 mt-1">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>
    )

    return showCard ? (
      <Card className={className}>
        {content}
      </Card>
    ) : (
      <div className={className}>
        {content}
      </div>
    )
  }

  // Success state
  const message = formatSubscriberMessage(displayCount || count || 0)
  
  const content = (
    <div className="text-center">
      <p className="text-lg font-medium text-gray-900 mb-1">
        {message}
      </p>
      {lastUpdated && (
        <p className="text-xs text-gray-400">
          Updated {lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  )

  return showCard ? (
    <Card className={className}>
      {content}
    </Card>
  ) : (
    <div className={className}>
      {content}
    </div>
  )
}

// Export a simple version without card wrapper
export const SimpleSubscriberCounter: React.FC<Omit<SubscriberCounterProps, 'showCard'>> = (props) => (
  <SubscriberCounter {...props} showCard={false} />
) 