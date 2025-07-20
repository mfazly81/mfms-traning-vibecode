'use client'

import { useEffect } from 'react'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return

    const metrics: PerformanceMetrics = {
      fcp: null,
      lcp: null,
      fid: null,
      cls: null,
      ttfb: null,
    }

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcp = entries[entries.length - 1] as PerformanceEntry
      metrics.fcp = fcp.startTime
      console.log('FCP:', metrics.fcp)
    })
    fcpObserver.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lcp = entries[entries.length - 1] as PerformanceEntry
      metrics.lcp = lcp.startTime
      console.log('LCP:', metrics.lcp)
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fid = entries[entries.length - 1] as PerformanceEntry & { processingStart?: number }
      if (fid.processingStart) {
        metrics.fid = fid.processingStart - fid.startTime
        console.log('FID:', metrics.fid)
      }
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift
    let clsValue = 0
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number }
        if (!layoutShift.hadRecentInput && layoutShift.value) {
          clsValue += layoutShift.value
        }
      }
      metrics.cls = clsValue
      console.log('CLS:', metrics.cls)
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart
      console.log('TTFB:', metrics.ttfb)
    }

    // Send metrics to analytics (example)
    const sendMetrics = () => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'performance_metrics', {
          event_category: 'Performance',
          event_label: 'Core Web Vitals',
          fcp: metrics.fcp,
          lcp: metrics.lcp,
          fid: metrics.fid,
          cls: metrics.cls,
          ttfb: metrics.ttfb,
        })
      }
    }

    // Send metrics after page load
    window.addEventListener('load', () => {
      setTimeout(sendMetrics, 1000)
    })

    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [])

  return null
}

// Performance optimization utilities
export function usePerformanceOptimization() {
  useEffect(() => {
    // Preload critical resources
    const preloadLinks = [
      { rel: 'preload', href: '/api/count', as: 'fetch', crossorigin: 'anonymous' },
    ]

    preloadLinks.forEach(({ rel, href, as, crossorigin }) => {
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      if (as) link.as = as
      if (crossorigin) link.crossOrigin = crossorigin
      document.head.appendChild(link)
    })

    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ]

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      document.head.appendChild(link)
    })
  }, [])
}

// Resource hints component
export function ResourceHints() {
  return (
    <>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect for critical resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        as="style"
        onLoad={(e) => {
          const target = e.target as HTMLLinkElement
          target.onload = null
          target.rel = 'stylesheet'
        }}
      />
      
      {/* Preload critical CSS */}
      <link rel="preload" href="/globals.css" as="style" />
    </>
  )
} 