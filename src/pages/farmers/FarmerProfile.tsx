import { useState } from "react";
import { User, Mail, Phone, MapPin, Tractor } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function FarmerProfile() {
  const [form, setForm] = useState({
    name: "John Farmer",
    email: "john@email.com",
    phone: "+254 700 000000",
    location: "Nairobi, Kenya",
    farmName: "Green Valley Farm",
    farmType: "Mixed Farming",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Saved:", form);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ================= HEADER ================= */}
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold">
            {form.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-lg font-semibold">{form.name}</h2>
            <p className="text-sm text-muted-foreground">
              {form.email}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ================= PERSONAL INFO ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User size={18} /> Personal Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 text-muted-foreground" size={16} />
              <Input
                className="pl-8"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <div className="relative">
              <Phone className="absolute left-2 top-2.5 text-muted-foreground" size={16} />
              <Input
                className="pl-8"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 text-muted-foreground" size={16} />
              <Input
                className="pl-8"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= FARM INFO ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Tractor size={18} /> Farm Information
          </CardTitle>
        </CardHeader>

        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Farm Name</Label>
            <Input
              value={form.farmName}
              onChange={(e) => handleChange("farmName", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Farm Type</Label>
            <Input
              value={form.farmType}
              onChange={(e) => handleChange("farmType", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}