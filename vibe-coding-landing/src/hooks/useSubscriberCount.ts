import { useState, useEffect, useCallback, useRef } from 'react'
import { getSubscriberCount } from '@/lib/database'

export interface SubscriberCountState {
  count: number | null
  isLoading: boolean
  error: string | null
  lastUpdated: Date | null
}

export const useSubscriberCount = (refreshInterval: number = 30000) => {
  const [state, setState] = useState<SubscriberCountState>({
    count: null,
    isLoading: true,
    error: null,
    lastUpdated: null
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const retryCountRef = useRef(0)
  const maxRetries = 3

  const fetchCount = useCallback(async (isRetry: boolean = false) => {
    if (!isRetry) {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
    }

    try {
      const result = await getSubscriberCount()
      
      if (result.error) {
        throw new Error(result.error)
      }

      setState({
        count: result.data || 0,
        isLoading: false,
        error: null,
        lastUpdated: new Date()
      })
      
      // Reset retry count on success
      retryCountRef.current = 0
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch subscriber count'
      
      // Implement retry logic
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current += 1
        console.warn(`Retrying subscriber count fetch (${retryCountRef.current}/${maxRetries})`)
        
        // Exponential backoff: wait 2^retryCount seconds before retrying
        const retryDelay = Math.pow(2, retryCountRef.current) * 1000
        setTimeout(() => fetchCount(true), retryDelay)
        return
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
        lastUpdated: new Date()
      }))
      
      // Reset retry count after max retries
      retryCountRef.current = 0
    }
  }, [])

  // Start auto-refresh interval
  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    intervalRef.current = setInterval(() => {
      fetchCount()
    }, refreshInterval)
  }, [fetchCount, refreshInterval])

  // Stop auto-refresh interval
  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  // Manual refresh function
  const refresh = useCallback(() => {
    fetchCount()
  }, [fetchCount])

  // Initialize and start auto-refresh
  useEffect(() => {
    fetchCount()
    startInterval()

    return () => {
      stopInterval()
    }
  }, [fetchCount, startInterval, stopInterval])

  // Pause auto-refresh when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopInterval()
      } else {
        startInterval()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [startInterval, stopInterval])

  return {
    ...state,
    refresh,
    startInterval,
    stopInterval
  }
} 