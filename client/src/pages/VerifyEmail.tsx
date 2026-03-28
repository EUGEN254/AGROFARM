// pages/VerifyEmail.tsx
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/toast-helpers";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, login, getProfile } = useAuth();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("No verification token provided");
    }
  }, [token]);

  // Auto-login after verification
  useEffect(() => {
    if (status === "success" && userRole && !user) {
      // Auto-login the user
      autoLogin();
    }
  }, [status, userRole, user]);

  // Redirect after user is set
  useEffect(() => {
    if (user && status === "success" && countdown === 0) {
      if (user.role === "farmer") {
        navigate("/farmer");
      } else if (user.role === "buyer") {
        navigate("/buyer");
      } else {
        navigate("/auth/login");
      }
    }
  }, [user, countdown, status, navigate]);

  // Countdown timer effect
  useEffect(() => {
    if (status === "success" && user && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [status, user, countdown]);

  const autoLogin = async () => {
    try {
      const profile = await getProfile();
      console.log("Auto-login successful:", profile);
    } catch (error) {
      console.error("Auto-login failed:", error);
      // If auto-login fails, user will need to login manually
    }
  };

  const verifyEmail = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok && data.success) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
          
          // Store the user data
          if (data.user && data.user.role) {
            setUserRole(data.user.role);
          }
          
          // If token is returned, store it
          if (data.token) {
            localStorage.setItem("token", data.token);
          }
          
          showToast.success("Email Verified", "Redirecting you to your dashboard...");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed");
          showToast.error("Verification Failed", data.message);
        }
      } else {
        if (response.ok) {
          setStatus("success");
          setMessage("Email verified successfully!");
          showToast.success("Email Verified", "Please log in to continue");
        } else {
          setStatus("error");
          setMessage("Verification failed");
          showToast.error("Verification Failed", "Invalid or expired token");
        }
      }
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
      setMessage("An error occurred during verification");
      showToast.error("Error", "Failed to verify email");
    }
  };

  const handleManualRedirect = () => {
    if (user) {
      if (user.role === "farmer") {
        navigate("/farmer");
      } else if (user.role === "buyer") {
        navigate("/buyer");
      }
    } else if (userRole) {
      if (userRole === "farmer") {
        navigate("/farmer");
      } else if (userRole === "buyer") {
        navigate("/buyer");
      }
    } else {
      navigate("/auth/login");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-green-600" />
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">Verifying your email</h2>
                <p className="text-sm text-gray-500">Please wait while we confirm your email address</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          {status === "success" ? (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-gray-900">Email Verified!</h1>
              <p className="text-gray-600 mb-4">{message}</p>
              
              {user && (
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-2">
                    Redirecting you to your {user.role} dashboard in {countdown} seconds...
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={handleManualRedirect}
                >
                  Go to Dashboard Now
                </Button>
                <Link to="/auth/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Login Instead
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-red-100 p-3">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-gray-900">Verification Failed</h1>
              <p className="text-gray-600 mb-6">{message}</p>
              <div className="space-y-3">
                <Link to="/auth/login">
                  <Button variant="outline" className="w-full">
                    Back to Login
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="ghost" className="w-full">
                    Go Home
                  </Button>
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}