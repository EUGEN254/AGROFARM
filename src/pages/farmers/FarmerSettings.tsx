import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function FarmerSettings() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "John Farmer",
    email: "farmer@example.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved:", form);
  };

  const handleLogout = () => {
    navigate("/")
  };

  return (
    <div className="space-y-6 max-w-3xl">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* PROFILE */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />

          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* PREFERENCES */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-medium">Theme</p>
            <p className="text-sm text-muted-foreground">
              Switch between light and dark mode
            </p>
          </div>

          <ThemeToggle />
        </CardContent>
      </Card>

      {/* ACCOUNT */}
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>

        <CardContent>
          <Button
            variant="destructive"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </CardContent>
      </Card>

      <Separator />
    </div>
  );
}