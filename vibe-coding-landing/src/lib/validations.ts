import { ValidationResult, ValidationError } from '@/types/database'

// Email validation function
export const validateEmail = (email: string): ValidationResult => {
  const errors: ValidationError[] = []
  
  if (!email) {
    errors.push({ field: 'email', message: 'Email is required' })
    return { isValid: false, errors }
  }
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }
  
  // Check email length
  if (email.length > 255) {
    errors.push({ field: 'email', message: 'Email address is too long' })
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Name validation function
export const validateName = (name: string): ValidationResult => {
  const errors: ValidationError[] = []
  
  if (!name) {
    errors.push({ field: 'name', message: 'Name is required' })
    return { isValid: false, errors }
  }
  
  // Check name length
  if (name.length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' })
  }
  
  if (name.length > 100) {
    errors.push({ field: 'name', message: 'Name is too long (maximum 100 characters)' })
  }
  
  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/
  if (!nameRegex.test(name.trim())) {
    errors.push({ field: 'name', message: 'Name contains invalid characters' })
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Form data validation schemas
export interface SubscriberFormData {
  name: string
  email: string
  subscribed_to_updates?: boolean
}

export const validateSubscriberForm = (data: SubscriberFormData): ValidationResult => {
  const errors: ValidationError[] = []
  
  // Validate name
  const nameValidation = validateName(data.name)
  errors.push(...nameValidation.errors)
  
  // Validate email
  const emailValidation = validateEmail(data.email)
  errors.push(...emailValidation.errors)
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Generic form validation helper
export const validateRequiredField = (
  value: string, 
  fieldName: string, 
  minLength: number = 1
): ValidationError[] => {
  const errors: ValidationError[] = []
  
  if (!value || value.trim().length === 0) {
    errors.push({ field: fieldName, message: `${fieldName} is required` })
  } else if (value.trim().length < minLength) {
    errors.push({ field: fieldName, message: `${fieldName} must be at least ${minLength} character(s) long` })
  }
  
  return errors
}

// Sanitize input data
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ')
}

// Validate and sanitize subscriber data
export const validateAndSanitizeSubscriber = (data: SubscriberFormData): {
  isValid: boolean
  errors: ValidationError[]
  sanitizedData: SubscriberFormData
} => {
  const sanitizedData: SubscriberFormData = {
    name: sanitizeInput(data.name),
    email: data.email.toLowerCase().trim(),
    subscribed_to_updates: data.subscribed_to_updates || false
  }
  
  const validation = validateSubscriberForm(sanitizedData)
  
  return {
    isValid: validation.isValid,
    errors: validation.errors,
    sanitizedData
  }
} 