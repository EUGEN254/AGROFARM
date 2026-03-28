// pages/Auth.tsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Mail, Lock, Chrome, Send, RefreshCw } from "lucide-react";
import heroFarm from "@/assets/hero-farm.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { showToast } from "@/lib/toast-helpers";
import authService from "@/services/authService";
import type { User } from "@/types/auth";

export default function Auth() {
  const { mode, role } = useParams();
  const navigate = useNavigate();
  const [showVerificationDiv, setShowVerificationDiv] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const { login, register, loading } = useAuth();

  const isLogin = mode === "login";
  const isSignup = mode === "signup";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isLogin) {
        const result = await login({
          email: form.email,
          password: form.password,
        });

        console.log("Login result:", result);

        // Check if verification is required
        if (
          result &&
          typeof result === "object" &&
          "requiresVerification" in result &&
          result.requiresVerification === true
        ) {
          setRegisteredEmail(result.email);
          setShowVerificationDiv(true);
          return;
        }

        // Successful login with verified user
        const user = result as User;
        if (user.role === "farmer") {
          navigate("/farmer");
        } else if (user.role === "buyer") {
          navigate("/buyer");
        } else {
          navigate("/");
        }
      } else if (role) {
        // Handle signup
        const user = await register({
          name: form.name,
          email: form.email,
          password: form.password,
          role: role as "farmer" | "buyer",
        });

        // Check if email verification is required
        if (user && user.verified === false) {
          setRegisteredEmail(form.email);
          setShowVerificationDiv(true);
          return;
        }

        // If user is verified, navigate to dashboard
        if (user.role === "farmer") {
          navigate("/farmer");
        } else if (user.role === "buyer") {
          navigate("/buyer");
        } else {
          navigate("/");
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      showToast.error(err.message || "Authentication failed");
    }
  };

  const handleResendVerification = async () => {
    if (!registeredEmail) return;

    setIsResending(true);
    try {
      const response =
        await authService.resendVerificationEmail(registeredEmail);
      if (response.success) {
        showToast.success(
          "Verification email resent! Please check your inbox.",
        );
      } else {
        showToast.error(
          response.message || "Failed to resend verification email",
        );
      }
    } catch (err: any) {
      showToast.error(err.message || "Failed to resend verification email");
    } finally {
      setIsResending(false);
    }
  };

  const handleGoogleAuth = () => {
    // Implement Google OAuth
    console.log(isLogin ? "Google Login" : "Google Signup");
    // window.location.href = "/api/auth/google";
  };

  const goHome = () => navigate("/");

  /* -------------------------
     VERIFICATION DIV (shown after signup)
  --------------------------*/
  if (showVerificationDiv) {
    return (
      <AuthShell title="Verify Your Email" onHome={goHome}>
        <AuthCard>
          <div className="text-center space-y-4">
            {/* Icon */}
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Send className="h-8 w-8 text-primary" />
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold">Check Your Inbox</h2>

            {/* Message */}
            <p className="text-muted-foreground">
              We've sent a verification email to
            </p>
            <p className="font-medium text-foreground">{registeredEmail}</p>
            <p className="text-sm text-muted-foreground">
              Please click the link in the email to verify your account. Once
              verified, you can log in.
            </p>

            {/* Divider */}
            <Divider />

            {/* Resend Button */}
            <Button
              variant="outline"
              onClick={handleResendVerification}
              disabled={isResending}
              className="w-full gap-2"
            >
              <RefreshCw
                size={16}
                className={isResending ? "animate-spin" : ""}
              />
              {isResending ? "Sending..." : "Resend Verification Email"}
            </Button>

            {/* Back to Login */}
            <Button
              variant="ghost"
              onClick={() => navigate("/auth/login")}
              className="w-full"
            >
              Back to Login
            </Button>
          </div>
        </AuthCard>
      </AuthShell>
    );
  }

  /* -------------------------
     1. LOGIN SCREEN
  --------------------------*/
  if (isLogin) {
    return (
      <AuthShell title="Welcome Back" onHome={goHome}>
        <AuthCard>
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}

          <GoogleButton
            onClick={handleGoogleAuth}
            text="Continue with Google"
          />

          <Divider />

          <AuthForm
            isLogin
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
          />

          <SwitchLink
            text="Don’t have an account?"
            link="/auth/signup"
            linkText="Sign up"
          />
        </AuthCard>
      </AuthShell>
    );
  }

  /* -------------------------
     2. SIGNUP STEP 1: ROLE SELECTION
  --------------------------*/
  if (isSignup && !role) {
    return (
      <AuthShell title="Join as a member" onHome={goHome}>
        <AuthCard>
          <Button
            onClick={() => navigate("/auth/signup/farmer")}
            className="w-full"
          >
            Join as Farmer
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/auth/signup/buyer")}
            className="w-full"
          >
            Join as Buyer
          </Button>

          <SwitchLink
            text="Already have an account?"
            link="/auth/login"
            linkText="Log in"
          />
        </AuthCard>
      </AuthShell>
    );
  }

  /* -------------------------
     3. SIGNUP FORM (ROLE SELECTED)
  --------------------------*/
  return (
    <AuthShell
      title={`Join as ${role === "farmer" ? "Farmer" : "Buyer"}`}
      onHome={goHome}
    >
      <AuthCard>
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <GoogleButton onClick={handleGoogleAuth} text="Continue with Google" />

        <Divider />

        <AuthForm
          isLogin={false}
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loading}
        />

        <SwitchLink
          text="Already have an account?"
          link="/auth/login"
          linkText="Log in"
        />
      </AuthCard>
    </AuthShell>
  );
}

