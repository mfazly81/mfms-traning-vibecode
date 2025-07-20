import { supabase, handleSupabaseError } from './supabase'
import { Subscriber, SubscriberInsert, DatabaseResult } from '@/types/database'

// Generic error handling wrapper
export const withErrorHandling = async <T>(
  operation: () => Promise<{ data: T | null; error: any }>
): Promise<DatabaseResult<T>> => {
  try {
    const { data, error } = await operation()
    
    if (error) {
      const supabaseError = handleSupabaseError(error)
      return {
        data: null,
        error: supabaseError.message,
        success: false
      }
    }
    
    return {
      data,
      error: null,
      success: true
    }
  } catch (error) {
    const supabaseError = handleSupabaseError(error)
    return {
      data: null,
      error: supabaseError.message,
      success: false
    }
  }
}

// Insert a new subscriber
export const insertSubscriber = async (
  name: string, 
  email: string, 
  subscribed: boolean = false
): Promise<DatabaseResult<Subscriber>> => {
  return withErrorHandling(async () => {
    // First check if email already exists
    const existingCheck = await checkEmailExists(email)
    if (existingCheck.data) {
      return { 
        data: null, 
        error: 'This email is already subscribed' 
      }
    }

    const { data, error } = await supabase
      .from('subscribers')
      .insert({
        name,
        email,
        subscribed_to_updates: subscribed
      })
      .select()
      .single()
    
    return { data, error }
  })
}

// Get total subscriber count
export const getSubscriberCount = async (): Promise<DatabaseResult<number>> => {
  return withErrorHandling(async () => {
    const { count, error } = await supabase
      .from('subscribers')
      .select('*', { count: 'exact', head: true })
    
    return { data: count || 0, error }
  })
}

// Check if email already exists - Fixed to handle multiple/no rows
export const checkEmailExists = async (email: string): Promise<DatabaseResult<boolean>> => {
  return withErrorHandling(async () => {
    const { data, error } = await supabase
      .from('subscribers')
      .select('email')
      .eq('email', email)
      .maybeSingle() // Use maybeSingle() instead of single()
    
    return { data: !!data, error }
  })
}

// Get all subscribers (for admin purposes)
export const getAllSubscribers = async (): Promise<DatabaseResult<Subscriber[]>> => {
  return withErrorHandling(async () => {
    const { data, error } = await supabase
      .from('subscribers')
      .select('*')
      .order('created_at', { ascending: false })
    
    return { data, error }
  })
}

// Update subscriber subscription status
export const updateSubscriberStatus = async (
  email: string, 
  subscribed: boolean
): Promise<DatabaseResult<Subscriber>> => {
  return withErrorHandling(async () => {
    const { data, error } = await supabase
      .from('subscribers')
      .update({ subscribed_to_updates: subscribed })
      .eq('email', email)
      .select()
      .single()
    
    return { data, error }
  })
} 