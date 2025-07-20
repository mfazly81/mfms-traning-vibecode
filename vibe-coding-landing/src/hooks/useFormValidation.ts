import { useState, useCallback } from 'react'
import { validateEmail, validateName, validateAndSanitizeSubscriber } from '@/lib/validations'
import { FormData, ValidationResult } from '@/types/form'

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Real-time validation for individual fields
  const validateField = useCallback((field: keyof FormData, value: string | boolean): string => {
    switch (field) {
      case 'name':
        const nameValidation = validateName(value as string)
        return nameValidation.errors[0]?.message || ''
      
      case 'email':
        const emailValidation = validateEmail(value as string)
        return emailValidation.errors[0]?.message || ''
      
      default:
        return ''
    }
  }, [])

  // Validate entire form
  const validateForm = useCallback((data: FormData): ValidationResult => {
    const formErrors: Record<string, string> = {}
    
    // Validate name
    const nameError = validateField('name', data.name)
    if (nameError) {
      formErrors.name = nameError
    }
    
    // Validate email
    const emailError = validateField('email', data.email)
    if (emailError) {
      formErrors.email = emailError
    }
    
    return {
      isValid: Object.keys(formErrors).length === 0,
      errors: formErrors
    }
  }, [validateField])

  // Update field error
  const updateFieldError = useCallback((field: keyof FormData, error: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: error
    }))
  }, [])

  // Clear field error
  const clearFieldError = useCallback((field: keyof FormData) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setErrors({})
  }, [])

  // Validate and sanitize form data
  const validateAndSanitizeForm = useCallback((data: FormData) => {
    const validation = validateAndSanitizeSubscriber({
      name: data.name,
      email: data.email,
      subscribed_to_updates: data.subscribed
    })

    const formErrors: Record<string, string> = {}
    validation.errors.forEach(error => {
      formErrors[error.field] = error.message
    })

    return {
      isValid: validation.isValid,
      errors: formErrors,
      sanitizedData: {
        name: validation.sanitizedData.name,
        email: validation.sanitizedData.email,
        subscribed: validation.sanitizedData.subscribed_to_updates || false
      }
    }
  }, [])

  return {
    errors,
    validateField,
    validateForm,
    updateFieldError,
    clearFieldError,
    clearAllErrors,
    validateAndSanitizeForm
  }
} 