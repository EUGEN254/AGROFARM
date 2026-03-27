import { useState } from "react";
import { HelpCircle, MessageSquare, Mail, Phone, Info } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FarmerSupport() {
  const [form, setForm] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Support request:", form);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-xl font-semibold flex items-center gap-2">
          <HelpCircle size={20} /> Support Center
        </h1>
        <p className="text-sm text-muted-foreground">
          Need help? Reach out or browse common solutions.
        </p>
      </div>

      {/* ================= QUICK HELP ================= */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-sm transition">
          <CardContent className="p-4 flex flex-col gap-2">
            <MessageSquare size={20} />
            <h3 className="font-medium text-sm">Live Chat</h3>
            <p className="text-xs text-muted-foreground">
              Chat with our support team instantly.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-sm transition">
          <CardContent className="p-4 flex flex-col gap-2">
            <Mail size={20} />
            <h3 className="font-medium text-sm">Email Support</h3>
            <p className="text-xs text-muted-foreground">
              Send us a detailed message.
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-sm transition">
          <CardContent className="p-4 flex flex-col gap-2">
            <Phone size={20} />
            <h3 className="font-medium text-sm">Call Us</h3>
            <p className="text-xs text-muted-foreground">
              Speak directly with support.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ================= CONTACT FORM ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Send us a message</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Subject</Label>
            <Input
              placeholder="e.g. Issue with order"
              value={form.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label>Message</Label>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={14}
                    className="text-muted-foreground cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  Drag the corner to resize this field
                </TooltipContent>
              </Tooltip>
            </div>

            <Textarea
              placeholder="Describe your issue..."
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              rows={5}
              className="resize-y"
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Submit Request</Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= FAQ ================= */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="font-medium">How do I add a new listing?</p>
            <p className="text-muted-foreground">
              Go to "My Listings" and click "Add Product".
            </p>
          </div>

          <div>
            <p className="font-medium">How do I track orders?</p>
            <p className="text-muted-foreground">
              Navigate to the Orders section to view updates.
            </p>
          </div>

          <div>
            <p className="font-medium">How do I contact buyers?</p>
            <p className="text-muted-foreground">
              Use the Messages section to communicate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
