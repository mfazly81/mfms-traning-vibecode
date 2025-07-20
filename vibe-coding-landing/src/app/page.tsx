import { Suspense } from 'react'
import { ResponsiveHeroSection } from '@/components/HeroSection'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'

// Loading component for the hero section
function HeroSectionSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary py-12 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center min-h-[80vh]">
          {/* Content skeleton */}
          <div className="col-span-3 space-y-8">
            <LoadingSkeleton variant="text" className="h-12 w-3/4" />
            <LoadingSkeleton variant="text" className="h-8 w-1/2" />
            <LoadingSkeleton variant="text" className="h-6 w-full" />
            <LoadingSkeleton variant="text" className="h-6 w-2/3" />
            <LoadingSkeleton variant="text" className="h-4 w-1/3" />
          </div>
          
          {/* Form skeleton */}
          <div className="col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <LoadingSkeleton variant="text" className="h-6 w-1/2" />
              <LoadingSkeleton variant="text" className="h-10 w-full" />
              <LoadingSkeleton variant="text" className="h-10 w-full" />
              <LoadingSkeleton variant="text" className="h-10 w-full" />
              <LoadingSkeleton variant="text" className="h-10 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main page component
export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Suspense for loading state */}
      <Suspense fallback={<HeroSectionSkeleton />}>
        <ResponsiveHeroSection />
      </Suspense>
    </main>
  )
}
