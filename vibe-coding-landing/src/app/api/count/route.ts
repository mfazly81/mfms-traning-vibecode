import { NextRequest, NextResponse } from 'next/server'
import { getSubscriberCount } from '@/lib/database'
import { withApiHandler, createSuccessResponse, createErrorResponse } from '@/lib/api-utils'
import { CountResponse } from '@/types/api'

// Simple in-memory cache
const cache = {
  data: null as CountResponse | null,
  timestamp: 0,
  ttl: 60000 // 60 seconds cache
}

const countHandler = async (request: NextRequest): Promise<NextResponse> => {
  const now = Date.now()
  
  // Check cache first
  if (cache.data && (now - cache.timestamp) < cache.ttl) {
    return createSuccessResponse(cache.data, 'Cached subscriber count')
  }

  try {
    const result = await getSubscriberCount()
    
    if (result.error) {
      console.error('Get subscriber count error:', result.error)
      return createErrorResponse('Failed to fetch subscriber count', 500)
    }

    const countData: CountResponse = {
      count: result.data || 0
    }

    // Update cache
    cache.data = countData
    cache.timestamp = now

    return createSuccessResponse(countData, 'Subscriber count retrieved successfully')
  } catch (error) {
    console.error('Count API error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}

// Export the route handler with middleware
export const GET = withApiHandler(countHandler, {
  methods: ['GET'],
  cors: true
})

// Handle OPTIONS for CORS preflight
export const OPTIONS = async (request: NextRequest) => {
  const response = new NextResponse(null, { status: 200 })
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return response
} 