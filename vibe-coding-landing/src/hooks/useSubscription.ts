import { useState, useCallback } from 'react'
import { insertSubscriber, checkEmailExists } from '@/lib/database'
import { FormData } from '@/types/form'

export const useSubscription = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitSubscription = useCallback(async (formData: FormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Check if email already exists
      const emailExistsResult = await checkEmailExists(formData.email)
      
      if (emailExistsResult.error) {
        throw new Error(emailExistsResult.error)
      }

      if (emailExistsResult.data) {
        throw new Error('This email is already subscribed')
      }

      // Insert new subscriber
      const result = await insertSubscriber(
        formData.name,
        formData.email,
        formData.subscribed
      )

      if (result.error) {
        throw new Error(result.error)
      }

      setIsSubmitted(true)
      return { success: true, data: result.data }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  const resetForm = useCallback(() => {
    setIsSubmitting(false)
    setIsSubmitted(false)
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isSubmitting,
    isSubmitted,
    error,
    submitSubscription,
    resetForm,
    clearError
  }
} 