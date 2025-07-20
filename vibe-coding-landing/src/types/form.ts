export interface FormData {
  name: string;
  email: string;
  subscribed: boolean;
}

export interface FormState {
  data: FormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

export interface FormMessageProps {
  type: 'success' | 'error' | 'loading';
  message: string;
  className?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
} 