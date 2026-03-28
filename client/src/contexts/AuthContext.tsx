// contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import authService from "@/services/authService";
import { User, LoginCredentials, RegisterData } from "@/types/auth";
import { showToast } from "@/lib/toast-helpers";

// Add this type for login result
export type LoginResult =
  | User
  | { verified: false; email: string; requiresVerification: true };

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<LoginResult>;
  register: (userData: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  getProfile: () => Promise<User>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await getProfile();
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);

      // Handle verification required case
      if (response.requiresVerification) {
        return {
          verified: false,
          email: response.email || credentials.email,
          requiresVerification: true,
        };
      }

      // Successful login
      if (response.success && response.user) {
        setUser(response.user);
        showToast.success(response.message || "Login successful");
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        return response.user;
      }

      // Any other case
      throw new Error(response.message || "Login failed");
    } catch (error: any) {
      // Handle any other errors
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<User> => {
    setLoading(true);
    try {
      const response = await authService.register(userData);

      if (response.success && response.user) {
        // Don't set user for unverified accounts
        if (response.user.verified === false) {
          showToast.info(
            "Verify Your Email",
            "Please check your inbox to verify your email before logging in.",
          );
          return response.user;
        }

        setUser(response.user);
        showToast.success(response.message || "Registration successful");
        if (response.token) {
          localStorage.setItem("token", response.token);
        }
        return response.user;
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      localStorage.removeItem("token");
      setUser(null);
      await authService.logout();
      showToast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      showToast.error("Logout failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async (): Promise<User> => {
    try {
      const response = await authService.getProfile();

      if (response.success && response.user) {
        setUser(response.user);
        return response.user;
      } else {
        throw new Error(response.message || "Failed to fetch profile");
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