/* -------------------------
   UI COMPONENTS (with TypeScript)
--------------------------*/

interface AuthShellProps {
  title: string;
  onHome: () => void;
  children: React.ReactNode;
}

function AuthShell({ title, onHome, children }: AuthShellProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background relative overflow-hidden">
      {/* BACKGROUND IMAGE LAYER */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage: `url(${heroFarm})`,
        }}
      />

      {/* DARK OVERLAY  */}
      <div className="absolute inset-0 bg-background/80" />

      {/* CONTENT */}
      <button
        onClick={onHome}
        className="absolute top-4 left-10 flex items-center gap-2 text-muted-foreground hover:text-foreground z-10"
      >
        <Home size={28} />
        <span className="text-lg font-bold">Home</span>
      </button>

      <div className="w-full max-w-md relative z-10">
        <h1 className="text-2xl font-bold mb-6 text-foreground">{title}</h1>
        {children}
      </div>
    </div>
  );
}

function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">{children}</CardContent>
    </Card>
  );
}

interface GoogleButtonProps {
  onClick: () => void;
  text: string;
}

function GoogleButton({ onClick, text }: GoogleButtonProps) {
  return (
    <Button onClick={onClick} variant="outline" className="w-full gap-2">
      <Chrome size={18} />
      {text}
    </Button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px bg-border flex-1" />
      <span className="text-xs text-muted-foreground">OR</span>
      <div className="h-px bg-border flex-1" />
    </div>
  );
}

interface AuthFormProps {
  isLogin: boolean;
  form: {
    name: string;
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

function AuthForm({
  isLogin,
  form,
  onChange,
  onSubmit,
  loading,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isLogin && (
        <Input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={onChange}
          disabled={loading}
        />
      )}

      <div className="relative">
        <Mail
          className="absolute left-3 top-3 text-muted-foreground"
          size={16}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          className="pl-9"
          value={form.email}
          onChange={onChange}
          disabled={loading}
        />
      </div>

      <div className="relative">
        <Lock
          className="absolute left-3 top-3 text-muted-foreground"
          size={16}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          className="pl-9"
          value={form.password}
          onChange={onChange}
          disabled={loading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : isLogin ? "Log In" : "Sign Up"}
      </Button>
    </form>
  );
}

interface SwitchLinkProps {
  text: string;
  link: string;
  linkText: string;
}

function SwitchLink({ text, link, linkText }: SwitchLinkProps) {
  return (
    <p className="text-sm text-muted-foreground">
      {text}{" "}
      <Link to={link} className="text-primary hover:underline">
        {linkText}
      </Link>
    </p>
  );
}
