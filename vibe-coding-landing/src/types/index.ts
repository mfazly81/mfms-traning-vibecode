// Base TypeScript interfaces for the project

export interface User {
  id: string
  email: string
  name?: string
  created_at: string
  updated_at: string
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  success: boolean
}

// Add more interfaces as needed for your specific use case 