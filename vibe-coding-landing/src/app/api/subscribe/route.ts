import { NextRequest, NextResponse } from 'next/server'
import { insertSubscriber, checkEmailExists } from '@/lib/database'
import { validateAndSanitizeSubscriber } from '@/lib/validations'
import { withApiHandler, createSuccessResponse, createErrorResponse, parseRequestBody } from '@/lib/api-utils'
import { SubscribeRequest } from '@/types/api'

const subscribeHandler = async (request: NextRequest): Promise<NextResponse> => {
  // Parse request body
  const body = await parseRequestBody<SubscribeRequest>(request)
  if (body instanceof NextResponse) return body

  // Validate and sanitize input
  const validation = validateAndSanitizeSubscriber({
    name: body.name,
    email: body.email,
    subscribed_to_updates: body.subscribed
  })

  if (!validation.isValid) {
    const errors: Record<string, string> = {}
    validation.errors.forEach(error => {
      errors[error.field] = error.message
    })
    return createErrorResponse(Object.values(errors).join(', '), 400)
  }

  try {
    // Check if email already exists
    const emailExistsResult = await checkEmailExists(validation.sanitizedData.email)
    
    if (emailExistsResult.error) {
      console.error('Email check error:', emailExistsResult.error)
      return createErrorResponse('Failed to check email existence', 500)
    }

    if (emailExistsResult.data) {
      return createErrorResponse('This email is already subscribed', 409)
    }

    // Insert new subscriber
    const result = await insertSubscriber(
      validation.sanitizedData.name,
      validation.sanitizedData.email,
      validation.sanitizedData.subscribed_to_updates || false
    )

    if (result.error) {
      console.error('Insert subscriber error:', result.error)
      return createErrorResponse('Failed to subscribe. Please try again.', 500)
    }

    return createSuccessResponse(
      { id: result.data?.id },
      'Successfully subscribed to updates!'
    )
  } catch (error) {
    console.error('Subscribe API error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

// Export the route handler with middleware
export const POST = withApiHandler(subscribeHandler, {
  methods: ['POST'],
  cors: true,
  rateLimit: true
})

// Handle OPTIONS for CORS preflight
export const OPTIONS = async (request: NextRequest) => {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
} 