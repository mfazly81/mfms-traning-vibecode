export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SubscribeRequest {
  name: string;
  email: string;
  subscribed: boolean;
}

export interface CountResponse {
  count: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface RateLimitInfo {
  remaining: number;
  reset: number;
  limit: number;
} 