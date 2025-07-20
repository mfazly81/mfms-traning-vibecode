export interface Subscriber {
  id: string;
  name: string;
  email: string;
  subscribed_to_updates: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriberInsert {
  name: string;
  email: string;
  subscribed_to_updates?: boolean;
}

// Database operation result types
export interface DatabaseResult<T = any> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Validation error type
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
} 