import { createClient } from '@supabase/supabase-js'

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  }
})

// Error handling types
export interface SupabaseError {
  message: string
  details?: string
  hint?: string
  code?: string
}

// Generic error handler
export const handleSupabaseError = (error: any): SupabaseError => {
  if (error?.message) {
    return {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    }
  }
  
  return {
    message: 'An unexpected error occurred',
    details: error?.toString() || 'Unknown error'
  }
} 