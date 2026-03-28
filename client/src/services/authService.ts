// services/authService.ts
import axiosInstance from "../config/axiosConfig";
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  LoginResponse,
  ProfileResponse,
  LogoutResponse,
  ResendVerificationResponse
} from "@/types/auth";

const authService = {
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await axiosInstance.post<AuthResponse>(
        "/api/auth/register",
        userData,
      );
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      throw new Error(message);
    }
  },

  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        "/api/auth/login",
        credentials,
      );
      return response.data;
    } catch (error: any) {
      // Check if this is a verification required error (403)
      if (error.response?.status === 403 && error.response?.data?.requiresVerification) {
        // Return the error data as a response object instead of throwing
        return {
          success: false,
          message: error.response.data.message,
          requiresVerification: true,
          email: error.response.data.email,
        };
      }
      
      // For other errors, throw with the message
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  },

  logout: async (): Promise<LogoutResponse> => {
    try {
      const response = await axiosInstance.post<LogoutResponse>("/api/auth/logout");
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Logout failed";
      throw new Error(message);
    }
  },

  getProfile: async (): Promise<ProfileResponse> => {
    try {
      const response = await axiosInstance.get<ProfileResponse>("/api/auth/profile");
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to fetch profile";
      throw new Error(message);
    }
  },

  resendVerificationEmail: async (
    email: string,
  ): Promise<ResendVerificationResponse> => {
    try {
      const response = await axiosInstance.post<ResendVerificationResponse>(
        "/api/auth/resend-verification",
        { email },
      );
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to resend verification email";
      throw new Error(message);
    }
  },
};

export default authService;