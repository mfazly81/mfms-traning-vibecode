'use client'

import React from 'react'
import { Container, Grid, Flex } from '@/components/ui/Container'
import { H1, H2, Lead } from '@/components/ui/Typography'
import { SubscriptionForm } from '@/components/SubscriptionForm'

const content = {
  headline: "Master Vibe Coding",
  subheadline: "Release Your MVP Within a Month", 
  description: "Join our comprehensive coding course designed for entrepreneurs and founders. Learn the essential skills to build, test, and launch your minimum viable product in just 30 days."
}

// Simple subscriber counter component
const SimpleSubscriberCounter = () => {
  return (
    <div className="text-center text-white/90">
      <p className="text-lg font-medium">
        Join 1,247+ entrepreneurs already on the waitlist
      </p>
      <p className="text-sm text-white/60 mt-1">
        Updated just now
      </p>
    </div>
  )
}

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-16 lg:py-24">
      <Container size="xl" padding="lg">
        <Grid cols={2} gap="xl" className="items-center min-h-[80vh]">
          {/* Left Content - 60% on desktop */}
          <div className="space-y-8 lg:space-y-12">
            {/* Main Headline */}
            <div className="space-y-4">
              <H1 className="text-white">
                {content.headline}
              </H1>
              
              {/* Subheadline */}
              <H2 className="text-white/90">
                {content.subheadline}
              </H2>
            </div>

            {/* Description */}
            <Lead className="text-white/80 text-lg lg:text-xl max-w-2xl">
              {content.description}
            </Lead>

            {/* Subscriber Counter */}
            <div className="pt-4">
              <SimpleSubscriberCounter />
            </div>
          </div>

          {/* Right Form - 40% on desktop */}
          <div className="lg:pl-8">
            <div className="sticky top-8">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <SubscriptionForm />
              </div>
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  )
}

// Mobile-first responsive version
export const HeroSectionMobile: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-12">
      <Container size="lg" padding="md">
        <Flex direction="col" gap="xl" className="min-h-[80vh] justify-center">
          {/* Content Section */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Main Headline */}
            <div className="space-y-4">
              <H1 className="text-white">
                {content.headline}
              </H1>
              
              {/* Subheadline */}
              <H2 className="text-white/90">
                {content.subheadline}
              </H2>
            </div>

            {/* Description */}
            <Lead className="text-white/80 text-lg lg:text-xl">
              {content.description}
            </Lead>

            {/* Subscriber Counter */}
            <div className="pt-4">
              <SimpleSubscriberCounter />
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full max-w-md mx-auto lg:max-w-lg">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <SubscriptionForm />
            </div>
          </div>
        </Flex>
      </Container>
    </section>
  )
}

// Responsive hero that switches between layouts
export const ResponsiveHeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-12 lg:py-24">
      <Container size="xl" padding="lg">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center lg:min-h-[80vh]">
          {/* Left Content - 3/5 columns */}
          <div className="col-span-3 space-y-8">
            <div className="space-y-4">
              <H1 className="text-white">
                {content.headline}
              </H1>
              
              <H2 className="text-white/90">
                {content.subheadline}
              </H2>
            </div>

            <Lead className="text-white/80 text-xl max-w-2xl">
              {content.description}
            </Lead>

            <div className="pt-4">
              <SimpleSubscriberCounter />
            </div>
          </div>

          {/* Right Form - 2/5 columns */}
          <div className="col-span-2">
            <div className="sticky top-8">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <SubscriptionForm />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          <Flex direction="col" gap="xl" className="min-h-[80vh] justify-center">
            {/* Content Section */}
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <H1 className="text-white">
                  {content.headline}
                </H1>
                
                <H2 className="text-white/90">
                  {content.subheadline}
                </H2>
              </div>

              <Lead className="text-white/80 text-lg">
                {content.description}
              </Lead>

              <div className="pt-4">
                <SimpleSubscriberCounter />
              </div>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-md mx-auto">
              <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <SubscriptionForm />
              </div>
            </div>
          </Flex>
        </div>
      </Container>
    </section>
  )
} 