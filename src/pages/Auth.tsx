import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Mail, Lock, Chrome } from "lucide-react";

export default function Auth() {
  const { mode, role } = useParams();
  const navigate = useNavigate();

  const isLogin = mode === "login";
  const isSignup = mode === "signup";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log("LOGIN", form);
      return;
    }

    console.log("SIGNUP", {
      role,
      ...form,
    });
  };

  const handleGoogleAuth = () => {
    console.log(isLogin ? "Google Login" : "Google Signup");
  };

  const goHome = () => navigate("/");

  /* -------------------------
     1. LOGIN SCREEN
  --------------------------*/
  if (isLogin) {
    return (
      <AuthShell title="Welcome Back" onHome={goHome}>
        <AuthCard>
          <GoogleButton onClick={handleGoogleAuth} text="Continue with Google" />

          <Divider />

          <AuthForm isLogin form={form} onChange={handleChange} onSubmit={handleSubmit} />

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
          <Button onClick={() => navigate("/auth/signup/farmer")} className="w-full">
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
        <GoogleButton onClick={handleGoogleAuth} text="Continue with Google" />

        <Divider />

        <AuthForm isLogin={false} form={form} onChange={handleChange} onSubmit={handleSubmit} />

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
   UI COMPONENTS (CLEAN REUSE)
--------------------------*/

function AuthShell({ title, onHome, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background relative">
      <button
        onClick={onHome}
        className="absolute top-4 left-10 flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <Home size={28} />
        <span className="text-lg font-bold">Home</span>
      </button>

      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
      </div>
    </div>
  );
}

function AuthCard({ children }) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">{children}</CardContent>
    </Card>
  );
}

function GoogleButton({ onClick, text }) {
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

function AuthForm({ isLogin, form, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isLogin && (
        <Input name="name" placeholder="Full Name" value={form.name} onChange={onChange} />
      )}

      <div className="relative">
        <Mail className="absolute left-3 top-3 text-muted-foreground" size={16} />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          className="pl-9"
          value={form.email}
          onChange={onChange}
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          className="pl-9"
          value={form.password}
          onChange={onChange}
        />
      </div>

      <Button type="submit" className="w-full">
        {isLogin ? "Log In" : "Sign Up"}
      </Button>
    </form>
  );
}

function SwitchLink({ text, link, linkText }) {
  return (
    <p className="text-sm text-muted-foreground">
      {text}{" "}
      <Link to={link} className="text-primary hover:underline">
        {linkText}
      </Link>
    </p>
  );
}