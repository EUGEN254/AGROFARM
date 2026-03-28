// src/types/auth.ts

export interface User {
  id: number;
  name: string;
  email: string;
  role: "farmer" | "buyer";
  verified: boolean;
  avatar?: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "farmer" | "buyer";
}

// Base response interface
export interface BaseResponse {
  success: boolean;
  message?: string;
}

// Auth response for successful operations
export interface AuthResponse extends BaseResponse {
  user?: User;
  token?: string;
}

// Login specific response with verification flag
export interface LoginResponse extends BaseResponse {
  user?: User;
  token?: string;
  requiresVerification?: boolean;
  email?: string;
}

// Profile response
export interface ProfileResponse extends BaseResponse {
  user?: User;
}

// Logout response
export interface LogoutResponse extends BaseResponse {}

// Resend verification response
export interface ResendVerificationResponse extends BaseResponse {}