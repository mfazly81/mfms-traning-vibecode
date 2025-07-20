import { NextRequest, NextResponse } from 'next/server'
import { ApiResponse, ApiError, RateLimitInfo } from '@/types/api'

// Generic API response formatters
export const createSuccessResponse = <T>(data: T, message?: string): NextResponse<ApiResponse<T>> => {
  return NextResponse.json({
    success: true,
    data,
    message
  })
}

export const createErrorResponse = (error: string, status: number = 400): NextResponse<ApiResponse<never>> => {
  return NextResponse.json({
    success: false,
    error
  }, { status })
}

export const createApiError = (code: string, message: string, details?: any): ApiError => {
  return {
    code,
    message,
    details
  }
}

// Error response handlers
export const handleDatabaseError = (error: any): NextResponse<ApiResponse<never>> => {
  console.error('Database error:', error)
  
  if (error.message?.includes('duplicate')) {
    return createErrorResponse('This email is already subscribed', 409)
  }
  
  if (error.message?.includes('validation')) {
    return createErrorResponse('Invalid input data', 400)
  }
  
  return createErrorResponse('Internal server error', 500)
}

export const handleValidationError = (errors: Record<string, string>): NextResponse<ApiResponse<never>> => {
  const errorMessage = Object.values(errors).join(', ')
  return createErrorResponse(errorMessage, 400)
}

export const handleRateLimitError = (): NextResponse<ApiResponse<never>> => {
  return createErrorResponse('Too many requests. Please try again later.', 429)
}

// Request validation utilities
export const validateRequestMethod = (request: NextRequest, method: string): NextResponse<ApiResponse<never>> | null => {
  if (request.method !== method) {
    return createErrorResponse(`Method ${request.method} not allowed`, 405)
  }
  return null
}

export const validateContentType = (request: NextRequest, expectedType: string = 'application/json'): NextResponse<ApiResponse<never>> | null => {
  const contentType = request.headers.get('content-type')
  if (!contentType?.includes(expectedType)) {
    return createErrorResponse('Invalid content type', 400)
  }
  return null
}

export const parseRequestBody = async <T>(request: NextRequest): Promise<T | NextResponse<ApiResponse<never>>> => {
  try {
    const body = await request.json()
    return body as T
  } catch (error) {
    return createErrorResponse('Invalid JSON in request body', 400)
  }
}

// CORS handling functions
export const setCorsHeaders = (response: NextResponse): NextResponse => {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
}

export const handleCors = (request: NextRequest): NextResponse | null => {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    return setCorsHeaders(response)
  }
  return null
}

// Rate limiting utilities
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

export const checkRateLimit = (identifier: string, limit: number = 5, windowMs: number = 60000): boolean => {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }
  
  if (record.count >= limit) {
    return false
  }
  
  record.count++
  return true
}

export const getRateLimitInfo = (identifier: string): RateLimitInfo | null => {
  const record = rateLimitStore.get(identifier)
  if (!record) return null
  
  return {
    remaining: Math.max(0, 5 - record.count),
    reset: record.resetTime,
    limit: 5
  }
}

// Generic middleware wrapper
export const withApiHandler = (
  handler: (request: NextRequest) => Promise<NextResponse>,
  options: {
    methods?: string[]
    cors?: boolean
    rateLimit?: boolean
  } = {}
) => {
  return async (request: NextRequest): Promise<NextResponse> => {
    // Handle CORS
    if (options.cors) {
      const corsResponse = handleCors(request)
      if (corsResponse) return corsResponse
    }
    
    // Validate method
    if (options.methods) {
      const methodError = validateRequestMethod(request, options.methods[0])
      if (methodError) return methodError
    }
    
    // Rate limiting
    if (options.rateLimit) {
      const clientIp = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
      if (!checkRateLimit(clientIp)) {
        return handleRateLimitError()
      }
    }
    
    // Call the actual handler
    try {
      const response = await handler(request)
      return options.cors ? setCorsHeaders(response) : response
    } catch (error) {
      console.error('API handler error:', error)
      return createErrorResponse('Internal server error', 500)
    }
  }
} 