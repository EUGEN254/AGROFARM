import { BarChart3 } from "lucide-react";

export default function FarmerAnalytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold flex items-center gap-2">
          <BarChart3 size={20} />
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Performance insights (dummy view)
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground">Sales</p>
          <p className="text-xl font-bold">124</p>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground">Orders</p>
          <p className="text-xl font-bold">58</p>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground">Rating</p>
          <p className="text-xl font-bold">4.7</p>
        </div>
      </div>
    </div>
  );
}