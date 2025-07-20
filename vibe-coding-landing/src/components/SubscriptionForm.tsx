'use client'

import React, { useState, useCallback } from 'react'
import { Input, Button, Checkbox, Card } from '@/components/ui'
import { FormMessage } from '@/components/ui/FormMessage'
import { useFormValidation } from '@/hooks/useFormValidation'
import { useSubscription } from '@/hooks/useSubscription'
import { FormData } from '@/types/form'

export const SubscriptionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subscribed: false
  })

  const {
    errors,
    validateField,
    updateFieldError,
    clearFieldError,
    clearAllErrors,
    validateAndSanitizeForm
  } = useFormValidation()

  const {
    isSubmitting,
    isSubmitted,
    error,
    submitSubscription,
    resetForm
  } = useSubscription()

  // Handle field changes with real-time validation
  const handleFieldChange = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      clearFieldError(field)
    }
  }, [errors, clearFieldError])

  // Handle field blur for validation
  const handleFieldBlur = useCallback((field: keyof FormData, value: string | boolean) => {
    const error = validateField(field, value)
    if (error) {
      updateFieldError(field, error)
    }
  }, [validateField, updateFieldError])

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    clearAllErrors()
    
    // Validate and sanitize form data
    const validation = validateAndSanitizeForm(formData)
    
    if (!validation.isValid) {
      // Set errors from validation
      Object.entries(validation.errors).forEach(([field, error]) => {
        updateFieldError(field as keyof FormData, error)
      })
      return
    }
    
    // Submit form
    const result = await submitSubscription(validation.sanitizedData)
    
    if (result.success) {
      // Form submitted successfully
      setFormData({ name: '', email: '', subscribed: false })
    }
  }, [formData, validateAndSanitizeForm, submitSubscription, clearAllErrors, updateFieldError])

  // Reset form
  const handleReset = useCallback(() => {
    setFormData({ name: '', email: '', subscribed: false })
    resetForm()
  }, [resetForm])

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mb-4">
          <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-xl font-semibold text-white mb-2">
            Subscription Successful!
          </h3>
          <p className="text-white/80 mb-6">
            Thank you for subscribing to our updates. We'll keep you informed about the latest news and features.
          </p>
          <button 
            onClick={handleReset}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Subscribe Another Email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Get Early Access
          </h2>
          <p className="text-white/80 mb-6">
            Join our comprehensive coding course and learn to build your MVP in 30 days.
          </p>
        </div>

        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(value) => handleFieldChange('name', value)}
            onBlur={() => handleFieldBlur('name', formData.name)}
            placeholder="Enter your full name"
            error={errors.name}
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(value) => handleFieldChange('email', value)}
            onBlur={() => handleFieldBlur('email', formData.email)}
            placeholder="Enter your email address"
            error={errors.email}
            required
          />
        </div>

        {/* Subscription Checkbox */}
        <div>
          <Checkbox
            id="subscribed"
            name="subscribed"
            checked={formData.subscribed}
            onChange={(checked) => handleFieldChange('subscribed', checked)}
            label="Subscribe to email updates and newsletters"
          />
        </div>

        {/* Form Messages */}
        {error && (
          <FormMessage
            type="error"
            message={error}
          />
        )}

        {isSubmitting && (
          <FormMessage
            type="loading"
            message="Submitting your subscription..."
          />
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-4 px-6 rounded-lg font-semibold text-lg
              transition-all duration-300 transform hover:scale-105
              shadow-lg hover:shadow-xl
              ${isSubmitting 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white'
              }
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </div>
            ) : (
              'Join the Waitlist'
            )}
          </button>
        </div>

        {/* Terms and Privacy */}
        <p className="text-xs text-white/60 text-center">
          By subscribing, you agree to our{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300 underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-purple-400 hover:text-purple-300 underline">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </div>
  )
} 